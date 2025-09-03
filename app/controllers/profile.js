let token = localStorage.getItem('jwtToken')
export function personalInfos() {
    let query = `
    {
    user{
    lastName
    firstName
    login
    email
    attrs
    }
}`

    fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ query })
        }).then(res => {
            return res.json()
        }).then(data => {
            if (data.error) throw data.error
            // console.log("first :", data.data.user[0].firstName);
            // console.log("last :", data.data.user[0].lastName);
            // console.log("login :", data.data.user[0].login);
            // console.log("email :", data.data.user[0].email);
            // console.log("attrs :", data.data.user[0].attrs.tel);
        })

}

export function friendSection() {
    const query = `{ 
        user {
            finished_projects: groups(where: {
                group: {status: {_eq: finished}, _and: 
                    {eventId: {_eq: 41}}
                }
            }) {
                group { path members { userLogin } }
            }
        }
    }`;

    fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ query })
        }).then((res) => {
            return res.json()
        }).then(data => {
            if (data.error) throw data.error
            let collaborators = [];
            data.data.user[0].finished_projects.forEach(project => {
                project.group.members.forEach(member => {
                    if (member.userLogin !== data.userName) {
                        let collab = collaborators.find(c => c.name === member.userLogin);
                        if (collab) {
                            collab.count++;
                        } else {
                            collaborators.push({ name: member.userLogin, count: 1 });
                        }
                    }
                });
            });
            collaborators.sort((a, b) => b.count - a.count);
            // console.log("collaborators are :", collaborators);
        })
}

export function ratioRate() {
    let query = `{ 
        user {
            auditRatio totalUp totalDown
        }
    }`;

    fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ query })
        }).then(res => {
            return res.json()
        }).then(data => {
            if (data.error) throw data.error
            let ratio
            ratio = data.data.user[0].auditRatio
            // console.log("ratio is :", ratio);
        })

}

export function currentProject() {
    let query = `{
    progress(
    where: { 
        isDone: { _eq: false } 
    }, 
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

    fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ query })
        }).then(res => {
            return res.json()
        }).then(data => {
            if (data.error) throw data.error
            let currectProject = data.data.progress[0].object.name
            console.log(currectProject);
        })
}