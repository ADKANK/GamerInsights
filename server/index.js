import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import gamesRoutes from './routes/games.js';
import { fileURLToPath } from 'url';
import { connectToDatabase } from './services/database.js'; // Import the connection function

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

/* ROUTES */
app.use('/games', gamesRoutes);

const PORT = process.env.PORT || 6001;

// Start the server and connect to the database
const startServer = async () => {
    await connectToDatabase();  // Ensure DB connection is established before starting the server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
startServer()

export default app; 