import { useState } from "react";
import artShopBackendAxios from "../../configs/artShopBackendConfig"
import { Form, Row, Col } from "react-bootstrap"
import { useUserHook } from "../../hooks/useUserHook"
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'


export default function MyArtRemoveModal({artwork, setArtworkUpdated}) {
    const userHook = useUserHook()
    const [errorMessage, setErrorMessage] = useState('')

    const [modal, setModal] = useState(false);
    const toggle = ()=> setModal(!modal);

    async function remove(e) {
        e.preventDefault()
        setErrorMessage('')
        try {
            const res = await artShopBackendAxios.delete('/myart', {
                data: {id: artwork._id},
                headers: {
                    authorization: `Bearer ${userHook.user.token}`
                }
            })
            if (res.status === 200) {
                setArtworkUpdated (true)
                toggle()      
            }
        } catch (err) {
            console.log(err)
            if (err.response.status === 400 && err.response.data.message === 'Failed to update') {
                setErrorMessage('Failed to update')
            }
        }
    }

    return (
        <>
            <Button onClick={toggle}>
                Remove
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Remove {artwork.name}</ModalHeader>
                <ModalBody>
                    <Row className="mt-3 justify-content-center">
                        <Col className="text-center justify-content-center">
                            <Form className="border border-dark-subtle pt-3 pb-3 ps-4 pe-4" onSubmit={remove}>
                                <Row><p>Are you sure you want to remove <span className="fw-medium">{artwork.name}</span> (ID: {artwork._id})?</p></Row>
                                <Button variant="primary" type="submit" className="fw-medium mb-3">
                                    Remove
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