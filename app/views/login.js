import { personalInfos, friendSection, ratioRate, currentProject } from "../controllers/profile.js";

export function login() {
    let login = document.createElement('div')
    let loginHead = document.createElement('div')

    let pic = document.createElement('img')
    pic.src = "./images/01edu.png"

    let title = document.createElement('h2')
    title.textContent = "Welcome to zone01"

    let subTitle = document.createElement('div')
    subTitle.textContent = "Please enter your credentials"

    loginHead.append(pic, title, subTitle)

    let loginForm = document.createElement('form')
    loginForm.id = "loginForm"
    let Username = document.createElement('input')
    Username.type = "text"
    Username.name = "username"
    let Password = document.createElement('input')
    Password.type = "password"
    Password.name = "password"

    let submitButton = document.createElement('button')
    submitButton.textContent = "login"
    submitButton.id = "loginButton"

    loginForm.append(Username, Password, submitButton)

    login.append(loginHead, loginForm)
    document.body.append(login)


    loginForm.addEventListener("submit", (event) => {
        console.log(111);
        event.preventDefault()
        let username = event.target.username.value
        let password = event.target.password.value
        // console.log("username : ", username);
        // console.log("password : ", password);
        fetch("https://learn.zone01oujda.ma" + "/api/auth/signin",
            {
                method: "POST",
                headers: {
                    'Authorization': 'Basic ' + btoa(username + ":" + password)
                }
            }
        )
            .then(res => {
                return res.json()
            })
            .then(data => {
                if (data.error) throw data.error
                localStorage.setItem('jwtToken', data)
                console.log("JWT Token:", data);
                personalInfos()
                friendSection()
                ratioRate()
                currentProject()
            })
    });
}
