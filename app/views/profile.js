import { authLayout } from "./authLayout.js"
import { fetchAllProfileData, personalInfos } from "../controllers/profile.js"


export function profile() {
    authLayout(renderProfile)
}

function renderProfile() {
    const contentWrapper = document.getElementById('contentWrapper')
    contentWrapper.innerHTML = `
    <div class="animate-fade-in container" style="width: 100%; max-width: 1200px; padding: 32px; border-radius: 12px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5); background: rgba(31, 41, 55, 0.9); border: 1px solid rgba(55, 65, 81, 0.5); display: flex; gap: 32px; margin-bottom = 20px">
        
        <div class ="personal-Infos-div" style="width: 33%; padding: 24px; border-radius: 12px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3); background: linear-gradient(135deg, #374151 0%, #4B5563 100%); display: flex; flex-direction: column; align-items: center;">
            <img src="https://placehold.co/120x120/4A5568/E2E8F0?text=User" alt="User Avatar" style="width: 128px; height: 128px; border-radius: 50%; margin-bottom: 16px; border: 4px solid #818cf8;">
            <h1 id="profileName" style="font-size: 28px; font-weight: 800; color: white; margin: 0 0 8px 0;">Loading...</h1>
            <p style="font-size: 14px; color: #9ca3af; margin-bottom: 32px;">Personal Information</p>
            <div style="width: 100%; font-size: 14px; color: #d1d5db;">
                <div style="margin-bottom: 16px;">
                    <span style="font-weight: 600; color: #9ca3af;">Name:</span> 
                    <span id="userName"></span>
                </div>
                <div style="margin-bottom: 16px;">
                    <span id = "profile-username" style="font-weight: 600; color: #9ca3af;">Username:</span> 
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
                <div style="margin-bottom: 16px;">
                    <span id = "profile-country" style="font-weight: 600; color: #9ca3af;">Country:</span> 
                    <span id="country"></span>
                </div>
                <div style="margin-bottom: 16px;">
                    <span style="font-weight: 600; color: #9ca3af;">Birth city:</span> 
                    <span id="birthCity"></span>
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
    getAllData()
}

async function loadUserData() {
    let userInfos = await personalInfos()
    document.getElementById('profileName').textContent = `${userInfos.firstName} ${userInfos.lastName}`
    document.getElementById('userName').textContent = `${userInfos.firstName} ${userInfos.lastName}`
    document.getElementById('userUsername').textContent = userInfos.login
    document.getElementById('userEmail').textContent = userInfos.email
    document.getElementById('userPhone').textContent = userInfos.tel
    document.getElementById('country').textContent = userInfos.country
    document.getElementById('birthCity').textContent = userInfos.birthCity
}

function drawBestFriendsChart(data, login) {
    const svg = document.getElementById('bestFriendsChart')
    if (!svg || !data || data.length === 0) return
    svg.innerHTML = ''

    const svgWidth = svg.getBoundingClientRect().width || 350
    const svgHeight = 250
    const margin = { top: 20, right: 10, bottom: 40, left: 20 }
    const chartWidth = svgWidth - margin.left - margin.right
    const chartHeight = svgHeight - margin.top - margin.bottom

    const maxCollaborations = Math.max(...data.map(d => d.count)) // to find the highest number of collaborations
    const barWidth = chartWidth / data.length * 0.7
    const gap = chartWidth / data.length * 0.3

    data.forEach((d, i) => {
        console.log("i is :", i);
        
        const barHeight = (d.count / maxCollaborations) * chartHeight
        const x = margin.left + (i * (barWidth + gap))
        const y = margin.top + (chartHeight - barHeight)

        const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        bar.setAttribute('x', x)
        bar.setAttribute('y', y)
        bar.setAttribute('width', barWidth)
        bar.setAttribute('height', barHeight)
        bar.setAttribute('fill', '#818cf8')
        bar.setAttribute('rx', 8)
        svg.appendChild(bar)

        const label = document.createElementNS("http://www.w3.org/2000/svg", "text")
        label.setAttribute('x', x + barWidth / 2)
        label.setAttribute('y', svgHeight - margin.bottom + 10)
        label.setAttribute('text-anchor', 'middle')
        label.classList.add('bar-label')
        label.textContent = d.name
        svg.appendChild(label)

        const value = document.createElementNS("http://www.w3.org/2000/svg", "text")
        value.setAttribute('x', x + barWidth / 2)
        value.setAttribute('y', y - 5)
        value.setAttribute('text-anchor', 'middle')
        value.classList.add('bar-value')
        value.textContent = d.count
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

async function getAllData(){
    const token = localStorage.getItem('jwtToken')
    let userInfos = await personalInfos()
    let allDataJson = await fetchAllProfileData(token, userInfos.login)

    //level
    document.getElementById('totalXP').textContent = `${(allDataJson.xp.totalXp / 1000).toFixed(2)} kB`
    document.getElementById('userLevel').textContent = allDataJson.xp.level.toString()

    //Ratio
    document.getElementById('ratioDisplay').textContent = allDataJson.ratio.ratio.toFixed(2)
    const completedPercentage = (allDataJson.ratio.totalUp / (allDataJson.ratio.totalUp + allDataJson.ratio.totalDown)) * 100
    drawRatioChart({ completed: completedPercentage, missed: 100 - completedPercentage })

    //Current Project
    document.getElementById('projectName').textContent = allDataJson.currentProject
    const teamData = allDataJson.teamMembers
    if (teamData.length > 0) {
        const membersList = document.getElementById('teamMembersList');
        membersList.innerHTML = '';

        teamData.forEach(memberLogin => {
            const listItem = document.createElement('li');
            listItem.style.cssText = 'font-size: 14px; color: #9ca3af; display: flex; align-items: center; gap: 8px; margin-bottom: 4px;';
            listItem.innerHTML = `
                        <svg style="height: 16px; width: 16px; color: #a78bfa;" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                        </svg>
                        <span>${memberLogin.login}</span>
                    `;
            membersList.appendChild(listItem);
        });
    }

    //freindData
    let friends = allDataJson.friends
    drawBestFriendsChart(friends.slice(0, 5),)
}