// server.js (ES Module)
import express from 'express';
import {nanoid} from 'nanoid';
import validUrl from 'valid-url';
import geoip from 'geoip-lite';

const app=express();
app.use(express.json());

const urlStore=new Map(); 


// task1
app.post('/shorturls', (req, res)=>{
  const {url, shortcode, expiry}=req.body;

  if (!url || !validUrl.isUri(url)) {
    return res.status(400).json({error: 'Invalid or missing URL'});
  }

  const code = shortcode || nanoid(6);

  if (urlStore.has(code)) {
    return res.status(400).json({error:'Shortcode already exists'});
  }

  const expiresAt=expiry?new Date(expiry):null;

  urlStore.set(code,{
    originalUrl: url,
    createdAt: new Date(),
    expiresAt,
    clicks: []
  });

  res.status(201).json({
    shortUrl: `${req.protocol}://${req.get('host')}/${code}`,
    expiresAt: expiresAt ? expiresAt.toISOString() : null
  });
});





//task2
app.get('/:shortcode', (req, res)=>{
  const {shortcode}=req.params;

  const data=urlStore.get(shortcode);
  if (!data){
    return res.status(400).json({error: 'Short URL not found'});
  }

  if (data.expiresAt && new Date()>data.expiresAt) {
    return res.status(401).json({error: 'Short URL has expired'});
  }

  const ip=req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const geo=geoip.lookup(ip) || {};
  const location=geo.city || geo.region || geo.country || "Unknown";

  data.clicks.push({
    timestamp: new Date(),
    source: ip,
    location
  });

  res.redirect(data.originalUrl);
});


app.get('/shorturls/:shortcode', (req,res)=>{
  const {shortcode}=req.params;

  const data=urlStore.get(shortcode);
  if (!data) {
    return res.status(404).json({error: 'Short URL not found'});
  }

  res.json({
    originalUrl: data.originalUrl,
    shortcode,
    createdAt: data.createdAt.toISOString(),
    expiresAt: data.expiresAt ? data.expiresAt.toISOString():null,
    totalClicks: data.clicks.length,
    clicks: data.clicks.map(click=>({
      timestamp: click.timestamp.toISOString(),
      source: click.source,
      location: click.location
    }))
  });
});



const port=5000;
app.listen(port, ()=>{
  console.log(`Server running on http://localhost:${port}`);
});
