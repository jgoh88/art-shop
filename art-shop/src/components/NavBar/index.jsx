import { Container, Navbar, Nav, NavDropdown, Form, Button } from "react-bootstrap"
import { useUserHook } from "../../hooks/useUserHook"
import { useCartHook } from "../../hooks/useCartHook";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchIcon from '@mui/icons-material/Search'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import Link from '@mui/material/Link';
// import InputBase from '@mui/material/InputBase';
// import SearchIcon from '@mui/icons-material/Search';
// import { styled, alpha } from '@mui/material/styles';
// import { ThemeProvider, createTheme } from '@mui/material/styles';

// const darkTheme = createTheme({
//     palette: {
//     mode: 'dark',
//     primary: {
//         main: '#1976d2',
//     },
//     },
// });
// const Search = styled('div')(({ theme }) => ({
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: alpha(theme.palette.common.white, 0.15),
//     '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//     },
//     marginLeft: 0,
//     width: 'auto',
//     marginRight: theme.spacing(2),
//     [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
    
//     },
// }));
// const SearchIconWrapper = styled('div')(({ theme }) => ({
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
// }));
// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//     color: 'inherit',
//     '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//         width: '12ch',
//         '&:focus': {
//         width: '20ch',
//         },
//     },
//     },
// }));

export default function NavBar() {
    const userHook = useUserHook()
    const cartHook = useCartHook()
    const [searchInput, setSearchInput] = useState('')
    const navigate = useNavigate()

    // const [anchorElNav, setAnchorElNav] = useState(null);
    // const [anchorElUser, setAnchorElUser] = useState(null);

    // function handleOpenUserMenu(e) {
    //     setAnchorElUser(e.currentTarget)
    // }
    
    // function handleCloseUserMenu() {
    //     setAnchorElUser(null)
    // }

    // function onFormChangeHandler(e) {
    //     setSearchInput(e.target.value)
    // }

    function onSearchSubmitHandler(e) {
        e.preventDefault()
        const data = {searchInput: searchInput}
        setSearchInput('')
        navigate('/search', {state: data})
    }

    return (
        <Navbar expand="lg" bg={"dark"} variant={'dark'}>
        <Container>
          <Navbar.Brand href="/" className="fw-medium">ArtShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
            <Nav>
                <div className="d-flex align-items-center">
                    <Form className="d-flex" style={{height: 30}} onSubmit={onSearchSubmitHandler}>
                        <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <Button variant="dark" className="d-flex align-items-center ps-0" type="submit"><SearchIcon /></Button>
                    </Form>
                </div>
                {!userHook.user 
                ? <>
                    <Nav.Link href="/signin">Sign in</Nav.Link>
                    <Nav.Link href="/signup">Sign up</Nav.Link>
                </>
                : <>
                    <NavDropdown title={`Logged in as ${userHook.user.fullName}`}>
                        <NavDropdown.Item href="/cart">Cart</NavDropdown.Item>
                        <NavDropdown.Item href="/myart">My art</NavDropdown.Item>
                        <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href={`/signout/${userHook.user.token}`}>Sign out</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/cart"><ShoppingCartIcon /> <span style={{fontSize: 12}}>{cartHook.cart.length}</span></Nav.Link>
                </>
                }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    // <ThemeProvider theme={darkTheme}>
    //     <AppBar position="sticky">
    //         <Container maxWidth="xl">
    //             <Toolbar disableGutters>
    //             <Typography
    //                 variant="h6"
    //                 noWrap
    //                 component="a"
    //                 href="/"
    //                 sx={{
    //                     mr: 2,
    //                     display: { xs: 'none', md: 'flex' },
    //                     fontWeight: 700,
    //                     letterSpacing: '.3rem',
    //                     color: 'inherit',
    //                     textDecoration: 'none',
    //                 }}
    //             >
    //                 ArtShop
    //             </Typography>
    //             <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
    //                 <IconButton
    //                     size="large"
    //                     aria-label="account of current user"
    //                     aria-controls="menu-appbar"
    //                     aria-haspopup="true"
    //                     color="inherit"
    //                 >
    //                     <MenuIcon />
    //                 </IconButton>
    //                 <Menu
    //                     id="menu-appbar"
    //                     anchorEl={anchorElNav}
    //                     anchorOrigin={{
    //                         vertical: 'bottom',
    //                         horizontal: 'left',
    //                     }}
    //                     keepMounted
    //                     transformOrigin={{
    //                         vertical: 'top',
    //                         horizontal: 'left',
    //                     }}
    //                     open={Boolean(anchorElNav)}
    //                     sx={{
    //                         display: { xs: 'block', md: 'none' },
    //                     }}
    //                 >
    //                     <MenuItem>
    //                         <Typography textAlign="center"><Link href="/" color="inherit" underline="none">Gallery</Link></Typography>
    //                     </MenuItem>
    //                     <MenuItem>
    //                         <Typography textAlign="center"><Link href="/about" color="inherit" underline="none">About</Link></Typography>
    //                     </MenuItem>
    //                 </Menu>
    //             </Box>
    //             <Typography
    //                 variant="h5"
    //                 noWrap
    //                 component="a"
    //                 href="/"
    //                 sx={{
    //                 mr: 2,
    //                 display: { xs: 'flex', md: 'none' },
    //                 flexGrow: 1,
    //                 fontWeight: 700,
    //                 letterSpacing: '.3rem',
    //                 color: 'inherit',
    //                 textDecoration: 'none',
    //                 }}
    //             >
    //                 ArtShop
    //             </Typography>
    //             <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
    //                 <Link href="/" color="inherit" underline="none">
    //                     <Button
    //                         sx={{ my: 2, color: 'white', display: 'block' }}
    //                     >
    //                         Gallery
    //                     </Button>
    //                 </Link>
    //                 <Link href="/about" color="inherit" underline="none">
    //                     <Button
    //                         sx={{ my: 2, color: 'white', display: 'block' }}
    //                     >
    //                         About
    //                     </Button>
    //                 </Link>
    //             </Box>
    //             <Box component="form" noValidate onSubmit={onSearchSubmitHandler}>
    //             <Search>
    //                 <Button
    //                     type="submit"
    //                     color="inherit"
    //                 >                
    //                     {/* <SearchIconWrapper> */}
    //                         <SearchIcon />
    //                     {/* </SearchIconWrapper> */}
    //                 </Button>
    //                 <StyledInputBase 
    //                     onChange={onFormChangeHandler}
    //                     value={searchInput}
    //                     name={'search'}
    //                     placeholder="Search"
    //                     inputProps={{ 'aria-label': 'search' }}
    //                 />
    //             </Search>
    //             </Box>
    //             <Box sx={{ flexGrow: 0 }}>
    //                 <Tooltip title="Open settings">
    //                 <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
    //                     <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
    //                 </IconButton>
    //                 </Tooltip>
    //                 <Menu
    //                     sx={{ mt: '45px' }}
    //                     id="menu-appbar"
    //                     anchorEl={anchorElUser}
    //                     anchorOrigin={{
    //                         vertical: 'top',
    //                         horizontal: 'right',
    //                     }}
    //                     keepMounted
    //                     transformOrigin={{
    //                         vertical: 'top',
    //                         horizontal: 'right',
    //                     }}
    //                     open={Boolean(anchorElUser)}
    //                     onClose={handleCloseUserMenu}
    //                 >
    //                     <MenuItem onClick={handleCloseUserMenu}>
    //                         <Typography textAlign="center">Profile</Typography>
    //                     </MenuItem>
    //                     <MenuItem onClick={handleCloseUserMenu}>
    //                         <Typography textAlign="center">My art</Typography>
    //                     </MenuItem>
    //                     <MenuItem onClick={handleCloseUserMenu}>
    //                         <Typography textAlign="center">Cart</Typography>
    //                     </MenuItem>
    //                     <MenuItem onClick={handleCloseUserMenu}>
    //                         <Typography textAlign="center">Sign out</Typography>
    //                     </MenuItem>
    //                 </Menu>
    //             </Box>
    //             </Toolbar>
    //         </Container>
    //     </AppBar>
    // </ThemeProvider>    
    )
}