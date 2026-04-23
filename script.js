let users = JSON.parse(localStorage.getItem("users")) || [];
let lostItems = JSON.parse(localStorage.getItem("lostItems")) || [];
let foundItems = JSON.parse(localStorage.getItem("foundItems")) || [];
let currentUser = localStorage.getItem("currentUser");


 
function signup() {
    let u = document.getElementById("newUsername").value;
    let e = document.getElementById("newEmail").value;
    let p = document.getElementById("newPassword").value;

    users.push({ username: u, email: e, password: p });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created!");
    window.location.href = "login.html";
}

function login() {
    let u = document.getElementById("username").value;
    let p = document.getElementById("password").value;

    let user = users.find(x => x.username === u && x.password === p);

    if (!user) return alert("Invalid login");

    localStorage.setItem("currentUser", u);
    window.location.href = "index.html";
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}



function readImage(inputId, previewId, callback) {
    let file = document.getElementById(inputId).files[0];
    if (!file) return callback("");

    let reader = new FileReader();

    reader.onload = function () {
        document.getElementById(previewId).src = reader.result;
        callback(reader.result);
    };

    reader.readAsDataURL(file);
}


 
function submitLost() {
    readImage("lostImage", "lostPreview", function(img) {

        lostItems.push({
            name: lostName.value,
            location: lostLocation.value,
            description: lostDesc.value,
            image: img,
            user: currentUser,
            type: "Lost"
        });

        localStorage.setItem("lostItems", JSON.stringify(lostItems));
        alert("Posted!");
        goHome();
    });
}


 
function submitFound() {
    readImage("foundImage", "foundPreview", function(img) {

        foundItems.push({
            name: foundName.value,
            location: foundLocation.value,
            description: foundDesc.value,
            image: img,
            user: currentUser,
            type: "Found"
        });

        localStorage.setItem("foundItems", JSON.stringify(foundItems));
        alert("Posted!");
        goHome();
    });
}


 
function display(items) {
    let out = document.getElementById("output");
    if (!out) return;

    out.innerHTML = items.map(i => `
        <div class="card">
            <h3>${i.name}</h3>
            <p>${i.location}</p>
            <p>${i.description}</p>
            ${i.image ? `<img src="${i.image}" class="preview-img">` : ""}
            <small>${i.type} - ${i.user}</small>
        </div>
    `).join("");
}


 
function searchItems() {
    let k = searchInput.value.toLowerCase();
    localStorage.setItem("searchKeyword", k);
    window.location.href = "search.html";
}



if (location.href.includes("myposts")) {
    display([...lostItems, ...foundItems].filter(i => i.user === currentUser));
}

if (location.href.includes("search")) {
    let k = (localStorage.getItem("searchKeyword") || "").toLowerCase();
    display([...lostItems, ...foundItems].filter(i => i.name.toLowerCase().includes(k)));
}


 
function goHome() {
    window.location.href = "index.html";
}


 
let w = document.getElementById("welcomeText");
if (w) w.innerText = "Welcome, " + currentUser;