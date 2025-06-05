import { Card, Button, Badge } from "react-bootstrap"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../utils/AuthContext.js"

export default function TicketCard({ ticket }) {
    const navigate = useNavigate()
    const { user } = useAuth()
    const isOwner = user && ticket.venditore?.id === user.id

    return (
        <Card className="mb-4 shadow-sm">
            {ticket.imageURL && <Card.Img variant="top" src={ticket.imageURL} alt={ticket.title} style={{ maxHeight: "200px", objectFit: "cover" }} />}
            <Card.Body>
                <Card.Title> {ticket.title} </Card.Title>
                <Card.Text> Prezzo: €{ticket.price}</Card.Text>
                <Card.Text> Data evento: {new Date(ticket.eventDate).toLocaleDateString("it-IT")}</Card.Text>

                {ticket.venditore?.name && (
                    <Card.Text className="text-muted">
                        Inserito da:{" "}
                        <Link to={`/tickets/seller/${ticket.venditore.id}`}>
                            <strong>{ticket.venditore.name}</strong>
                        </Link>
                        {isOwner && (
                            <Badge bg="warning" text="dark">
                                Non puoi acquistare un biglietto che hai pubblicato tu.
                            </Badge>
                        )}
                    </Card.Text>
                )}
                <Button variant={isOwner ? "outline-secondary" : "primary"} className="w-100 mt-2" onClick={() => navigate(`/tickets/${ticket.id}`)}>
                    {isOwner ? "Visualizza il tuo biglietto" : "Vedi Dettagli"}
                </Button>
            </Card.Body>
        </Card>
    )
}
