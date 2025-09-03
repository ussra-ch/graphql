export function profile(){
    let friendSection = document.createElement('div')
    friendSection.id = "fiendSection"

    let ratioRate = document.createElement('div')
    ratioRate.id = "ratioRate"

    let currentProjects = document.createElement('div')
    currentProjects.id = "currentProjects"

    document.body.append(friendSection, ratioRate, currentProjects)
}