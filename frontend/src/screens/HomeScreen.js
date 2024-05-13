import React, { useState, useEffect } from "react";
import { listProduct } from "../redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Product from "../components/Product";
import { Row, Col, Button } from "react-bootstrap";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Meta from "../components/Meta";
import Paginate from "../components/Paginate";

const HomeScreen = () => {
    const [category, setCategory] = useState("");
    let params = useParams();
    const keyword = params.keyword || "";
    const pageNumber = params.pageNumber || 1;
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { products, loading, error, page, pages } = productList;

    useEffect(() => {
        dispatch(listProduct(keyword || category, pageNumber));
    }, [dispatch, keyword, category, pageNumber]);

    const handleCategoryClick = (cat) => {
        setCategory(cat);
    };

    return (
        <>
            <Meta title="Black | Home" />
            {/* {!keyword && <ProductCarousel />} */}
            <h3>Categories</h3>
            <div className="category-buttons">
                {["Shirt", "Trouser", "Hoodie", "Sneaker", "Belt"].map((cat) => (
                    <Button
                        key={cat}
                        onClick={() => handleCategoryClick(cat)}
                        className={`category-btn ${category === cat ? "active" : ""}`}
                    >
                        {cat}
                    </Button>
                ))}
            </div>
            <h3>Latest Products</h3>
            <Row>
                {loading ? (
                    <Loading />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))
                )}
            </Row>
            <Paginate page={page} pages={pages} keyword={keyword || category} />
        </>
    );
};

export default HomeScreen;
