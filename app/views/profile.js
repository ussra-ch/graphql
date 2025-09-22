import { authLayout } from "./authLayout.js"
import { fetchAllProfileData, personalInfos } from "../controllers/profile.js"


export function profile() {
    authLayout(renderProfile)
}

function renderProfile() {
    const contentWrapper = document.getElementById('contentWrapper')
    contentWrapper.innerHTML = `
    <div class="animate-fade-in container dashboard-container" style="width: 100%; max-width: 1200px; padding: 32px; border-radius: 12px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5); background: rgba(31, 41, 55, 0.9); border: 1px solid rgba(55, 65, 81, 0.5); display: flex; gap: 32px; margin-bottom = 20px">
        
        <div class ="personal-Infos-div">
            <img src="https://placehold.co/120x120/4A5568/E2E8F0?text=User" alt="User Avatar" style="width: 128px; height: 128px; border-radius: 50%; margin-bottom: 16px; border: 4px solid #818cf8;">
            <h1 id="profileName" class="profile-name">Loading...</h1>
            <p class="profile-subtitle">Personal Information</p>
            <div class="info-container">
                <div class="info-item">
                    <span class="info-label">Name:</span> 
                    <span id="userName"></span>
                </div>
                <div class="info-item">
                    <span id = "profile-username" class="info-label">Username:</span> 
                    <span id="userUsername"></span>
                </div>
                <div class="info-item" style="margin-bottom: 16px;">
                    <span class="info-label">Email:</span> 
                    <span id="userEmail"></span>
                </div>
                <div class="info-item" style="margin-bottom: 16px;">
                    <span class="info-label">Phone:</span> 
                    <span id="userPhone"></span>
                </div>
                <div class="info-item" style="margin-bottom: 16px;">
                    <span class="info-label" id = "profile-country">Country:</span> 
                    <span id="country"></span>
                </div>
                <div class="info-item" style="margin-bottom: 16px;">
                    <span class="info-label">Birth city:</span> 
                    <span id="birthCity"></span>
                </div>
            </div>
        </div>

        <div class="main-content">
            <div class="metrics-grid">
                <div class="metric-card">
                    <span  class="metric-label">Total XP</span>
                    <span id="totalXP" class="metric-value">Loading...</span>
                </div>
                <div class="metric-card">
                    <span class="metric-label">Level</span>
                    <span id="userLevel" class="metric-value">Loading...</span>
                </div>
                <div class="metric-card">
                    <span class="metric-label">Ratio Rate</span>
                    <span id="ratioDisplay" class="metric-value">Loading...</span>
                </div>
            </div>
            
            <div class="current-project">
                <div class="project-header">
                    <span class="metric-label">Current Project</span>
                    <span id="projectName" class="project-name">Loading...</span>
                </div>
                <div class="team-section">
                    <h3 class="team-title">Team Members</h3>
                    <ul id="teamMembersList" class="team-list">>
                    </ul>
                </div>
            </div>

            <div class="charts-section">
                <div class="charts-grid">
                    <div class="chart-container">
                        <div class="chart-title">Top Collaborators</div>
                        <div class="chart-content">
                            <svg id="bestFriendsChart" width="100%" height="250"></svg>
                        </div>
                    </div>

                    <div class="chart-container">
                        <div class="chart-title">Audit Ratio</div>
                        <div class="chart-content">
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

    let containerWidth = 350

    const svgWidth = Math.max(250, containerWidth - 48) // 48px for container padding (24px * 2)
    const svgHeight = 250
    const margin = { top: 20, right: 10, bottom: 40, left: 20 }
    const chartWidth = svgWidth - margin.left - margin.right
    const chartHeight = svgHeight - margin.top - margin.bottom

    svg.setAttribute('width', svgWidth)
    svg.setAttribute('height', svgHeight)
    svg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`)

    const maxCollaborations = Math.max(...data.map(d => d.count))

    // Responsive bar sizing
    const availableWidth = chartWidth - (data.length - 1) * 6
    const barWidth = Math.max(20, availableWidth / data.length) // Minimum 20px bar width
    const gap = 6

    data.forEach((d, i) => {
        const barHeight = Math.max(5, (d.count / maxCollaborations) * chartHeight) // Minimum 5px height
        const x = margin.left + (i * (barWidth + gap))
        const y = margin.top + (chartHeight - barHeight)

        // Create bar
        const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        bar.setAttribute('x', x)
        bar.setAttribute('y', y)
        bar.setAttribute('width', barWidth)
        bar.setAttribute('height', barHeight)
        bar.setAttribute('fill', '#818cf8')
        bar.setAttribute('rx', Math.min(4, barWidth / 4))
        svg.appendChild(bar)

        // Create name label with responsive font size
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text")
        label.setAttribute('x', x + barWidth / 2)
        label.setAttribute('y', svgHeight - margin.bottom + 15)
        label.setAttribute('text-anchor', 'middle')
        label.setAttribute('font-size', "12px")
        label.setAttribute('fill', '#9ca3af')
        label.setAttribute('font-weight', '500')

        // Truncate long names for small screens
        const displayName = truncateText(d.name, barWidth)
        label.textContent = displayName
        svg.appendChild(label)

        // Create value label with responsive font size
        const value = document.createElementNS("http://www.w3.org/2000/svg", "text")
        value.setAttribute('x', x + barWidth / 2)
        value.setAttribute('y', y - 8)
        value.setAttribute('text-anchor', 'middle')
        value.setAttribute('font-size', '11px')
        value.setAttribute('fill', '#e5e7eb')
        value.setAttribute('font-weight', '600')
        value.textContent = d.count
        svg.appendChild(value)
    })
}

function truncateText(text) {
    if (window.innerWidth <= 480 && text.length > 8) {
        return text.substring(0, 6) + '...'
    }
    if (window.innerWidth <= 360 && text.length > 6) {
        return text.substring(0, 4) + '...'
    }
    return text
}

function drawRatioChart(data) {
    const svg = document.getElementById('ratioChart');
    if (!svg) return;

    svg.innerHTML = '';

    const size = 200;
    const radius = 74;
    const strokeWidth = 8;
    const circumference = 2 * Math.PI * radius;

    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('viewBox', `0 0 ${size} ${size}`);

    const total = data.completed + data.missed;
    if (total === 0) {
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute('x', size / 2);
        text.setAttribute('y', size / 2);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('font-size', 18);
        text.setAttribute('fill', '#9ca3af');
        text.textContent = "No data yet.";
        svg.appendChild(text);
        return;
    }

    const completedPercentage = data.completed / 100;
    const missedPercentage = data.missed / 100;

    const completedDash = circumference * completedPercentage;
    const missedDash = circumference * missedPercentage;

    // Completed circle (green)
    const completedCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    completedCircle.setAttribute('cx', size / 2);
    completedCircle.setAttribute('cy', size / 2);
    completedCircle.setAttribute('r', radius);
    completedCircle.setAttribute('fill', 'none');
    completedCircle.setAttribute('stroke', '#34d399');
    completedCircle.setAttribute('stroke-width', strokeWidth);
    completedCircle.setAttribute('stroke-linecap', 'round');
    completedCircle.setAttribute('stroke-dasharray', `0 ${circumference}`);
    completedCircle.setAttribute('transform', `rotate(-90 ${size / 2} ${size / 2})`);
    svg.appendChild(completedCircle);

    // Missed circle (red)
    const missedCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    missedCircle.setAttribute('cx', size / 2);
    missedCircle.setAttribute('cy', size / 2);
    missedCircle.setAttribute('r', radius);
    missedCircle.setAttribute('fill', 'none');
    missedCircle.setAttribute('stroke', '#ef4444');
    missedCircle.setAttribute('stroke-width', strokeWidth);
    missedCircle.setAttribute('stroke-linecap', 'round');
    missedCircle.setAttribute('stroke-dasharray', `0 ${circumference}`);
    missedCircle.setAttribute('stroke-dashoffset', 0);
    missedCircle.setAttribute('transform', `rotate(-90 ${size / 2} ${size / 2})`);
    svg.appendChild(missedCircle);

    // Main percentage text
    const textOffset = 10
    const percentText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    percentText.setAttribute('x', size / 2);
    percentText.setAttribute('y', (size / 2) - textOffset);
    percentText.setAttribute('text-anchor', 'middle');
    percentText.setAttribute('dominant-baseline', 'middle');
    percentText.setAttribute('font-size', 36);
    percentText.setAttribute('font-weight', 'bold');
    percentText.setAttribute('fill', '#ffffff');
    percentText.textContent = `${data.completed.toFixed(0)}%`;
    svg.appendChild(percentText);

    // Subtitle text
    const subTextOffset = 200
    const subText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    subText.setAttribute('x', size / 2);
    subText.setAttribute('y', (size / 2) + subTextOffset);
    subText.setAttribute('text-anchor', 'middle');
    subText.setAttribute('dominant-baseline', 'middle');
    subText.setAttribute('font-size', 36);
    subText.setAttribute('fill', '#9ca3af');
    subText.textContent = "Audit Success"
    svg.appendChild(subText);

    completedCircle.setAttribute('stroke-dasharray', `${completedDash} ${circumference - completedDash}`);
    missedCircle.setAttribute('stroke-dasharray', `${missedDash} ${circumference - missedDash}`);
    missedCircle.setAttribute('stroke-dashoffset', -completedDash);
}

async function getAllData() {
    const token = localStorage.getItem('jwtToken');
    let userInfos = await personalInfos();
    let allDataJson = await fetchAllProfileData(token, userInfos.login);

    // Level
    document.getElementById('totalXP').textContent = `${(allDataJson.xp.totalXp / 1000).toFixed(2)} kB`;
    document.getElementById('userLevel').textContent = allDataJson.xp.level.toString();

    document.getElementById('ratioDisplay').textContent = allDataJson.ratio.ratio.toFixed(2);
    const completedPercentage = (allDataJson.ratio.totalUp / (allDataJson.ratio.totalUp + allDataJson.ratio.totalDown)) * 100;
    drawRatioChart({ completed: completedPercentage, missed: 100 - completedPercentage });

    document.getElementById('projectName').textContent = allDataJson.currentProject;
    const teamData = allDataJson.teamMembers;
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

    // Friends data
    let friends = allDataJson.friends;
    drawBestFriendsChart(friends.slice(0, 5));
}