import express, { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import User from "../models/user"; 
import productlist from "../models/product"; 
import Product from "../models/product"; 
import { Request, Response } from "express";

interface RequestWithUser extends Request {

    user?: any;

  } 

const protectedroute = Router();
protectedroute.use(authMiddleware);

protectedroute.get('/dashboard', async (req: RequestWithUser, res: Response) => {
    const userEmail = req.user?.Email;

    try {
   
        const user = await User.findOne({ Email: userEmail });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: `Welcome, ${user.FirstName}!`, user: { FirstName: user.FirstName, LastName: user.LastName, Email: user.Email, userId: user._id } });
    } 
    
    catch (error) {

        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });

    }
});


protectedroute.post('/Products', async (req: RequestWithUser, res: Response) => {

    const userId = req.user?._id;

    try {

    const { description, productName, images } = req.body;

    const Products = new Product({
        userId,
        description, 
        productName, 
        images,
    });

    await Products.save();

    res.status(201).json({ message: 'Product created successfully' });

    } 
    
    catch (error) {
        
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal server error' });

    }

});




protectedroute.get('/productList', async  (req: RequestWithUser, res: Response) => {

    const userId = req.user?._id;

    try {
        
        const productList = await productlist.find({ userId: userId })

        if (!productList) {
            return res.status(404).json({ error: 'product not found' });
        }

       const ProductLists = productList.map((list) => ({

            productName: list.productName,
            images: list.images,
            description: list.description,

       }))

        res.json({ ProductLists } );

    } 

    catch (error) {
        
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });

    }

})



export default protectedroute;