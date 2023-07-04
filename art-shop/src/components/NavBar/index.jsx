import { Container, Navbar, Nav, NavDropdown, Form, Button } from "react-bootstrap"
import { useUserHook } from "../../hooks/useUserHook"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchIcon from '@mui/icons-material/Search'

export default function NavBar() {
    const userHook = useUserHook()

    function onSearchSubmitHandler() {
        alert('Search function')
    }

    return (
        <Navbar expand="lg" bg={"dark"} variant={'dark'}>
        <Container>
          <Navbar.Brand href="/" className="fw-medium">ArtShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              {/* <Nav.Link href="#link">Link</Nav.Link> */}
            </Nav>
            <Nav>
                <div className="d-flex align-items-center">
                    <Form className="d-flex" style={{height: 30}} onSubmit={onSearchSubmitHandler}>
                        <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        />
                        <Button variant="dark" className="d-flex align-items-center ps-0" type="submit"><SearchIcon /></Button>
                    </Form>
                </div>
                {!userHook.user 
                ? <>
                    <Nav.Link href="/signup">Sign up</Nav.Link>
                    <Nav.Link href="/login">Log in</Nav.Link>
                </>
                : <>
                    <NavDropdown title={`Logged in as ${userHook.user.fullName}`}>
                        <NavDropdown.Item href="/cart">Cart</NavDropdown.Item>
                        <NavDropdown.Item href="/myart">My Art</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href={`/logout/${userHook.user.token}`}>Log out</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/cart"><ShoppingCartIcon /> <span style={{fontSize: 12}}>0</span></Nav.Link>
                </>
                }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}