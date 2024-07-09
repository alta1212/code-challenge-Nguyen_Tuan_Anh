# Express TypeScript CRUD

## Description

This is a simple CRUD application built with ExpressJS and TypeScript, using `json-server` for data persistence.

## Requirements

- Node.js
- npm

## Installation

1. **Clone the repository:**<br>
   `git clone https://github.com/alta1212/code-challenge-Nguyen_Tuan_Anh.git`
2. **Move to project directory:**<br>
   `cd code-challenge-Nguyen_Tuan_Anh/src/PROBLEM5`

3. **Install dependencies:**<br>
   `npm install`

4. **Rename env.example to .env then modify your value**<br>
    `mv .env.example .env`
5. **Run project:**<br>
   `npm start`


## API Endpoints


- **POST /api/resources** : Create a new phone.<br>
```javascript
Example payload:
 {
   "id": 1,
   "name": "OnePlus 9Pro",
   "description": "OnePlus's latest phone"
 }

 Note : If you dont enter the id , a random id will be generated.
```
- **GET /api/resources** : List all phones.
- **PUT /api/resources/:id** : Update a phone.
- **DELETE /api/resources/:id** : Delete a phone.
- **GET /api/resources/:id** : Get a phone details.

## Testing
```javascript
npm run test
```
## Building for Production
    1. Build the project:
    npm run build

    2. Serve the built project:
    npm run serve

    The application will be running at http://localhost:3000.
   


