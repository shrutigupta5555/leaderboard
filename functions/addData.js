const { createClient } = require("@astrajs/collections");



exports.handler = async function(event, context) {
    // create an {astra_db} client
    const astraClient = await createClient({
        astraDatabaseId: process.env.ASTRA_DB_ID,
        astraDatabaseRegion: process.env.ASTRA_DB_REGION,
        applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
    });

    // create a shortcut to the users collection in the app namespace/keyspace
    // collections are created automatically
    const messageCollection = astraClient.namespace(process.env.ASTRA_DB_KEYSPACE).collection("messages");

    // create a new user (specifying documentId)
    

    try {
        const message = await messageCollection.create("pretzel", {
            text: "5",
        });
        return {
            statusCode: 200,
            body: JSON.stringify(message),
        }
        
    } catch (e) {
        console.error(e);
        return {
            statusCode: 500,
            body: JSON.stringify(e),
        }
    }
}