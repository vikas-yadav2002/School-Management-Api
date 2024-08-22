import express from 'express';
import { createSchoolsTable } from './config/database';
import schoolRoutes from './routes/schoolRoutes';

const app = express();

app.use(express.json());

// Initialize the database and create the table if it doesn't exist
createSchoolsTable().then(() => {
    console.log('Database setup completed.');
}).catch(error => {
    console.error('Failed to set up the database:', error);
});

app.use('/api', schoolRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
