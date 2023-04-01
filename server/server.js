const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
var bcrypt = require('bcrypt');
const saltRounds = 11;

const port = process.env.PORT || '8000';
const app = express();
require('dotenv').config();
app.use(cors());
app.use(express.json());

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

try {
  mongoose.set('strictQuery', false);
  mongoose.connect(process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    () => console.log(" Mongoose is connected")
  );

} catch (e) {
  console.log("could not connect");
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/all', (req, res) => {
  const {bookname,location,showLimit} = req.query;

  if(bookname === "" && location === ""){
    var searchObj={}
  }else if(bookname===""){
    var searchObj = {
      location: { $regex : new RegExp(location, "i") }
    }
  }else if(location===""){
    var searchObj = {
      bookname: { $regex : new RegExp(bookname, "i") },
      location: { $regex : new RegExp(location, "i") }
    }
    
  }else{
    var searchObj = {
      bookname: { $regex : new RegExp(bookname, "i") }
    }
  }
  var searchObj = {
    bookname: { $regex : new RegExp(bookname, "i") },
    location: { $regex : new RegExp(location, "i") }
  };
  
  try{
      productModel.find(searchObj).limit(showLimit).sort("-date").then(data => {
          res.json(data)
      }).catch(error => {
          res.status(408).json({ error })
      })
  }catch(error){
      res.json({error})
  }
  })
  


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique:true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile_no: {
    type: String,
    unique:true,
    required: true,
  },
  favorite:{ type : Array , "default" : [],unique: true },
  productId:{ type : Array , "default" : [],unique: true }
});

const userModel = mongoose.model("User", UserSchema);

app.use('/login', (req, res) => {

  const userData = req.body.userData;

  console.log(req.body)

    userModel.findOne({ email: userData.email }).then(function (user) {
      if (!user) {
        console.log("user not found");
        res.json({ message: "user not found" });
      } else {
        bcrypt.compare(userData.password, user.password, function (err, result) {
          if (result == true) {
            console.log(user);
            const Data = {
              id: user._id,
              name:user.name,
              email:user.email,
              mobile_no: user.mobile_no,
              favorite: user.favorite,
              productId:user.productId,
              token:"lksanldkalijslcnkaoicjaoincoiasjcoiaoij"
            }
            res.json(Data);
          } else {
            console.log("incorrect password");
            res.json({ message: "incorrect password" });
          }
        });
      }
    });
});


app.post('/signup',(req, res) => {
  userData=req.body.userData;

  userModel.findOne({ email: userData.email }).then(function (user){
    if(!user){
      bcrypt.hash(userData.password, saltRounds, function (err,   hash) {

        var userDetails = new userModel({
          name: userData.name,
          email: userData.email,
          password: hash,
          mobile_no: userData.mobile_no
        });
         
        userDetails .save((err, doc) => {
              if (!err){
                console.log("user added successfully");
                  res.json({message:"user added successfully"})
              }
              else{
                console.log('Error during record insertion : ' + err);
                res.json({message:"Error from server"})
              }
        });
    
      });
    }  else{
      res.json({message:"Email already in use"});
      console.log("Email already in use");
    }
  })

  
  
});


//Sell

const ProductSchema = new mongoose.Schema({
  userId:{
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  bookname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  condition: {
    type: Number,
    required: true,
  },
  img1:
  {
    type:String,
    required: true,
      
  },
  img2:
  {
    type:String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  mobile_no: {
    type: Number,
    required: true,
  },
  date:{
    type: Date,
    required:true
  }
});

const productModel = mongoose.model("Product", ProductSchema);



app.get('/info', (req, res) => {
  console.log("params" + req.query._id )
  try{
      productModel.findOne({_id: req.query._id}).then(data => {
          res.json(data)
      }).catch(error => {
          res.status(408).json({ error })
      })
  }catch(error){
      res.json({error})
  }
})


app.post('/sell', async(req, res, next) => {
 

  var productDetails = new productModel({
    userId:req.body.userId,
    category:req.body.category,
    bookname: req.body.bookname,
    description: req.body.description,
    price: req.body.price,
    condition: req.body.condition,
    img1: req.body.frontImage,
    img2: req.body.backImage,
    location: req.body.location,
    mobile_no: req.body.mobile_no,
    date: new Date()
  });
  var newId=[];
  productDetails .save(async(err, doc) => {
        if (!err){
          console.log("Product added successfully");
          newId = doc._id;
          newIdString = newId.toString();

            const user = await userModel.findByIdAndUpdate(
              req.body.userId,
              {"$push": { productId: newIdString } },{new:true});
            res.json({message:"Product added successfully",productId:user.productId})

        }
        else{
          console.log('Error during record insertion : ' + err);
          res.json({message:"Error from server"})
        }
  });
            
});


//FAVORITE
app.post("/fav",async (req, res) => {

  const user = await userModel.findById(req.body.userId);
  const favTrue = user.favorite.includes(req.body.productId);
  const index = user.favorite.indexOf(req.body.productId);
  var newFav = user.favorite;
  if(favTrue){
    newFav.splice(index,1);

  }else{
    newFav.unshift(req.body.productId);
  }

  const updateFav = await userModel.findByIdAndUpdate(req.body.userId,{favorite:newFav},{new : true});
  
  res.json({favorite:updateFav.favorite});
  await updateFav.save();
  
});

app.get('/wishlist', async(req, res) => {
  const ids = req.query.fav;
  try{
      await productModel.find({ '_id': { $in: ids } }).then(data => {
          res.json(data)
      }).catch(error => {
          res.status(408).json({ error })
      })
  }catch(error){
      res.json({error})
  }
})

app.get('/myads', async(req, res) => {
  const ids = req.query.productId;
  try{
      await productModel.find({ '_id': { $in: ids } }).then(data => {
          res.json(data)
          console.log("DATA FROM MYPRODUCT"+data);
      }).catch(error => {
          res.status(408).json({ error })
      })
  }catch(error){
      res.json({error})
  }
})


app.get('/search', async(req, res) => {
  try{
      await productModel.distinct('bookname').then(data => {
          res.json(data)
      }).catch(error => {
          res.status(408).json({ error })
      })
  }catch(error){
      res.json({error})
  }
})

app.post("/deletead",async (req, res) => {

  const user = await userModel.findByIdAndUpdate(req.body.userId,{"$pull":{productId:req.body.productId}},{new:true});
  res.json({message:"Item deleted successfully",productId:user.productId});
});


app.listen(port, () => {
    console.log(`Server is running on port 8000.`);
  });