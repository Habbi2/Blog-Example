import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

const NavbarS = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand className="logo" href="#">Navbar scroll</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="mr-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <Nav.Link href="#action1">Home</Nav.Link>
          <Nav.Link href="/form">Posts</Nav.Link>
        </Nav>
        <Form className="d-flex" id="search">
          <FormControl
            type="search"
            placeholder="Search"
            className="searchi"
            aria-label="Search"
          />
          <Button className="searchb" variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarS;
