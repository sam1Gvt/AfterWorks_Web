import axios from "axios";

const axiosInstance = axios.create({
    "baseURL":"http://127.0.0.1:8000/api"
});

axiosInstance.interceptors.request.use(config => {
        // Recuperer le token dans le localStorage
        const token = localStorage.getItem("token");

        if (token) {
            //Positionner le hrader Authorization avec le token
            config.headers.Authorization =   `Bearer ${token}`;
        }
        return config
    }
)

export default axiosInstance;