import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button, Form } from "react-bootstrap";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { useSelector, useDispatch } from "react-redux";
import { updateDelivery, getOrderDetails,deliverOrder } from "../redux/actions/orderActions";

const UserDeliveryDetails = () => {
  
  let params = useParams();
  const orderId = params.id;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);


   // Calculate total item price
   const calculateTotalItemPrice = () => {
    return order.orderItems.reduce(
      (accumulator, currentItem) => accumulator + currentItem.qty * currentItem.price,
      0
    );
  };


  const changetoDelivered = () => {

    dispatch(deliverOrder(orderId));
    
  };

 
  
  const viewReceiptHandler = () => {
  
    navigate(`/ureciept/${order._id}`);
  };

  return (
    <>
      
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h1 style={{marginTop:'50px'}}>Order #{order._id}</h1>
          <Row style={{marginTop:'30px'}}>
            <Col md={8} className="order_scr">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>Shipping</h4>
                  <p>
                    <strong>Name: </strong>
                    {order.user.name}
                    <br />
                    <strong>Email: </strong>
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <strong>Address:</strong>
                  <p>
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city}{" "}
                    {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message variant="success">
                      Delivered on {order.deliveredAt.substring(0, 10)}
                    </Message>
                  ) : (
                    <Message variant="danger">Not Delivered</Message>
                  )}
                </ListGroup.Item>
                

                <ListGroup.Item style={{marginTop:'20px'}}>
                    <h4>Delivery Details</h4>


                    <ListGroup.Item>
                    <Row>
                        <Col><strong>Agent Name:</strong> </Col>
                        <Col>{order.deliveryDetails? order.deliveryDetails.agentName : ""}</Col>
                    </Row>
                    </ListGroup.Item>
                    
                    <ListGroup.Item>
                        <Row>
                            <Col><strong>Agent Contact:</strong></Col>
                            <Col>{order.deliveryDetails? order.deliveryDetails.agentContact : ""}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col><strong>Estimated Delivery Date:</strong></Col>
                            <Col>{order.deliveryDetails && (<Form.Label>{order.deliveryDetails.estDate}</Form.Label>)}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col><strong>Package Details:</strong></Col>
                            <Col>{order.deliveryDetails? order.deliveryDetails.packSize : ""}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col><strong>Tracking Number:</strong></Col>
                            <Col>{order.deliveryDetails? order.deliveryDetails.trackLink : ""}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item style={{marginBottom:'20px' }}>
                        <Row>
                            <Col><strong>Note:</strong></Col>
                            <Col>{order.deliveryDetails? order.deliveryDetails.delNote : ""}</Col>
                        </Row>
                    </ListGroup.Item>

                </ListGroup.Item>


                <ListGroup.Item style={{marginTop:'20px'}}>
                  <h4>Order Items</h4>
                  {order.orderItems.length === 0 ? (
                    <Message variant="info">Your cart is empty</Message>
                  ) : (
                    <>
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x Rs. {item.price} = Rs.
                              {item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">

                <ListGroup.Item>
                  <h4>Payment Status</h4>
                  <p>
                    <strong>Method : </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                      <Message variant="success">Paid {order.paidAt}</Message>
                    ) : order.bankDetails ? (
                      <Message variant="warning">Processing</Message>
                    ) : (
                      <Message variant="warning">Pending</Message>
                    )
                  }
      
                </ListGroup.Item>

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
                    {
                      order.bankDetails ? (
                        <>
                          <Button
                          style={{marginTop:'10px',marginBottom:'10px'}}
                          onClick={viewReceiptHandler}
                          className="w-100"
                          variant="primary"
                          >
                          View Bank Receipt
                          </Button>
                           <Button
                           style={{marginTop:'10px',marginBottom:'10px'}}
                           onClick={()=>navigate(`/uorder/${order._id}`)}
                           className="w-100"
                           variant="danger"
                           >
                           Back
                           </Button>
                        </>
                      ) : (
                      
                        <Button
                        style={{marginTop:'10px'}}
                           // onClick={changetopaid}
                            className="w-100"
                            variant="danger"
                        >
                            Cancel Order
                        </Button>
                      )
                    }

{
                      order.deliveryDetails ? (
                          <Button
                          style={{marginTop:'10px',marginBottom:'10px',color:'#000'}}
                          onClick={""}
                          className="w-100"
                          variant="warning"
                          >
                          Mark as Recieved
                          </Button>
                      ) : (
                      
                        null
                      )
                    }

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

export default UserDeliveryDetails;
