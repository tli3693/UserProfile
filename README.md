# UserProfile
Using MEAN Stack

# Some dependencies
## Backend  
express  
mongoose  
bcryptjs  
cors  
jsonwebtoken  
body-parser  
passport  
passport-jwt  

## Front-End
angular-cli  
angular2-flash-messages  

## Listen to node server and auto-publishes changes
nodemon  


# Install angular CLI
npm install -g @angular/cli  
ng new angular-src  
cd angular-src  

## use angular cli to create components/services (name included in path)
ng g component path/to/create/component  
ng g service path/to/create/service  
e.g. ng g service services/task

## builds the application and starts a web server
ng serve
ng build to build app out to root folder (root/public)


# Ports used
node server: 3000 when using ng build
front end: 4200 when using ng serve

# start mongo
1. mongod.exe --config d:\mongodb\mongo.config

# To start app
1. ng build in angular-src directory (ex: D:\Git Repositories\UserProfile\angular-src)
2. nodemon in root directory (ex: D:\Git Repositories\UserProfile)
Note: make sure to start mongo at mongodb://localhost:27017/meanauth (default)
my example: D:\mongodb -> Run start_mongo.bat
