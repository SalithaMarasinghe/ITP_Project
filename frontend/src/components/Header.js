import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/userActions";
import SearchBox from "./SearchBox";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="primary">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <span style={{ fontSize: "45px" }}>BLACK</span>
              <hr
                style={{
                  borderTop: "2px solid white",
                  width: "135px",
                  margin: "0 auto",
                }}
              />
              <span style={{ fontSize: "10px" }}>FREEDOM OF CREATIVE MIND</span>
            </Navbar.Brand>
          </LinkContainer>
          <SearchBox />

          <Nav className="ml-auto">
            <LinkContainer to="/giftvouchers">
              <Nav.Link>
                <i className="fas fa-tag"></i> Vouchers
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/cart">
              <Nav.Link>
                <i className="fas fa-shopping-cart"></i> Cart
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <>
                <LinkContainer to="/help">
                  <Nav.Link>
                    <i className="fas fa-question-circle"></i> Help
                  </Nav.Link>
                </LinkContainer>
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i> SignIn
                </Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="admin" id="useradmin">
                <LinkContainer to="/admin/users">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/products">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/orders">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/promotions">
                  <NavDropdown.Item>Promotions</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/faq">
                  <NavDropdown.Item>FAQ</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/inquiry">
                  <NavDropdown.Item>Inquiries</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/vouchers">
                  <NavDropdown.Item>Vouchers</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
