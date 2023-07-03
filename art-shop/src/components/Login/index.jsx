import { useState } from "react"
import axios from "axios"
import { Form, Button, Container, Row, Col } from "react-bootstrap"
import { useNavigate, Link } from "react-router-dom"

export default function Login() {

    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    const [formInput, setFormInput] = useState({
        username: '',
        password: '',
    })

    function onFormChangeHandler(e) {
        setFormInput((prevState) => ({...prevState, [e.target.name]: e.target.value,}))
    }

    async function onFormSubmitHandler(e) {
        e.preventDefault()
        setErrorMessage('')
        try {
            const res = await axios.post('http://localhost:4000/user/login', formInput)
            if (res.status === 200) {
                sessionStorage.setItem('token', res.data.token)
                sessionStorage.setItem('user', JSON.stringify(res.data.user))
                navigate('/')
            }
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'User and/or password is incorrect!') {
                setErrorMessage('User and/or password is incorrect!')
            }
        }
    }

    return (
        <Container>
            <Row className="mt-3 text-center">
                <Col>
                    <h1>Login to account</h1>
                </Col>
            </Row>
            <Row className="mt-3 justify-content-center">
                <Col xs={6} className="text-center justify-content-center">
                    <Form className="border border-dark-subtle pt-5 pb-4 ps-4 pe-4" onSubmit={onFormSubmitHandler}>
                        {errorMessage !== '' 
                        ? <div>
                            <p className="text-danger fw-bold">{errorMessage}</p>
                        </div>
                        : ''}
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Control type="text" placeholder="Username" name="username" required onChange={onFormChangeHandler}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" name="password" required onChange={onFormChangeHandler}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="fw-medium mb-3">
                            Log in
                        </Button>
                        <p>Don't have an account? <Link to={'/signup'}>Sign up</Link></p>
                    </Form>

                </Col>
            </Row>
        </Container>
    )
}