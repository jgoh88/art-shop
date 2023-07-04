import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Form, Container, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useUserHook } from "../../hooks/useUserHook"
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'


function UpdateModalComponent (props) {
    
    const [modal, setModal] = useState(false);
    const toggle = ()=> setModal(!modal);

const navigate = useNavigate()
    const userHook = useUserHook()
    const [formInput, setFormInput] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
    })
    const [errorMessage, setErrorMessage] = useState('')
    const cloudinaryRef = useRef()
    const widgetRef = useRef()

    useEffect(() => {
      if (userHook.user) {
          navigate('/myart')
      }
  }, [userHook.user])

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
        cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
    }, (err, result) => {
        if (result.event === 'success') {
            setFormInput((prevState) => ({...prevState, profilePic: result.info.secure_url,}))
        }   
    })
}, [])


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
  setErrorMessage('')
  try {
      const res = await axios.post('http://localhost:4000/user', formInput)
      if (res.status === 200) {
          userHook.storeUser(res.data.user)
          navigate('/myart')
      }
  } catch (err) {
      if (err.response.status === 400 && err.response.data.message === 'Username or email is duplicate') {
          setErrorMessage('Username or email is already taken')
      }
  }
}

    return (
     <div>
        <Button onClick={toggle}>
          Update
        </Button>
        <Modal isOpen={modal} toggle={toggle} {...props}>
          <ModalHeader toggle={toggle}>{props.title}</ModalHeader>
          <ModalBody>
           <Container>
           <Row className="mt-3 text-center">
                <Col>
                    <h1>Update</h1>
                </Col>
            </Row>
          <Row className="mt-3 justify-content-center">
                <Col xs={6} className="text-center justify-content-center">
                    <Form className="border border-dark-subtle pt-5 pb-4 ps-4 pe-4" onSubmit={onFormSubmitHandler}>
                        <div className="d-flex justify-content-center mb-3">
                        </div>
                        {errorMessage !== '' 
                        ? <div>
                            <p className="text-danger fw-bold">{errorMessage}</p>
                        </div>
                        : ''}
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Control type="text" placeholder="Name" name="Name" required onChange={onFormChangeHandler}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Control type="text" placeholder="Description" name="Description" required onChange={onFormChangeHandler}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPrice">
                            <Form.Control type="text" placeholder="Price" name="Price" required onChange={onFormChangeHandler}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formQuantity">
                            <Form.Control type="text" placeholder="Quantity" name="Quantity" required onChange={onFormChangeHandler}/>
                        </Form.Group>
                        <div className="mb-3 d-flex justify-content-start">
                            <div className="me-3">
                                <Button variant="secondary" type="button" onClick={() => widgetRef.current.open()}>Upload Art Image</Button>
                            </div>
                            
                            {formInput?.artImage && <div>
                                    <img src={formInput.artImage} style={{width: 200, height: 200}} alt={'Art Img'}/>
                                </div>}
                        </div>
                        <Button variant="primary" type="submit" className="fw-medium mb-3">
                            Update
                        </Button>
                    </Form>
                </Col>
            </Row>
            </Container>
          </ModalBody>
          <ModalFooter>

          </ModalFooter>
        </Modal>
      </div>
    );
  }

  export default UpdateModalComponent