import { useEffect, useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Container, Form, Button, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../utils/AuthContext.js"
import { useAuthRequest } from "../hooks/useAuthRequest.js"
import { Upload, CheckCircle } from "react-bootstrap-icons"

export default function SellPage() {
    const { user } = useAuth()
    const [success, setSuccess] = useState(null)
    const [preview, setPreview] = useState(null)
    const navigate = useNavigate()
    const { authorizedRequest, errorMessage } = useAuthRequest()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!user && !token) {
            console.warn("Utente non autenticato, redirect...")
            navigate("/login")
        }
    }, [user, navigate])

    const formik = useFormik({
        initialValues: { title: "", price: "", eventDate: "", image: null },
        validationSchema: Yup.object({
            title: Yup.string().min(3, "Minimo 3 caratteri").required("Titolo obbligatorio"),
            price: Yup.number().min(1, "Prezzo minimo 1€").required("Prezzo obbligatorio"),
            eventDate: Yup.date().required("Data obbligatoria").min(new Date(), "La data deve essere futura"),
            image: Yup.mixed()
                .required("Immagine obbligatoria")
                .test("fileSize", "Immagine troppo grande (max 5MB)", value => value && value.size <= 5 * 1024 * 1024)
                .test("fileType", "Formato non valido. Solo JPEG o PNG", value => value && ["image/jpeg", "image/png"].includes(value.type))
        }),
        onSubmit: async values => {
            const token = localStorage.getItem("token")
            if (!token) {
                console.log("Sessione non valida. Fai di nuovo login.")
                navigate("/login")
                return
            }
            try {
                const formData = new FormData()
                formData.append("title", values.title)
                formData.append("price", values.price)
                formData.append("eventDate", values.eventDate)
                formData.append("image", values.image)

                await authorizedRequest("/tickets", "post", {
                    data: formData
                })

                setSuccess("Biglietto pubblicato con successo!")
                formik.resetForm()
                setPreview(null)
                setTimeout(() => navigate("/tickets"), 2700)
            } catch (error) {
                console.error(error.response?.data?.error || "Errore durante la pubblicazione")
            }
        }
    })
    if (!user) {
        return (
            <Container className="mt-5 text-center">
                <Alert variant="warning">Devi essere autenticato per pubblicare un biglietto.</Alert>
            </Container>
        )
    }

    return (
        <Container style={{ maxWidth: "500px", marginTop: "50px" }}>
            <h2 className="mb-4 text-center">Pubblica Biglietto</h2>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Titolo Evento</Form.Label>
                    <Form.Control type="text" name="title" placeholder="Es. Vasco Live 2025" value={formik.values.title} onChange={formik.handleChange} isInvalid={formik.touched.title && formik.errors.title} />
                    <Form.Control.Feedback type="invalid">{formik.errors.title}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Prezzo (€)</Form.Label>
                    <Form.Control type="number" name="price" placeholder="es: 49.90" value={formik.values.price} onChange={formik.handleChange} isInvalid={formik.touched.price && formik.errors.price} />
                    <Form.Control.Feedback type="invalid">{formik.errors.price}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Data Evento</Form.Label>
                    <Form.Control type="datetime-local" name="eventDate" value={formik.values.eventDate} onChange={formik.handleChange} isInvalid={formik.touched.eventDate && formik.errors.eventDate} />
                    <Form.Control.Feedback type="invalid">{formik.errors.eventDate}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>
                        Carica Immagine <Upload size={18} className="ms-1" />
                    </Form.Label>
                    <Form.Control
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={e => {
                            const file = e.currentTarget.files[0]
                            formik.setFieldValue("image", file)
                            setPreview(file ? URL.createObjectURL(file) : null)
                        }}
                    />
                </Form.Group>

                {preview && (
                    <div className="text-center mb-4">
                        <img src={preview} alt="Anteprima" style={{ maxHeight: "200px", borderRadius: "12px" }} />
                        <div className="mt-2">
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => {
                                    setPreview(null)
                                    formik.setFieldValue("image", null)
                                }}
                            >
                                Rimuovi immagine biglietto
                            </Button>
                        </div>
                    </div>
                )}

                <Button type="submit" variant="success" className="w-100 d-flex align-items-center justify-content-center">
                    <CheckCircle size={18} className="me-2" /> Pubblica
                </Button>
            </Form>
        </Container>
    )
}
