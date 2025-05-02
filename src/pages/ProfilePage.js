import { useEffect, useState } from "react"
import axios from "axios"
import { Container, Card, Button, Spinner, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function ProfilePage() {
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login")
            return
        }

        const fetchProfile = async () => {
            try {
                const response = await axios.get("/api/profile", {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setProfile(response.data)
            } catch (error) {
                setError("Errore nel recupero del profilo")
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [navigate])

    if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />
    if (error) return <Alert variant="danger">{error}</Alert>

    return (
        <Container className="mt-5">
            {!profile ? (
                <Alert variant="warning">Profilo non disponibile</Alert>
            ) : (
                <Card>
                    <Card.Body>
                        <Card.Title>{profile.name}</Card.Title>
                        <Card.Text>Email: {profile.email}</Card.Text>
                        <Card.Text>Registrato il: {profile.createdAt}</Card.Text>
                        <Button
                            variant="outline-danger"
                            className="mt-3"
                            onClick={() => {
                                localStorage.removeItem("token")
                                navigate("/login")
                            }}
                        >
                            Logout
                        </Button>
                    </Card.Body>
                </Card>
            )}
        </Container>
    )
}
