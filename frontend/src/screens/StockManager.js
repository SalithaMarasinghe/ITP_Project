import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table, Button, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { generatePDF } from "../components/generateReport";
import { listProduct, deleteProduct } from "../redux/actions/productActions";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StockManager = () => {
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

    useEffect(() => {
        dispatch(listProduct("", pageNumber));
    }, [dispatch, successDelete, pageNumber]);

    const deleteProductHandler = (id) => {
        if (window.confirm("Are u sure ?")) {
            dispatch(deleteProduct(id));
        }
    };

    const informSupplierHandler = async (product) => {
        try {
            const response = await axios.post('http://localhost:4002/api/email/send-message', {
                recipientPhoneNumber: '+94757737529',
                productName: product.name
            });
            console.log(response.data);
            toast.success('Message sent successfully');
        } catch (error) {
            console.error("Error sending SMS notification:", error);
            toast.error('Failed to send message');
        }
    };



    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h3>Low Stock Items</h3>
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
                            <Table striped rounded="true" hover className="table-sm">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Category</th>
                                    <th>Brand</th>
                                    <th>Quantity</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {products.map((product, index) => {
                                    if (product.countInStock < 10) {
                                        return (
                                            <tr key={index}>
                                                <td>{product._id}</td>
                                                <td>{product.name}</td>
                                                <td><Image src={product.image} alt={product.name} width={50} height={80} /></td>
                                                <td>{product.category}</td>
                                                <td>{product.brand}</td>
                                                <td>{product.countInStock}</td>
                                                <td>
                                                    <Button
                                                        className="btn btn-sm"
                                                        style={{backgroundColor:'red', color:'white'}}
                                                        onClick={() => informSupplierHandler(product)}
                                                    >
                                                        Inform Supplier
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    } else {
                                        return null;
                                    }
                                })}
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

export default StockManager;
