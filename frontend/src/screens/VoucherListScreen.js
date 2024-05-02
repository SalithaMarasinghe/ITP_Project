import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { listVoucher, deleteVoucher } from "../redux/actions/voucherActions";

const VoucherListScreen = () => {
  

  return (
    <div>
        <h2>SDS</h2>
    </div>
  );
};

export default VoucherListScreen;
