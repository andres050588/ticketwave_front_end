import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios_api from "../api/api.js"
import { Container, Row, Col, Spinner, Alert, Card } from "react-bootstrap"
import TicketCard from "../components/TicketCard.js"

export default function SellerTicketsPage() {
    const { userId } = useParams()
    const [tickets, setTickets] = useState([])
    const [seller, setSeller] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchSellerAndTickets = async () => {
            try {
                const resTickets = await axios_api.get(`/tickets/seller/${userId}`)
                setTickets(resTickets.data)

                // Estrai venditore dal primo ticket (se esiste)
                if (resTickets.data.length > 0) {
                    setSeller(resTickets.data[0].venditore)
                }
            } catch (err) {
                setError("Errore nel caricamento dei biglietti o del venditore")
            } finally {
                setLoading(false)
            }
        }

        fetchSellerAndTickets()
    }, [userId])

    if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />
    if (error) return <Alert variant="danger">{error}</Alert>

    return (
        <Container className="mt-4">
            {seller && (
                <Card className="mb-4">
                    <Card.Body>
                        <Card.Title>Venditore: {seller.name}</Card.Title>
                        <Card.Text>Email: {seller.email}</Card.Text>
                    </Card.Body>
                </Card>
            )}

            <h4>Biglietti pubblicati da questo utente:</h4>
            {Array.isArray(tickets) && tickets.length > 0 ? (
                <Row>
                    {tickets.map(ticket => (
                        <Col md={4} key={ticket.id} className="mb-4">
                            <TicketCard ticket={ticket} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <Alert variant="info">Nessun biglietto pubblicato da questo utente.</Alert>
            )}
        </Container>
    )
}
