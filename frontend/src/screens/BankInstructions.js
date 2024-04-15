import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import { Container, Row, Col, Table, ListGroup } from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import CheckoutSteps from "../components/CheckoutSteps";

const BankInstruction = () => {
  let params = useParams();
  const orderId = params.id;

  let navigate = useNavigate();
  const { order } = useSelector((state) => state.orderCreate);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleNext = () => {
    if (isChecked) {
      navigate(`/uploadbill/${order._id}`);
    } else {
      alert('Please read and accept the instructions before proceeding.');
    }
  };

  return (
    <>
    <CheckoutSteps step1 step2 step3 step4/>
    <Container>
      <h2>Account Details</h2>
      <hr style={{ backgroundColor: 'var(--secondary-color)', height: '2px', opacity: 100 }} />
      <Row style={{ paddingTop: '50px' }}>
        {/* Left Side */}
        <Col md={8} className="left-column">
          <Table className='bank_table'>
            <tbody>
              <tr>
                <td>Account Name</td>
                <td>Black Clothing Store</td>
              </tr>
              <tr>
                <td>Account Number</td>
                <td>10015689525</td>
              </tr>
              <tr>
                <td>Bank Name</td>
                <td>Commercial Bank</td>
              </tr>
              <tr>
                <td>Branch</td>
                <td>Negombo</td>
              </tr>
            </tbody>
          </Table>
          <ListGroup className="ins_list">
            <li className="ins_list_item">Please ensure that the amount transferred matches the total amount indicated in your order confirmation.</li>
            <li className="ins_list_item">It is crucial to include your order number or invoice number in the remarks field when initiating the transfer. This will help us identify your payment and process your order promptly.</li>
            <li className="ins_list_item">Once you've initiated the transfer, kindly submit a copy of the transaction receipt in the form found on the next page. This will expedite the verification process and ensure timely processing of your order.</li>
            <li className="ins_list_item">Your order will be processed once the payment is received and confirmed. Failure to make the payment within 24 Hours will result in order cancelation.</li>
          </ListGroup>
        </Col>
        {/* Right Side */}
        <Col md={4} className="right-column">
          <div className="text-right">
            <h4 style={{ color: 'white' }}>Order Reference #</h4>
            <label className='bankIns'>{order._id}</label>
            <h4 style={{ paddingTop: '50px', color: 'white' }}>Total Amount</h4>
            <label className='bankIns'>Rs. {order.totalPrice}</label>
            <p style={{ paddingTop: '50px' }}><input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} /> I have read and understood these instructions.</p>
            {!isChecked && <p style={{ color: 'red' }}>Please read and accept the instructions before proceeding.</p>}
            <Button
              className="form_btn1_2"
              variant="primary"
              style={{ width: '250px', borderRadius: '50px', marginTop: '30px' }}
              onClick={handleNext}
              disabled={!isChecked}
            >
              Next
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default BankInstruction;
