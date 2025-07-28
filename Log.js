
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const access_token = process.env.ACCESS_TOKEN;
const LOGGING_API_URL="http://20.244.56.144/evaluation-service/logs";

export async function Log(service, level, source, message) {
  try {
    const payload={
      client_id,
      client_secret,
      service,
      level,
      source,
      message
    };

    const response=await fetch(LOGGING_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error(`Logging failed: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Logging error:', error.message);
  }
}
