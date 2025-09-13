import { login } from "./login.js"
import { loadNavbarData } from "../controllers/auth.js"

export function authLayout(contentFunction) {
    const token = localStorage.getItem('jwtToken')
    if (!token) {
        // Clear body and redirect to login
        document.body.innerHTML = ''
        document.body.removeAttribute('style')
        login()
        return
    }
    document.body.innerHTML = `
        <nav class="navbar">
            <div class="nav-brand">
                <img src="./public/images/01edu.png" alt="Zone01" class="nav-logo">
                <h1 class="nav-title">Zone01 Oujda</h1>
            </div>
            
            <div class="nav-right">
                <div class="nav-user">
                    <div class="nav-user-info">
                        <p class="nav-user-name" id="navUserName">Loading...</p>
                        <p class="nav-user-role">Student</p>
                    </div>
                    
                    <div class="nav-avatar-wrapper" id="avatarWrapper">
                        <div class="nav-avatar" id="navAvatar">
                            <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                            </svg>
                            <div class="nav-avatar-status"></div>
                        </div>
                        
                        <div class="dropdown-menu" id="dropdownMenu">
                            <div class="dropdown-divider"></div>
                            <div class="dropdown-item" id="logoutLink" style="color: #ef4444;">
                                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
                                </svg>
                                <span>Logout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        
        <div class="loading-bar" id="loadingBar"></div>
        
        <div class="content-wrapper" id="contentWrapper">
        </div>
    `

    loadNavbarData()
    setupEventListeners()
    
    // if (contentFunction) {
        contentFunction()
    // }
}

function setupEventListeners() {
    const avatarWrapper = document.getElementById('avatarWrapper')
    const dropdownMenu = document.getElementById('dropdownMenu')
    const logoutLink = document.getElementById('logoutLink')
    // const profileLink = document.getElementById('profileLink')
    // const settingsLink = document.getElementById('settingsLink')
    
    avatarWrapper.addEventListener('click', (e) => {
        e.stopPropagation()
        dropdownMenu.classList.toggle('show')
    })
    
    document.addEventListener('click', () => {
        dropdownMenu.classList.remove('show')
    })
    logoutLink.addEventListener('click', () => {
        showLoadingBar()
        setTimeout(() => {
            localStorage.removeItem('jwtToken')
            window.location.reload()
        }, 500)
    })
}

export function showLoadingBar() {
    const loadingBar = document.getElementById('loadingBar')
    loadingBar.classList.remove('show')
}