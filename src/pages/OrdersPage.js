import { useEffect, useState } from "react"
import axios from "axios"
import { Container, Card, Spinner, Alert, Row, Col, Badge } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function OrdersPage() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login")
            return
        }

        axios
            .get("http://localhost:3001/api/orders", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setOrders(response.data)
            })
            .catch(error => {
                setError("Errore nel recupero degli ordini")
            })
            .finally(() => {
                setLoading(false)
            })
    }, [navigate])

    return (
        <Container className="my-5">
            <h2 className="mb-4 text-center">I miei ordini</h2>

            {loading && (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            )}

            {error && <Alert variant="danger">{error}</Alert>}

            {orders.length === 0 && !loading && <Alert variant="info">Nessun ordine trovato</Alert>}

            <Row>
                {orders.map(order => (
                    <Col md={4} key={order.id} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{order.Ticket.title}</Card.Title>
                                <Card.Text>Prezzo: €{order.Ticket.price}</Card.Text>
                                <Card.Text>
                                    Stato: <Badge bg={order.status === "acquistato" ? "success" : order.status === "impegnato" ? "warning" : "secondary"}>{order.status}</Badge>
                                </Card.Text>
                                {order.Ticket.eventDate && <Card.Text>Data evento: {new Date(order.Ticket.eventDate).toLocaleString("it-IT")}</Card.Text>}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
