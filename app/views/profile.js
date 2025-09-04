import { personalInfos, friendSection, ratioRate, currentProject } from "../controllers/profile.js"
import { authLayout } from "./authLayout.js"

export function profile() {
    authLayout(renderProfile)
}

function renderProfile() {
    // const styles = document.createElement('style')
    // styles.textContent = `
    //     body {
    //         background: linear-gradient(135deg, #1e1e2e 0%, #2a2a3e 100%);
    //         min-height: 100vh;
    //         margin: 0;
    //         font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    //     }
    //     #contentWrapper {
    //         display: flex;
    //         align-items: center;
    //         justify-content: center;
    //         min-height: calc(100vh - 72px);
    //         padding: 32px;
    //     }
    //     .container-card {
    //         background: rgba(31, 41, 55, 0.9);
    //         backdrop-filter: blur(10px);
    //     }
    //     .metric-card {
    //         background: linear-gradient(135deg, #374151 0%, #4B5563 100%);
    //         border: 1px solid rgba(75, 85, 99, 0.3);
    //         transition: all 0.3s ease;
    //     }
    //     .metric-card:hover {
    //         transform: translateY(-5px);
    //         box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    //     }
    //     .animate-fade-in {
    //         animation: fadeIn 0.5s ease-in-out;
    //     }
    //     @keyframes fadeIn {
    //         from { opacity: 0; transform: translateY(20px); }
    //         to { opacity: 1; transform: translateY(0); }
    //     }
    //     .chart-title {
    //         font-size: 16px;
    //         font-weight: 600;
    //         color: #e5e7eb;
    //         margin-bottom: 12px;
    //         text-align: center;
    //     }
    //     .bar-label {
    //         fill: #9ca3af;
    //         font-size: 12px;
    //     }
    //     .bar-value {
    //         fill: #e5e7eb;
    //         font-size: 14px;
    //         font-weight: 600;
    //     }
    //     .donut-text {
    //         fill: #e5e7eb;
    //         font-size: 32px;
    //         font-weight: 700;
    //     }
    //     .donut-subtext {
    //         fill: #9ca3af;
    //         font-size: 14px;
    //     }
    // `
    // document.head.appendChild(styles)

    const contentWrapper = document.getElementById('contentWrapper')
    contentWrapper.innerHTML = `
    <div class="animate-fade-in container" style="width: 100%; max-width: 1200px; padding: 32px; border-radius: 12px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5); background: rgba(31, 41, 55, 0.9); border: 1px solid rgba(55, 65, 81, 0.5); display: flex; gap: 32px;">
        
        <div style="width: 33%; padding: 24px; border-radius: 12px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3); background: linear-gradient(135deg, #374151 0%, #4B5563 100%); display: flex; flex-direction: column; align-items: center;">
            <img src="https://placehold.co/120x120/4A5568/E2E8F0?text=User" alt="User Avatar" style="width: 128px; height: 128px; border-radius: 50%; margin-bottom: 16px; border: 4px solid #818cf8;">
            <h1 id="profileName" style="font-size: 28px; font-weight: 800; color: white; margin: 0 0 8px 0;">Loading...</h1>
            <p style="font-size: 14px; color: #9ca3af; margin-bottom: 32px;">Personal Information</p>
            <div style="width: 100%; font-size: 14px; color: #d1d5db;">
                <div style="margin-bottom: 16px;">
                    <span style="font-weight: 600; color: #9ca3af;">Name:</span> 
                    <span id="userName"></span>
                </div>
                <div style="margin-bottom: 16px;">
                    <span style="font-weight: 600; color: #9ca3af;">Username:</span> 
                    <span id="userUsername"></span>
                </div>
                <div style="margin-bottom: 16px;">
                    <span style="font-weight: 600; color: #9ca3af;">Email:</span> 
                    <span id="userEmail"></span>
                </div>
                <div style="margin-bottom: 16px;">
                    <span style="font-weight: 600; color: #9ca3af;">Phone:</span> 
                    <span id="userPhone"></span>
                </div>
            </div>
        </div>

        <div style="width: 67%;">
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; color: #e5e7eb; margin-bottom: 32px;">
                <div class="metric-card" style="padding: 24px; border-radius: 12px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3); display: flex; flex-direction: column; align-items: center;">
                    <span style="font-size: 12px; font-weight: 600; color: #9ca3af; margin-bottom: 4px;">Total XP</span>
                    <span id="totalXP" style="font-size: 28px; font-weight: 700; color: #5eead4;">Loading...</span>
                </div>
                <div class="metric-card" style="padding: 24px; border-radius: 12px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3); display: flex; flex-direction: column; align-items: center;">
                    <span style="font-size: 12px; font-weight: 600; color: #9ca3af; margin-bottom: 4px;">Ratio Rate</span>
                    <span id="ratioDisplay" style="font-size: 28px; font-weight: 700; color: #34d399;">Loading...</span>
                </div>
                <div class="metric-card" style="padding: 24px; border-radius: 12px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3); display: flex; flex-direction: column; align-items: center;">
                    <span style="font-size: 12px; font-weight: 600; color: #9ca3af; margin-bottom: 4px;">Level</span>
                    <span id="userLevel" style="font-size: 28px; font-weight: 700; color: #fbbf24;">Loading...</span>
                </div>
            </div>
            
            <div class="metric-card" style="padding: 24px; border-radius: 12px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3); margin-bottom: 32px;">
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <span style="font-size: 12px; font-weight: 600; color: #9ca3af; margin-bottom: 4px;">Current Project</span>
                    <span id="projectName" style="font-size: 20px; font-weight: 700; color: #e5e7eb; text-align: center;">Loading...</span>
                </div>
                <div style="margin-top: 16px; width: 100%;">
                    <h3 style="font-size: 14px; font-weight: 600; color: #9ca3af; margin-bottom: 8px; text-align: center;">Team Members</h3>
                    <ul id="teamMembersList" style="list-style: none; padding: 0; margin: 0;">
                    </ul>
                </div>
            </div>

            <div style="padding-top: 24px; border-top: 1px solid rgba(55, 65, 81, 0.5);">
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; margin-top: 16px;">
                    <div style="background: #1f2937; padding: 24px; border-radius: 12px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);">
                        <div class="chart-title">Top Collaborators</div>
                        <div style="display: flex; justify-content: center;">
                            <svg id="bestFriendsChart" width="100%" height="250"></svg>
                        </div>
                    </div>

                    <div style="background: #1f2937; padding: 24px; border-radius: 12px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);">
                        <div class="chart-title">Audit Ratio</div>
                        <div style="display: flex; justify-content: center;">
                            <svg id="ratioChart" width="250" height="250"></svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `

    loadUserData()
    loadFriendData()
    loadRatioData()
    loadCurrentProject()
}

function loadUserData() {
    const token = localStorage.getItem('jwtToken')
    const query = `{
        user{
            lastName
            firstName
            login
            email
            attrs
        }
    }`

    fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ query })
    }).then(res => {
        return res.json()
    }).then(data =>{
        if (data.error) throw data.error
        if (data.data && data.data.user[0]) {
            const user = data.data.user[0]
            document.getElementById('profileName').textContent = `${user.firstName} ${user.lastName}`
            document.getElementById('userName').textContent = `${user.firstName} ${user.lastName}`
            document.getElementById('userUsername').textContent = user.login
            document.getElementById('userEmail').textContent = user.email
            document.getElementById('userPhone').textContent = user.attrs.tel
        }
    }).catch (error => {
        console.error("Error loading navbar data:", error)
    })

    const xpQuery = `{
        user {
            xps(where: {path: {_eq: "/zone01oujda/div-01"}}) {
                amount
            }
            level: transactions(where: {type: {_eq: "level"}, path: {_like: "%/zone01oujda/div-01"}}, order_by: {amount: desc}, limit: 1) {
                amount
            }
        }
    }`

    fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ xpQuery })
    }).then(res => {
        return res.json()
    }).then(data =>{
        if (data.error) throw data.error
        if (data.data && data.data.user[0]) {
            const totalXp = data.data.user[0].xps.reduce((sum, xp) => sum + xp.amount, 0)
            document.getElementById('totalXP').textContent = `${(totalXp / 1000).toFixed(2)} kB`
            
            const level = data.data.user[0].level[0]?.amount || 0
            document.getElementById('userLevel').textContent = level.toString()
        }
    }).catch (error => {
        console.error("Error loading navbar data:", error)
    })
}

function loadFriendData() {
    const token = localStorage.getItem('jwtToken')
    const query = `{ 
        user {
            login
            finished_projects: groups(where: {
                group: {status: {_eq: finished}, _and: 
                    {eventId: {_eq: 41}}
                }
            }) {
                group { path members { userLogin } }
            }
        }
    }`

    fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ query })
    }).then(res => {
        return res.json()
    }).then(data =>{
        if (data.data && data.data.user[0]) {
            const userLogin = data.data.user[0].login
            let collaborators = []
            
            data.data.user[0].finished_projects.forEach(project => {
                project.group.members.forEach(member => {
                    if (member.userLogin !== userLogin) {
                        let collab = collaborators.find(c => c.name === member.userLogin)
                        if (collab) {
                            collab.collaborations++
                        } else {
                            collaborators.push({ name: member.userLogin, collaborations: 1 })
                        }
                    }
                })
            })
            
            collaborators.sort((a, b) => b.collaborations - a.collaborations)
            drawBestFriendsChart(collaborators.slice(0, 5))
        }
    }).catch (error => {
        console.error("Error loading navbar data:", error)
    })
}

function loadRatioData() {
    const token = localStorage.getItem('jwtToken')
    const query = `{ 
        user {
            auditRatio totalUp totalDown
        }
    }`

    fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ query })
    }).then(res => {
        return res.json()
    }).then(data =>{
        if (data.data && data.data.user[0]) {
            const ratio = data.data.user[0].auditRatio
            const totalUp = data.data.user[0].totalUp
            const totalDown = data.data.user[0].totalDown
            
            document.getElementById('ratioDisplay').textContent = ratio.toFixed(2)
            
            const completedPercentage = (totalUp / (totalUp + totalDown)) * 100
            drawRatioChart({ completed: completedPercentage, missed: 100 - completedPercentage })
        }
    }).catch (error => {
        console.error("Error loading navbar data:", error)
    })
}

async function loadCurrentProject() {
    const token = localStorage.getItem('jwtToken')
    const query = `{
        progress(
            where: { isDone: { _eq: false } }, 
            order_by: { createdAt: desc }, 
            limit: 1
        ) {
            objectId
            object {
                id
                name
                type
                attrs
                createdAt
                updatedAt
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
        
        if (data.data && data.data.progress[0]) {
            const projectName = data.data.progress[0].object.name
            document.getElementById('projectName').textContent = projectName
            
            const teamQuery = `{
                group(where: {path: {_ilike: "%${projectName}%"}, status: {_eq: working}}, limit: 1) {
                    members {
                        userLogin
                    }
                }
            }`
            
            const teamResponse = await fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ query: teamQuery })
            })
            const teamData = await teamResponse.json()
            
            if (teamData.data && teamData.data.group[0]) {
                const membersList = document.getElementById('teamMembersList')
                membersList.innerHTML = ''
                
                teamData.data.group[0].members.forEach(member => {
                    const listItem = document.createElement('li')
                    listItem.style.cssText = 'font-size: 14px; color: #9ca3af; display: flex; align-items: center; gap: 8px; margin-bottom: 4px;'
                    listItem.innerHTML = `
                        <svg style="height: 16px; width: 16px; color: #a78bfa;" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                        </svg>
                        <span>${member.userLogin}</span>
                    `
                    membersList.appendChild(listItem)
                })
            }
        }
    } catch (error) {
        console.error("Error loading current project:", error)
    }
}

function drawBestFriendsChart(data) {
    const svg = document.getElementById('bestFriendsChart')
    if (!svg || !data || data.length === 0) return
    svg.innerHTML = ''
    
    const svgWidth = svg.getBoundingClientRect().width || 350
    const svgHeight = 250
    const margin = { top: 20, right: 20, bottom: 40, left: 40 }
    const chartWidth = svgWidth - margin.left - margin.right
    const chartHeight = svgHeight - margin.top - margin.bottom
    
    const maxCollaborations = Math.max(...data.map(d => d.collaborations))
    const barWidth = chartWidth / data.length * 0.7
    const gap = chartWidth / data.length * 0.3
    
    data.forEach((d, i) => {
        const barHeight = (d.collaborations / maxCollaborations) * chartHeight
        const x = margin.left + (i * (barWidth + gap))
        const y = margin.top + (chartHeight - barHeight)
        
        const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        bar.setAttribute('x', x)
        bar.setAttribute('y', y)
        bar.setAttribute('width', barWidth)
        bar.setAttribute('height', barHeight)
        bar.setAttribute('fill', '#818cf8')
        bar.setAttribute('rx', 8)
        bar.setAttribute('ry', 8)
        svg.appendChild(bar)
        
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text")
        label.setAttribute('x', x + barWidth / 2)
        label.setAttribute('y', svgHeight - margin.bottom + 10)
        label.setAttribute('text-anchor', 'middle')
        label.classList.add('bar-label')
        label.textContent = d.name.length > 10 ? d.name.substring(0, 10) + '...' : d.name
        svg.appendChild(label)
        
        const value = document.createElementNS("http://www.w3.org/2000/svg", "text")
        value.setAttribute('x', x + barWidth / 2)
        value.setAttribute('y', y - 5)
        value.setAttribute('text-anchor', 'middle')
        value.classList.add('bar-value')
        value.textContent = d.collaborations
        svg.appendChild(value)
    })
}

function drawRatioChart(data) {
    const svg = document.getElementById('ratioChart')
    if (!svg) return
    svg.innerHTML = ''
    const size = 250
    const radius = 100
    const strokeWidth = 20
    const circumference = 2 * Math.PI * radius

    const total = data.completed + data.missed
    if (total === 0) {
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
        text.setAttribute('x', size / 2)
        text.setAttribute('y', size / 2)
        text.setAttribute('text-anchor', 'middle')
        text.setAttribute('dominant-baseline', 'middle')
        text.classList.add('donut-subtext')
        text.textContent = "No data yet."
        svg.appendChild(text)
        return
    }

    const completedPercentage = data.completed / 100
    const missedPercentage = data.missed / 100

    const completedDash = circumference * completedPercentage
    const missedDash = circumference * missedPercentage

    const completedCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    completedCircle.setAttribute('cx', size / 2)
    completedCircle.setAttribute('cy', size / 2)
    completedCircle.setAttribute('r', radius)
    completedCircle.setAttribute('fill', 'none')
    completedCircle.setAttribute('stroke', '#34d399')
    completedCircle.setAttribute('stroke-width', strokeWidth)
    completedCircle.setAttribute('stroke-dasharray', `${completedDash} ${circumference - completedDash}`)
    completedCircle.setAttribute('transform', `rotate(-90 ${size / 2} ${size / 2})`)
    svg.appendChild(completedCircle)
    
    const missedCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    missedCircle.setAttribute('cx', size / 2)
    missedCircle.setAttribute('cy', size / 2)
    missedCircle.setAttribute('r', radius)
    missedCircle.setAttribute('fill', 'none')
    missedCircle.setAttribute('stroke', '#ef4444')
    missedCircle.setAttribute('stroke-width', strokeWidth)
    missedCircle.setAttribute('stroke-dasharray', `${missedDash} ${circumference - missedDash}`)
    missedCircle.setAttribute('stroke-dashoffset', -completedDash)
    missedCircle.setAttribute('transform', `rotate(-90 ${size / 2} ${size / 2})`)
    svg.appendChild(missedCircle)
    
    const percentText = document.createElementNS("http://www.w3.org/2000/svg", "text")
    percentText.setAttribute('x', size / 2)
    percentText.setAttribute('y', size / 2 - 10)
    percentText.setAttribute('text-anchor', 'middle')
    percentText.classList.add('donut-text')
    percentText.textContent = `${data.completed.toFixed(0)}%`
    svg.appendChild(percentText)
    
    const subText = document.createElementNS("http://www.w3.org/2000/svg", "text")
    subText.setAttribute('x', size / 2)
    subText.setAttribute('y', size / 2 + 15)
    subText.setAttribute('text-anchor', 'middle')
    subText.classList.add('donut-subtext')
    subText.textContent = 'Audit Success'
    svg.appendChild(subText)
}