import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { listOrders } from "../redux/actions/orderActions";

const OrderListScreen = () => {
  const dispatch = useDispatch();

  const ordersList = useSelector((state) => state.orderListOrder);
  const { orders, loading, error } = ordersList;

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <h3>Orders List</h3>
          <Col>
            <Table striped rounded hover className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th>Bank Receipt Details</th> {/* New column */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order._id}</td>
                    <td>{order.user.name}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>Rs. {order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        //order.paidAt.substring(0, 10)
                        <i className="fas fa-check" style={{ color: "green" }}></i>
                      ) : (
                        <i className="fas fa-times" style={{ color: "red" }}></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        //order.deliveredAt.substring(0, 10)
                        <i className="fas fa-check" style={{ color: "green" }}></i>
                      ) : (
                        <i className="fas fa-times" style={{ color: "red" }}></i>
                      )}
                    </td>
                    <td>
                      {order.bankReceiptDetails ? (
                        <Button
                          className="btn-sm"
                          variant="info"
                          // onClick={() => viewBankReceipt(order.bankReceiptDetails)} // Remove if not defined
                          disabled // Disable button if no function to view receipt
                        >
                          View Receipt
                        </Button>
                      ) : (
                        <span>No Receipt</span>
                      )}
                    </td>
                    <td>
                      <LinkContainer className="ml-1" to={`/order/${order._id}`}>
                        <Button className="btn-sm" variant="primary">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </>
  );
};

export default OrderListScreen;
