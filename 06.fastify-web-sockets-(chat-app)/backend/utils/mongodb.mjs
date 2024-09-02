import mongoose from 'mongoose';
import "dotenv/config"

const uri = process.env.MONGO_URI

async function run() {
    try {
        await mongoose.connect(uri, { dbName: 'fastify-chat-app' })
    } catch (err) {
        console.log("mongodb connection error", err);
        process.exit(1);
    }
}

run().catch(console.dir);

mongoose.connection.on('connected', function () {
    console.log("mongoose is connected");
})

mongoose.connection.on('disconnected', function () {
    console.log("mongoose is disconnected");
    process.exit(1);
})

mongoose.connection.on('error', function (err) {
    console.log('mongoose connection error: ', err);
    process.exit(1);
})