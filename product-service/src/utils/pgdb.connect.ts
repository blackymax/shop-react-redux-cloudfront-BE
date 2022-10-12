import { Client } from "pg";
import { dbOptions } from "../constants";

export const connectToPGDB = async () => {
    const client = new Client(dbOptions);
    await client.connect();
    return client
}