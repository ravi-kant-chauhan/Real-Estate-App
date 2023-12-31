const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
const authController = require('./controllers/authController')
const propertyController = require('./controllers/propertyController')
const uploadController = require('./controllers/uploadController');
// const yachtController = require("./controllers/yachtController");
const userController = require("./controllers/userController");
// const commentController = require("./controllers/commentController");

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL)
.then(console.log("Connected to MongoDB"))
.catch((err) => console.log(err))


app.use('/images', express.static('public/images'))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/images', express.static('public/images'))


app.use("/auth", authController);
app.use("/property", propertyController);
// app.use("/yacht", yachtController);
app.use('/upload', uploadController)
app.use('/user', userController)
// app.use('/comment', commentController)


// connect backend
app.listen(process.env.PORT, () => console.log('Server is connected successfully'));