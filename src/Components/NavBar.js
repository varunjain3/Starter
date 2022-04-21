import {Navbar, Container, Nav, Form, FormControl, Button} from 'react-bootstrap';

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">LNCRNA Database</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/stats">Stats</Nav.Link>
            <Nav.Link href="/qgrs">QGRS</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;