
// async function fetchProfileData() {
//     const url = 'https://raw.githubusercontent.com/digitalinnovationone/js-developer-portfolio/main/data/profile.json';
//     const response = await fetch(url)
//     const profileData = await response.json()
//     return profileData
// }


const requestApi = async () => {
    const url = "https://raw.githubusercontent.com/RamonCosta-DEV/js-developer-portfolio/refs/heads/main/data/profile.json";
    const response = await fetch(url)
    const result = await response.json()
    return result
}

console.log(requestApi())