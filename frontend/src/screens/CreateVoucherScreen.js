import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loading from "../components/Loading";
import FormContainer from "../components/FormContainer";
import axios from "axios";

const CreateVoucherScreen = () => {
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [code, setCode] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newVoucher = {
        type,
        value,
        code,
        expirationDate,
      };
      await axios.post("http://localhost:5000/api/vouchers", newVoucher);
      // Optionally, you can display a success message or redirect the user to another page
      console.log("Voucher created successfully");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  return (
    <FormContainer>
      <h2>Create Voucher</h2>
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="type" className="mt-3">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="value" className="mt-3">
          <Form.Label>Value</Form.Label>
          <Form.Control
            type="text"
            placeholder="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="code" className="mt-3">
          <Form.Label>Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="expirationDate" className="mt-3">
          <Form.Label>Expire Date</Form.Label>
          <Form.Control
            type="text"
            placeholder="Expire Date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
          />
        </Form.Group>
        <Button className="mt-3" type="submit" variant="primary">
          Create
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CreateVoucherScreen;
