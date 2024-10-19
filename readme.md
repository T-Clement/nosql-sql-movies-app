---

# Project: Setup and Important Information

> **Warning:**
>
> - CORS is set to `127.0.0.1:5173, so request needs to come from a frontend who is 127.0.0.1:5173`.
> - A Redis instance must be running on port `6379`.
> - You may do not want to see the devtool of React-Query, is so you can comment the component <ReactQueryDevtools /> in main.jsx.

## Application Launch

### Frontend

To launch the frontend, use the following command in the `frontend` folder:

```sh
npm run dev
```

### Backend

To launch the backend, use the following command in the `backend` folder:

```sh
npm start
```

> **Note:** Make sure you have a `.sqlite` file named `database.sqlite` in the `backend/data` folder.

## Database Mode

By default, the database mode is set to `sql`. Errors may occur if you access something in `mongodb` mode after a page refresh.

---

## Task List

### Backend - To Do

- Add a validator.
- Add requests related to directors.
- Add requests related to genres.
- Add requests related to studios.
- ...

### Frontend - To Do

- Display director, genre, and studio data in the movie view (mainly SQL work).

### Backend - Completed

- Movie index (SQL & NoSQL).
- Movie details (SQL & NoSQL).
- Use Redis to cache movie genres.
- Add movie creation route (`POST /store`).
- Update an actor's name in MongoDB and update their name in all related movies.
- Cascade on delete for SQL and Mongo (unset).

### Frontend - Completed

- Add Router.
- Add movie view.
- Add movie creation form view.
- Add context to manage the disabled state of the database toggle button (disabled on specific endpoints).
- Add actor view.
- Add actor name update view.
- Light/dark theme toggle.
- Fix grid on desktop screens.
- Add movies played by an actor in the actor view.

