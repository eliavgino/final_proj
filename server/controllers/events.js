const { Event, validateEvent }=require('../models/Event')

exports.addEvent = async (req, res) => {
    try {

        let body = req.body;
        console.log(body);
        //validates Working Hours details are ok
        const { error } = validateEvent({date:body.date, hours:body.hours, reason:body.reason});
        if (error) return res.status(400).send(error.details[0].message);
    
        //create the event
        let event = new Event(body);
    
        //save the event and send
        event = await event.save();
        res.status(201).send(event);

      } catch (err) {

        console.log(err);
        res.status(403).send(err.message);

      }
  };

exports.getAllEvents= async (req, res) => {
    try {
      let date=new Date();
      date.setHours(2);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0)
      let fDate=new Date();
      fDate.setDate(fDate.getDate()+29)
      const body = req.body;
  
      const events = await Event.find({date:{$lt:fDate},date:{$gte:date}})
      res.status(200).send(events);
    } catch (err) {
      console.log(err)
      res.status(400).send(err);
    }
};