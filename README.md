<h1 align="center">Welcome to readme Online shoe store 👋</h1>


<p>- This is a Online shoe store project project build base on Front-end (React.JS), Back-end (Nest.JS) and Database (MongoDB)</p>
<p>- Project feature:</p>
<p> + User Role: Secure login and management of their profile, orders, and favorites, product discovery using filters, categories, and image/text search.Submitting reviews and comments(with appropriate image moderation).</p>
<p> + Admin role: Comprehensive user and product management including creation, update, deletion, and analysis. Control over product information, user accounts, and overall platform management.</p>

----------

## 🍀 User interface 
Role user 

<img src="https://github.com/user-attachments/assets/76600908-a138-4f6c-a448-c6b925f81a74" width="49%" height="240">
<img src="https://github.com/user-attachments/assets/c64faa30-8ee7-4ddd-95b7-7cc40468473c" width="49%" height="240">
<img src="https://github.com/user-attachments/assets/9a4f0122-0ccb-4fd1-badd-c67a4ef8cf38" width="49%" height="240">
<img src="https://github.com/user-attachments/assets/1690f32f-51a1-469e-a4b4-9de9757c5b63" width="49%" height="240">
<img src="https://github.com/user-attachments/assets/b908bb1a-830c-4e0e-836d-dbf12e9ecad7" width="49%" height="240">
<img src="https://github.com/user-attachments/assets/fb95c2a8-17a8-46e0-9b34-73052c676d1d" width="49%" height="240">
<img src="https://github.com/user-attachments/assets/faf8a0db-91ef-418b-abbd-e57d214c91c8" width="49%" height="240">
<img src="https://github.com/user-attachments/assets/435e542a-eb9c-4013-b788-46d9676dff11" width="49%" height="240">
<img src="https://github.com/user-attachments/assets/bff72583-31b6-4581-960a-5d42e7403858" width="49%" height="240">

Role seller

<img src="https://github.com/user-attachments/assets/92c05624-576a-4460-a23d-de4e6840b692" width="49%" height="240"> 
<img src="https://github.com/user-attachments/assets/23b1bd90-821f-4bec-8a7c-e636c3960edd" width="49%" height="240">

## 🚀 To Getting Started

Clone the repository
```bash 
    git clone https://github.com:jihto/Online-storage-system-.git
```
In Front-end

Step 1: Switch to the repo client folder
```bash 
    cd client
```
Step 2: Install dependencies
```bash   
    npm install
 ```
Step 3: Run server
```bash 
    npm run dev
```


In Back-end

Step 1: Switch to the repo api folder
```bash 
    cd api
```
Step 2: Install dependencies
```bash 
    npm install
```
Step 3:Connect with database in [`app.module.ts`]
```bash 
    MongooseModule.forRoot('url_database'), 
```
Step 4: Run server
```bash 
    nest  start dev 
    #or
    npm run dev --watch
``` 
----------
 
## ⭐️ Start application

- After run client and server
- Test api with `http://localhost:3000/user` in your favourite browser

----------

## ⭐️ Authentication in api
 
This applications uses JSON Web Token (JWT) to handle authentication. The token is passed with each request using the `Authorization` header with `Token` scheme. The JWT authentication middleware handles the validation and authentication of the token. Please check the following sources to learn more about JWT.

----------  

## Author
👤 **--Jihto--**

- Linked In: [@Huy Phúc](https://www.linkedin.com/in/phuc-nguyen-9ba849266/)
- Github: [@Jihto](https://github.com/jihto)
---
