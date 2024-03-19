import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loading from "../components/Loading";
import axios from "axios";



const UploadReciept = () => {
   
  const dispatch = useDispatch();
  
  
  
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

    <div>
      <h2>Bank Transfer Details</h2>
      
      <hr
        style={{
          border: 'none',
          borderTop: '2px solid #D8971A',
          width: 'auto',
          margin: '0 left',
          opacity: 1
        }}
      />
      
      <Form onSubmit={handleSubmit}>

        {error && <Message variant="danger">{error}</Message>}

        <div className="row">
          <div className="col-md-4 mt-3">
            <Form.Group controlId="acc_name">
              <Form.Label>Account Holder's Name</Form.Label>
              <Form.Control className="form1"
                type="text"
                placeholder="Enter Account Holder's Name"
                
                
                
              />
            </Form.Group>
          </div>

          <div className="col-md-4 mt-3">
            <Form.Group controlId="acc_num">
              <Form.Label>Account Number</Form.Label>
              <Form.Control className="form1"
                type="number"
                placeholder="Enter Account Number"
                
                
                
              />
            </Form.Group>
          </div>

          <div className="col-md-4 mt-3">
            <Form.Group controlId="trans_date">
              <Form.Label>Transfered Date</Form.Label>
              <Form.Control className="form1"
                type="date"
                placeholder="Enter Transfered Date"
                
                
                
              />
            </Form.Group>
          </div>
        

        
          <div className="col-md-4 mt-3">
            <Form.Group controlId="bank_name">
              <Form.Label>Bank Name</Form.Label>
              <Form.Control className="form1"
                type="text"
                placeholder="Enter Bank Name"
                
                
                
              />
            </Form.Group>
          </div>

          <div className="col-md-4 mt-3">
            <Form.Group controlId="branch_name">
              <Form.Label>Branch Name</Form.Label>
              <Form.Control className="form1"
                type="text"
                placeholder="Enter Branch Name"
                
                
              />
            </Form.Group>
          </div>

          <div className="col-md-4 mt-3">
            <Form.Group controlId="trans_amount">
              <Form.Label>Transfered Amount</Form.Label>
              <Form.Control className="form1"
                type="number"
                placeholder={cart.totalPrice}
                
                
                
              />
            </Form.Group>
          </div>
        

        
          <div className="col-md-4 mt-3">
            <Form.Group controlId="remarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control className="form1"
                type="text"
                placeholder="Enter Remarks"
                
                
              />
            </Form.Group>
          </div>
        

       
          <div className="col-md-4 mt-3">
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control className="form1"
                type="file"
                label="Choose file"
                onChange={uploadFileHandler}
                
              />
              {uploading && <Loading />}
            </Form.Group>
          </div>
        
        
          <div className="col-md-4 mt-3">
           <div className="form_btn1_1">
              <Button className="form_btn1_2" type="submit" variant="primary" style={{ width: '250px', borderRadius: '50px' }}>
                {loading ? <Loading /> : 'Submit'}
              </Button>
            </div>
          </div>
        </div>
       
      </Form>
    </div>
  );
};

export default UploadReciept;
