const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
const User = require("./model/userModel");
const Product = require("./model/productModel");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://myCred:cred100@cluster0.uyas23q.mongodb.net/myCred")
  .then(() => {
    console.log("Database conneced");
  })
  .catch((err) => {
    console.log("error for connecting database", err);
  });
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH"],
    credentials: true,
  })
);
const getUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addUser = async (req, res) => {
  try {
    const { userData } = req.body;
    const user = new User({
      name: userData.userName,
      email: userData.email,
      age: userData.age,
      phone: userData.phone,
    });
    await user.save();
    res.status(200).json({ message: "New User Added" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addProduct = async (req, res) => {
  try {
    let { productData } = req.body;
    const product = new Product({
      productName: productData.productName,
      color: productData.color,
      category: productData.category,
      price: productData.price,
    });
    await product.save();
    res.status(200).json({ message: "New Product added successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProduct = async (req, res) => {
  try {
    let AllProducts = await Product.find({});
    res.status(200).json({ AllProducts });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const editProduct = async (req, res) => {
  try {
    let { values } = req.body;
    await Product.findByIdAndUpdate(
      { _id: values.pid },
      {
        $set: {
          category: values.SproductCategory,
          color: values.SproductColor,
          price: values.SproductPrice,
          productName: values.SproductName,
        },
      }
    );
    res.status(200).json({message:'Updated Successfully'})
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Interal Server Error" });
  }
};

const editUser = async (req, res) => {
    try {
      let { values } = req.body;
      await User.findByIdAndUpdate(
        { _id: values.userId },
        {
          $set: {
            age: values.SuserAge,
            name: values.SuserName,
            email: values.SuserEmail,
            phone: values.SuserPhone,
          },
        }
      );
      res.status(200).json({message:'Updated Successfully'})
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Interal Server Error" });
    }
  };
app.get("/", getUser);
app.post("/addUser", addUser);
app.get("/getProducts", getProduct);
app.post("/addProduct", addProduct);
app.post("/editProduct", editProduct);
app.post("/editUser", editUser);

app.listen(3006, () => console.log("Working on port 3006"));
