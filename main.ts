import express,{Request, Response} from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import postMascota from "./resolvers/postMascota.ts";
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import getMascota from "./resolvers/getMascota.ts";
const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);

const app = express();
app.use(express.json());
app.get("/api/mascotas", async(_req:Request, res:Response) => { //Get de todas las mascotas
  try{
    const mascotas = await getMascota;
    res.json(mascotas);
  }catch(error){
    res.json({error:error.message});
  }
})
app.post("/postMascota", postMascota)
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});