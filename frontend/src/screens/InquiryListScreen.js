import React, { useEffect, useState } from 'react';
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

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(listInquiries());
  }, [dispatch]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      dispatch(deleteInquiry(id)).then(() => {
        dispatch(listInquiries());
      });
    }
  };

  const filteredInquiries = inquiries.filter(inquiry =>
    inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (inquiry.createdAt && new Date(inquiry.createdAt).toLocaleDateString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const generateReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Inquiries', 14, 9);

    doc.autoTable({
      head: [['Name', 'Phone', 'Email address', 'Subject', 'Message', 'Category', 'Date']],
      body: filteredInquiries.map((inquiry) => [
        inquiry.name,
        inquiry.phone,
        inquiry.email,
        inquiry.subject,
        inquiry.message,
        inquiry.category,
        inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleDateString() : '',
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
        <Col className="text-right">
          <Form inline className="inquirysearch">
            <FormControl
              type="text"
              placeholder="Search Inquiries"
              className="mr-sm-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>
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
                <th>Category</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredInquiries.map((inquiry) => (
                <tr key={inquiry._id}>
                  <td>{inquiry.name}</td>
                  <td>{inquiry.phone}</td>
                  <td><a href={`mailto:${inquiry.email}`} target="_blank">{inquiry.email}</a></td>
                  <td>{inquiry.subject}</td>
                  <td>{inquiry.message}</td>
                  <td>{inquiry.category}</td>
                  <td>{inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleDateString() : ''}</td>
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
