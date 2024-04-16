import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails, cancelOrder } from "../redux/actions/orderActions";

const OrderScreen = () => {
  let navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();

  const { order, loading, error } = useSelector((state) => state.orderDetails);

  // Calculate total item price
  const calculateTotalItemPrice = () => {
    return order.orderItems.reduce(
      (accumulator, currentItem) => accumulator + currentItem.qty * currentItem.price,
      0
    );
  };

  // Cancel Order Function
  const cancelOrderHandler = async () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      dispatch(cancelOrder(params.id));
      navigate("/admin/orders"); // Redirect to home or any other desired page
    }
  };

  useEffect(() => {
    dispatch(getOrderDetails(params.id));
  }, [dispatch, params.id]);

  const viewReceiptHandler = async () => {

    navigate(`/admin/ViewRecipet/${order._id}`);
  };

  return (
    <>
      
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h1 style={{marginTop:'50px'}}>Order #{order._id}</h1>
          <Row style={{marginTop:'30px'}}>
            <Col md={8} className="order_scr">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>Shipping</h4>
                  <p>
                    <strong>Name: </strong>
                    {order.user.name}
                    <br />
                    <strong>Email: </strong>
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <strong>Address:</strong>
                  <p>
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city}{" "}
                    {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message variant="success">
                      Delivered on {order.deliveredAt.substring(0, 10)}
                    </Message>
                  ) : (
                    <Message variant="danger">Not Delivered</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4>Payment Method</h4>
                  <p>
                    <strong>Method : </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                      <Message variant="success">{order.paymentResult.status} {order.paidAt}</Message>
                    ) : order.bankDetails ? (
                      <Message variant="warning">Processing</Message>
                    ) : (
                      <Message variant="warning">Pending</Message>
                    )
                  }
      
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4>Order Items</h4>
                  {order.orderItems.length === 0 ? (
                    <Message variant="info">Your cart is empty</Message>
                  ) : (
                    <>
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x Rs. {item.price} = Rs.
                              {item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h4>Order Summary</h4>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>Rs. {calculateTotalItemPrice().toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>Rs. {order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>Rs. {order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>Rs. {order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>

                  {order.bankDetails ? (
                    order.bankDetails.transAmount >= order.totalPrice ? (

                          <>  
                          <Button
                          style={{marginTop:'10px'}}
                          onClick={viewReceiptHandler}
                          className="w-100 mngDelivery"
                          variant="warning"
                          >
                          Manage Delivery
                          </Button>

                          <Button
                          style={{marginTop:'10px',marginBottom:'10px'}}
                          onClick={viewReceiptHandler}
                              className="w-100"
                              variant="primary"
                          >
                          View Bank Receipt
                          </Button>
                          </>
                      ):(
                         
                          
                          <Button
                          style={{marginTop:'10px',marginBottom:'10px'}}
                          onClick={viewReceiptHandler}
                          className="w-100"
                          variant="primary"
                          >
                          View Bank Receipt
                          </Button>
                          
                        )
                    
                        ) : (
                      
                          <Button
                          style={{marginTop:'10px'}}
                              onClick={cancelOrderHandler}
                              className="w-100"
                              variant="danger"
                          >
                              Cancel Order
                          </Button>
                        )
                    }

                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderScreen;
