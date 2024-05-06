import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Row, Col, Table, Form, FormControl } from 'react-bootstrap';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { deleteInquiry } from '../redux/actions/inquiryActions'; 
import { listInquiries } from '../redux/actions/inquiryActions';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const InquiryListScreen = () => {
  const dispatch = useDispatch();

  const inquiryList = useSelector((state) => state.inquiryList);

  const { loading, error, inquiries } = inquiryList;

  useEffect(() => {
    dispatch(listInquiries());
  }, [dispatch]);

  //const { loading = true, error = null, faqs = [] } = faqList;

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      dispatch(deleteInquiry(id));
    }
  };

  const generateReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Inquiries', 14, 9);

    doc.autoTable({
      head: [['Name', 'Phone', 'email', 'Subject', 'message', 'createdAt']],
      body: inquiries.map((inquiry) => [
        inquiry.name,
        inquiry.phone,
        inquiry.email,
        inquiry.subject,
        inquiry.message,
        inquiry.createdAt
      ]),

    });

    doc.save('inquiries.pdf');
  };

  return (
    <div>
      <Row className="inquiryHeader">
        <Col>
          <h1>Inquiries</h1>
        </Col>
        <Col>
          <Button onClick={generateReport} variant="success">
            Generate Report
          </Button>
        </Col>
      </Row>

      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Table striped hover className="table-sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {inquiries && inquiries.map((inquiry) => (
                <tr key={inquiry._id}>
                  <td>{inquiry.name}</td>
                  <td>{inquiry.phone}</td>
                  <td>{inquiry.email}</td>
                  <td>{inquiry.subject}</td>
                  <td>{inquiry.message}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteHandler(inquiry._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        
      )}
    </div>
  );
};

export default InquiryListScreen;
