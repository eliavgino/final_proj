const { MongoClient }=require('mongodb');

const mongoClient=new MongoClient("mongodb+srv://barbara_shop:rolpK89Sh@barbershop.7uk7fiz.mongodb.net/?retryWrites=true&w=majority");

module.exports = async function (context, myTimer) {

    let timeStamp=new Date();

    let timeStampString=timeStamp.toISOString();
    
    let date=timeStampString.slice(0,10);

    let hour = (timeStampString.slice(11,16)).split(":");

    let min,h

    if(hour[1]==="30"){
        min='00'
        h=parseInt(hour[0])+2;
    }
    else{
        min='30'
        h=parseInt(hour[0])+1;
    }

    timeStamp.setHours(24);
    
    try{

        if (myTimer.isPastDue)
        {
            context.log('JavaScript is running late!');
        }
        const dataBase=await mongoClient.db("test");
        const collection=dataBase.collection("haircuts");
        context.log(h+':'+min+"-"+(parseInt(hour[0])+2)+":"+hour[1]);
        const results =await collection.updateMany({"date":{$lt:timeStamp},"hour":h+':'+min+"-"+(parseInt(hour[0])+2)+":"+hour[1]},{$set:{active:false}});
        context.log(results);

    }
    catch(error){

        context.log(error)

    }
    
};  