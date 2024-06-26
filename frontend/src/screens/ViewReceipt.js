import React, { useEffect,useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { useSelector, useDispatch } from "react-redux";
import { payOrder,updateBank } from "../redux/actions/orderActions";
import { getOrderDetails, cancelOrder } from "../redux/actions/orderActions";

const ViewReceipt = () => {
  let navigate = useNavigate();
  let params = useParams();
  const dispatch = useDispatch();
  const orderId = params.id;

  const{ order, loading, error } = useSelector((state) => state.orderDetails);


  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);



  // Cancel Order Function
  const cancelOrderHandler = async () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      dispatch(cancelOrder(params.id));
      navigate("/admin/orders"); // Redirect to home or any other desired page
    }
  };

  // Calculate total item price
  const calculateTotalItemPrice = () => {
    return order.orderItems.reduce(
      (accumulator, currentItem) => accumulator + currentItem.qty * currentItem.price,
      0
    );
  };


  // ViewDeliveryHandler Function
  const viewDeliveryHandler = async () => {
    navigate(`/admin/Delivery/${order._id}`);
  };

  
  const changetopaid = () => {
    
    const paymentResult = {
        id: order._id,
        status: order.bankDetails.transAmount >= order.totalPrice ? 'Fully Paid' : 'Partially Paid',
        balance: (order.totalPrice - order.bankDetails.transAmount)
    }

    dispatch(payOrder(orderId, paymentResult));
    window.location.reload();
  };


  const Changetofullypaid = () => {
    
    const paymentResult = {
        id: order._id,
        status: 'Fully Paid',
        balance: (order.totalPrice - order.bankDetails.transAmount)
    }

    dispatch(payOrder(orderId, paymentResult));

    const bankDetails = {
        transAmount: order.totalPrice,
    };

    dispatch(updateBank({_id: orderId,transAmount: bankDetails.transAmount,})); 
    
    window.location.reload();
  };

  

  return (
    <>
      
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
        <h1 style={{marginTop:'50px'}}>Order {order.Ord_ID}</h1>
        <Row style={{marginTop:'30px'}}>
          <Col md={8} className="order_scr">
            <ListGroup style={{marginTop:'20px', marginBottom:'20px' }} variant="flush">
              
              <ListGroup.Item>
                <h4>Payment Method</h4>
                <p>
                  <strong>Method : </strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                    <Message variant="success">{order.paymentResult.status} {order.paidAt}</Message>
                  ) : order.bankDetails ? (
                    <Message variant="warning">Processing</Message>
                  ) : (
                    <Message variant="warning">Pending</Message>
                  )
                }
    
              </ListGroup.Item>
              <ListGroup.Item style={{marginTop:'20px'}}>
                    <h4>Recipet Details</h4>
                    
                    <ListGroup.Item>
                    <Row>
                        <Col><strong>Account Name:</strong> </Col>
                        <Col>{order.bankDetails.accName}</Col>
                    </Row>
                    </ListGroup.Item>
                    
                    <ListGroup.Item>
                        <Row>
                            <Col><strong>Account Number:</strong></Col>
                            <Col>{order.bankDetails.accNum}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col><strong>Bank Name:</strong></Col>
                            <Col>{order.bankDetails.bankName}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col><strong>Branch Name:</strong></Col>
                            <Col>{order.bankDetails.branchName}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col><strong>Transferred Date:</strong></Col>
                            <Col>{order.bankDetails.transDate}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col><strong>Transferred Amount:</strong></Col>
                            <Col>{order.bankDetails.transAmount}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item style={{marginBottom:'20px' }}>
                        <Row>
                            <Col><strong>Remarks:</strong></Col>
                            <Col>{order.bankDetails.remarks}</Col>
                        </Row>
                    </ListGroup.Item>
              </ListGroup.Item>

              

              <ListGroup.Item style={{marginTop:'20px'}}>
                
              <h4>Delivery Status</h4>
                {order.isDelivered ? (
                  <Message variant="success">
                    Delivered on {order.deliveredAt.substring(0, 10)}
                  </Message>
                ) : (
                  <Message variant="danger">Not Delivered</Message>
                )}
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
                    <Col>Rs. {calculateTotalItemPrice().toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>Rs. {order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>Rs. {order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>Rs. {order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                {order.bankDetails ? (
                    order.bankDetails.transAmount >= order.totalPrice ? (
                        order.isPaid == true ? (
                          <Button
                          style={{marginTop:'10px',marginBottom:'10px'}}
                          onClick={viewDeliveryHandler}
                          className="w-100"
                          variant="primary"
                          >
                          Manage Delivery
                          </Button>
                      ) : (
                          <>
                          <Button
                          style={{marginTop:'10px'}}
                              onClick={changetopaid}
                              className="w-100"
                              variant="primary"
                          >
                              Verify Payment
                          </Button>
                          <Button
                              style={{marginTop:'10px',marginBottom:'10px'}}
                              onClick={cancelOrderHandler}
                              className="w-100"
                              variant="danger"
                          >
                              Cancel Order
                          </Button>
                          </>
                      )
                    ) : (

                      order.paymentResult? (
                          <>
                          <Button
                          style={{marginTop:'10px'}}
                              onClick={Changetofullypaid}
                              className="w-100"
                              variant="primary"
                          >
                              Mark as Fully Paid
                          </Button>

                          <Button
                              style={{marginTop:'10px',marginBottom:'10px'}}
                              onClick={cancelOrderHandler}
                              className="w-100"
                              variant="danger"
                          >
                              Cancel Order
                          </Button>
                          </>
                            
                      ) : (
                          <>
                          <Button
                          style={{marginTop:'10px'}}
                              onClick={changetopaid}
                              className="w-100"
                              variant="primary"
                          >
                              Verify Payment
                          </Button>

                          <Button
                              style={{marginTop:'10px',marginBottom:'10px'}}
                              onClick={cancelOrderHandler}
                              className="w-100"
                              variant="danger"
                          >
                              Cancel Order
                          </Button>
                          </>
                          )

                          
                      )
                    ) : 
                    
                    <Button
                    style={{marginTop:'10px',marginBottom:'10px'}}
                    onClick={()=>navigate(`/order/${order._id}`)}
                    className="w-100"
                    variant="danger"
                    >
                      Back
                    </Button>}

                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        </>
      )}
    </>
  );
};

export default ViewReceipt;
