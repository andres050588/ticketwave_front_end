import { Container, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function HeroSection() {
    const navigate = useNavigate()

    return (
        <div
            className="hero-section text-light text-center py-5"
            style={{
                backgroundImage: " url(/images/concert.jpg)"
            }}
        >
            <Container>
                <h1 className="display-4 fw-bold">Rivendi o acquista biglietti in modo sicuro</h1>
                <p className="lead mt-3">Concerti, partite ed eventi. Da utente a utente.</p>
                <div className="mt-4">
                    <Button variant="primary" className="me-3" size="lg" onClick={() => navigate("/tickets")}>
                        🎟️ Sfoglia Biglietti
                    </Button>
                    <Button variant="light" size="lg" onClick={() => navigate("/sell")}>
                        ➕ Metti in Vendita
                    </Button>
                </div>
            </Container>
        </div>
    )
}
