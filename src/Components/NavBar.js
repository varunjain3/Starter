import {Navbar, Container, Nav} from 'react-bootstrap';

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">LNCRNA Database</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/qgrs">QGRS Mapper</Nav.Link>
            <Nav.Link href="/g4hunter">G4Hunter</Nav.Link>
            <Nav.Link href="/lnccancerdg">LncCancer Database</Nav.Link>
            <Nav.Link href="/qgrsdg">QGRS Database</Nav.Link>
            <Nav.Link href='/querytool'>Advanced QueryTool</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;