import { Container, Row, Col } from "react-bootstrap"

export default function HowItWorks() {
    return (
        <section className="how-it-works">
            <Container>
                <h2>Come funziona?</h2>
                <Row>
                    <Col md={4} className="step">
                        <h4> Pubblica</h4>
                        <p>Inserisci il biglietto che non userai più.</p>
                    </Col>
                    <Col md={4} className="step">
                        <h4> Blocca e Acquista</h4>
                        <p>15 minuti di tempo per completare l'acquisto.</p>
                    </Col>
                    <Col md={4} className="step">
                        <h4> Conferma</h4>
                        <p>Ricevi conferma e usa il tuo biglietto.</p>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
