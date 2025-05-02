import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { Container, Form, Button, Alert } from "react-bootstrap"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function SellPage() {
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const [preview, setPreview] = useState(null)

    const formik = useFormik({
        initialValues: {
            title: "",
            price: "",
            eventDate: "",
            image: null
        },
        validationSchema: Yup.object({
            title: Yup.string().min(3, "minimo 3 caratteri").required("Titolo obbligatorio"),
            price: Yup.number().min(1, "Prezzo minimo 1€").required("Prezzo obbligatorio"),
            eventDate: Yup.date().required("Data evento obbligatoria").min(new Date(), "La data deve essere futura")
        }),
        onSubmit: async values => {
            try {
                const token = localStorage.getItem("token")

                const formData = new FormData()
                formData.append("title", values.title)
                formData.append("price", values.price)
                formData.append("eventDate", values.eventDate)
                formData.append("image", values.image)

                const response = await axios.post("http://localhost:3001/api/tickets", formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                })
                setSuccess("Biglietto pubblicato con successo!")
                formik.resetForm()
                setTimeout(() => navigate("/tickets"), 2000)
            } catch (error) {
                setError(error.response?.data?.error || "Errore durante la pubblicazione")
            }
        }
    })

    return (
        <Container style={{ maxWidth: "500px", marginTop: "60px" }}>
            <h2 className="mb-4 text-center">Pubblica un biglietto</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Titolo</Form.Label>
                    <Form.Control type="text" name="title" placeholder="Nome evento" value={formik.values.title} onChange={formik.handleChange} isInvalid={formik.touched.title && formik.errors.title} />
                    <Form.Control.Feedback type="invalid">{formik.errors.title}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Prezzo (€)</Form.Label>
                    <Form.Control type="number" name="price" placeholder="es: 39.99" value={formik.values.price} onChange={formik.handleChange} isInvalid={formik.touched.price && formik.errors.price} />
                    <Form.Control.Feedback type="invalid">{formik.errors.price}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Data Evento</Form.Label>
                    <Form.Control type="datetime-local" name="eventDate" value={formik.values.eventDate} onChange={formik.handleChange} isInvalid={formik.touched.eventDate && formik.errors.eventDate} />
                    <Form.Control.Feedback type="invalid">{formik.errors.eventDate}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Immagine Evento</Form.Label>
                    <Form.Control
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={e => {
                            const file = e.currentTarget.files[0]
                            formik.setFieldValue("image", file)
                            setPreview(URL.createObjectURL(file)) // genera anteprima
                        }}
                    />
                </Form.Group>
                {preview && (
                    <div className="mb-3 text-center">
                        <img src={preview} alt="Anteprima" style={{ maxHeight: "200px", borderRadius: "12px" }} />
                    </div>
                )}

                <Button type="submit" variant="success" className="w-100">
                    Pubblica Biglietto
                </Button>
            </Form>
        </Container>
    )
}
