import { Container, Button } from "react-bootstrap"

export default function HeroSection() {
    return (
        <div
            className="hero-section text-light text-center py-5"
            style={{
                backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/images/concert.jpg)"
            }}
        >
            <Container>
                <h1 className="display-4 fw-bold">Rivendi o acquista biglietti in modo sicuro</h1>
                <p className="lead mt-3">Concerti, partite ed eventi. Da utente a utente.</p>
                <div className="mt-4 btns">
                    <Button variant="primary" href="/tickets" className="me-3">
                        🎟️ Sfoglia Biglietti
                    </Button>
                    <Button variant="light" href="/sell" className="btn-light">
                        ➕ Metti in Vendita
                    </Button>
                </div>
            </Container>
        </div>
    )
}
