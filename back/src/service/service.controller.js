import { response, request } from 'express';
import Service from './service.model.js';
import moment from 'moment';

export const newService = async (req, res) => {
    try {
        const { user1, user2, monto } = req.body;

        const date = moment().format('YYYY-MM-DD HH:mm:ss');

        const saveService = new Service({
            user1,
            user2,
            monto,
            date
        });

        const savedService = await saveService.save();

        return res.status(201).json(savedService);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong');
    }
};

export const listServiceFactura = async (req = request, res = response) => {
    try {
        const service = await Service.find();
        res.status(200).json(service);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};