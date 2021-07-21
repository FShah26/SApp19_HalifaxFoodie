const {PubSub} = require('@google-cloud/pubsub');
require('dotenv').config();
const projectId = 'pubsubdemo-318612';
const pubsubClient = new PubSub({projectId});
exports.handler = async (event) =>  {
    // Instantiates a client
    const pubsub = new PubSub({projectId});
    const restaurantName = 'testRest';
    const clientName = 'testClient';
    let topicName = clientName + "-" + restaurantName + "-" + "publisher"  
    const [topic] = await pubsub.createTopic(topicName).catch(err => {
        console.error('ERROR:', err);
    });
    console.log(`Topic ${topicName} created.`);
}


    
  
            