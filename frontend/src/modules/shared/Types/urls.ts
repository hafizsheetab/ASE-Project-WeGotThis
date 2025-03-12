const baseUrl = "http://localhost:8000"
const preamble = "api/v1"
export default {
    login: `${baseUrl}/${preamble}/auth/login`,
    register: `${baseUrl}/${preamble}/auth/register`,
}