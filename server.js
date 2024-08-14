const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const cors = require('cors')

const app = express();

require("dotenv").config();


// middleware
app.use(cors({
    origin: ['http://localhost:5173', 'https://toolskit-org.web.app']
}))

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;


const userRoute = require("./routes/userRoutes");
const authRoute = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes")
const wishlistRoutes = require("./routes/wishListRoutes")
const cartRoutes = require("./routes/cartRoutes")
const paymentRoutes = require('./routes/paymentRoutes');


mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.mj9te36.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`,
    )
    .then(() => {
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });



app.use('/api/users', userRoute)
app.use('/api', authRoute);
app.use('/api', productRoutes);
app.use('/api', wishlistRoutes)
app.use('/api', cartRoutes)
app.use('/api', paymentRoutes)


// Test route
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the ToolsKit-server" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`ToolsKit-server is running on port ${PORT}`);
});
