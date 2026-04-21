# Notes API

A REST API for managing notes with Kanban-style status tracking — built with Node.js, Express, and MongoDB.

## Features

- Create, read, update and delete notes
- Kanban-style status: `todo`, `in-progress`, `completed`
- Optional tags per note
- Filter notes by status
- Timestamps on every note (created & last updated)

## Tech Stack

- **Node.js** — runtime
- **Express** — web framework
- **MongoDB Atlas** — cloud database
- **Mongoose** — MongoDB object modelling

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/basedTejas/notes-api.git
cd notes-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and add your MongoDB Atlas connection string:

```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/notesdb
```

> Get your connection string from [MongoDB Atlas](https://cloud.mongodb.com) → Connect → Drivers

### 4. Run the server

```bash
# Development (auto-restarts on save)
npm run dev

# Production
npm start
```

Server runs on `http://localhost:5000`

---

## API Endpoints

### Base URL
```
http://localhost:5000/api/notes
```

| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| GET    | `/api/notes`     | Get all notes            |
| GET    | `/api/notes?status=todo` | Filter by status |
| GET    | `/api/notes/:id` | Get a single note        |
| POST   | `/api/notes`     | Create a new note        |
| PUT    | `/api/notes/:id` | Update a note            |
| DELETE | `/api/notes/:id` | Delete a note            |

---

## Request & Response Examples

### Create a Note
**POST** `/api/notes`

Request body:
```json
{
  "title": "Learn Express",
  "content": "Go through the routing and middleware docs",
  "status": "in-progress",
  "tags": ["backend", "learning"]
}
```

Response `201`:
```json
{
  "_id": "663f1a2b4e3d2c1a0b9f8e7d",
  "title": "Learn Express",
  "content": "Go through the routing and middleware docs",
  "status": "in-progress",
  "tags": ["backend", "learning"],
  "createdAt": "2026-04-21T10:00:00.000Z",
  "updatedAt": "2026-04-21T10:00:00.000Z"
}
```

### Get All Notes (filtered)
**GET** `/api/notes?status=todo`

Response `200`:
```json
{
  "count": 2,
  "notes": [ ... ]
}
```

### Update a Note Status
**PUT** `/api/notes/663f1a2b4e3d2c1a0b9f8e7d`

Request body:
```json
{
  "status": "completed"
}
```

### Delete a Note
**DELETE** `/api/notes/663f1a2b4e3d2c1a0b9f8e7d`

Response `200`:
```json
{
  "message": "Note deleted successfully"
}
```

---

## Status Values

| Value         | Meaning          |
|---------------|------------------|
| `todo`        | Not started yet  |
| `in-progress` | Work in progress |
| `completed`   | Done             |

---

## Project Structure

```
notes-api/
├── server.js               # Entry point — connects DB and starts server
├── package.json
├── .env.example            # Environment variable template
├── .gitignore
├── routes/
│   └── notes.js            # Route definitions
├── controllers/
│   └── noteController.js   # Business logic for each route
└── models/
    └── Note.js             # Mongoose schema
```

---

## Testing with Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Create a new collection called `Notes API`
3. Add requests for each endpoint above
4. Set `Content-Type: application/json` header on POST and PUT requests
5. Paste your request bodies as raw JSON

---

## Deployment

This API can be deployed for free on [Render](https://render.com):

1. Push your code to GitHub
2. Go to Render → New Web Service → connect your repo
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add your `MONGO_URI` as an environment variable in Render's dashboard
6. Deploy — you'll get a live URL in ~2 minutes
