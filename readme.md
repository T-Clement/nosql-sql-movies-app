!!!
# CORS SET TO 127.0.0.1:5173

# A Redis instance is needed running on port 6379

## To launch Frontend use npm run dev in frontend folder

## To launch Backend use npm start in backend folder
## (you need a .sqlite file named database.sqlite in the backend/data folder)

!!!

By default, database mode is set to sql, some errors may be occuring if you are consulting a
something in mongodb mode after a refreshed / reload page 


TODO :
- BACKEND :
    - add validator
    - cascade on delete for SQL and Mongo(unset)
    - ...

- FRONT :
    - fix grid in desktop
    - add movies played by actor in actor view

DONE : 
- BACKEND :
    - movies index SQL & NoSQL
    - movies show SQL & NoSQL
    - use REDIS to cache genre of movies
    - add movie post store route
    - update an actor name in MongoDB and update his name in all movies related to him

- FRONTEND :    
    - add Router
    - add view show for one movie
    - add view form add movie 
    - add context to handle disabled state of toggle database button (disabled it on specific endpoints)
    - add view show actor
    - add view for update actor name
    - dark / light toggle theme