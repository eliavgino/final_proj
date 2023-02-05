const Photo = require("../models/Photo");

//get all Photos
exports.getPhoto = async (req, res) => {
  try {
    const result = await Photo.find();
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};
/////////////////////////////////////////////////
//get by id
exports.getPhotoById = async (req, res) => {
  try {
    const id = req.body;
    const result = await Photo.findById(id);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////
//add new Photo
exports.addPhoto = async (req, res) => {
  try {
    // const body = req.body;

    //create the photo
    let photo = await new Photo({
      barber: req.body.barber,
      photo: req.body.photo,
    });

    //save the Photo and send
    photo = await photo.save();
    res.status(201).send(photo);
  } catch (err) {
    console.log(err);
    res.status(403).send(err.message);
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////

//delet photo by id
exports.removePhoto = async (req, res) => {
  try {
    const id = req.body;
    const result = await Photo.findByIdAndDelete(id);
    res.send("photo removed succesfuly");
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};
