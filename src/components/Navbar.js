import { Navbar, Nav, Container, Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../utils/AuthContext"

export default function AppNavbar() {
    const navigate = useNavigate()
    const { user, logout } = useAuth()

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    return (
        <Navbar className="navbar" bg="dark" variant="dark">
            <div className="navbar-container">
                <Navbar.Brand as={Link} to={"/"} className="navbar-logo">
                    <p>TicketWave</p>
                </Navbar.Brand>
                <Nav className="navbar-links">
                    <Nav.Link className="nav-link" as={Link} to={"/"}>
                        Home
                    </Nav.Link>
                    <Nav.Link className="nav-link" as={Link} to={"/tickets"}>
                        Biglietti
                    </Nav.Link>
                    {user && (
                        <>
                            <Nav.Link className="nav-link" as={Link} to={"/sell"}>
                                Vendi
                            </Nav.Link>
                            <Nav.Link className="nav-link" as={Link} to={"/orders"}>
                                Ordini
                            </Nav.Link>
                        </>
                    )}
                </Nav>

                <div className="d-flex align-items-center navbar-links navbar-auth">
                    {user ? (
                        <>
                            <Nav.Link className="nav-link" as={Link} to="/profile">
                                👤 Ciao, {user?.name || "ospite"}
                            </Nav.Link>
                            <Button className="logout-button ms-2" size="sm" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Nav.Link className="nav-link" as={Link} to="/login">
                                Login
                            </Nav.Link>
                            <Nav.Link className="nav-link" as={Link} to="/register">
                                Register
                            </Nav.Link>
                        </>
                    )}
                </div>
            </div>
        </Navbar>
    )
}
