import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table, Button, Form, FormControl } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { listUsers, deleteUser } from "../redux/actions/userActions";
import jsPDF from "jspdf"; // Import jsPDF
import "jspdf-autotable"; // Import the AutoTable plugin for jsPDF

const UserListScreen = () => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const usersList = useSelector((state) => state.usersList);
  const { users, loading, error } = usersList;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, successDelete]);

  const deleteUserHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(id));
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query
  };

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generatePDF = () => {
    const doc = new jsPDF(); // Create a new jsPDF instance
    const currentDate = new Date(); // Get the current date and time
    const formattedDate = currentDate.toLocaleString(); // Format the date and time
    const searchKeyword = searchQuery ? searchQuery : "all"; // Determine search keyword or "all"

    doc.setFontSize(20); // Set font size for the title
    doc.text("User Report", 14, 10);

    doc.setFontSize(12); // Set font size back to normal
    doc.text("Black Premium", 14, 20); // Add the company name
    doc.text(`Date: ${formattedDate}`, 14, 30); // Add the current date and time
    doc.text(`Search Keyword: ${searchKeyword}`, 14, 40); // Add the search keyword or "all"
    doc.text(`Total Users: ${users.length}`, 14, 50); // Add the total count of users
    doc.text(`Filtered By Search Users: ${filteredUsers.length}`, 14, 60); // Add the count of filtered users

    // Add an AutoTable with the user data
    doc.autoTable({
        startY: 70, // Start after the text
        head: [["ID", "Name", "Email", "Admin"]], // Table header
        body: filteredUsers.map((user) => [
            user._id,
            user.name,
            user.email,
            user.isAdmin ? "Yes" : "No",
        ]), // Table rows
    });

    // Save or display the PDF
    doc.save("filtered-user-details.pdf"); // Save the generated PDF to a file
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
            <h3>Users List</h3>
            <Form className="mb-3">
              <FormControl
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Form>
            <Button onClick={generatePDF} className="mb-3">
              Generate PDF
            </Button>
            <Table striped hover className="table-sm">
              <thead>
                <tr>
                  {/* <th>ID</th> */}
                  <th>Name</th>
                  <th>Email</th>
                  <th>Admin</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    {/* <td>{user._id}</td> */}
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.isAdmin ? (
                        <i
                          className="fas fa-check"
                          style={{ color: "green" }}
                        />
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        />
                      )}
                    </td>
                    <td>
                      <LinkContainer
                        to={`/admin/users/edit/${user._id}`}
                      >
                        <Button variant="primary" size="sm">
                          <i className="fas fa-edit" />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteUserHandler(user._id)}
                      >
                        <i className="fas fa-trash" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </>
  );
};

export default UserListScreen;
