import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function HowItWorks() {
    return (
        <section className="how-it-works">
            <Container>
                <h2>Come funziona?</h2>
                <Row>
                    <Col md={4} className="step text-center">
                        <Link to="/sell" className="text-dark">
                            <h4>Pubblica</h4>
                            <p>Inserisci il biglietto che non userai più.</p>
                        </Link>
                    </Col>
                    <Col md={4} className="step text-center">
                        <Link to="/tickets" className="text-dark">
                            <h4>Blocca e Acquista</h4>
                            <p>15 minuti di tempo per completare l'acquisto.</p>
                        </Link>
                    </Col>
                    <Col md={4} className="step text-center">
                        <Link to="/orders" className="text-dark">
                            <h4>Conferma</h4>
                            <p>Ricevi conferma e usa il tuo biglietto.</p>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
