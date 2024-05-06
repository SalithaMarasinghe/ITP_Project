import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const VoucherDetails = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vouchers, setVouchers] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [errorDelete, setErrorDelete] = useState(null);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:5000/api/voucheroders"
        );
        console.log("data,d", data);
        setVouchers(data.voucherOrders);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []);

  const generateReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Voucher Details", 14, 9);

    doc.autoTable({
      head: [
        [
          "User ID",
          "User Name",
          "Value",
          "Code",
          "Expiration Date",
          "Delivery Details",
        ],
      ],
      body: vouchers.map((voucher) => [
        voucher.userID,
        voucher.userName,
        voucher.value,
        voucher.code,
        voucher.expirationDate,
        voucher.deliveryDetails,
      ]),
    });
    doc.save("voucherOrders.pdf");
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h3>Voucher Details</h3>
        </Col>
        <Col>
          <Button onClick={generateReport} variant="success">
            Generate Report
          </Button>
        </Col>
      </Row>
      {error && <Message variant="danger">{error}</Message>}
      {loading ? (
        <Loading />
      ) : (
        <Row>
          <Col>
            <Table striped rounded hover className="table-sm">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>User Name</th>
                  <th>Value</th>
                  <th>Code</th>
                  <th>Expiration Date</th>
                  <th>Delivery Details</th>
                </tr>
              </thead>
              <tbody>
                {vouchers.map((voucher, index) => (
                  <tr key={index}>
                    <td>{voucher._id}</td>
                    <td>{voucher.userID}</td>
                    <td>{voucher.value}</td>
                    <td>{voucher.code}</td>
                    <td>{voucher.expirationDate}</td>
                    <td>{voucher.deliveryDetails}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
      {/* <Paginate page={page} pages={pages} isAdmin={true} /> */}
    </>
  );
};

export default VoucherDetails;