const {PubSub} = require('@google-cloud/pubsub');
require('dotenv').config();
const projectId = process.env.PROJECT_ID;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { response } = require('express');
let userTopicName="";
let resTopicName="";
let userSubscriptionName="";
let resSubscriptionName="";
let userTopic;
let resTopic;
let userSubscription;
let resSubscription;
let userMessages = [];
let resMessages = [];

app.enable('trust proxy');
app.use(cors());
app.use(express.json());
const pubsub = new PubSub({projectId});

app.post('/initiateChat',async (req,res)=>{
    try {
        const user = req.body.user;
        const restaurant = req.body.restaurant;
        let options = {
            "messageRetentionDuration":"11.0s",
        }
        //compute topic names for both
        userTopicName = user + "-" + restaurant + "-publisher";
        resTopicName = restaurant + "-" + user + "-publisher";
        //compute subscription names for both
        userSubscriptionName = user + "-" + restaurant + "-subscription";
        resSubscriptionName = restaurant + "-" + user + "-subscription";
        //create topics for both users to push
        [userTopic] = await pubsub.createTopic(userTopicName);
        console.log(`Topic ${userTopic.name} created.`);
        [resTopic] = await pubsub.createTopic(resTopicName);
        console.log(`Topic ${resTopic.name} created.`);
        //create subscription for both users to pull
        [userSubscription] = await resTopic.createSubscription(userSubscriptionName,{
            retainAckedMessages:false,
            messageRetentionDuration:"10mins",
        });
        console.log(`Subscription ${userSubscriptionName} created.`);
        [resSubscription] = await userTopic.createSubscription(resSubscriptionName,{
            retainAckedMessages:false,
            messageRetentionDuration:"10mins",
        });
        console.log(`Subscription ${resSubscriptionName} created.`);
        subscriptionHandler();
        console.log("subscriptionHandler Called");
        console.log("Chat Initiated");
        res.send({
            status:true,
            message:"Chat initiated"
        });

    } catch (error) {
        res.send({
            status:false,
            message:error
        });        
    }
});

app.get('/checkChatInitiation/:restaurant',async (req,res)=>{
    try {
        let restaurant = req.params.restaurant;
        let [allTopics] = await pubsub.getTopics();
        let regExp = new RegExp("projects/"+ projectId + "/topics/" +restaurant + "-[a-zA-Z0-9]*-publisher");
        console.log(regExp);
        let status = false;
        let user="";
        allTopics.every(topic => {
            if(topic.name.toString().match(regExp))
            {
                console.log(topic.name.toString());
                status = true;
                user = topic.name.toString().split("/").pop().split("-")[1];
                console.log(user);
                return false;
            }
            else
            {
                console.log("Not Matched");
                status = false;
                user="";
                return true;
            }
        });
        res.send({
            status:status,
            message:(status ? "Topic Found" : "Topic Not Found"),
            user:user
        });
    } catch (error) {
        console.log(error);
        res.send({
            status:false,
            message:error
        });
    } 
});

app.get('/getMessage',async(req,res)=>{
    let role = req.query.role;
    try {
        if(role==="user")
        {
            res.send(resMessages);            
        }
        else
        {
            res.send(userMessages);
        }
    } catch (error) {
        res.send(error);        
    }
    finally{
        if(role === "user")
        {
            resMessages = [];
        }
        else
        {
            userMessages = [];
        }
    }
});

app.post('/pushMessage',async(req,res)=>{
    let role = req.body.role;
    let message = req.body.message;
    try {
        if(role === "user")
        {
            userTopic.publish(Buffer.from(message));
        }   
        else
        {
            resTopic.publish(Buffer.from(message));
        }
        console.log("Message Published");   
        res.send("Message Sent");  
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});


app.delete('/disconnectChat',async(req,res)=>{
    try {
        //Detaching the subscriptions
        await pubsub.detachSubscription(userSubscriptionName);
        console.log(`Subscription ${userSubscriptionName} detach request was sent.`);     
        await pubsub.detachSubscription(resSubscriptionName);
        console.log(`Subscription ${resSubscriptionName} detach request was sent.`);

        //Delete the Topics
        await pubsub.topic(userTopicName).delete();
        console.log(`Topic ${userTopicName} deleted.`);
        await pubsub.topic(resTopicName).delete(); 
        console.log(`Topic ${resTopicName} deleted.`);
        
        //Delete the subscriptions
        await pubsub.subscription(userSubscriptionName).delete();
        console.log(`Subscription ${userSubscriptionName} deleted.`);
        await pubsub.subscription(resSubscriptionName).delete(); 
        console.log(`Subscription ${resSubscriptionName} deleted.`);

        userTopicName="";
        resTopicName="";
        userSubscriptionName="";
        resSubscriptionName="";
        userMessages = [];
        resMessages = [];

        console.log("Cloud assets deleted.");
        // res.send("Chat Disconnected");
        res.send({
            status:true,
            message:"Chat Disconnected"
        });

    } catch (error) {
        console.log(error);
        // res.send(error);
        res.send({
            status:false,
            message:error
        });
    }
});


async function subscriptionHandler(){
    try {
        userSubscription.on('message',message=>{
                resMessages.push({
                    Id:message.id,
                    Time:message.publishTime,
                    Message:message.data.toString()
                });
                message.ack();
        });

        userSubscription.on('error', error => {
            console.error('Received error:', error);
        });
    
        resSubscription.on('message',message=>{
            userMessages.push({
                Id:message.id,
                Time:message.publishTime,
                Message:message.data.toString()
            });
            message.ack();
        });

        resSubscription.on('error', error => {
            console.error('Received error:', error);
        });

    } catch (error) {
        console.log(error);
    }
}


const port = process.env.PORT || 3003;
app.listen(port,()=>{
    console.log("Running on port 3003");
})
