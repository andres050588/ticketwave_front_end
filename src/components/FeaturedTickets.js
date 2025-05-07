import { useEffect, useState } from "react"
import { Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap"
import axios from "axios"
import { Link } from "react-router-dom"

export default function FeaturedTickets() {
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/tickets")
                setTickets(response.data)
            } catch (error) {
                setError("Errore nel caricamento dei biglietti")
            } finally {
                setLoading(false)
            }
        }

        fetchTickets()
    })

    return (
        <section className="featured-tickets">
            <Container>
                <h2>Ultimi Biglietti Inseriti</h2>

                {loading && (
                    <div className="text-center my-5">
                        <Spinner animation="border" />
                    </div>
                )}

                {error && <Alert variant="danger">{error}</Alert>}

                <Row>
                    {tickets.slice(0, 3).map(ticket => (
                        <Col key={ticket.id} md={4} className="mb-4">
                            <Card className="ticket-card h-100">
                                {ticket.imageURL && <Card.Img variant="top" src={ticket.imageURL} style={{ height: "180px", objectFit: "cover" }} />}
                                <Card.Body>
                                    <Card.Title>{ticket.title}</Card.Title>
                                    <Card.Text>Prezzo: €{ticket.price}</Card.Text>
                                    <Button variant="primary" as={Link} to={`/tickets/${ticket.id}`}>
                                        Acquista
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    )
}
