const MONGO_URL = process.env.MONGO_URL;
const mongoose = require('mongoose');

exports.connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log(
            `database connected successfully 🚀\nDB-HOST 👤: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.error(`Failed to connect with database 💥: ${error}`);
        process.exit(1);
    }
}