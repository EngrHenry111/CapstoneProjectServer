const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./Route/userRoute');
const blogPostsRoute = require('./Route/blogPostsRoute');




const app = express();
const port = 6000

app.use(express.json());

app.use(cors());
app.use("/users", userRoute);
app.use("/posts", blogPostsRoute);
// app.use('/uploads', express.static(path.join(__dirname, 'Upload')));

//MiddleWare
app.use((req, res, next) =>{
    console.log(`Request URL: ${req.originalUrl}`);
    next();
});


app.get("/", (req, res)=> {
    res.send("API is generated successfully")
})

const live_URI = "mongodb+srv://EngrHenry:engrakpan@cluster.wavse.mongodb.net/Blogwebsite?retryWrites=true&w=majority&appName=Cluster"
mongoose.connect(live_URI)
.then(() => console.log("MongoDB Connected to this Server"))
.catch(err => console.error("Connection:", err));


app.listen(port, () => console.log(`Server is connected on port ${port}`));