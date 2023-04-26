import app from "./src/App"
import * as dotenv from "dotenv"
dotenv.config({path: './config.env'});
import mongoose from "mongoose";

const DB = process.env.DATABASE_DEV!.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD!,
);

mongoose.connect(DB, {
}).then(() => console.log('DB connection successful!'));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Graphql running on port http://localhost:${port}/graphql`);
  console.log(`Player Api running on port http://localhost:${port}/api/v1/player`);
  console.log(`Team Api running on port http://localhost:${port}/api/v1/team`);
  console.log(`Match Api running on port http://localhost:${port}/api/v1/match`);
  console.log(`Tournament Api running on port http://localhost:${port}/api/v1/tournament`);

});