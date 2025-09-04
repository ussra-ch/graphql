import { profile } from "./profile.js"

export function login() {
    // Clear any existing content and styles
    document.body.innerHTML = ''

    // Create login container
    document.body.innerHTML = `
        <div class="login-container">
            <div class="login-header">
                <img src="./images/01edu.png" alt="Zone01 Logo" class="logo">
                <h1 class="title">Zone01</h1>
                <p class="subtitle">Please enter your credentials</p>
            </div>
            
            <form id="loginForm">
                <div class="form-group">
                    <label for="username" class="form-label">Username or Email</label>
                    <svg class="input-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                    </svg>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        class="form-input" 
                        placeholder="Enter your username"
                        required
                        autocomplete="username"
                    >
                </div>
                
                <div class="form-group">
                    <label for="password" class="form-label">Password</label>
                    <svg class="input-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                    </svg>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        class="form-input" 
                        placeholder="Enter your password"
                        required
                        autocomplete="current-password"
                    >
                </div>
                
                <button type="submit" class="submit-button" id="loginButton">
                    <span class="button-text">Sign In</span>
                    <div class="loading-spinner"></div>
                </button>
                
                <div class="error-message" id="errorMessage"></div>
            </form>
            
            <div class="divider">
                <span class="divider-text">Graphql</span>
            </div>
            
            <div class="footer-text">
                Made with ❤️ by  <a href="https://github.com/ussra-ch/ussra-ch" class="footer-link">01 ychatoua</a>
            </div>
        </div>
    `

    // Add event listeners
    const loginForm = document.getElementById('loginForm')
    const errorMessage = document.getElementById('errorMessage')
    const submitButton = document.getElementById('loginButton')

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault()

        errorMessage.classList.remove('show')

        const username = event.target.username.value
        const password = event.target.password.value

        submitButton.classList.add('loading')
        submitButton.disabled = true

        fetch("https://learn.zone01oujda.ma/api/auth/signin", {
            method: "POST",
            headers: {
                'Authorization': 'Basic ' + btoa(username + ":" + password)
            }
        }).then(res =>{
            return res.json()
        }).then(data =>{
            if (data.error) throw data.error
            localStorage.setItem('jwtToken', data)
            profile()
        }) .catch (error => {
            errorMessage.textContent = error.message || 'Invalid credentials. Please try again.'
            errorMessage.classList.add('show')

            // Reset button state
            submitButton.classList.remove('loading')
            submitButton.disabled = false

        })
    })
}
