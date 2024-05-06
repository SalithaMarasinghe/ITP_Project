import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import axios from "axios";

const VoucherListScreen = () => {
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
        const { data } = await axios.get("http://localhost:5000/api/vouchers");
        console.log("data,d", data); // Add this line to see the structure of the data
        setVouchers(data.vouchers); // Assuming your API returns an array of vouchers
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []);

  const deleteVoucherHandler = async (voucherId) => {
    try {
      setLoadingDelete(true);
      await axios.delete(`http://localhost:5000/api/vouchers/${voucherId}`);
      setVouchers(vouchers.filter((voucher) => voucher._id !== voucherId));
      setLoadingDelete(false);
    } catch (error) {
      setErrorDelete(error.message);
      setLoadingDelete(false);
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h3>Voucher List</h3>
        </Col>
        <Col className="text-end">
          <LinkContainer to="/admin/vouchers/create">
            <Button variant="primary">
              <i className="fas fa-plus"></i> Create Voucher
            </Button>
          </LinkContainer>
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
                  <th>ID</th>
                  <th>Type</th>
                  <th>Value</th>
                  <th>Code</th>
                  <th>Expiration Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {vouchers.map((voucher, index) => (
                  <tr key={index}>
                    <td>{voucher._id}</td>
                    <td>{voucher.type}</td>
                    <td>{voucher.value}</td>
                    <td>{voucher.code}</td>
                    <td>{voucher.expirationDate}</td>
                    <td>
                      <LinkContainer
                        className="ml-1"
                        to={`/admin/vouchers/edit/${voucher._id}`}
                      >
                        <Button className="btn btn-sm" variant="primary">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        className="btn btn-sm"
                        variant="danger"
                        onClick={() => deleteVoucherHandler(voucher._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
      <Paginate page={page} pages={pages} isAdmin={true} />
    </>
  );
};

export default VoucherListScreen;
