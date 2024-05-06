import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import axios from "axios";
import { addToCart } from "../redux/actions/cartActions";
import { useNavigate } from "react-router-dom";

const Vouchers = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vouchers, setVouchers] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [errorDelete, setErrorDelete] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  function handleClick(event, type, value) {
    const userInfoFromStorage = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    navigate(`/shipping/voucher/${type}/1/${value}/${userInfoFromStorage}`);

    // navigate(`/shipping/voucher/`, {
    //   id: type,
    //   value: value,
    //   username: username,
    //   qty: 1,
    // });
  }

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <center>
            <h3>Gift Vouchers</h3>
          </center>
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
                  <th>Type</th>
                  <th>Value</th>
                  <th>Expiration Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {vouchers.map((voucher, index) => (
                  <tr key={index}>
                    <td>{voucher.type}</td>
                    <td>{voucher.value}</td>
                    <td>{voucher.expirationDate}</td>
                    <td>
                      <Button
                        onClick={(e) =>
                          handleClick(e, voucher._id, voucher.value)
                        }
                        variant="success"
                      >
                        Buy Voucher
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

export default Vouchers;
