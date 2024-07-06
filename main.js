import Error from "./src/pages/error.js";
import Login from "./src/pages/login.js";
import Profile from "./src/pages/profile.js";
import Router from "./src/router/router.js";

const login = new Login()
const profile = new Profile()
const error = new Error()


const router = new Router({
    "/": login,
    "/login": login,
    "/home": profile,
    "/error": error
})

router.init()