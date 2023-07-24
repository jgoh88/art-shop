import { useState, useEffect, useRef } from "react"
import artShopBackendAxios from "../../configs/artShopBackendConfig"
import { useNavigate } from "react-router-dom"
import { useUserHook } from "../../hooks/useUserHook"

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function Signup() {

    const navigate = useNavigate()
    const userHook = useUserHook()
    const [formInput, setFormInput] = useState({
        username: '',
        password: '',
        fullName: '',
        contactNo: '',
        address: '',
        email: '',
        seller: '',
    })
    const [errorMessage, setErrorMessage] = useState({})
    // const cloudinaryRef = useRef()
    // const widgetRef = useRef()
    const defaultTheme = createTheme();

    useEffect(() => {
        if (userHook.user) {
            navigate('/')
        }
    }, [userHook.user])

    // useEffect(() => {
    //     cloudinaryRef.current = window.cloudinary
    //     widgetRef.current = cloudinaryRef.current.createUploadWidget({
    //         cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    //         uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
    //     }, (err, result) => {
    //         if (result.event === 'success') {
    //             setFormInput((prevState) => ({...prevState, profilePic: result.info.secure_url,}))
    //         }   
    //     })
    // }, [])

    function onFormChangeHandler(e) {
        let value
        if (e.target.name === 'seller') {
            value = !!e.target.checked
        } else {
            value = e.target.value
        }
        setFormInput((prevState) => ({...prevState, [e.target.name]: value,}))
    }

    async function onFormSubmitHandler(e) {
        e.preventDefault()
        setErrorMessage({})
        const error = {}
        if (formInput.username === '') {
            error.username = 'Username is required'
        }
        if (formInput.password === '') {
            error.password = 'Password is required'
        }
        if (formInput.password !== '' && formInput.password.length < 6) {
            error.password = 'Passwords need to be at least 6 characters long'
        }
        if (formInput.fullName === '') {
            error.fullName = 'Full name is required'
        }
        if (formInput.contactNo === '') {
            error.contactNo = 'Contact number is required'
        }
        if (!(/\+?6?(?:01[0-46-9]\d{7,8}|0\d{8})/i.test(formInput.contactNo))) {
            error.contactNo = 'Please enter a valid contact number, e.g. 012-12345678'
        }
        if (formInput.address === '') {
            error.address = 'Address is required'
        }
        if (formInput.email === '') {
            error.email = 'Email is required'
        }
        if (formInput.email !== '' && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formInput.email))) {
            error.email = 'Please enter a valid email'
        }
        console.log(error)
        if (Object.keys(error).length !== 0) {
            setErrorMessage(error)
            return
        }
        console.log('executed')
        try {
            const res = await artShopBackendAxios.post('/user', formInput)
            if (res.status === 200) {
                userHook.storeUser(res.data.user)
                navigate('/')
            }
        } catch (err) {
            console.log(err)
            if (err.response.status === 400 && err.response.data.message === 'Username or email is duplicate') {
                if (err.response.data.fields?.username) {
                    setErrorMessage(prevState => ({...prevState, username: 'Username is already taken'}))
                }
                if (err.response.data.fields?.email) {
                    setErrorMessage(prevState => ({...prevState, email: 'An account with the same email already exist'}))
                }
            }
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?painting)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <AppRegistrationIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={onFormSubmitHandler} sx={{ mt: 1, width: '90%'}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            error={errorMessage?.username}
                            helperText={errorMessage?.username && errorMessage?.username}
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={onFormChangeHandler}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            error={errorMessage?.password}
                            helperText={errorMessage?.password && errorMessage?.password}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={onFormChangeHandler}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            error={errorMessage?.fullName}
                            helperText={errorMessage?.fullName && errorMessage?.fullName}
                            name="fullName"
                            label="Full Name"
                            id="fullName"
                            onChange={onFormChangeHandler}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            error={errorMessage?.contactNo}
                            helperText={errorMessage?.contactNo && errorMessage?.contactNo}
                            name="contactNo"
                            label="Contact Number"
                            id="contactNo"
                            onChange={onFormChangeHandler}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            error={errorMessage?.address}
                            helperText={errorMessage?.address && errorMessage?.address}
                            name="address"
                            label="Address"
                            id="address"
                            onChange={onFormChangeHandler}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            error={errorMessage?.email}
                            helperText={errorMessage?.email && errorMessage?.email}
                            name="email"
                            label="Email"
                            id="email"
                            onChange={onFormChangeHandler}
                        />
                        <FormControlLabel
                            control={<Checkbox value="seller" color="primary" name="seller"/>}
                            label="I am an artist and I am interested in selling my art"
                            onChange={onFormChangeHandler}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign up
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/signin" variant="body2">
                                    {"Already have an account? Sign in"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}