
export async function personalInfos() {
    let token = localStorage.getItem('jwtToken')
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
                Authorization: `Bearer ${token}`, //Bearer means : Anyone who possesses this token can access the protected resources it's tied to
                //bears : holds
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

export async function fetchAllProfileData(token, login) {
    const combinedQuery = `{
        xpData: user {
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
        
        friendsData: user {
            finished_projects: groups(where: {
                group: {status: {_eq: finished}, _and: 
                    {eventId: {_eq: 41}}
                }
            }) {
                group { path members { userLogin } }
            }
        }

        ratioData: user {
            auditRatio
            totalUp
            totalDown
        }
        
        projectData: progress(
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
    }`;

    try {
        const res = await fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query: combinedQuery })
        });

        const data = await res.json();
        if (data.error) throw data.error;

        const user = data.data;

        // Extract XP data
        let totalXp = 0;
        let level = 0;
        if (user.xpData[0]) {
            totalXp = user.xpData[0].totalXP.aggregate.sum.amount;
            level = user.xpData[0].level[0]?.amount;
        }
        const xpResult = { "totalXp": totalXp, "level": level };

        // Extract friend data
        let collaborators = [];
        if (user.friendsData[0]) {
            user.friendsData[0].finished_projects.forEach(project => {
                project.group.members.forEach(member => {
                    if (member.userLogin !== login) {
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
        }
        const friendsResult = collaborators;

        // Extract ratio data
        const ratioUser = user.ratioData[0];
        const ratioResult = {
            ratio: ratioUser.auditRatio,
            totalUp: ratioUser.totalUp,
            totalDown: ratioUser.totalDown
        };
        
        // Extract current project and team members data
        const currentProjectData = user.projectData[0];
        const currentProject = currentProjectData?.object?.name || "No project";
        const teamMembers = currentProjectData?.group?.members.map(member => ({
            login: member.user.login,
        })) || [];

        return {
            xp: xpResult,
            friends: friendsResult,
            ratio: ratioResult,
            currentProject: currentProject,
            teamMembers: teamMembers
        };

    } catch (error) {
        console.error("Error fetching all profile data:", error);
    }
}