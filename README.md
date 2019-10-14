# Officey-Full-Stack
Officey, but now featuring a back-end!

# Team Members
- Iqbal Anwar (<a href = "https://github.com/iqbalanwar">@iqbalanwar</a>)<br/>
- Santiago Ulloa (<a href="https://github.com/sulloa13">@sulloa13</a>)<br/>

## Tech Stack
- HTML5/CSS3/JavaScript
- Java (Spring Boot)
- PostgreSQL

# Design Decisions
<img alt = "database structure" src="./repo_images/erd_v2.PNG"/><br/>

# Completions

| Day             | 1-Friday                                                       | 2-Monday                                                        | 3-Tuesday                                                                  | 4-Wednesday                                                                   | 5-Thursday                                                       | 6-Friday                                                                                                                                                  |
|-----------------|----------------------------------------------------------------|-----------------------------------------------------------------|----------------------------------------------------------------------------|-------------------------------------------------------------------------------|------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| Goals           | - Get a user signup/login to work</br>- Set up post/comment tables | - Get the post/comment to work on postman</br>- Set up user profile | - Start on Testing</br>- Fix Comment Table</br>- Work on Front-End of signup/login | - Fix testing</br>- Complete Back-end</br>- Fix cors problem</br>- Front-end signup/login | - Design main page</br>- Test for signup/login errors from front-end | - Cleanup front-end and back-end code</br>- Find out why user object isn't displaying for posts/comments in backend</br>- Create and show profile page front-end |
| Task Completed? | No                                                             | Yes                                                             | No                                                                         | Yes                                                                           | Yes                                                              | Yes                                                                                                                                                       |
| To-Do List      | Set up post/comment tables                                     | Comments/Testing/Front-end                                      | Work on Front-End of signup/login                                          | Design main page front-end                                                    | Cleanup code, continue designing                                 |                                                                                                                                                           |
# General Approach 

We started off our project by plotting out the structure of the back-end. We knew from the start that we'd have four models: User, User Profiles, Posts, and Comments. Originally, we thought about building join tables to connect comments, posts, and users, but we quickly realized that a simpler solution would be just to have @ManyToOne mapping to "parent" tables (comments are children of posts and users, posts are children of users). After building our models, we mapped out what tasks we wanted our models to do (we wanted to display users, do CRUD on posts/comments, etc.). Once we had some structure of what we wanted to do, we built our controllers. There was a back-and-forth between building our endpoints and fixing errors in our service implementations, because we noticed problems arising when testing certain functions. Once we were done with our fundamental back-end, we went through our built code and checked for logical flaws. This includes questions like "should any user be allowed to delete any post/comment" and "do we necessarily need to add roles, or will administrative functionality be added via the database", and so on.

Afterwards, we started building the structure of our front-end application. Fortunately, we had much of the front-end scripting completed from the first project, which we did refactor. While refactoring, we saw some errors with our script from the first project, which we noted on and fixed as many as we could. We alternated between designing the site and building the script, focusing mainly on the regLogin page and home page, and on the profile page once we were content with those two pages.

During the entire process, we posted our issues on GitHub (whether logical or code errors). At the end of every day, we talked about what tasks we accomplished that day, and whether we were content with our tasks for that day. We also made quick plans for how we would approach the next day.

Though this was a two-person project, we're glad that we were able to relay our thoughts and problems to other developers available, because it helped us realize our flaws and improve upon them.

# Challenges

As mentioned before, we flagged all of our issues on Github.
Our most cumbersome issue was finding out the no-cors issue, between front-end and back-end.
Though we still have much of the front-end to refine, we're happy with what we have so far.

## Necessary Deliverables

- User stories to show the the work breakdown and project deliverables.

	- A link to your user stories — who are your users, what do they want, and why?
- A **10-minute** presentation, illustrating:
	- Your `README.md`.
	- Unit testing, by running at least one set of tests.
	- Triumphs.
	- Challenges.
