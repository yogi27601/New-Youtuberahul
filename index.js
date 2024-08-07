require("dotenv").config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { Video } = require("./models/model"); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));


app.post('/api/videos', async (req, res) => {
  const { src, logo, h3, p } = req.body;

  if (!src || !logo || !h3 || !p) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newVideo = new Video({
      src,  
      logo, 
      h3,
      p,
    });

    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.get('/api/videos', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
