import Page from "./page.js";
import { alert_infos, alert_icons_iframes } from "../helper/utils.js";
export default class Login extends Page {
    constructor() {
        super()
        this.credentials = {}
    }

    bindInputs() {
        const form = document.getElementById("log__in")  
        form.addEventListener('input', (e) => {
            if (e.target.classList.contains('login__input')) {
                this.credentials[e.target.name] = e.target.value

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
                    'Authorization': 'Basic ' + btoa(unescape(encodeURIComponent(this.credentials.identifier + ':' + this.credentials.password))),
                    'Content-Type': 'application/json'
                })
            })

            if (response.ok) {
                document.cookie = await response.json()
                window.location.href = "/home"
            } else {
                const result = await response.json()
                const parent = document.querySelector('.container')
                alert_infos(result.error, alert_icons_iframes.failed, parent)
                setTimeout(() => {
                    parent.removeChild(document.querySelector('.alert'))
                }, 5000)
            }
        } catch (error) {
            console.error('Promise rejected:', error)
        }
    }


    async getHTML() {
        this.setTitle("Sign In")
        return `
            <div class="container">
                <div class="wrapper">
                <div class="title"><span>Signin</span></div>
                <form action="#" id="log__in">
                    <div class="row">
                    <i class="fas fa-user"></i>
                    <input type="text" name="identifier" placeholder="Email or Username" required class="login__input">
                    </div>
                    <div class="row">
                    <i class="fas fa-lock"></i>
                    <input type="password" name="password" placeholder="Password" required class="login__input">
                    </div>
                    <div class="pass"><a href="https://learn.zone01dakar.sn/">Forgot password?</a></div>
                    <div class="row button">
                    <input type="button" value="Login" id="signin__button">
                    </div>
                    <div class="signup-link">Not a member? <a href="https://learn.zone01dakar.sn/">Signup now</a></div>
                </form>
                </div>
            </div>
        `
    }
}