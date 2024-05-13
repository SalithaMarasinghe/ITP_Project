import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingAddress } from "../redux/actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ShippingVoucher = () => {
  const location = useLocation();
  let navigate = useNavigate();

  const { type, value, username } = useParams();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const handleShippingAddress = (e) => {
    e.preventDefault();
    // dispatch(saveShippingAddress({ address, city, postalCode, country }));
    // navigate("/shipping/payment");
    navigate(
      `/payment/voucher/${type}/1/${value}/${username}/${address}/${city}/${postalCode}/${country}`
    );
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 />
      <h1>Shipping</h1>
      <Form onSubmit={handleShippingAddress}>
        <Form.Group className="py-2" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="py-2" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="py-2" controlId="postalcode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="py-2" controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button className="mt-3" type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingVoucher;
