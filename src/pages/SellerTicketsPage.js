import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios_api from "../api/api.js"
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap"
import TicketCard from "../components/TicketCard.js"

export default function SellerTicketsPage() {
    const { sellerId } = useParams()
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchSellerTickets = async () => {
            try {
                const response = await axios_api.get(`/api/tickets?sellerId=${sellerId}`)
                setTickets(response.data)
            } catch (err) {
                setError("Errore durante il caricamento dei biglietti del venditore.")
            } finally {
                setLoading(false)
            }
        }
        fetchSellerTickets()
    }, [sellerId])

    return (
        <Container className="my-5">
            <h2 className="mb-4">{tickets[0]?.venditore?.name ? `Biglietti di ${tickets[0].venditore.name}` : "Biglietti del venditore"}</h2> {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
                {tickets.map(ticket => (
                    <Col key={ticket.id} md={6} lg={4}>
                        <TicketCard ticket={ticket} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
