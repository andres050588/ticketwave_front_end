import { useFormik } from "formik"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"
import { Container, Form, Button, Alert } from "react-bootstrap"
import { useState } from "react"
import { useAuth } from "../utils/AuthContext.js"
import axios_api from "../api/api.js"

export default function RegisterPage() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState(null)

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().min(2, "Minimo 2 caratteri").max(40, "Massimo 40 caratteri").required("Nome obbligatorio"),
            email: Yup.string().email("Formato email non valido").required("Email obbligatoria"),
            password: Yup.string().min(6, "Minimo 6 caratteri").required("Password obbligatoria")
        }),
        onSubmit: async values => {
            try {
                const response = await axios_api.post("/users/register", values)
                localStorage.setItem("token", response.data.token)
                login(response.data.token)
                navigate("/tickets")
            } catch (error) {
                setError(error.response?.data?.error || "Errore durante la registrazione")
            }
        }
    })
    return (
        <Container style={{ maxWidth: "400px", marginTop: "60px" }}>
            <h2 className="mb-4 text-center">Registrati</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Nome Cognome" value={formik.values.name} onChange={formik.handleChange} isInvalid={formik.touched.name && formik.errors.name} />
                    <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="youremail@email.com" value={formik.values.email} onChange={formik.handleChange} isInvalid={formik.touched.email && formik.errors.email} />
                    <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="••••••••" value={formik.values.password} onChange={formik.handleChange} isInvalid={formik.touched.password && formik.errors.password} />
                    <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" variant="success" className="w-100">
                    Crea account
                </Button>
            </Form>
            <div className="mt-3 text-center">
                <span>Hai già un account? </span>
                <a href="/login">Accedi</a>
            </div>
        </Container>
    )
}
