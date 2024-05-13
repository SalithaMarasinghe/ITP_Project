import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table, Button, Form, FormControl } from "react-bootstrap";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { listUsers } from "../redux/actions/userActions";
import jsPDF from "jspdf"; // Import jsPDF
import "jspdf-autotable"; // Import the AutoTable plugin for jsPDF
import CartAPI from "../api/CartAPI";

const UserCartsScreen = () => {
  const dispatch = useDispatch();

  const [carts, setCarts] = useState([]); // State for cart items

  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const usersList = useSelector((state) => state.usersList);
  const { users, loading, error } = usersList;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, successDelete]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query
  };

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // get cart by user id
  React.useEffect(() => {
    const fetchCart = async () => {
      const response = await CartAPI.getCarts();

      if (response.data.success) {
        setCarts(response.data.carts);
      } else {
        console.log(response.data.message);
      }
    };
    fetchCart();
  }, []);

  // download cart items as pdf
  const downloadCartItems = (cart) => {
    const doc = new jsPDF(); // Create a new jsPDF instance
    doc.text("Cart Items", 14, 16); // Add a title to the PDF

    // Add an AutoTable with the user data
    doc.autoTable({
      head: [["Name", "Quantity", "Price"]], // Table header
      body: cart.cartItems.map((cartItem) => [
        cartItem.name,
        cartItem.qty,
        cartItem.price,
      ]), // Table rows
      margin: { top: 20 },
    });

    // calculate total price
    let totalPrice = 0;
    cart.cartItems.forEach((cartItem) => {
      totalPrice += cartItem.qty * cartItem.price;
    });

    // Add total price to the PDF
    doc.text(
      `Total Price: Rs.${totalPrice.toFixed(2)}`,
      14,
      doc.autoTable.previous.finalY + 10
    );

    // Save or display the PDF
    doc.save(`cart-items-${cart.user.name}.pdf`); // Save the generated PDF to a file
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col>
            <h3>User Carts</h3>
            <Form className="mb-3">
              <FormControl
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Form>
            <Table striped hover className="table-sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Admin</th>
                  <th>Item Count</th>
                  <th>Cart Items</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.filter(user => carts.some(cart => cart.user._id === user._id)).map((user) => {
                  const userCarts = carts.filter((cart) => cart.user._id === user._id);
                  const itemCount = userCarts.reduce((total, cart) => total + cart.cartItems.length, 0);
                  
                  return (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.isAdmin ? (
                          <i className="fas fa-check" style={{ color: "green" }} />
                        ) : (
                          <i className="fas fa-times" style={{ color: "red" }} />
                        )}
                      </td>
                      <td>{itemCount}</td>
                      <td>
                        <ul>
                          {userCarts.map((cart) => (
                            cart.cartItems.map((cartItem) => (
                              <li key={cartItem.product}>
                                {cartItem.name} - {cartItem.qty}
                              </li>
                            ))
                          ))}
                        </ul>
                      </td>
                      <td>
                        {/* if cartItems in cart is empty, disable the download button */}
                          {carts.map((cart) => {
                            if (cart.user._id === user._id) {
                              return (
                                <Button
                                  variant="info"
                                  size="sm"
                                  onClick={() => downloadCartItems(cart)}
                                  disabled={cart.cartItems.length === 0}
                                >
                                  <i className="fas fa-download" />
                                </Button>
                              );
                            }
                          })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </Table>
          </Col>
        </Row>
      )}
    </>
  );
};

export default UserCartsScreen;
