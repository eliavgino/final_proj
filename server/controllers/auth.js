const { User } = require("../models/User");
const { Barber } = require("../models/Barber");
const bcrypt = require("bcrypt");

exports.auth = async (req, res) => {
  try {
    const barber = await Barber.findOne({ email: req.body.email });
    const user = await User.findOne({ email: req.body.email });
    
    let tokenUserId = null;
    if (!(user ||barber))
    return res.status(400).send("invalid email or password");

    else if(user){
      const validPasswordUser = await bcrypt.compare(
        req.body.password,
        user['password']
        
        );

        if (validPasswordUser)
          tokenUserId = user.generateUserJWT();
          else{
            res.status(500).send('invalid eamil or password')
          }
        
    }
    else{
    const validPasswordBarber = await bcrypt.compare(
      req.body.password,
      barber['password']
      );
      
      if (validPasswordBarber) {
        tokenUserId = barber.generatebarberJWT();
        console.log(validPasswordBarber)
      
    }
    else{
      res.status(500).send('invalid eamil or password')
    }
    
  } 
  if(tokenUserId)
      res.status(200).send(tokenUserId);
      else
      res.status(400).send(console.error())
      
  } catch (err) {
    console.log(err)
    res.status(400).send(err);
  }
};

