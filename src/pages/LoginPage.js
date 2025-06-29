import { useFormik } from "formik"
import * as Yup from "yup"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { Container, Form, Button, Alert } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useAuth } from "../utils/AuthContext.js"
import axios_api from "../api/api.js"

export default function LoginPage() {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const location = useLocation()
    const { login } = useAuth()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            navigate("/profile")
        }
    }, [navigate])

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Email non valida").required("Obbligatoria"),
            password: Yup.string().required("Obbligatoria")
        }),
        onSubmit: async values => {
            try {
                const response = await axios_api.post("/users/login", values)
                localStorage.setItem("token", response.data.token)
                login(response.data.token)
                navigate(location.state?.from || "/tickets")
            } catch (error) {
                if (error.response?.status === 401 || error.response?.status === 404) {
                    setError("Email o password non corretti")
                } else {
                    setError("Errore del server. Riprova più tardi.")
                }

                setTimeout(() => {
                    setError(null)
                }, 5000)
            }
        }
    })

    return (
        <Container style={{ maxWidth: "400px", marginTop: "60px" }}>
            <h2 className="mb-4 text-center">Login</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" autoComplete="email" name="email" placeholder="youremail@email.com" value={formik.values.email} onChange={formik.handleChange} isInvalid={formik.touched.email && formik.errors.email} />
                    <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" autoComplete="current-password" name="password" placeholder="••••••••" value={formik.values.password} onChange={formik.handleChange} isInvalid={formik.touched.password && formik.errors.password} />
                    <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100">
                    Accedi
                </Button>
            </Form>
            <div className="mt-3 text-center">
                <span>Non hai un account? </span>
                <Link to="/register">Registrati</Link>
            </div>
        </Container>
    )
}
