import { useEffect, useState } from "react"
import axios from "axios"
import { Container, Row, Col, Card, Spinner, Alert, Button } from "react-bootstrap"

export default function TicketPage() {
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/tickets")
            .then(response => {
                // perche useEffect non acceta funzioni async diretamente
                setTickets(response.data)
                setLoading(false)
            })
            .catch(error => {
                setError("Errore nel caricamento dei biglietti")
                setLoading(false)
            })
    }, [])
    return (
        <Container className="my-5">
            <h2 className="mb-4 text-center">Biglietti disponibili</h2>

            {loading && <Alert variant="danger">{error}</Alert>}

            <Row>
                {tickets.map(ticket => (
                    <Col key={ticket.id} md={4} className="mb-4">
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>{ticket.title}</Card.Title>
                                <Card.Text>
                                    Prezzo: <strong>€{ticket.price}</strong>
                                </Card.Text>
                                <Button variant="primary" href={`/tickets/${ticket.id}`}>
                                    Acquista
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
