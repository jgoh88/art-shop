import { useState, useEffect } from "react"
import artShopBackendAxios from "../../configs/artShopBackendConfig"
import { useNavigate } from "react-router-dom"
import { useUserHook } from "../../hooks/useUserHook"

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function Signin() {
    const navigate = useNavigate()
    const userHook = useUserHook()
    const [errorMessage, setErrorMessage] = useState({})
    const [formInput, setFormInput] = useState({
        username: '',
        password: '',
    })
    const defaultTheme = createTheme();

    useEffect(() => {
        if (userHook.user) {
            navigate('/')
        }
    }, [userHook.user])

    function onFormChangeHandler(e) {
        setFormInput((prevState) => ({...prevState, [e.target.name]: e.target.value}))
    }

    async function onFormSubmitHandler(e) {
        e.preventDefault()
        setErrorMessage({})
        if (formInput.username === '') {
            setErrorMessage(prevState => ({...prevState, username: 'Username is required'}))
        }
        if (formInput.password === '') {
            setErrorMessage(prevState => ({...prevState, password: 'Password is required'}))
        }
        try {
            const res = await artShopBackendAxios.post('/user/login', formInput)
            if (res.status === 200) {
                userHook.storeUser(res.data.user)
                navigate('/')
            }
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'User and/or password is incorrect!') {
                setErrorMessage(prevState => ({...prevState, username: 'Username and/or password is incorrect!', password: 'Username and/or password is incorrect!'}))
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
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign in
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign up"}
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