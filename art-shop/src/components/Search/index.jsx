import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {Col, Row, Container} from "react-bootstrap";
import axios from "axios"
import Artworks from "../Artworks";

export default function Search() {
    const location = useLocation()
    const navigate = useNavigate()
    const searchInput = location?.state?.searchInput
    const [searchTerm, setSearchTerm] = useState('')
    const [artworks,setArtworks]= useState([])

    useEffect(() => {
        if (!searchInput) {
            return
        }
        setSearchTerm(searchInput)
        axios.get (`http://localhost:4000/search/${searchInput}`).then (res=>{
            setArtworks (res.data.artwork)
        })
        navigate(location.pathname, {})
    }, [searchInput])

    return (
        <Container>
            <Row className="mt-3 text-center">
                <Col>
                <h1>Search results for {searchTerm}</h1>
                </Col>
            </Row>
            <Row className="mt-3">
                {artworks.length === 0 
                ? <Col className="text-center fw-medium fs-4 mt-5">No matching results</Col>
                : <Artworks artworks={artworks} />
                }
            </Row>  
        </Container>
    );
}