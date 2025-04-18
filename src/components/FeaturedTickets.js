import { Container, Row, Col, Card, Button } from "react-bootstrap"

const tickets = [
    { id: 1, title: "Coldplay - Milano", price: 120 },
    { id: 2, title: "Inter vs Juventus", price: 90 },
    { id: 3, title: "Vasco Live Tour", price: 75 }
]

export default function FeaturedTickets() {
    return (
        <section className="featured-tickets">
            <Container>
                <h2> Ultimi Biglietti Inseriti</h2>
                <Row>
                    {tickets.map(ticket => (
                        <Col key={ticket.id} md={4} className="mb-4">
                            <Card className="ticket-card h-100">
                                <Card.Body>
                                    <Card.Title>{ticket.title}</Card.Title>
                                    <Card.Text>Prezzo: €{ticket.price}</Card.Text>
                                    <Button variant="primary" href={`/tickets/${ticket.id}`}>
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
