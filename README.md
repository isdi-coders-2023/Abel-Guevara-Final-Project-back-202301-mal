# Base Backend Express

Inked & Styled Projects Application Back End

This is a Node.js using Express library back-end for the web application Inked & Styled Projects.

The purpose of the application is to show beauty salons with their reviews, if users have a salon, they can register, edit or delete it, receiving reviews from other users who consume from their salons.

In this back-end, the four basic operations a software application can perform, CRUD, are defined.

🔸The document database that is used is MongoDB (https://www.mongodb.com/), with Mongoose (https://mongoosejs.com/) to model it. The API for the app is built using Render (https://render.com/docs). For storage and uploding images and text files, Supabase (https://supabase.com/) and Multer (https://www.npmjs.com/package/multer) are used.
🔸The language in which this app is programmed is Typescript (https://www.typescriptlang.org/).
🔸In order to keep the code clean and follow best practices, these tools are used:
-Husky hooks (https://typicode.github.io/husky/#/)
-Eslint (https://eslint.org/)
-Code formatter Prettier (https://prettier.io/)
-SonarCloud (https://www.sonarsource.com/products/sonarcloud/)
-Editorconfig
🔸Testing is also done through all the project, with the help of:
-Jest (https://jestjs.io/)
-Mock Service Worker (https://mswjs.io/)
-MongoDB Memory Server (https://www.npmjs.com/package/mongodb-memory-server)
-Supertest (https://www.npmjs.com/package/supertest)
🔸Endpoints:
-GetALL and Create https://abel-guevara-final-project-back-202301.onrender.com/api/v1/business
-GetById and Delete https://abel-guevara-final-project-back-202301.onrender.com/api/v1/business/642586b432775ffe6ecb42d5
-Register https://abel-guevara-final-project-back-202301.onrender.com/auth/register
-Login https://abel-guevara-final-project-back-202301.onrender.com/auth/login
🔸Info Sonar: -[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=isdi-coders-2023_Abel-Guevara-Final-Project-back-202301-mal&metric=coverage)](https://sonarcloud.io/summary/new_code?id=isdi-coders-2023_Abel-Guevara-Final-Project-back-202301-mal)
