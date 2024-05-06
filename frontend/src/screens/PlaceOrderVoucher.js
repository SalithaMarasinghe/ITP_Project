import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import Message from "../components/Message";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../redux/actions/orderActions";
import axios from "axios";

const PlaceOrderVoucher = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { type, value, username, city, address, country, postalCode } =
    useParams();

  const {
    order,
    loading: orderLoading,
    error,
  } = useSelector((state) => state.orderCreate);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  //cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100;
  cart.shippingPrice = (cart.itemsPrice * 0.1).toFixed(2);

  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const placeOrderHandler = async () => {
    await axios.post("http://localhost:5000/api/voucheroders", {
      userID: username,
      email: "req.body.email",
      value: value,
      expirationDate: new Date(),
      deliveryDetails: address + " " + city + " " + postalCode + " " + country,
    });

    alert("Voucher Added Success");
    navigate("/giftvouchers");
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <Row>
        <Col md={8} className="place_order">
          <ListGroup variant="flush">
            {error && (
              <ListGroup.Item>
                <Message variant="danger">{error}</Message>
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <h4>Shipping</h4>
              <strong>Address:</strong>
              <p>
                {address}, {city} {postalCode}, {country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Payment Method</h4>
              <strong>Method : </strong>
              {cart.paymentMethod}
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
                  <Col>{type}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Qty</Col>
                  <Col>{1}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>{value}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="w-100"
                  variant="primary"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  APPLY VOUCHER
                </Button>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="w-100"
                  variant="primary"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  PLACE ORDER
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderVoucher;
