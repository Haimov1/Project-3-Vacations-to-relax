import axios from "axios";
import { authStore } from "../Redux/AuthState";
import authService from "../Services/AuthService";

class Interceptors {

    public create(): void {

        axios.interceptors.request.use(request => {
            if (authService.isLoggedIn()) {
                request.headers = {
                    authorization: "Bearer " + authStore.getState().token
                };
            }
            return request;
        });
    }
}

const interceptors = new Interceptors();

export default interceptors;