import { ClientConfig } from 'pg';

const { PG_HOST, PG_PORT, PG_DB_NAME, PG_USERNAME, PG_PASSWORD } = process.env;

export const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': '*'
  }

export const API_URL = "https://tz2cj9yrgd.execute-api.eu-west-1.amazonaws.com/dev"

export const TABLE_NAMES = {
  products: "products",
  stocks: "stocks"
}

export const dbOptions: ClientConfig = {
  host: PG_HOST,
  port: Number(PG_PORT) || 5432,
  database: PG_DB_NAME,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
      rejectUnauthorized: false
  },
  connectionTimeoutMillis: 2000
};