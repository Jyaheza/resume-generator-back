# Resume Generator Backend with Node

- This app features 3 user groups:
   1. Admin - for managind user roles
   2. Career_Services - for giving reviews to resumes submitted by students
   3. Student - For creating resumes and performing job matches

This application allows users to create and maintain a list of resumes pdfs. A user can also submit resume for review to career services. This app also features AI(cohere) for assistance in job matching by comparing a resume to a job description and giving it a score and some comments. Please visit https://github.com/jyaheza/resume-generator-front for the Vue 3 frontend repository.

#### Please note:

- You will need to create a database and be able to run it locally.

## Project Setup

1. Clone the project into your **XAMPP/xamppfiles/htdocs** directory.

```
git clone https://github.com/jyaheza/resume-generator-back.git
```

2. Install the project.

```
npm install
```

3. Configure **Apache** to point to **Node** for API requests.

   - We recommend using XAMPP to serve this project.
   - In XAMPP, find the **Edit/Configure** button for **Apache**.
   - Edit the **conf** file, labeled **httpd.conf**.
   - It may warn you when opening it but open it anyway.
   - Add the following line as the **last line**:

   ```
   ProxyPass /resumeapi http://localhost:3200/resumeapi
   ```

   - Find the following line and remove the **#** at the front of the line.

   ```
   LoadModule proxy_http_module modules/mod_proxy_http.so
   LoadModule proxy_http2_module modules/mod_proxy_http2.so
   ```

   - Save the file.
   - **Restart Apache** and exit XAMPP.

4. Make a local **resume_db** database.

   - Create a schema/database.
   - The Sequelize in this project will make all the tables for you.

5. Add a local **.env** file and make sure that the **database** variables are correct.

   - DB_HOST = 'localhost'
   - DB_PW = '**your-local-database-password**'
   - DB_USER = '**your-local-database-username**' (usually "root")
   - DB_NAME = '**your-local-database-name**' (example: "resume_db")
   - SECRET_KEY = 'xT1tdO3CfMH01pjxC+guN1LWSt2nKvr5td6KUpw7Czg='

6. Compile and run the project locally.

```
npm run start
```
