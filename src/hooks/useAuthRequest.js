import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

export const useAuthRequest = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState(null)

    const authorizedRequest = async (url, method = "get", config = {}) => {
        const token = localStorage.getItem("token")

        try {
            const response = await axios({
                method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`,
                    ...(config.headers || {})
                },
                ...config
            })
            return response.data
        } catch (error) {
            const status = error.response?.status

            if ([401, 403, 404].includes(status)) {
                setErrorMessage("Utente non autorizzato o non trovato.")
                localStorage.removeItem("token")
                setTimeout(() => navigate("/login"), 2500)
            } else {
                setErrorMessage("Errore durante la richiesta.")
            }

            return null
        }
    }

    return { authorizedRequest, errorMessage }
}
