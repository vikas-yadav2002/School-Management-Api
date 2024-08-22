"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schoolSchema = void 0;
const zod_1 = require("zod");
exports.schoolSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    address: zod_1.z.string().min(1),
    latitude: zod_1.z.number().refine((val) => val >= -90 && val <= 90, {
        message: "Latitude must be between -90 and 90",
    }),
    longitude: zod_1.z.number().refine((val) => val >= -180 && val <= 180, {
        message: "Longitude must be between -180 and 180",
    }),
});
