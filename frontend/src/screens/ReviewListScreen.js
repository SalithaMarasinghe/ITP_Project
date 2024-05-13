import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import {
  listProduct,
  deleteProduct,
  deleteProductReview,
} from "../redux/actions/productActions";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";

const ReviewListScreen = () => {
  let params = useParams();
  const pageNumber = params.pageNumber;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { products, loading, error, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);

  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    dispatch(listProduct(searchKeyword, pageNumber));
  }, [dispatch, successDelete, pageNumber, searchKeyword]);

  const deleteProductHandler = (reviewId, productId) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProductReview(productId, reviewId));
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const genearatePdf = async () => {
    try {
      let reviews = [];
      for (let product of products) {
        for (let review of product.reviews) {
          reviews.push({ ...review, productName: product.name }); // Assign productName from product
        }
      }

      const doc = new jsPDF();

      // Set up the table headers
      const headers = [
        ["Product Name", "User Name", "Rating", "Comment", "Date"],
      ];

      // Set up an empty array to hold the data rows
      const data = [];

      // Iterate through the reviews and populate the data array
      reviews.forEach((review) => {
        const rowData = [
          review.productName, // Access productName property
          review.name,
          review.rating.toString(),
          review.comment,
          new Date(review.createdAt).toLocaleDateString(),
        ];
        data.push(rowData);
      });

      // Set up the table properties
      const tableProps = {
        startY: 20, // Start position Y
        head: headers, // Headers
        body: data, // Data
        autoSize: true, // Auto size the columns
      };

      // Add the table to the PDF document
      doc.autoTable(tableProps);

      // Save the PDF
      doc.save("reviews.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h3>Products List</h3>
        </Col>
        <Col className="text-end">
          <Button
            className="btn btn-sm"
            variant="danger"
            onClick={genearatePdf}
          >
            <i className="fas fa-print"></i>
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Control
            type="text"
            placeholder="Search Reviews..."
            value={searchKeyword}
            onChange={handleSearch}
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
              <Table striped rounded hover className="table-sm">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>User Name</th>
                    <th>Rating</th>
                    <th>Comment</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) =>
                    product.reviews.map((review, reviewIndex) => (
                      <tr key={review._id}>
                        <td>{product.name}</td>
                        <td>{review.name}</td>
                        <td>
                          {review.rating === 1
                            ? "Poor"
                            : review.rating === 2
                            ? "Fair"
                            : review.rating === 3
                            ? "Good"
                            : review.rating === 4
                            ? "Very Good"
                            : review.rating === 5
                            ? "Perfect"
                            : review.rating}
                        </td>
                        <td>{review.comment}</td>
                        <td>
                          {new Date(review.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <Button
                            style={{ marginLeft: 4 }}
                            className="btn btn-sm"
                            variant="danger"
                            onClick={() =>
                              deleteProductHandler(review._id, product._id)
                            }
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
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

export default ReviewListScreen;
