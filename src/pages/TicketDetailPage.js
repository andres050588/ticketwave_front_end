import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Container, Card, Button, Spinner, Alert } from "react-bootstrap"
import { useAuth } from "../utils/AuthContext.js"
import axios_api from "../api/api.js"

export default function TicketDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()

    const [ticket, setTicket] = useState(null)
    const [isDisabled, setIsDisabled] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    useEffect(() => {
        if (!user) {
            navigate("/login")
            return // interrompe il resto dell'useEffect
        }
        const fetchTicket = async () => {
            try {
                const response = await axios_api.get(`/tickets/${id}`)
                setTicket(response.data)
            } catch (error) {
                setError("Biglietto non trovato")
            } finally {
                setLoading(false)
            }
        }
        fetchTicket()
    }, [id, user, navigate])

    if (loading || !ticket) {
        return (
            <Container className="my-5 text-center">
                <Spinner animation="border" />
            </Container>
        )
    }

    const isOwner = String(user.id) === String(ticket.venditore?.id)

    const handlePurchase = async () => {
        try {
            await axios_api.post("/orders", { ticketId: ticket.id })
            setSuccess("Ordine creato! Hai 15 minuti per completare l'acquisto")
            setIsDisabled(true)
            setTimeout(() => navigate("/orders"), 2000)
        } catch (error) {
            console.log("Errore durante l'acquisto:", error.response)
            setError(error.response?.data?.error || "Errore durante l'acquisto")
        }
    }

    return (
        <Container className="my-5">
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Card>
                <Card.Body>
                    <Card.Title>{ticket.title}</Card.Title>
                    <Card.Text>Prezzo: €{ticket.price}</Card.Text>
                    <Card.Text>Stato: {ticket.status}</Card.Text>

                    {ticket.eventDate && (
                        <Card.Text>
                            Data evento:{" "}
                            {new Date(ticket.eventDate).toLocaleString("it-IT", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                            })}
                        </Card.Text>
                    )}

                    {ticket.imageURL && <img src={ticket.imageURL} alt={ticket.title} style={{ width: "50%", borderRadius: "12px", marginBottom: "1rem" }} />}

                    {ticket.venditore?.name && (
                        <Card.Text className="text-muted">
                            Inserito da:{" "}
                            <Link to={`/tickets/seller/${ticket.venditore.id}`}>
                                <strong>{ticket.venditore.name}</strong>
                            </Link>
                        </Card.Text>
                    )}

                    {ticket.status === "disponibile" && (
                        <Button variant="success" className="w-100 mt-3" onClick={handlePurchase} disabled={isDisabled || isOwner}>
                            {isOwner ? "Non puoi acquistare il tuo biglietto" : isDisabled ? "Ordine creato! Hai 15 minuti per completare l'acquisto" : "Acquista Ora"}
                        </Button>
                    )}
                </Card.Body>
            </Card>
        </Container>
    )
}
