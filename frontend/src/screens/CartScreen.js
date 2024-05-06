import React from "react";
import {
  ListGroup,
  Row,
  Col,
  Image,
  FormControl,
  Button,
  Card,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import Meta from "../components/Meta";
import CartAPI from "../api/CartAPI";
import Toast from "../utils/Toast";

const CartScreen = () => {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  // get cart by user id
  React.useEffect(() => {
    setIsLoading(true);
    const fetchCart = async () => {
      const response = await CartAPI.getCartByUserId();

      if (response.data.success) {
        setCartItems(response.data.cart.cartItems);
        setIsLoading(false);
      } else {
        console.log(response.data.message);
        setIsLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Update the quantity of a cart item
  const updateCartItem = async (id, qty) => {
    const response = await CartAPI.updateCartItem(id, qty);

    if (response.data.success) {
      const updatedCart = response.data.cart;
      setCartItems(updatedCart.cartItems);
      Toast({ type: "success", message: "Quantity updated" });
    } else {
      Toast({ type: "error", message: response.data.message });
    }
  };

  // Remove item from cart
  const removeFromCart = async (id) => {
    const response = await CartAPI.deleteCartItem(id);

    if (response.data.success) {
      const updatedCart = response.data.cart;
      setCartItems(updatedCart.cartItems);
      Toast({ type: "success", message: "Item removed from cart" });
    } else {
      Toast({ type: "error", message: response.data.message });
    }
  };

  return (
    <>
      <Meta title="Clothshop | Cart" />
      <Link className="btn btn-light my-3 back_btn" to="/">
        Go Home
      </Link>
      <Row>
        <h2 className="mb-4">Shopping Cart</h2>
        {isLoading ? (
          <Message variant="info">Getting your cart...</Message>
        ) : cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <Row className="py-4">
            <Col className="cart_items" md={8}>
              {cartItems.map((cart) => (
                <ListGroup variant="flush" key={cart.product}>
                  {console.log(cart.qty)}
                  <ListGroup.Item>
                    <Row>
                      <Col md={2}>
                        <Image src={cart.image} fluid rounded />
                      </Col>
                      <Col>
                        <h5>
                          <Link to={`/product/${cart.product}`}>
                            {cart.name}
                          </Link>
                        </h5>
                        <h4 className="py-2">Rs. {cart.price}</h4>
                      </Col>
                      <Col>
                        <FormControl
                          className="w-25"
                          as="select"
                          value={cart.qty}
                          onChange={(e) =>
                            updateCartItem(cart.product, e.target.value)
                          }
                        >
                          {[...Array(cart.countInStock).keys()].map((x) => (
                            <option value={Number(x + 1)} key={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </FormControl>
                        <Button
                          className="my-3"
                          variant="danger"
                          onClick={() => removeFromCart(cart.product)}
                        >
                          <i class="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              ))}
            </Col>
            <Col md={4}>
              <Card className="p-2">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h4>
                      Subtotal (
                      {cartItems.reduce(
                        (acc, item) => acc + Number(item.qty),
                        0
                      )}
                      ) Items
                    </h4>
                    <h5 className="mt-3">
                      Rs.
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </h5>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      className="w-100 p-2"
                      variant="primary"
                      disabled={cartItems.length === 0}
                      onClick={checkoutHandler}
                    >
                      PROCEED TO CHECKOUT
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )}
      </Row>
    </>
  );
};

export default CartScreen;
