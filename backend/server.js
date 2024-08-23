import app from './app.js';
import connectDB from './config/config.js';

//connect to database

await connectDB();


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});