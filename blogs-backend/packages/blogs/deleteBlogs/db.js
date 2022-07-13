const mongoose = require('mongoose')

const dbURI = process.env.DB_URI;

// establishing connection with the MongoDB database

(
    async () => {
        try {
            await mongoose.connect(dbURI);
            // if connected successfully logging connected successfully
            console.log("Connected to database")
        } catch (error) {
            // logging the error
            console.log(error.message);
        }
    }
)()
