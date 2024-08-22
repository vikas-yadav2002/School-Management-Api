import {Request, Response} from 'express';
import pool from '../config/database';
import {schoolSchema, School} from '../types/schoolTypes';
import { ResultSetHeader } from 'mysql2';
import { z } from 'zod';



export const addSchool = async (req : Request, res : Response): Promise<any> => {
    
    try {
        const validatedData: School = schoolSchema.parse(req.body);

        const {name, address, latitude, longitude} = validatedData;

        const [result] = await pool.query<ResultSetHeader>('INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)', [name, address, latitude, longitude]);

       res.status(201).json({message: 'School added successfully', schoolId: result.insertId});


    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({error: "Data type error", details: error.errors});
        }
        res.status(500).json({error: 'Database error'});
    }
};

export const listSchools = async (req : Request, res : Response): Promise<any> => {
    
    const {latitude, longitude} = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({error: 'Latitude and Longitude are required'});
    }

    try {
        const [schools] = await pool.query<any[]>('SELECT * FROM schools');


        // Calculate distance and sort according to distance from given latitude and longitude
        const sortedSchools = schools.map((school : any) => ({
            ...school,
            distance: haversine(Number(latitude), Number(longitude), school.latitude, school.longitude)
        })).sort((a : any, b : any) => a.distance - b.distance);

        res.status(200).json(sortedSchools);
    } catch (error) {
        res.status(500).json({error: 'Database error'});
    }
};

const haversine = (lat1 : number, lon1 : number, lat2 : number, lon2 : number) : number => {
    //convert to radians 
    const toRad = (value : number) => (value * Math.PI) / 180;

    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};
