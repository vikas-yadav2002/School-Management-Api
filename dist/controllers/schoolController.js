"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listSchools = exports.addSchool = void 0;
const database_1 = __importDefault(require("../config/database"));
const schoolTypes_1 = require("../types/schoolTypes");
const zod_1 = require("zod");
const addSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = schoolTypes_1.schoolSchema.parse(req.body);
        const { name, address, latitude, longitude } = validatedData;
        const [result] = yield database_1.default.query('INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)', [name, address, latitude, longitude]);
        res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({ error: "Data type error", details: error.errors });
        }
        res.status(500).json({ error: 'Database error' });
    }
});
exports.addSchool = addSchool;
const listSchools = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and Longitude are required' });
    }
    try {
        const [schools] = yield database_1.default.query('SELECT * FROM schools');
        // Calculate distance and sort according to distance from given latitude and longitude
        const sortedSchools = schools.map((school) => (Object.assign(Object.assign({}, school), { distance: haversine(Number(latitude), Number(longitude), school.latitude, school.longitude) }))).sort((a, b) => a.distance - b.distance);
        res.status(200).json(sortedSchools);
    }
    catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});
exports.listSchools = listSchools;
const haversine = (lat1, lon1, lat2, lon2) => {
    //convert to radians 
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};
