export {
    logout,
    parseJWT,
    backToHome,
    session_expire, 
    GraphiQL_Request,
    skills,
    numLoad,
    gettingPercentage, 
    alert_infos,
    alert_icons_iframes
}

const skills = ["skill_go", "skill_js", "skill_rust"]

function numLoad() {
    let valueDisplays = document.querySelectorAll(".num");
    let interval = 6000;
    valueDisplays.forEach((valueDisplay) => {
      let startValue = 0;
      let endValue = parseInt(valueDisplay.getAttribute("data-val"));
      let duration = Math.floor(interval / endValue);
      let counter = setInterval(function () {
        startValue += 2;
        valueDisplay.textContent = startValue + " kB";
        if (startValue == endValue) {
          clearInterval(counter);
        }
      }, duration);
    });
}

function gettingPercentage(grades) {
    let pass = 0
    let fail = 0
    grades.forEach(grade => {
        if (grade.value > 1) {
            pass++
        } else {
            fail++
        }
    })
    const pass_percentage = Math.round((pass / grades.length) * 100)
    const fail_percentage = 100 - pass_percentage
    return [pass_percentage, fail_percentage]
}

function parseJWT(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]))
    } catch (error) {
        console.error("Invalid JWT Token")
    }
    return null
}

function backToHome(route) {
    if (route == "/login" || route == "/") {
        const token_payload = parseJWT(document.cookie)
        if (token_payload) {
            window.location.href = "/home"
        }
    }
}

function session_expire() {
    const token_payload = parseJWT(document.cookie)
    if (!token_payload) {
        return true
    }
    return false
}

function logout() {
    document.cookie = null
    window.location.href = "/login"
}

async function GraphiQL_Request(query, token) {
    const DOMAIN = 'https://learn.zone01dakar.sn'
    try {
        const response = await fetch(`${DOMAIN}/api/graphql-engine/v1/graphql`, {
            method: "POST",
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({ query: query })
        })

        if (response.ok) {
            console.log('Promise resolved and HTTP status is successful')
            return await response.json()
        } else {
                if (response.status === 404) throw new Error('404 Not Found')
                if (response.status === 401) throw new Error('401 Unauthorized')
                if (response.status === 500) throw new Error('500 Internal Server Error')
                if (response.status === 405) throw new Error('405 Method Not Allowed')

                throw new Error(response.status)
        }
    } catch (error) {
        console.error('Promise rejected:', error)
    }
}


const alert_icons_iframes = {
    success: `<iframe src="https://lottie.host/embed/48d63482-8c12-496e-9c21-3bebb982079b/uKmHVBxGMP.json" style="border: none; height: 50px;"></iframe>`,
    failed: `<iframe src="https://lottie.host/embed/647ace79-3cec-4dfe-982a-27ea2e5260f7/UQRJfTKbjp.json" style="border: none; height: 50px;"></iframe>`
}

function alert_infos(message, type, parentElement) {
    let result = alert_icons_iframes.success == type
    if (parentElement) {
        for (let i = 0; i < parentElement.children.length; i++) {
            if (parentElement.children[i].className.includes("alert")) {
                parentElement.children[i].remove()
            }
        }
    }
    
    const div = document.createElement("div")
    div.className = "alert"
    div.innerHTML = `
        ${type}
        <p>${message}</p>
        
    `
    parentElement.appendChild(div)
    return result
}