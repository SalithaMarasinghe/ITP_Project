import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { Row, Col, Form, FormControl, Button } from 'react-bootstrap';

function Help() {
  const [faqs, setFaqs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/api/faqs')
      .then(response => {
        setFaqs(response.data);
      })
      .catch(error => {
        console.error('Error fetching FAQs:', error);
      });
  }, []);

  const handleInquiryClick = () => {
    navigate('/inquiryForm'); 
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="customer-support">
      <div className="faq">
        <Row className="align-items-center">
          <Col>
            <h1>Frequently Asked Questions</h1>
          </Col>
          <Col className="text-right">
            <Form inline className="faqsearch">
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form>
          </Col>
          <Col>
            <Button variant="primary" className="inquirybtn" onClick={handleInquiryClick}>
              Inquiry
            </Button>
          </Col>
        </Row>
        <div className="faq-list">
          {filteredFaqs.map((faq, index) => (
            <div key={index} className="faq-box">
              <div className="faq-question">{faq.question}</div>
              <div className="faq-answer">{faq.answer}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

function Question({ question, answer }) {
  return (
    <div className="question-tile">
      <h3>{question}</h3>
      <p>{answer}</p>
    </div>
  );
}

export default Help;