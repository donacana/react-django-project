import axios from "axios";

export const rootApi = axios.create({
    // 배포 환경에서는 Nginx가 /api 요청을 Django로 넘김
    baseURL: "/api",
});

rootApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        console.log("TOKEN =", token);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default rootApi;