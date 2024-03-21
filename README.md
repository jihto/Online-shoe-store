<h1 align="center">Welcome to readme Online shoe store 👋</h1>


<p>- This is a [Online shoe store project] project build base on Front-end[`React.JS`], Back-end[`Nest.JS`] and Database [`MongoDB`]</p>
<p>- Project feature:
    User Role: Secure login and management of their profile, orders, and favorites, product discovery using filters, categories, and image/text search.Submitting reviews and comments(with appropriate image moderation).
	Admin role: Comprehensive user and product management including creation, update, deletion, and analysis. Control over product information, user accounts, and overall platform management.</p>

----------

# Getting started

## Installation

Clone the repository

    git clone https://github.com:jihto/Online-storage-system-.git

In Back-end
```bash 
Step 1: Switch to the repo api folder

    cd api
    
Step 2: Install dependencies
    
    npm install

Step 3:Connect with database in [`app.module.ts`]

    MongooseModule.forRoot('url_database'), 
    
Step 4: Run server

    nest  start dev 
    #or
    npm run dev --watch

``` 
In Back-end
```bash 
Step 1: Switch to the repo client folder

    cd client
    
Step 2: Install dependencies
    
    npm install
 
Step 3: Run server

    npm run dev

``` 

----------
 

## Start application

- After run client and server
- Test api with `http://localhost:3000/user` in your favourite browser

----------

# Authentication in api
 
This applications uses JSON Web Token (JWT) to handle authentication. The token is passed with each request using the `Authorization` header with `Token` scheme. The JWT authentication middleware handles the validation and authentication of the token. Please check the following sources to learn more about JWT.

----------  

## Author
👤 **--Jihto--**

- Twitter: [@Jihto](https://twitter.com/)
- Github: [@Jihto](https://github.com/jihto)
---
