import { login } from "./login.js"

export function authLayout(contentFunction) {
    const token = localStorage.getItem('jwtToken')
    
    if (!token) {
        // Clear body and redirect to login
        document.body.innerHTML = ''
        document.body.removeAttribute('style')
        login()
        return
    }

    const styles = document.createElement('style')
    styles.textContent = `
        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, rgba(31, 41, 55, 0.98) 0%, rgba(55, 65, 81, 0.98) 100%);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(75, 85, 99, 0.3);
            z-index: 1000;
            padding: 0 32px;
            height: 72px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
            from {
                transform: translateY(-100%);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        .nav-brand {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .nav-logo {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .nav-title {
            font-size: 24px;
            font-weight: 700;
            background: linear-gradient(135deg, #818cf8 0%, #a78bfa 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin: 0;
        }

        .nav-right {
            display: flex;
            align-items: center;
            gap: 24px;
        }

        .nav-stat {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .nav-stat-label {
            font-size: 11px;
            color: #9ca3af;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
        }

        .nav-stat-value {
            font-size: 16px;
            font-weight: 700;
            color: #e5e7eb;
        }

        .nav-user {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .nav-user-info {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }

        .nav-user-name {
            font-size: 14px;
            font-weight: 600;
            color: #e5e7eb;
            margin: 0;
        }

        .nav-user-role {
            font-size: 12px;
            color: #9ca3af;
            margin: 0;
        }

        .nav-avatar-wrapper {
            position: relative;
            cursor: pointer;
            transition: transform 0.2s ease;
        }

        .nav-avatar-wrapper:hover {
            transform: scale(1.05);
        }

        .nav-avatar {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            border: 2px solid #818cf8;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            font-size: 18px;
            position: relative;
        }

        .nav-avatar-status {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 12px;
            height: 12px;
            background: #10b981;
            border: 2px solid #1f2937;
            border-radius: 50%;
        }

        .logout-button {
            padding: 8px 20px;
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            border: none;
            border-radius: 8px;
            color: white;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .logout-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
        }

        .logout-button:active {
            transform: translateY(0);
        }

        .dropdown-menu {
            position: absolute;
            top: calc(100% + 12px);
            right: 0;
            background: rgba(31, 41, 55, 0.98);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(75, 85, 99, 0.3);
            border-radius: 12px;
            padding: 8px;
            min-width: 200px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            display: none;
            animation: dropdownFade 0.2s ease;
        }

        @keyframes dropdownFade {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .dropdown-menu.show {
            display: block;
        }

        .dropdown-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px 12px;
            border-radius: 8px;
            color: #e5e7eb;
            text-decoration: none;
            transition: background 0.2s ease;
            cursor: pointer;
            font-size: 14px;
        }

        .dropdown-item:hover {
            background: rgba(75, 85, 99, 0.3);
        }

        .dropdown-divider {
            height: 1px;
            background: rgba(75, 85, 99, 0.3);
            margin: 8px 0;
        }

        .content-wrapper {
            padding-top: 72px;
            min-height: 100vh;
        }

        .loading-bar {
            position: fixed;
            top: 72px;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #818cf8, #a78bfa, #818cf8);
            background-size: 200% 100%;
            animation: loadingAnimation 2s linear infinite;
            z-index: 1001;
            display: none;
        }

        @keyframes loadingAnimation {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
        }

        .loading-bar.show {
            display: block;
        }

        @media (max-width: 768px) {

            
            .nav-user-info {
                display: none;
            }
            
            .navbar {
                padding: 0 16px;
            }
        }
    `
    document.head.appendChild(styles)

    document.body.innerHTML = `
        <nav class="navbar">
            <div class="nav-brand">
                <img src="./images/01edu.png" alt="Zone01" class="nav-logo">
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
    
    if (contentFunction) {
        contentFunction()
    }
}

async function loadNavbarData() {
    const token = localStorage.getItem('jwtToken')
    
    const query = `{
        user {
            login
            firstName
            lastName
            auditRatio
            xps(where: {path: {_eq: "/zone01oujda/div-01"}}) {
                amount
            }
            level: transactions(where: {type: {_eq: "level"}, path: {_like: "%/zone01oujda/div-01"}}, order_by: {amount: desc}, limit: 1) {
                amount
            }
        }
    }`

    try {
        const response = await fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ query })
        })
        const data = await response.json()
        
        if (data.data && data.data.user[0]) {
            const user = data.data.user[0]
            
            document.getElementById('navUserName').textContent = `${user.firstName} ${user.lastName}`
            // document.getElementById('navLevel').textContent = user.level[0]?.amount || '0'
            // document.getElementById('navRatio').textContent = user.auditRatio.toFixed(1)
            
            // const totalXp = user.xps.reduce((sum, xp) => sum + xp.amount, 0)
            // document.getElementById('navXP').textContent = `${(totalXp / 1000).toFixed(0)}kB`
            
            const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
            document.getElementById('navAvatar').innerHTML = `
                <span style="font-size: 18px; font-weight: 600;">${initials}</span>
                <div class="nav-avatar-status"></div>
            `
        }
    } catch (error) {
        console.error("Error loading navbar data:", error)
    }
}

function setupEventListeners() {
    const avatarWrapper = document.getElementById('avatarWrapper')
    const dropdownMenu = document.getElementById('dropdownMenu')
    const logoutLink = document.getElementById('logoutLink')
    const profileLink = document.getElementById('profileLink')
    const settingsLink = document.getElementById('settingsLink')
    
    avatarWrapper.addEventListener('click', (e) => {
        e.stopPropagation()
        dropdownMenu.classList.toggle('show')
    })
    
    document.addEventListener('click', () => {
        dropdownMenu.classList.remove('show')
    })
    
    dropdownMenu.addEventListener('click', (e) => {
        e.stopPropagation()
    })
    
    logoutLink.addEventListener('click', () => {
        showLoadingBar()
        setTimeout(() => {
            localStorage.removeItem('jwtToken')
            window.location.reload()
        }, 500)
    })
}

function showLoadingBar() {
    const loadingBar = document.getElementById('loadingBar')
    loadingBar.classList.add('show')
    setTimeout(() => {
        loadingBar.classList.remove('show')
    }, 2000)
}

export { showLoadingBar }