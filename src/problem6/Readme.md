# Express TypeScript Score Board

## Description

This is a simple CRUD application built with ExpressJS and TypeScript, using `socket.io` for real-time score updates. 

## Features

* **Real-time Score Updates:**  Users can see their scores and the scores of other users update in real-time.
* **User Authentication:** Users must log in to increase their scores.
* **Top 10 Leaderboard:** View the top 10 users with the highest scores.

## Requirements

- Node.js (version 14 or higher recommended)
- npm (or yarn)

## Installation

1. **Clone the repository:**
   `git clone https://github.com/alta1212/code-challenge-Nguyen_Tuan_Anh.git`

2. **Move to project backend directory:**<br>
   `cd code-challenge-Nguyen_Tuan_Anh/src/PROBLEM6/Backend`

3. **Install dependencies:**<br>
   `npm install`

4. **Install dependencies on Drontend directory:**<br>
   Move to project frontend directory:

   `cd code-challenge-Nguyen_Tuan_Anh/src/PROBLEM6/Frontend`

   `npm install`

5. **Environment Configuration**<br>
   Rename .env.example files in both Backend and Frontend directories to .env.
   Modify .env files to include your own environment variables.

7. **Run project on both fontend and backend directory:**<br>
   `npm start`
   Frontend defaul port : 3000
   Backend default port : 3005




## API Endpoints


- **GET /api/score/top10** : List top 10 user highest score.
- **POST /api/scores/update** : Increase current login user score.
- **POST /api/login** : User login..


## How it work
```javascript
Each user when login will have a unique id , when send update score will send with token and find that user, web socket will send new score to all curren login user to update score.

User much login to increase score
```


