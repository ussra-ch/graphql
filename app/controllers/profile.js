let token = localStorage.getItem('jwtToken')
export async function personalInfos() {
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

    try {
        const res = await fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query })
        });

        const data = await res.json();

        if (data.error) throw data.error;

        return {
            firstName: data.data.user[0].firstName,
            lastName: data.data.user[0].lastName,
            login: data.data.user[0].login,
            email: data.data.user[0].email,
            tel: data.data.user[0].attrs.tel,
            country: data.data.user[0].attrs.country,
            birthCity: data.data.user[0].attrs.birthCity,
        };

    } catch (error) {
        console.error("Error fetching user data:", error);
    }

}

export async function xp() {
    const xpQuery = `{
        user {
      level: transactions(
        where: {eventId: {_eq: 41}, type: {_eq: "level"}}
        order_by: {amount: desc}
        limit: 1
      ) {
        amount
      }
      totalXP: transactions_aggregate(
        where: {eventId: {_eq: 41}, type: {_eq: "xp"}}
      ) {
        aggregate {
          sum {
            amount
          }
        }
      }
    }
    }`

    try {
        const res = await fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query: xpQuery })
        });

        const data = await res.json();

        if (data.error) throw data.error;

        let totalXp = 0;
        let level = 0;
        if (data.data && data.data.user[0]) {
            totalXp = data.data.user[0].totalXP.aggregate.sum.amount
            level = data.data.user[0].level[0]?.amount;
        }
        return { "totalXp": totalXp, "level": level }


    } catch (error) {
        console.error("Error loading navbar data:", error);
    }
}

export async function friendSection(login) {
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

    try {
        const res = await fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query })
        });

        const data = await res.json();

        if (data.error) throw data.error;

        let collaborators = [];
        let username = await login

        data.data.user[0].finished_projects.forEach(project => {
            project.group.members.forEach(member => {
                if (member.userLogin !== username) {
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

        return collaborators;

    } catch (error) {
        console.error("Error fetching collaborators:", error);
    }
}

export async function ratioRate() {
    let query = `{ 
        user {
            auditRatio totalUp totalDown
        }
    }`;

    try {
        const res = await fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query })
        });

        const data = await res.json();

        if (data.error) throw data.error;

        const user = data.data.user[0];
        return {
            ratio: user.auditRatio,
            totalUp: user.totalUp,
            totalDown: user.totalDown
        };

    } catch (error) {
        console.error("Error loading navbar data:", error);
    }

}

export async function currentProject() {
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

    try {
        const res = await fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query })
        });

        const data = await res.json();

        if (data.error) throw data.error;

        const currentProject = data.data.progress[0]?.object?.name || "No project";

        return currentProject;

    } catch (error) {
        console.error("Error loading current project:", error);
    }
}
export async function teamMembers(token) {
    try {
        const query = `{
            progress(
                where: { isDone: { _eq: false } },
                order_by: { createdAt: desc },
                limit: 1
            ) {
                group {
                    members {
                        user {
                            login
                            firstName
                            lastName
                        }
                    }
                }
            }
        }`

        const response = await fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query })
        });

        const data = await response.json();

        if (data.data && data.data.progress[0]?.group?.members) {
            const members = data.data.progress[0].group.members.map(member => ({
                login: member.user.login,
            }));
            return members
        }
    } catch (error) {
        console.error("Error loading current project:", error)
    }
}
