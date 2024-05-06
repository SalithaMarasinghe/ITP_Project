import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Row, Col, Table, Form, FormControl } from 'react-bootstrap';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { deleteFAQ, getFAQs } from '../redux/actions/FAQActions'; 
import { listFAQs } from '../redux/actions/FAQActions';

const FAQListScreen = () => {
  const dispatch = useDispatch();

  const faqList = useSelector((state) => state.FAQList);

  const { loading, error, faqs } = faqList;

  useEffect(() => {
    dispatch(listFAQs());
  }, [dispatch]);

  //const { loading = true, error = null, faqs = [] } = faqList;

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      dispatch(deleteFAQ(id)).then(() => {
        dispatch(listFAQs());
      });
    }
  };

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>FAQs</h1>
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
                <th>Question</th>
                <th>Answer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {faqs && faqs.map((faq) => (
                <tr key={faq._id}>
                  <td>{faq.question}</td>
                  <td>{faq.answer}</td>
                  <td>
                    <Link to={`/admin/edit-faq/${faq._id}`} className="btn btn-primary mr-2">
                      Edit
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteHandler(faq._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="text-right mt-3">
            <Link to="/admin/create-faq" className="btn btn-primary">
              Create FAQ
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQListScreen;
