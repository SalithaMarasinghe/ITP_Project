// ProductScreen.js

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import {Row,Col,Image,ListGroup,Button,Card,FormControl,Form,Modal,} from "react-bootstrap";
import {deleteProductReview,listProductDetails,updateProductReview,} from "../redux/actions/productActions";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { createProductReview } from "../redux/actions/productActions";
import { listPromotions } from "../redux/actions/promotionActions";
import CartAPI from "../api/CartAPI";
import Toast from "../utils/Toast";
import axios from "axios";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [updateModalOpened, setUpdateModalOpened] = useState(false);
  const [selectedProductReviewId, setSelectedProductReviewId] = useState(null);
  const [ordeDataFetching, setOrdeDataFetching] = useState(false);
  const [hasOrder, setHasOrder] = useState(false);

  let navigate = useNavigate();
  const dispatch = useDispatch();
  let params = useParams();

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  const promotionList = useSelector((state) => state.promotionList);
  const { promotions } = promotionList;

  useEffect(() => {
      if (successProductReview) {
          setRating(0);
          setComment("");
      }
      if (error) {
          navigate("/");
      }
      dispatch(listProductDetails(params.id));
      dispatch(listPromotions());
  }, [dispatch, params.id, successProductReview]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const id = userInfo["id"];
    setOrdeDataFetching(true);
    axios.get("/api/orders/myorders/" + id).then((res) => {
      for (var order of res.data) {
        for (var item of order.orderItems) {

          if (item.product == params.id) {
            setHasOrder(true);
            break;
          } else {
            setHasOrder(false);
          }
        }
      }
      setOrdeDataFetching(false);
    });
    setOrdeDataFetching(false);
  }, []);



  // Add to cart
  const addToCartHandler = async () => {
    const newPrice = calculateNewPrice();
    //
    const data = {
      cartItem: {
        name: product.name,
        qty: qty,
        image: product.image,
        price: newPrice,
        product: product._id,
        countInStock: product.countInStock,
      },
    };

    try {
      const response = await CartAPI.addCartItems(data);
      if (response.data.success) {
        //Toast({ type: "success", message: "Item added to cart" });
        alert("Item added to cart ");
       
        navigate("/cart");
      } else {
        //Toast({ type: "error", message: response.data.message });
        alert({message: response.data.message });
      }
    } catch (error) {
      //Toast({ type: "error", message: "Item already exists" });
      alert("Item already exists");
    }
  };

  const submitHandler = (e) => {
    if (hasOrder) {
      e.preventDefault();
      dispatch(createProductReview(params.id, { rating, comment }));
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      alert("review added ");
    } else {
      alert("You don't have an order for this product ");
    }
  };

  const getPromotionDiscount = () => {
    const matchedPromotion = promotions.find(
      (promotion) => promotion.relatedProduct === product._id
    );
    if (!matchedPromotion) return 0;

    const { type, value, minQty } = matchedPromotion;
    if (qty >= minQty) {
      if (type === "fixed") {
        // For fixed type, return the value directly
        return value;
      } else if (type === "percentage") {
        // For percentage type, calculate the discount percentage
        const discount = (value / 100) * product.price;
        return `${value}% (- Rs. ${discount.toFixed(2)})`;
      }
    } else {
      return 0;
    }

    return null;
  };

  const calculateNewPrice = () => {
    const discount = getPromotionDiscount();
    if (!discount) return product.price;

    if (typeof discount === "number") {
      // For fixed type, subtract the discount value from the product price
      return product.price - discount;
    } else {
      // For percentage type, calculate the discounted price
      const discountPercentage = parseInt(discount.split("%")[0]);
      const discountedPrice = (
        product.price -
        (discountPercentage / 100) * product.price
      ).toFixed(2);
      return discountedPrice;
    }
  };
  const deleteReviewHandler = (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      dispatch(deleteProductReview(params.id, reviewId));
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const submitUpdateHandler = async (e) => {
    e.preventDefault();
    dispatch(
      updateProductReview({
        rating,
        comment,
        _id: selectedProductReviewId,
        productId: params.id,
      })
    );

    // setSelectedProductReviewId(null);
    setUpdateModalOpened(false);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  if (ordeDataFetching) {
    return <div>Loading</div>;
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger"></Message>
      ) : (
        product && (
          <>
            <Modal
              onHide={() => setUpdateModalOpened(false)}
              show={updateModalOpened}
            >
              <Modal.Header closeButton>
                <Modal.Title style={{ color: "black" }}>
                  Update Review
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={submitUpdateHandler}>
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}

                  <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select ...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very good</option>
                      <option value="5">5 - Perfect</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className="mt-3" controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Comment"
                    ></Form.Control>
                  </Form.Group>
                  <div style={{ display: "flex", height: 50 }}>
                    <Button type="submit" className="mt-3" vatiant="primary">
                      Update
                    </Button>
                  </div>
                </Form>
              </Modal.Body>
            </Modal>
            <Link className="btn btn-light my-3 back_btn" to="/">
              Go back
            </Link>
            <Row>
              <Col md={4}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={5}>
                <h3>{product.name}</h3>
                <ListGroup variant="flush" className="pruduct_desc">
                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.rating} Ratings`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>Price: Rs. {product.price}</ListGroup.Item>
                  <ListGroup.Item>
                    Description: {product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col className="product_card" md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>Rs. {product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Discount:</Col>
                        <Col>{getPromotionDiscount()}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>New Price:</Col>
                        <Col>
                          <strong>Rs. {calculateNewPrice()}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0
                            ? `In stock`
                            : `Out of stock`}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <FormControl
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option value={x + 1} key={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </FormControl>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                      <Button
                        onClick={() => addToCartHandler(product._id, qty)}
                        className="btn btn-primary d-block w-100"
                        type="button"
                        disabled={product.countInStock === 0 || !userInfo}
                      >
                        Add to cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <div className="form_review">
              <Row className="mt-4">
                <Col md={6}>
                  <h2>Reviews</h2>
                  {loadingProductReview && <Loading />}
                  {product.reviews.length === 0 && (
                    <Message variant="info">No Reviews</Message>
                  )}
                  {userInfo && (
                    <ListGroup variant="flush">
                      {product.reviews.map((review) => {
                        const userInfo = localStorage.getItem("userInfo");
                        const uid = JSON.parse(userInfo).id;
                        const reviewOwnedByUser = uid === review?.user;
                        return (
                          <ListGroup.Item key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating} text="Ratings" />
                            <p>{review.createdAt.substring(0, 10)}</p>
                            <p>{review.comment}</p>
                            <div style={{ display: "flex" }}>
                              {reviewOwnedByUser && (
                                <Button
                                  variant="info"
                                  onClick={(e) => {
                                    setSelectedProductReviewId(review._id);
                                    setComment(review.comment);
                                    setRating(review.rating);
                                    setUpdateModalOpened(true);
                                  }}
                                >
                                  Update
                                </Button>
                              )}
                              <div style={{ width: 15 }} />
                              {reviewOwnedByUser && (
                                <Button
                                  onClick={() => {
                                    setSelectedProductReviewId(review._id);
                                    deleteReviewHandler(review._id);
                                  }}
                                  variant="danger"
                                >
                                  Delete
                                </Button>
                              )}
                            </div>
                          </ListGroup.Item>
                        );
                      })}
                    </ListGroup>
                  )}
                  <h3>Write a customer review</h3>
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      {errorProductReview && (
                        <Message variant="danger">{errorProductReview}</Message>
                      )}

                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select ...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very good</option>
                          <option value="5">5 - Perfect</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group className="mt-3" controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Comment"
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" className="mt-3" vatiant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message variant="info">
                      <Link to="/login">Sign in</Link> to write a review
                    </Message>
                  )}
                </Col>
              </Row>
            </div>
          </>
        )
      )}
    </>
  );
};

export default ProductScreen;
