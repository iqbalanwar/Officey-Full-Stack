function checkLogin() {
    if (localStorage.getItem('user') != null) {
        // Edit navbar a loginstatus
        // Say welcome!
        const navItem = document.querySelector('nav').lastElementChild;
        navItem.innerText = "Welcome, " + localStorage.getItem('username');

        // navItem.style.display = "none";

        // const welcomeUser = document.createElement('div');
        // welcomeUser.innerText = `Welcome "${localStorage.getItem('username')}"`;
        // document.querySelector('.navbar').append(welcomeUser);

        // const dropdown = document.createElement('div');
        // dropdown.classList.add("dropdown");
        // const logoutButton = document.createElement('button');
        // logoutButton.classList.add("dropbtn");
        // const dropdownContent = document.createElement('div')
        // dropdownContent.classList.add("dropdown-content");
        // const signOut = document.createElement('a');
        // signOut.classList.add("sign-out");
        // signOut.innerText = "Sign out"
        // // const logoutButton = document.querySelector('.sign-out');
        // // logoutButton.innerText = "Log out";
        // dropdownContent.append(signOut);
        // dropdown.append(logoutButton, dropdownContent);
        // document.querySelector('.navbar').append(dropdown);


        // signOut.addEventListener('click', () => {
        //     localStorage.removeItem('user');
        //     localStorage.removeItem('username');

        //     document.querySelector('.dropdown').style.display = "none";

        //     aTag.style.display = "block";

        //     window.location.reload(false);
        // });


        // dropdown.append(logoutButton);
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