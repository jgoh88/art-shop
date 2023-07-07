import { useState, useEffect, useRef } from "react";
import artShopBackendAxios from "../../configs/artShopBackendConfig"
import { Form, Row, Col } from "react-bootstrap"
import { useUserHook } from "../../hooks/useUserHook"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export default function MyArtAddModal({setArtworkUpdated}) {
    const initialFormState = {
        name: '',
        description: '',
        price: '',
        img: '',
    }
    const userHook = useUserHook()
    const [formInput, setFormInput] = useState(initialFormState)
    const [errorMessage, setErrorMessage] = useState('')
    const cloudinaryRef = useRef()
    const widgetRef = useRef()

    const [modal, setModal] = useState(false);
    const toggle = ()=> setModal(!modal);

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
        setFormInput((prevState) => ({...prevState, [e.target.name]: e.target.value,}))
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
                setFormInput(initialFormState)
                setArtworkUpdated(true)
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
        <>
            <Button onClick={toggle}>
                Add new artwork
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add new artwork</ModalHeader>
                <ModalBody>
                <Row className="mt-3 justify-content-center">
                        <Col className="text-center justify-content-center">
                            <Form className="border border-dark-subtle pt-3 pb-3 ps-4 pe-4" onSubmit={onFormSubmitHandler}>
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
                                <div className="mb-3 d-flex justify-content-start">
                                    <div className="me-3">
                                        <Button variant="secondary" type="button" onClick={() => widgetRef.current.open()}>Upload art image</Button>
                                    </div>
                                    {formInput?.img && <div>
                                            <img src={formInput.img} style={{width: 200, height: 200}} alt={'Art Img'}/>
                                        </div>}
                                </div>
                                <Button variant="primary" type="submit" className="fw-medium mb-3">
                                    Add new artwork
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    
                </ModalFooter>
            </Modal>
        </>
    );
}