function checkLogin() {
    if (localStorage.getItem('user') != null) {
        const navBar = document.querySelector('nav');
        const navItem = navBar.lastElementChild;
        navItem.innerText = "Welcome, " + localStorage.getItem('username');
        navItem.href = "home.html";

        const logout = document.createElement('a');
        logout.href = "#";
        logout.innerText = "Log Out";
        logout.addEventListener("click", removeUserInfo);
        navBar.appendChild(logout);
    }
}

function removeUserInfo() {
    if (confirm("Are you sure you want to log out?")) {
        localStorage.removeItem('user');
        localStorage.removeItem('username');
        window.location.href = "index.html";
    }
}

/*============================= REGISTRATION AND LOGIN =============================*/
if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) == "regLogin.html") {
    console.log("You're in the regLogin!");
    document.querySelector('.submit').addEventListener("click", registerUser);
    document.querySelector('.loginSubmit').addEventListener("click", loginUser);
}

function checkPasswords() {
    const password = document.querySelector(".password").value;
    const checkPassword = document.querySelector(".checkPassword").value;

    if (password === checkPassword) {
        return password;
    } else {
        alert("Passwords don't match, please re-enter");
    }
}

function registerUser() {
    // THROW ERROR IS USER EXISTS
    const makeUsername = document.querySelector('.username').value;
    localStorage.setItem('username', makeUsername);

    fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: makeUsername,
            password: checkPasswords()
        })
    })
        .then(function(res) {
            if (res.status === 500) {
                alert("Username is taken");
            }
        })
        // CHECK IF USER EXISTS? IF YES, POST ERROR
        // ALSO REFRESH TO LANDING PAGE
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            localStorage.setItem('user', res.token);
            if (res.token) { // DO I GET A RESPONSE? IF YES:
                window.location.href = "home.html";
            }
            // makePost();
        })
        // .then(function(res) {
        //     if (res.status === 400) {
        //         alert("Username is taken");
        //     }
        // })
        .catch((error) => {
            console.log(error);
        })
}

function loginUser() {
    // LOGIN USER USING THE CREDENTIALS
    const username = document.querySelector('.loginUsername').value;
    const userPassword = document.querySelector('.loginPassword').value;
    localStorage.setItem('username', username);

    fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: userPassword
        })
    })

        // CHECK IF USER EXISTS? IF NO, POST ERROR
        // ALSO REFRESH TO LANDING PAGE        
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            localStorage.setItem('user', res.token);
            if (res.token) { // DO I GET A RESPONSE? IF YES:
                window.location.href = "home.html";
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

/*============================= POSTS AND COMMENTS ON HOME PAGE =============================*/

if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) == "home.html") {
    console.log("You're in the home page!");
    checkLogin();
    postToLanding();
}

// PUTS USER INPUT INTO A LIST ITEM
// CREATES A FORM FIELD FOR COMMENTS INTO THE LIST ITEM
// GET THE COMMENTS FOR THE POST
// Posts our post to landing lol
function postToLanding() {

    fetch("http://localhost:8080/post/list", {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('user'),
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            const list = document.querySelector('.allPosts');

            for (let i = 0; i < res.length; i++) {
                // CREATE AN ITEM, WITH H3 AND P TAGS
                const item = document.createElement('li');

                item.classList.add("post");
                item.id = `${res[i].id}`;

                const title = document.createElement('h3');
                title.classList.add("postTitle");

                const postingUser = document.createElement('h3');
                postingUser.classList.add("username");

                const post = document.createElement('p');
                post.classList.add("postText");

                title.innerText = `Title: ${res[i].title}`;
                post.innerText = res[i].description;
                postingUser.innerText = `Post by: ${res[i].user.username}`;

                item.append(title, post, postingUser);
                list.append(item);
            }

        })
        .catch((error) => {
            console.log(error);
        })
}

/*============================= POSTS AND COMMENTS ON PROFILE PAGE =============================*/

if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) == "index.html") {
    console.log("You're in the landing page!");
    checkLogin();
}












/*
OUR PROBLEMS RIGHT NOW:

- Show the user that their registration already exists/login does not exist
- When the user is logged in, don't allow them to access the login page (Welcome user!)

- DELETE POSTS
- UPDATE PROFILE (which is just the mobile #)

BONUS:
- Make profile page that shows the user's info
- Show the users posts in their profile
*/