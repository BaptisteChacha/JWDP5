
const urlParams = new URLSearchParams(window.location.search);
const types = urlParams.get('type');
document.addEventListener("DOMContentLoaded", function () {
    Info('http://localhost:3000/api/' + types + '/order')
})
