
/*const urlParams = new URLSearchParams(window.location.search);
const types = urlParams.get('type');
document.addEventListener("DOMContentLoaded", function () {
    Info('http://localhost:3000/api/' + types + '/order')
})*/


function resumed() {
let utilisateurs = JSON.parse(localStorage.getItem("User"));
let resume = document.getElementById('resume');
console.log(utilisateurs.User.firstname)
    resume.innerHTML=`Salut ${utilisateurs.User.firstname} ${utilisateurs.User.lastName} `
}
resumed()