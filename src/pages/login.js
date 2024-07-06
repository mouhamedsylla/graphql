import Page from "./page.js";
import { session_expire } from "../../helper/utils.js"

export default class Login extends Page {
    constructor() {
        super()
        this.setTitle("Sign In")
        this.credentials = {}
    }

    bindInputs() {
        const form = document.getElementById("log__in")
        form.addEventListener('input', (e) => {
            if (e.target.classList.contains('login__input')) {
                this.credentials[e.target.id] = e.target.value
            }
        })

        form.addEventListener('click', (e) => {
            if (e.target.id === 'signin__button') {
                this.Signin()   
            }
        })
    }

    async Signin() {
        const DOMAIN = 'https://learn.zone01dakar.sn'

        try {
            const response = await fetch(`${DOMAIN}/api/auth/signin`, {
                method: "POST",
                headers: new Headers({
                    'Authorization': 'Basic ' + btoa(this.credentials.username + ":" + this.credentials.password),
                    'Content-Type': 'application/json'
                })
            })

            const rp = await response.json()
            if (session_expire()) {
                window.location.href = "/home"
            }
        } catch (error) {
            console.error("Invalid Credentials")
        }
    }


    async getHTML() {
        return `
        <div class="login">
            <h1>Login</h1>
            <form id="log__in">
                <input type="text" id="username" placeholder="Username" class="login__input" required>
                <input type="password" id="password" placeholder="Password" class="login__input" required>
                <div id="signin__button">Sign In</div>
            </form>
        </div>
        `
    }
}