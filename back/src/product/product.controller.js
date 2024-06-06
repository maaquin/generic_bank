import { response, request } from "express";
import Product from "./product.model.js";

export const newProduct = async (req, res) => {
    try {
        const { name, description, imgUrl, price } = req.body;

        const saveProduct = new Product({
            name,
            description,
            imgUrl,
            price
        });

        const savedProduct = await saveProduct.save();
 
        return res.status(201).json(savedProduct);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong');
    }
};

export const listProducts = async (req, res) => {
    try {
        const products = await Product.find({ estado: true });
        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong');
    }
};

export const listProductId = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send('Store not found');
        }
        return res.status(200).json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong');
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.body;

        const deletedProduct = await Product.findByIdAndUpdate(
            id,
            { estado: false },
            { new: true }
        );

        if (!deletedProduct) {
            return res.status(404).send('Product not found');
        }

        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong');
    }
};