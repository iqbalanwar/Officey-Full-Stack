// If the user is logged in, the navbar is updated to say 'Welcome usernameHere'
// Next to the welcome is a logout button
// When they want to logout, it calls the removeUser
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
// If they want to logout, then it removes the user info from localStorage
// and redirects to the landing page
// So when checkLogin is called, localStorage.getItem('user'), which holds the token == null
// And checkLogin doesn't run when the token == null
function removeUserInfo() {
    if (confirm("Are you sure you want to log out?")) {
        localStorage.removeItem('user');
        localStorage.removeItem('username');
        window.location.href = "index.html";
    }
}

/* ======================================= REGISTRATION AND LOGIN ======================================= */

// Since we're using a single app.js, certain functions can only run on certain pages
// This does a check of which HTML page you're on, and runs the functions that are only
// supposed to run on this page
// EXAMPLE: FOR REGLOGIN, ONLY RUN registerUser AND loginUser
// Those two functions have other functions nested within them, that they're using
if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) == "regLogin.html") {
    console.log("You're in the regLogin!");
    document.querySelector('.submit').addEventListener("click", registerUser);
    document.querySelector('.loginSubmit').addEventListener("click", loginUser);
}

// IN THE RE-ENTER PASSWORDS FIELD
// THIS CHECKS IF BOTH PASSWORDS MATCH
// IF NOT, THEY HAVE TO MAKE THE PASSWORDS MATCH
function checkPasswords() {
    const password = document.querySelector(".password").value;
    const checkPassword = document.querySelector(".checkPassword").value;

    if (password === checkPassword) {
        return password;
    } else {
        alert("Passwords don't match, please re-enter");
    }
}

// Creates a new user
function registerUser() {
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
        // THROW ERROR IS USER EXISTS,
        // IF USER DOESN'T EXIST, THEN CONTINUE
        .then(res => {
            if (res.status == 500) {
                alert("Username is taken");
            } else {
                return res.json();
            }
        })
        .then(res => {
            localStorage.setItem('user', res.token);
            if (res.token) { // DO I GET A RESPONSE? IF YES:
                window.location.href = "home.html";
            }
        })
        .catch((error) => {

            console.log(error);
        })
}
// Login a user based on credentials in the user table in the database
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
            if (res.token == null) {
                alert("Your username/password is not correct (Case-sensitive!)");
            } else { // DO I GET A RESPONSE? IF YES:
                window.location.href = "home.html";
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

/* ======================================= POSTS AND COMMENTS ON HOME PAGE ======================================= */

// FOR HOME, ONLY RUN makePost AND postToHome
// Those two functions have other functions nested within them, that they're using
// postToHome runs on load (as of opening that page), but makePost can only be done pressing the submit button
if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) == "home.html") {
    console.log("You're in the home page!");
    checkLogin();
    document.querySelector('.postSubmit').addEventListener("click", makePost);
    postToHome();
}
// TAKES USER INPUT
// CALLS A FUNCTION TO POST IT IN THE DOM (postToLanding())
// SUBMIT BUTTON FROM /LANDING.HTML TAKEN
function makePost(event) {
    event.preventDefault();
    const title = document.querySelector('.postTitle').value;
    const post = document.querySelector('.postField').value;

    if (title == "" && post == "") {
        alert("You didn't enter a title or post!")
    } else if (title == "") {
        alert("Please enter a title")
    } else if (post == "") {
        alert("Please enter a post")
    } else {
        fetch("http://localhost:8080/post", {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('user'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                description: post
            })
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                window.location.reload(false);
            })
            .then((res) => {
                postToHome(res);
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

// PUTS USER INPUT INTO A DIV ITEM
// CREATES A FORM FIELD FOR COMMENTS, INTO THE DIV ITEM
// GET THE COMMENTS FOR THE POST
// Posts our post to landing lol
function postToHome() {

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
            // Targets the div allPosts, in the HTML, which will hold all the posts
            const list = document.querySelector('.allPosts');

            // Loops through the posts in database, shows all posts:
            for (let i = 0; i < res.length; i++) {
                // CREATE A SINGLE POST ITEM DIV, THAT WILL HAVE H3 AND P TAGS
                const postItem = document.createElement('div');
                postItem.classList.add("post");
                postItem.id = `${res[i].id}`;

                // name of the user posting will be held here
                const postingUser = document.createElement('h4');
                postingUser.classList.add("username");

                // title of the post will be held here
                const title = document.createElement('h3');
                title.classList.add("postTitle");

                // description (content of the post) will be held here
                const post = document.createElement('p');
                post.classList.add("postText");

                // Puts the posting username, title, and description into the tags
                postingUser.innerText = `Post by: ${res[i].user.username}`;
                title.innerText = `Title: ${res[i].title}`;
                post.innerText = res[i].description;


                // EVERY POST HAS A DELETE BUTTON
                // BUT SEND AN ERROR IF USER TRIES TO DELETE SOMETHING THAT'S NOT THEIRS
                const deletePostBtn = document.createElement('button');
                deletePostBtn.classList.add("deletePostBtn");
                deletePostBtn.innerText = "Delete Post";

                deletePostBtn.addEventListener("click", function(event){
                    event.preventDefault();
                    deletePost(postItem.id);
                });


                // Runs this function, which shows all the comments of a post
                commentsToPost(postItem.id);
                // CREATE A COMMENT FORM, WITH A TEXT AREA, SUBMIT AND DELETE BUTTONS
                const commentField = document.createElement('textarea');
                commentField.classList.add("commentField");
                const submitComment = document.createElement('button');
                submitComment.classList.add("submitComment");
                submitComment.innerText = "Comment";
                // When the submit comment button is clicked, it runs the function createComment
                submitComment.addEventListener('click', function () {
                    event.preventDefault();
                    // pass in the id of the post into createComment
                    createComment(event.target.parentNode.getAttribute('id'));
                });

                // THE POST ITEM DIV TAKES posting username, title of post, post description, delete post,
                // comment field, and comment submit button
                postItem.append(postingUser, title, post, deletePostBtn, commentField, submitComment);
                // This will put the post item to allPosts, which is targeted earlier and give the name 'list'
                list.append(postItem);
            }

        })
        .catch((error) => {
            console.log(error);
        })
}

function deletePost(postId) {
    //const postId = event.target.parentNode.id;
    // SO, THIS FUNCTION IS WORKING. YOU CAN DELETE
    fetch((`http://localhost:8080/post/${postId}`), {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('user'),
            "Content-Type": "application/json"
        }
    })
        // .then((res) => {
        //     return res.json()
        // })
        .then((res) => {
            if (res.status === 200) {
                window.location.reload(false);
                alert("success, deleted post");
            } else {
                alert("Please delete only your own posts.");
            }
        })
        .catch((error) => {
            console.log(error);
        })
}


function createComment(postId) {
    // WHEN SUBMIT COMMENT IS CLICKED, GET THE PARENT NODE'S ID
    // PARENT NODE IS THE POST
    // THEN CALL CREATE COMMENT
    // CREATE COMMENT WILL POST THE COMMENT
    let commentFieldInput = document.getElementById(`${postId}`).querySelector('.commentField').value;

    // If user puts nothing into the comment field, then call it will send an alert
    if (commentFieldInput == "") {
        alert("Please enter a comment");
    } else {
        fetch(`http://localhost:8080/comment/${postId}`, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('user'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                description: commentFieldInput
            })
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                window.location.reload(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

// VIEW COMMENTS ON A POST
// GET REQUEST RETURNS AN ARRAY OF COMMENTS OF THAT POST
function commentsToPost(postId) {
    fetch(`http://localhost:8080/comment/${postId}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('user'),
            "Content-Type": "application.json"
        }
    })
        .then((res) => {
            //console.log(res);
            return res.json();
        })
        .then((res) => {
            // will hold comments from a specific post
            const listOfComments = document.createElement('div');
            listOfComments.classList.add("listOfComments");
            listOfComments.id = `listComments_${postId}`;
            // retrieving the post that these comments are for, from the DOM
            // we're gonna attach to this post
            const post = document.getElementById(`${postId}`);

            // loop through comments in database, show all comments
            for (let i = 0; i < res.length; i++) {
                // a single comment item:
                const commentItem = document.createElement('div');
                commentItem.classList.add("comment");
                commentItem.id = `comment_${res[i].id}`;

                // THIS WILL HAVE THE USERNAME OF THE PERSON WHO MADE A COMMENT, FOR ALL THE COMMENTS
                const commenter = document.createElement('p');
                commenter.classList.add("commenter");
                commenter.style.fontWeight = "bold";
                commenter.innerText = `${res[i].user.username}: `;

                // text of a comment
                const commentDescription = document.createElement('p');
                commentDescription.classList.add("commentText");
                commentDescription.innerText = res[i].description;

                // EVERY COMMENT HAS A DELETE BUTTON
                // BUT SEND AN ERROR IF USER TRIES TO DELETE A COMMENT THAT'S NOT THEIRS
                const deleteCommentBtn = document.createElement('button');
                deleteCommentBtn.classList.add("deleteCommentBtn");
                deleteCommentBtn.innerText = "Delete Comment";

                commentItem.append(commenter, commentDescription, deleteCommentBtn);

                listOfComments.append(commentItem);

                // The following variable exists only to pass in the
                // comment id to the delete
                const commentId = res[i].id;
                deleteCommentBtn.addEventListener("click", function(event) {
                    event.preventDefault();
                    deleteComment(commentId);
                });
            }

            post.append(listOfComments);
        })
        .catch((error) => {
            console.log(error);
        })
}
function deleteComment(commentId) {
    fetch((`http://localhost:8080/comment/${commentId}`), {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('user'),
            "Content-Type": "application/json"
        }
    })
        // .then((res) => {
        //     return res.json()
        // })
        .then((res) => {
            if (res.status === 200) {
                //updateComments(listOfComments.id, commentItem.id);
                window.location.reload(false);
                alert("success, deleted comment!");
            } else {
                alert("Please delete only your own comments.");
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

/* ======================================= POSTS AND COMMENTS ON PROFILE PAGE ======================================= */

if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) == "profile.html") {
    console.log("You're in the profile page!");
    checkLogin();
    postOnProfile();
    commentsToPostOnProfile();
}

function postOnProfile() {
    fetch("http://localhost:8080/post/user/list", {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('user'),
            "Content-Type": "application.json"
        }
    })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            const list = document.querySelector('.allUserPosts');
            console.log(list);

            for (let i = (res.length - 1); i > 0; i--) {
                // CREATE AN ITEM, WITH H3 AND P TAGS
                const item = document.createElement('div');
                item.classList.add("userPost");
                item.id = `user_post_${res[i].id}`;
                const title = document.createElement('h3');
                title.classList.add("userPostTitle");
                const post = document.createElement('p');
                post.classList.add("userPostText");
                title.innerText = res[i].title;
                post.innerText = res[i].description;
                console.log(res[i]);

                commentsToPost(res[i].id);

                // ITEM TAKES TITLE, POST, COMMENTFIELD, AND SUBMITCOMMENT
                item.append(title, post);
                list.append(item);
            }
        })
        .catch((error) => {
            console.log(error);
        })
}


function commentsToPostOnProfile(postId) {
    fetch(`http://localhost:8080/comment/${postId}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('user'),
            "Content-Type": "application.json"
        }
    })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            // will hold comments from a specific post
            const listOfComments = document.createElement('div');
            listOfComments.classList.add("listOfComments");
            listOfComments.id = `listComments_${postId}`;
            // retrieving the post that these comments are for, from the DOM
            // we're gonna attach to this post
            const post = document.getElementById(`user_post_${postId}`);

            // loop through comments in database, show all comments
            for (let i = 0; i < res.length; i++) {
                // a single comment item:
                const commentItem = document.createElement('div');
                commentItem.classList.add("comment");
                commentItem.id = `comment_${res[i].id}`;

                // THIS WILL HAVE THE USERNAME OF THE PERSON WHO MADE A COMMENT, FOR ALL THE COMMENTS
                const commenter = document.createElement('p');
                commenter.classList.add("commenter");
                commenter.style.fontWeight = "bold";
                commenter.innerText = `${res[i].user.username}: `;

                // text of a comment
                const commentDescription = document.createElement('p');
                commentDescription.classList.add("commentText");
                commentDescription.innerText = res[i].description;

                commentItem.append(commenter, commentDescription);

                listOfComments.append(commentItem);
              }
              if (listOfComments){
                post.append(listOfComments);}

              })
              .catch((error) => {
              console.log(error);
              })
}








/*
OUR PROBLEMS RIGHT NOW:
- UPDATE PROFILE

BONUS:
- Make profile page that shows the user's info
- Show the users posts in their profile
*/