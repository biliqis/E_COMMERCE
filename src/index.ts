import "dotenv/config";
import express, { Application } from "express";
//import indexRouter from './routes/v1/index'
import indexRouter from './routes'
import morgan from "morgan";
import connectDB from "./db";


const app: Application = express();

// middleware initialization
app.use(express.json());

app.use(morgan("dev"));

const port: number | string = process.env.PORT || 4040;

// Route declaration
app.use('/api/v1',indexRouter);

async function bootstrap(): Promise<void> {
  try {
    connectDB();
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (e) {
    process.exit(1);
  }
}

bootstrap();
