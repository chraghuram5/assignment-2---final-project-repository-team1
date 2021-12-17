# One News

## Mission
One news aims to make the world a better place by providing the users with personalized and relevant news thereby making them stay more informed and cognizant of the world around them

## Goals
- Display news based on the user preferences
- Ability to update the preferences anytime
- Ability to bookmark favorite articles
- Provide insights to the user by showing them popular sources preferred by the other users

## Team Members & Responsibilities
1. Luke Norris
- lnorri4@uic.edu
- [Luke Norris's github](https://github.com/lnorri4)
- Responsibilities: Front end, Testing

2. Raghuram Chepuri
- rchepu2@uic.edu
- [Raghuram Chepuri's github](https://github.com/rchepu2)
- Responsibilities: Front end, Back end, Testing, JIRA Management, CI/CD, and Docker

3. Angelo Straight
- astrai3@uic.edu
- [Angelo Straight's github](https://github.com/AngeloStraight)
- Responsibilities: Front end, Testing

## Tools & Resources

### Tools
1. [VSCode](https://vscode.dev/) Editor
2. [Git](https://git-scm.com/) for version control
3. [Postman](https://www.postman.com/) for Testing
4. [JIRA](https://one-news.atlassian.net/jira/software/c/projects/FCT1/boards/1) for Project Management

### Resources
1. [Professor Fulton's Youtube Channel](https://www.youtube.com/channel/UCglyC2nz03WdMECTpf9GLsg/featured)
2. [Node.js](https://nodejs.org/en/)
3. [Express.js](https://expressjs.com/)
4. [Ejs](https://ejs.co/)
5. [Passport.js](http://www.passportjs.org/)
6. [Sqlite3](https://www.npmjs.com/package/sqlite3)
7. [Docker](https://www.docker.com/) 

## Website URL
[One-news-app](https://one-news-app.herokuapp.com/)

## ER Diagram
![onew-news-ER-diagram](https://user-images.githubusercontent.com/89645796/144645133-a3ba3a5d-a66d-4262-8070-2d877bdc6394.jpg)

## Set Up and Run

1. Clone or Download the application as Zip Folder
2. Open new terminal and enter the following command to install dependencies
 ```
npm install
```
3. Start the application using

```
npm start
```
4. Access the application *http://localhost:8000/*

## Chart

### Temperature Forecast Chart
The first chart shows the temperature forecast for the city of Chicago for the next two days

### User preferences Chart
The second chart has two views:
1. View 1 shows the popular news source preferences of the users
2. View 2 shows the popular sources from which users bookmarked articles 

<img src="https://user-images.githubusercontent.com/89645796/144565159-0149bf55-84ee-4ef5-8c55-a55a1f2ed565.jpg" width="450" height="400"></img>
<img src="https://user-images.githubusercontent.com/89645796/144565721-83a4d725-b82f-498c-9d2d-2d9a68366ae2.jpg" width="450" height="400"></img>
<img src="https://user-images.githubusercontent.com/89645796/144564997-b4a4ee50-cc83-45ed-a8bd-3e2aa925078d.jpeg" width="400" height="800"></img>

## Testing

For testing the application, use the following command
```
npm run test
```
Test explanations

1. Tests the creation of user if not present
2. Tests the creation of user if present
3. Tests the getUser method
4. Tests getUser method if user is not present
5. Tests user update
6. Tests delete user
7. Tests the addition of bookmark 

