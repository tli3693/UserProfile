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


# Angular Commands Used
npm install -g @angular/cli  
ng new angular-src  
cd angular-src  

## use angular cli to create components/services  
ng g component path/to/create/component  
ng g service path/to/create/service  

## builds the application and starts a web server
ng serve
ng build to build app out to root folder (../public)


# Ports used
node server: 3000 when using ng build
front end: 4200 when using ng serve


# To start app
1. ng build in angular-src directory
2. nodemon in root directory
Note: make sure to start mongo at mongodb://localhost:27017/meanauth (default)

