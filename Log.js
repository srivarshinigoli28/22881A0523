
import fetch from 'node-fetch';

const client_id="a64a1caa-ffd5-461a-ac26-8102ab076265";
const client_secret='adgxgwXXQGHpwteX';
const access_token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJnb2xpc3JpdmFyc2hpbmkyOEBnbWFpbC5jb20iLCJleHAiOjE3NTM2ODAxODIsImlhdCI6MTc1MzY3OTI4MiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImM1ZWUyYWE2LWZmZTMtNGU5Ny04YjBlLTBjODMyNWQ4ZDQ5OCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImdvbGkgc3JpIHZhcnNoaW5pIiwic3ViIjoiYTY0YTFjYWEtZmZkNS00NjFhLWFjMjYtODEwMmFiMDc2MjY1In0sImVtYWlsIjoiZ29saXNyaXZhcnNoaW5pMjhAZ21haWwuY29tIiwibmFtZSI6ImdvbGkgc3JpIHZhcnNoaW5pIiwicm9sbE5vIjoiMjI4ODFhMDUyMyIsImFjY2Vzc0NvZGUiOiJ3UEVmR1oiLCJjbGllbnRJRCI6ImE2NGExY2FhLWZmZDUtNDYxYS1hYzI2LTgxMDJhYjA3NjI2NSIsImNsaWVudFNlY3JldCI6ImFkZ3hnd1hYUUdIcHd0ZVgifQ.THYZ7s26AvvCvExoG2gFBuSy2vvBnxVBX7ODTXSKBYE";

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
