const db = require ("../models");

const Tutorial=db.tutorials;

//create and save a new tutorial

exports.create=(req,res)=>{
    //validate request
    if(!req.body.title){
        res.status(400).send({message:"content can't be empty"});
        return;
    }

    // create a tutorial

    const tutorial=new Tutorial({

        title:req.body.title,
        description:req.body.description,
        published:req.body.published  
    });

    //save tutorial into database

    tutorial
    .save(tutorial)
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message||"some error occured while creating tutorial"
        })
    })
};

// Retrive all tutorials from the db
exports.findAll=(req,res) => {
    
   const title= req.query.title; 
   var condition=title?{title:{$regex:new RegExp(title),$options:"i"}}:{};
   Tutorial.find(condition)
   .then(data=>{
   res.send(data);
})
   .catch(err=>{
   res.status(500).send({
    message:err.message||"Some error occurred while retrieving tutorials."
   })
})
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
        const id = req.params.id;
        Tutorial.findById(id)
        .then(data=>{
            if(!data)
        res.status(404).send({message:"not found tutorial with id="+id});
    else
    res.send(data);
     })
     .catch(err=>{res.status(500).send( "Error retrieving Tutorial with id=" +id)});
    };

    
// Update a Tutorial by the id in the request
exports.update = (req, res) =>{
    if(!req.body){
        return res.status(400).send({
            message:"Data to update can't be empty"
        });
    }
    const id=req.params.id;
    Tutorial.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
     if(!data){
        res.status(404).send({message:`can't update the tutorial with id=${id}.Maybe Tutorial was not found`})
    }else res.sent({message: "tutorial was updated succesfully"});
    })
    .catch(err=>{
        res.status(500).send({message:"error while updating tutorial with id ="+id})
    })

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) =>{
        Tutorial.deleteMany({})
          .then(data => {
            res.send({
              message: `${data.deletedCount} Tutorials were deleted successfully!`
            });
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while removing all tutorials."
            });
          });

};

// Find all published Tutorials
exports.findAllPublished = (req,res) => {
    Tutorial.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });

};

