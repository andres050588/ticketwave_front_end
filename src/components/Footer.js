import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"

export default function Footer() {
    return (
        <footer className="bg-dark text-white mt-5 py-4">
            <Container>
                <Row>
                    <Col md={4}>
                        <h5>TicketWave</h5>
                        <p className="small">Rivendi i tuoi biglietti in modo facile e sicuro.</p>
                        <div className="d-flex gap-3 mt-3">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white fs-5">
                                <FaFacebook />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white fs-5">
                                <FaInstagram />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white fs-5">
                                <FaTwitter />
                            </a>
                        </div>
                    </Col>

                    <Col md={4}>
                        <h6>Link Utili</h6>
                        <ul className="list-unstyled">
                            <li>
                                <Link to="/" className="text-white text-decoration-none">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/tickets" className="text-white text-decoration-none">
                                    Biglietti
                                </Link>
                            </li>
                            <li>
                                <Link to="/sell" className="text-white text-decoration-none">
                                    Vendi
                                </Link>
                            </li>
                            <li>
                                <Link to="/orders" className="text-white text-decoration-none">
                                    Ordini
                                </Link>
                            </li>
                        </ul>
                    </Col>

                    <Col md={4}>
                        <h6>Info Legali</h6>
                        <ul className="list-unstyled">
                            <li>
                                <Link to="/privacy" className="text-white text-decoration-none">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-white text-decoration-none">
                                    Termini e Condizioni
                                </Link>
                            </li>
                        </ul>
                        <p className="small mt-3">© {new Date().getFullYear()} TicketWave</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}
