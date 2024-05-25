import * as express from 'express';
import * as cors from 'cors';

import { onRequest } from 'firebase-functions/v2/https';
import router from './routes';
import { checkZEnvMiddleware } from './utils/envKeys';
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

const app = express();

app.use(checkZEnvMiddleware); // To check environment variables

app.use(express.json()); // This allows to handle JSON POST requests.

app.use(express.urlencoded({ extended: true })); // For URL-encoded data

// CORS middleware
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  allowedHeaders: '*'
};
app.use(cors(corsOptions));

// Routes
app.use(router);

// Default route
app.get('/', (req, res) => {
  return res.status(200).send('Hello from Firebase!');
});

// Export the Express app as an HTTP function
export default onRequest(app);
