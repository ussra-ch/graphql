import { login } from "../app/views/login.js"
import { profile } from "../app/views/profile.js"

const token = localStorage.getItem('jwtToken')

if (token) {
    profile()
} else {
    login()
}