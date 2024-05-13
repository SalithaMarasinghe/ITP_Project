import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { generatePDF } from "../components/generateReport";
import { listProduct, deleteProduct } from "../redux/actions/productActions";

const ProductListScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  let params = useParams();
  const pageNumber = params.pageNumber || 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { products, loading, error, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  useEffect(() => {
    dispatch(listProduct("", pageNumber));
  }, [dispatch, successDelete, pageNumber]);

  const deleteProductHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h3>Products List</h3>
        </Col>
        <Col className="text-end">
          <LinkContainer to="/admin/products/create">
            <Button variant="primary">
              <i className="fas fa-plus"></i> Create Product
            </Button>
          </LinkContainer>
          <Button
            onClick={() => generatePDF(filteredProducts)}
            variant="primary"
            style={{ margin: "1rem" }}
          >
            <i className="fas fa-file-pdf"></i> Generate Report
          </Button>
        </Col>
      </Row>
      <Row className="my-3">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search Products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col>
            {loadingDelete ? (
              <Loading />
            ) : (
              <Table striped hover className="table-sm">
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Category</td>
                    <td>Brand</td>
                    <td>Quantity</td>
                    <td>Actions</td>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>{product.countInStock}</td>
                      <td>
                        <LinkContainer
                          className="ml-1"
                          to={`/admin/product/edit/${product._id}`}
                        >
                          <Button className="btn btn-sm" variant="primary">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          className="btn btn-sm"
                          variant="danger"
                          onClick={() => deleteProductHandler(product._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      )}
      <Paginate page={page} pages={pages} isAdmin={true} />
    </>
  );
};

export default ProductListScreen;
