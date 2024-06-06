import { response, request } from 'express';
import Promotion from './promotion.model.js';
import Product from '../product/product.model.js'

export const newPromotion = async (req, res) => {
    try {
        const { code, discount, productId, validUntil } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        const discountPercentage = discount / 100;
        const discountedPrice = product.price * (1 - discountPercentage);

        const promotion = new Promotion({
            code,
            discount,
            productId,
            validUntil
        });

        const savedPromotion = await promotion.save();

        product.discountedPrice = discountedPrice;
        await product.save();

        return res.status(201).json(savedPromotion);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong');
    }
};

export const listPromotions = async (req, res) => {
    try {
        const promotions = await Promotion.find({ estado: true }).populate('productId');
        return res.status(200).json(promotions);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong');
    }
};

export const redeemPromotion = async (req, res) => {
    try {
        const { code } = req.body;

        const promotion = await Promotion.findOne({ code, estado: true });
        if (!promotion) {
            return res.status(404).send('Promotion not found or expired');
        }

        promotion.estado = false;
        await promotion.save();

        return res.status(200).json(promotion);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong');
    }
};

export const deletePromotion = async (req, res) => {
    try {
        const { id } = req.body;

        const deletedPromotion = await Promotion.findByIdAndUpdate(
            id,
            { estado: false },
            { new: true }
        );

        if (!deletedPromotion) {
            return res.status(404).send('Promotion not found');
        }

        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong');
    }
};
