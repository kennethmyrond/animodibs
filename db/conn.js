import { MongoClient } from 'MongoDB'
// Connection URL

const mongoURI = process.env.MONGODB_URI;
//const connectionString = process.env.MONGODB_URI;
const client = new MongoClient(mongoURI);

export function connectToMongo (callback)  {
    client.connect().then(() => {
        callback();
    }).catch(err => {
        callback(err);
    });
};

export function getDb (dbName = process.env.DB_NAME) {
    return client.db(dbName);
}

// Close the client connection on program shutdown
function signalHandler() {
    console.log("Closing mongodb connection...")
    client.close();
    process.exit();
}

process.on('SIGINT', signalHandler);
process.on('SIGTERM', signalHandler);
process.on('SIGQUIT', signalHandler);