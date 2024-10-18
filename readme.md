!!!
#CORS SET TO 127.0.0.1:5173
!!!

By default, database mode is set to sql, some errors may be occuring if you are consulting a
something in mongodb mode after a refreshed / reload page 


TODO :
- BACKEND :
    - update an actor name in MongoDB and update his name in all movies related to him
    - add validator
    - cascade on delete for SQL and Mongo(unset)
    - ...

- FRONT :
    - fix grid in desktop

DONE : 
- BACKEND :
    - movies index SQL & NoSQL
    - movies show SQL & NoSQL
    - use REDIS to cache genre of movies
    - add movie post store route

- FRONTEND :    
    - add Router
    - add view show for one movie
    - add view form add movie 
    - add context to handle disabled state of toggle database button (disabled it on specific endpoints)
    - add view show actor
    - add view for update actor name
    - dark / light toggle theme