import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { Container, Card, Button, Spinner, Alert } from "react-bootstrap"

export default function TicketDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [ticket, setTicket] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/tickets/${id}`)
                setTicket(response.data)
            } catch (error) {
                setError("Biglietto non trovato")
            } finally {
                setLoading(false)
            }
        }
        fetchTicket()
    }, [id])

    const handlePurchase = async () => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login")
            return
        }

        try {
            const response = await axios.post(
                "http://localhost:3001/api/orders",
                { ticketId: ticket.id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setSuccess("Ordine creato! Hai 15 minuti per completare.")
            setTimeout(() => navigate("/orders"), 2000)
        } catch (error) {
            setError(error.response?.data?.error || "Errore durante l'acquisto")
        }
    }

    return (
        <Container className="my-5">
            {loading && (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            )}

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            {ticket && (
                <Card>
                    <Card.Body>
                        <Card.Title>{ticket.title}</Card.Title>
                        <Card.Text>Prezzo: €{ticket.price}</Card.Text>
                        <Card.Text>Stato: {ticket.status}</Card.Text>
                        {ticket.eventDate && <Card.Text>Data evento: {new Date(ticket.eventDate).toLocaleString("it-IT")}</Card.Text>}
                        {ticket.imageURL && <img src={ticket.imageUrl} alt={ticket.title} style={{ width: "100%", borderRadius: "12px", marginBottom: "1rem" }} />}
                        {ticket.status === "disponibile" && <Button onClick={handlePurchase}>Acquista</Button>}
                    </Card.Body>
                </Card>
            )}
        </Container>
    )
}
