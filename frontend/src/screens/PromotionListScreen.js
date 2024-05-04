import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Row, Col, Table } from 'react-bootstrap';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { listPromotions, deletePromotion } from '../redux/actions/promotionActions';
import { listProduct } from '../redux/actions/productActions';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PromotionListScreen = () => {
  const dispatch = useDispatch();

  const promotionList = useSelector((state) => state.promotionList);
  const { loading, error, promotions } = promotionList;

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  useEffect(() => {
    dispatch(listPromotions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this promotion?')) {
      dispatch(deletePromotion(id));
    }
  };

  const getProductName = (productId) => {
    const product = products.find((product) => product._id === productId);
    return product ? product.name : '';
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Promotion List', 14, 16);

    doc.autoTable({
      head: [['Name', 'Type', 'Value', 'Valid Period', 'Related Product']],
      body: promotions.map((promotion) => [
        promotion.name,
        promotion.type,
        promotion.value,
        promotion.validPeriod,
        getProductName(promotion.relatedProduct),
      ]),
    });

    doc.save('promotion-list.pdf'); // Save the generated PDF
  };

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Promotions</h1>
        </Col>
        <Col className="text-right">
          <Button onClick={generatePDF} variant="success">
            Download PDF
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
                <th>Type</th>
                <th>Value</th>
                <th>Valid Period</th>
                <th>Related Product</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {promotions.map((promotion) => (
                <tr key={promotion._id}>
                  <td>{promotion.name}</td>
                  <td>{promotion.type}</td>
                  <td>{promotion.value}</td>
                  <td>{promotion.validPeriod}</td>
                  <td>{getProductName(promotion.relatedProduct)}</td>
                  <td>
                    <Link to={`/admin/edit-promotion/${promotion._id}`} className="btn btn-primary mr-2">
                      Edit
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteHandler(promotion._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="text-right mt-3">
            <Link to="/admin/create-promotion" className="btn btn-primary">
              Create Promotion
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionListScreen;
