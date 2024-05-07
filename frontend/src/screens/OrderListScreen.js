import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { Row, Col, Table, Button, Form, FormControl } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { listOrders } from "../redux/actions/orderActions";
import { getOrderDetails } from "../redux/actions/orderActions";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch orders from Redux store
  const { orders, loading, error }  = useSelector((state) => state.orderListOrder);

  // Function to filter orders based on search query
  const filteredOrders = orders ? orders.filter(order =>
    order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    // Add more fields as needed for search
  ) : null;

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Order List', 14, 10);

    doc.autoTable({
      head: [['ID', 'User', 'Date', 'Total', 'Paid', 'Delivered']],
      body: filteredOrders.map((order) => [
        order.Ord_ID,
        order.user.name,
        order.createdAt.substring(0, 10),
        order.totalPrice,
        order.isPaid ? 'Paid' : 'Pending',
        order.isDelivered ? 'Delivered' : 'Pending'
      ]),
    });

    doc.save('order-list.pdf'); // Save the generated PDF
  };

  // Fetch orders on component mount
  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  // Function to handle view receipt action
  const viewReceiptHandler = (orderId) => {
    dispatch(getOrderDetails(orderId));
    navigate(`/admin/ViewReceipt/${orderId}`);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col>
            <div className="row" style={{ marginTop: '10px', marginBottom: '20px' }}>
              <div className="col-sm-6"><h3>Orders List</h3></div>
              <div className="col-sm-4">
                <Form inline className="mb-3">
                  <FormControl
                    type="text"
                    placeholder="Search by ID or User..."
                    className="mr-sm-2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Form>
              </div>
              <div className="col-sm-2">
                <Button onClick={generatePDF} variant="success">
                  Download PDF
                </Button>
              </div>
            </div>
            
            <Table striped rounded hover className="table-sm">
              {/* Table Header */}
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th>Bank Receipt Details</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {filteredOrders ? (
                  filteredOrders.map((order,index) => (
                    <tr key={index}>
                      <td>{order.Ord_ID}</td>
                      <td>{order.user.name}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>Rs. {order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          <i className="fas fa-check" style={{ color: "green" }}></i>
                        ) : (
                          <i className="fas fa-times" style={{ color: "red" }}></i>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          <i className="fas fa-check" style={{ color: "green" }}></i>
                        ) : (
                          <i className="fas fa-times" style={{ color: "red" }}></i>
                        )}
                      </td>
                      <td>
                        {order.bankDetails ? (
                          <Button className="btn-sm" variant="info" onClick={() => viewReceiptHandler(order._id)}>
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
                  ))
                ) : null}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </>
  );
};

export default OrderListScreen;
