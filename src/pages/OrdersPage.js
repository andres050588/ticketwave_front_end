import { useEffect, useState, useCallback } from "react"
import { Container, Card, Spinner, Alert, Row, Col, Badge, Button } from "react-bootstrap"
import { useAuthRequest } from "../hooks/useAuthRequest.js"

export default function OrdersPage() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(null)

    const { authorizedRequest, errorMessage } = useAuthRequest()

    const fetchOrders = useCallback(async () => {
        try {
            const data = await authorizedRequest("http://localhost:3001/api/orders")
            if (data) setOrders(data)
        } catch {
            console.error("Errore nel recupero degli ordini")
        } finally {
            setLoading(false)
        }
    }, [authorizedRequest])

    useEffect(() => {
        fetchOrders()
    }, [fetchOrders])

    const handleComplete = async orderId => {
        try {
            const result = await authorizedRequest(`http://localhost:3001/api/orders/${orderId}/complete`, "post")
            if (result) {
                setSuccess("Ordine completato con successo")
                fetchOrders()
            }
        } catch (error) {
            console.error(error.response?.data?.error || "Errore nel completamento ordine")
        }
    }

    const handleCancel = async orderId => {
        try {
            const result = await authorizedRequest(`http://localhost:3001/api/orders/${orderId}`, "delete")
            if (result) {
                setSuccess("Ordine annullato")
                fetchOrders()
            }
        } catch (error) {
            console.error(error.response?.data?.error || "Errore nell'annullamento ordine")
        }
    }

    return (
        <Container className="my-5">
            <h2 className="mb-4 text-center">I miei ordini</h2>

            {loading && (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            )}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
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
                                {order.status === "impegnato" && (
                                    <>
                                        <Button variant="success" className="me-2" size="sm" onClick={() => handleComplete(order.id)}>
                                            Completa
                                        </Button>
                                        <Button variant="danger" size="sm" onClick={() => handleCancel(order.id)}>
                                            Annulla
                                        </Button>
                                    </>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
