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
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import jsPDF from "jspdf"; // import jsPDF library
import "jspdf-autotable"; // for creating tables

const CartScreen = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Shopping Cart Report", 14, 22);

    const tableColumn = ["Product", "Quantity", "Price"];
    const tableRows = [];

    cartItems.forEach((item) => {
      const rowData = [
        item.name,
        item.qty,
        `Rs. ${item.price}`,
      ];
      tableRows.push(rowData);
    });

    // Add the table to the PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save("shopping_cart_report.pdf"); // Save the PDF with a file name
  };

  return (
    <>
      <Meta title="Clothshop | Cart" />
      <Link className="btn btn-light my-3 back_btn" to="/">
        Go Home
      </Link>
      <Row>
        <h2 className="mb-4">Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <Row className="py-4">
            <Col className="cart_items" md={8}>
              {cartItems.map((cart) => (
                <ListGroup variant="flush" key={cart.product}>
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
                            dispatch(
                              addToCart(cart.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(cart.countInStock).keys()].map((x) => (
                            <option value={x + 1} key={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </FormControl>
                        <Button
                          className="my-3"
                          variant="danger"
                          onClick={() => dispatch(removeFromCart(cart.product))}
                        >
                          <i className="fas fa-trash"></i>
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
                      {cartItems.reduce(
                        (acc, item) => acc + (item.qty * item.price),
                        0
                      ).toFixed(2)}
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
                    <Button
                      className="w-100 p-2 mt-2"
                      variant="secondary"
                      disabled={cartItems.length === 0}
                      onClick={generatePDF}
                    >
                      GENERATE PDF
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
