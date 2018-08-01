# Photography-Website
RESTFUL Photography Website, where the administrator of the site(photographer) can manage his photos(upload based on category, delete etc) and the ordinary user can view galleries, send message to the photographer etc.

# Running App
https://serene-woodland-57458.herokuapp.com/

# Tehnologies used
<li>FRONTEND: HTML5, CSS3, JavaScript, Bootstrap, Embedded JavaScript (EJS)</li>
<li>BACKEND: NodeJS, NPM, ExpressJS, Nodemailer, RESTFUL Routes, PassportJS.</li>
<li>DATABASE: MongoDB</li>
<li>Remote Hosting on Heroku and MongoLab</li>

# Installation
> - <b>Register a <a href="https://www.google.com/gmail/about/#">Gmail</a> account to get messages from visitors of the site</b></br>
> - <b>Register a <a href="https://cloudinary.com/">Cloudinary</a> account to use for hosting your photos</b></br>

<b>Clone or download this repository:</b></br>
> - https://github.com/vlad-coman/Photography-Website.git
</br>
<b>Download and install the following technologies:</b></br>
<ul>
  <li><a href="https://nodejs.org/en/download/">Node.js</a></li>
  <li><a href="https://www.mongodb.com/">MongoDB</a> - NoSQL database</li>
</ul>
<b>Move into RoxanaPhoto folder from the cloned repository</b>
<pre>cd RoxanaPhoto</pre>
<b>Install all dependencies from package.json file like in the example below</b></br>
<pre>npm init</pre>
<pre>npm install express ejs dotenv...--save</pre>
<p><b>Create a .env file where to put your enviroment variables(sensitive information). Those are accessed in code with process.env.VAR_NAME</b></p> 

<b>Run the app</b></br>
<pre>node app.js</pre>
<b>Go to:</b></br>
<pre>http://localhost:YOUR_PORT</pre>
