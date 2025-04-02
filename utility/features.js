import mongoose from "mongoose";

export const connectDB = (url) => {
    mongoose
        .connect(url, { dbName: "Linkedin" })
        .then((data) => {
            console.log(`connect to DB : ${data.connection.host}`);
        })
        .catch((err) => {
            console.log(err);
        });
}; 