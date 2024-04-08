import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const SearchBox = () => {
  let navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} className="search_form">
      <Form.Control
        type="text"
        name="keyword"
        placeholder="Search products ..."
        onChange={(e) => setKeyword(e.target.value)}
        className="search_form"
      ></Form.Control>
      <Button variant="info" type="submit" className="search_btn">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
