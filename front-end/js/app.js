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

// PUTS USER INPUT INTO A LIST ITEM
// CREATES A FORM FIELD FOR COMMENTS INTO THE LIST ITEM
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
            const list = document.querySelector('.allPosts');

            for (let i = 0; i < res.length; i++) {
                // CREATE AN ITEM, WITH H3 AND P TAGS
                const postItem = document.createElement('div');

                postItem.classList.add("post");
                postItem.id = `${res[i].id}`;

                const title = document.createElement('h3');
                title.classList.add("postTitle");

                // const postingUser = document.createElement('h3');
                // postingUser.classList.add("username");

                const post = document.createElement('p');
                post.classList.add("postText");

                title.innerText = `Title: ${res[i].title}`;
                post.innerText = res[i].description;
                // postingUser.innerText = `Post by: ${res[i].user.username}`;


                // EVERY POST HAS A DELETE BUTTON
                // BUT SEND AN ERROR IF USER TRIES TO DELETE SOMETHING THAT'S NOT THEIRS
                const deletePostBtn = document.createElement('button');
                deletePostBtn.classList.add("deletePostBtn");
                deletePostBtn.innerText = "Delete Post";

                deletePostBtn.addEventListener("click", function(event){
                    event.preventDefault();
                    deletePost(postItem.id);
                });
                

                commentsToPost(res[i].id);


                postItem.append(title, post, deletePostBtn);
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
            // WHY IS IT NOT TAKING POST ID?
            if (res.status === 200) {
                window.location.reload(false);
                prompt("success, deleted post");
            } else {
                alert("Please delete only your own posts.");
            }
        })
        .then((error) => {
            console.log(error);
        })
}


// function createComment(id) {
//     // WHEN SUBMIT COMMENT IS CLICKED, GET THE PARENT NODE'S ID
//     // PARENT NODE IS THE POST
//     // THEN CALL CREATE COMMENT
//     // CREATE COMMENT WILL POST THE COMMENT
//     let commentFieldInput = document.getElementById(`${id}`).querySelector('.commentField').value;

//     fetch(`http://thesi.generalassemb.ly:8080/comment/${id}`, {
//         method: 'POST',
//         headers: {
//             "Authorization": "Bearer " + localStorage.getItem('user'),
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             text: commentFieldInput
//         })
//     })
//         .then((res) => {
//             return res.json();
//         })
//         .then((res) => {
//             location.reload(false);
//         })
//         .then((error) => {
//             console.log(error);
//         })
//     // FIGURE OUT TO REFRESH THE PAGE ONLY AFTER THE POST WAS FINISHED
//     // window.location.reload(false);
// }

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

            // loop through, show all comments
            for (let i = 0; i < res.length; i++) {
                // a single comment item:
                const commentItem = document.createElement('div');
                commentItem.classList.add("comment");
                commentItem.id = `comment_${res[i].id}`;

                // THIS WILL HAVE THE USERNAME OF THE PERSON WHO MADE A COMMENT, FOR ALL THE COMMENTS
                // const commenter = document.createElement('p');
                // commenter.classList.add("commenter");
                // commenter.style.fontWeight = "bold";
                // commenter.innerText = `${res[i].user.username}: `;

                // text of a comment
                const commentDescription = document.createElement('p');
                commentDescription.classList.add("commentText");
                commentDescription.innerText = res[i].description;

                // commentItem.append(commentText);


                // EVERY COMMENT HAS A DELETE BUTTON
                // BUT SEND AN ERROR IF USER TRIES TO DELETE A COMMENT THAT'S NOT THEIRS
                const deleteComment = document.createElement('button');
                deleteComment.classList.add("deleteComment");
                deleteComment.innerText = "Delete Comment";

                commentItem.append(commentDescription, deleteComment);

                listOfComments.append(commentItem);

                // The following variable exists only to pass in the
                // comment id to the delete
                //const commentId = res[i].id;
                // deleteComment.addEventListener("click", function(event) {
                //     event.preventDefault();
                //     deleteComment(commentId);
                // })
            }

            post.append(listOfComments);
        })
        .then((error) => {
            console.log(error);
        })
}
// function deleteComment(commentId) {
//     fetch((`http://localhost:8080/comment/${commentId}`), {
//         method: 'DELETE',
//         headers: {
//             "Authorization": "Bearer " + localStorage.getItem('user'),
//             "Content-Type": "application/json"
//         }
//     })
//         // .then((res) => {
//         //     return res.json()
//         // })
//         .then((res) => {
//             if (res.status === 200) {
//                 //updateComments(listOfComments.id, commentItem.id);
//                 window.location.reload(false);
//                 prompt("success, deleted comment!");
//             } else {
//                 alert("Please delete only your own comments.");
//             }
//         })
//         .then((error) => {
//             console.log(error);
//         })
// }

// function updateCommentsInDom(listOfComments, commentId) {
//     const listComments = document.getElementById(`${listOfComments}`);
//     const comment = document.querySelector(`#${commentId}`);
//     listComments.removeChild(comment);
//     // console.log(comment);
// }

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