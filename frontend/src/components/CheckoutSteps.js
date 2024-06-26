import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector} from "react-redux";



const CheckoutSteps = ({ step1, step2, step3, step4, step5}) => {

  const { order } = useSelector((state) => state.orderCreate);

  return (
    <Nav className="justify-content-center mb-4">
      {/*<Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>Sign in</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Sign in</Nav.Link>
        )}
      </Nav.Item>*/}
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/payment">
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>Place order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place order</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to={`/billinstructions/${order._id}`}>
            <Nav.Link>Instructions</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Instructions</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step5 ? (
          <LinkContainer to={`/uploadbill/${order._id}`}>
            <Nav.Link>Submission</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Submission</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
