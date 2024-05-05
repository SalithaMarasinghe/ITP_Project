import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loading from "../components/Loading";
import FormContainer from "../components/FormContainer";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditVoucherScreen = () => {
  // Destructure match to get params
  let params = useParams();

  const voucherId = params.id; // Extract id from params
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [code, setCode] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(""); // Add error state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updatedVoucher = {
        type,
        value,
        code,
        expirationDate,
      };
      const response = await axios.put(
        `http://localhost:5000/api/vouchers/${voucherId}`,
        updatedVoucher
      );
      // Assuming your backend returns the updated voucher data
      const voucher = response.data.voucher;
      setType(voucher.type);
      setValue(voucher.value);
      setCode(voucher.code);
      setExpirationDate(voucher.expirationDate);
      // Optionally, you can display a success message or redirect the user to another page
      console.log("Voucher updated successfully:", voucher);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  console.log(voucherId, "abcd");
  useEffect(() => {
    const fetchVoucherData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/vouchers/${voucherId}`
        );
        const voucher = response.data.voucher;
        setType(voucher.type);
        setValue(voucher.value);
        setCode(voucher.code);
        setExpirationDate(voucher.expirationDate);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVoucherData();
  }, [voucherId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  return (
    <FormContainer>
      <h2>Edit Voucher</h2>
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
          Edit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default EditVoucherScreen;
