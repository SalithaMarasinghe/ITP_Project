import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loading from "../components/Loading";
import FormContainer from "../components/FormContainer";
import axios from "axios";


const UploadReciept = () => {
   
  const dispatch = useDispatch();
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const cart = useSelector((state) => state.cart);

  const { loading, success, error } = useSelector(
    (state) => state.productCreate
  );


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
     
    );
  };


  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);


    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
      ).toFixed(2);

    

    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error.message);
      setUploading(false);
    }
  };

  return (
    <FormContainer>
      <h2>Bank Transfer Details</h2>
      <hr style={{ borderTop: "2px solid #D8971A", width: "600px", margin: "0 auto" }} />
      <Form onSubmit={handleSubmit}>

        {error && <Message variant="danger">{error}</Message>}

        <Form.Group controlId="acc_name" className="mt-3">
          <Form.Label>Account Holder's Name</Form.Label>
          
          <Form.Control
            type="text"
            placeholder="Enter Account Holder's Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="acc_num" className="mt-3">
          <Form.Label>Account Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Account Number"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="trans_date" className="mt-3">
          <Form.Label>Transfered Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter Transfered Date"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="bank_name" className="mt-3">
          <Form.Label>Bank Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Bank Name"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="branch_name" className="mt-3">
          <Form.Label>Branch Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Branch Name"
            onChange={(e) => setPrice(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="trans_amount" className="mt-3">
          <Form.Label>Transfered Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Transfered Amount"
            value={cart.totalPrice}
            onChange={(e) => setCountInStock(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="remarks" className="mt-3">
          <Form.Label>Remarks</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Remarks"
            onChange={(e) => setCountInStock(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="image" className="mt-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            label="Choose file"
            onChange={uploadFileHandler}
          ></Form.Control>
          {uploading && <Loading />}
        </Form.Group>

        <Button className="mt-3" type="submit" variant="primary">
          {loading ? <Loading /> : `Submit`}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default UploadReciept;
