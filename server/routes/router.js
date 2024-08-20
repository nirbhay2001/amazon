const express = require("express");
const router = new express.Router(); 
const Products = require("../models/productsSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const athenticate = require("../middleware/authenticate");
const jwt = require("jsonwebtoken");

router.get("/getproducts",async(req,res)=>{
    try{
        const productsdata = await Products.find();
        res.status(201).json(productsdata);
    }catch(error){
    }
})



router.get("/getproductsone/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const individualdata = await Products.findOne({id:id});
        res.status(201).json(individualdata);
    }catch(error){
        res.status(400).json(individualdata);
    }
})



// register data
router.post("/register", async (req, res) => {
    try {
        const { fname, email, mobile, password, cpassword } = req.body;
        if (!fname || !email || !mobile || !password || !cpassword) {
            return res.status(422).json({ error: "Please fill in all the fields." });
        }
        const preuser = await USER.findOne({ email: email });
        if (preuser) {
            return res.status(422).json({ error: "This email is already registered." });
        }
        if (password !== cpassword) {
            return res.status(422).json({ error: "Passwords do not match." });
        }
        const finalUser = new USER({
            fname, email, mobile, password, cpassword
        });
        const storedata = await finalUser.save();
        console.log(storedata);
        res.status(201).json(storedata);
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// login api user
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Please fill in all the details." });
    }
    try {
        const userlogin = await USER.findOne({ email: email });
        if (!userlogin) {
            return res.status(400).json({ error: "User does not exist." });
        }
        const isMatch = await bcrypt.compare(password, userlogin.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials." });
        }
        const token = await userlogin.generatAuthtoken();
        console.log("Generated token:", token); // Debug token generation
        res.cookie("Amazonweb", token, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            expires: new Date(Date.now() + 900000)
        });
        console.log("Cookie set"); // Debug cookie setting
        res.status(200).json(userlogin);
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// adding the data into cart
router.post("/addcart/:id",athenticate,async(req,res)=>{
    try{
        const {id} = req.params;
        const cart = await Products.findOne({id:id}); 

        const UserContact = await USER.findOne({_id:req.userID});
        if(UserContact){
            const cartData = await UserContact.addcartdata(cart);
            // await UserContact.save();
            await cartData.save();
            res.status(201).json(UserContact);
        }else{
            res.status(400).json({error:"invalid user"});
        }
    }catch(error){
        res.status(400).json({error:"invalid user"});
    }
})



// get cart details
router.get("/cartdetails", athenticate, async(req,res)=>{
    try{
        const buyuser = await USER.findOne({_id:req.userID});
        res.status(201).json(buyuser);
    }catch(error){
    }
})


// get valid user
router.get("/validuser",  async(req,res)=>{
    try{
        const validuserone = await USER.findOne({_id:req.userID});
        res.status(201).json(validuserone);
    }catch(error){
    }
})


// remove item from cart
router.delete("/remove/:id",athenticate,async(req,res)=>{
    try{
        const { id } = req.params;

        req.rootUser.carts = req.rootUser.carts.filter((curel) => {
            return curel.id != id
        });

        req.rootUser.save();
        res.status(201).json(req.rootUser);
    }catch(error){
        res.status(400).json(error);
    }
})


// for user Logout
router.get("/lougout",athenticate,(req,res)=>{
    try{
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem)=>{
            return curelem.token !== req.token
        });

        res.clearCookie("Amazonweb",{path:"/"});
        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens);
    }catch(error){
    }
})


module.exports = router;