import React, { useState, useEffect, useRef } from "react";
import artShopBackendAxios from "../../configs/artShopBackendConfig"
import { Form, Container, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useUserHook } from "../../hooks/useUserHook"
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'


function AddModalComponent (props) {
    
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
            setFormInput((prevState) => ({...prevState, img: result.info.secure_url,}))
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
      const res = await artShopBackendAxios.post('/myart', formInput, {
        headers: {
            authorization: `Bearer ${userHook.user.token}`
        }
    } )
      if (res.status === 200) {
          navigate('/myart')
          props.setupdated (true)
          toggle()
      }
  } catch (err) {
    console.log(err);
      if (err.response.status === 400 && err.response.data.message === 'Failed to add new art') {
          setErrorMessage('Failed to add new art')
      }
  }
}


    return (
      <div>
        <Button onClick={toggle}>
          Add New Art
        </Button>
        <Modal isOpen={modal} toggle={toggle} {...props}>
          <ModalHeader toggle={toggle}>{props.title}</ModalHeader>
          <ModalBody>
           <Container>
           <Row className="mt-3 text-center">
                <Col>
                    <h1>Add New Art</h1>
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
                            <Form.Control type="text" placeholder="Name" name="name" required onChange={onFormChangeHandler}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Control type="text" placeholder="Description" name="description" required onChange={onFormChangeHandler}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPrice">
                            <Form.Control type="text" placeholder="Price" name="price" required onChange={onFormChangeHandler}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formQuantity">
                            <Form.Control type="text" placeholder="Quantity" name="quantity" required onChange={onFormChangeHandler}/>
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
                            Add New Art
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

  export default AddModalComponent