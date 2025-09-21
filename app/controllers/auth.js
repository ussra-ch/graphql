export function loadNavbarData() {
    const token = localStorage.getItem('jwtToken')
    
    const query = `{
        user {
            firstName
            lastName
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
            
            document.getElementById('navUserName').textContent = `${user.firstName} ${user.lastName}`
    
            const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
            document.getElementById('navAvatar').innerHTML = `
                <span style="font-size: 18px; font-weight: 600;">${initials}</span>
                <div class="nav-avatar-status"></div>
            `
        }
    }).catch (error => {
        console.error("Error loading navbar data:", error)
    })
}