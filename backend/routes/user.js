const express = require("express");
const router = express.Router();
const { User, Account } = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const signupBodySchema = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(5)
});

const signinBodySchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(5)
})

const updateBodySchema = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().min(5).optional()
})


router.post("/signup",async (req,res)=>{
    const signupBody = req.body;
    const parsedSignupBody = signupBodySchema.safeParse(signupBody);
    if(!parsedSignupBody.success){
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }
    const existingUser = await User.findOne({
        username: signupBody.username
    })

    if(existingUser){
        return res.status(411).json({
            message: "Email already taken"
        })
    }

    const user = await User.create({
        username: signupBody.username,
        firstName: signupBody.firstName,
        lastName: signupBody.lastName,
        password: signupBody.password
    });

    const userId = user._id;

    /* -------------------------------------------------------------------------------------------------*/ 
    
    await Account.create({
        userId: userId,
        balance: 1 + Math.random() * 10000
    })

    /* -------------------------------------------------------------------------------------------------*/ 

    const token = jwt.sign({
        userId: userId,
    },JWT_SECRET);

    res.status(200).json({
        message: "User created successfully",
        token: token
    });
});



router.post("/signin",async (req,res) => {
    const parsedSigninBody = signinBodySchema.safeParse(req.body);
    if(!parsedSigninBody.success){
        return res.status(411).json({
            message: "incorrect inputs"
        })
    }
    user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })
    if(user){
        const userId = user._id
        const token = jwt.sign({
            userId: userId
        },JWT_SECRET);
        res.status(200).json({
            token: token
        })
    }else{
        res.status(411).json({
            message: "Error while logging in"
        })
    }
})

router.put("/",authMiddleware,async (req, res)=>{
    const parsedUpdateBody = updateBodySchema.safeParse(req.body);
    if(!parsedUpdateBody.success){
        res.status(411).json({
            message:"Error while updating information"
        });
    }
    await User.updateOne({_id: req.userId},req.body);
    res.status(200).json({
        message: "updated successfully"
    })
})

router.get("/bulk",async (req, res) => {
    const filter = req.query.filter || "";
    users = await User.find(
        {$or:[
            {firstName: {"$regex": filter} },
            {lastName: {"$regex": filter} }
        ]}
    )
    res.status(200).json({
        users: users.map(user => {
            return {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }
        })
    })
})

router.get("/currentUser",authMiddleware,async (req,res)=>{
    const currentUser = await User.findOne({
        _id: req.userId,
    });
    if (!currentUser) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    res.status(200).json({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        username: currentUser.username,
        _id: currentUser._id
    })
})

module.exports = router;