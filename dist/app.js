"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const schoolRoutes_1 = __importDefault(require("./routes/schoolRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Initialize the database and create the table if it doesn't exist
(0, database_1.createSchoolsTable)().then(() => {
    console.log('Database setup completed.');
}).catch(error => {
    console.error('Failed to set up the database:', error);
});
app.use('/api', schoolRoutes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
