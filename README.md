# NODE-SERVER
MemeGenerator Project

*****BASE*****
creating Folders :
Controllers -> CRUD  implements for all tables ( Contact , User , Password , Points ,React)
Models -> All table entities with attributes and types
Routes -> Containing all Tables routes and links 

*****START*****
+ Creating Node Server with (server.js) :
  - npm init
  - npm install express mongoose morgan body-parser
  Connect the Database with URL on PORT 3000


+ Creating a js File for every Table in Models Folder :
  - Using mongoose 
  - Using Schema 
  - Specifieing every atribute type in every table


+ Creating a js File for every Table in Controllers Folder :
  - User 
        Insert
        Show
        Show by Cirterie ID
        Update
        Delete
  - Contact
        Insert
        Show
        Show by Cirterie ID
        Update
        Delete
  - Password
        Insert
        Show
        Update
  - Points
        Insert
        Show
        Update
        Delete
  - Meme
        Insert
        Show
        Show by Cirterie ID
        Update
        Delete   
  - React
        Insert
        Show
        Delete
  then export Module
+ Creating a js File for every Table in Routes Folder :
    specifiying every file path and creating links for every CRUD 
    exemple : (../api/create)
  
+ Updating server.js file
     Creating New route variables to put links
