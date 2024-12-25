let names = [];
const apiUrl = "https://your-backend-url.com"; // Replace with your backend URL

function addName() {
    const nameInput = document.getElementById("name");
    if (nameInput.vaule.trim()) {
        names.push(nameInput.vaule.trim());
        updateNameList();
        nameInput.vaule = "";
    }
}

function updateNameList() {
    const nameList = document.getElementById("name-list");
    nameList.innerHTML = names.map(name => '<li>${name}</li>').join("");
}

async function generateSanta() {
    if (names.length < 2){
        alert("Please enter at least 2 names.");
        return;
    } 
    
    const response = await fetch('${apiURL}/generate', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ names })
    });

    const { link } =await response.json();
    document.getElementById("link").innerHTML = `<a href="${link}" target="_blank">View Assignments</a>`;
}