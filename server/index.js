const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const showDir = require('http-server/lib/core/show-dir');
const axios = require("axios").default;
const { v4: uuidv4 } = require('uuid');

app.use(cors());
app.use(express.static('public'));
app.use('/meme', express.json());

app.post('/meme', (req, res) => {
    
    const fileName = uuidv4();
    const downloadFile = async (top, bottom, meme, fontSize, font, fileName, path = './public/') => {
    
        const request = {
            method: 'GET',
            url: 'https://ronreiter-meme-generator.p.rapidapi.com/meme',
            params: {
                top: top,
                bottom: bottom,
                meme: meme,
                font_size: fontSize,
                font: font
            },
            headers: {
                'x-rapidapi-host': 'ronreiter-meme-generator.p.rapidapi.com',
                'x-rapidapi-key': 'f24c60d820mshb2979420e7a5ac6p149b10jsn4470f1c4ff42'
            },
            responseType: 'stream'
        };
    
        if (!fs.existsSync(path)){
            fs.mkdirSync(path, { recursive: true });
        }
    
        try {
          const response = await axios(request);
      
          const w = response.data.pipe(fs.createWriteStream(`${path}${fileName}.jpg`));
          w.on('finish', () => {
            console.log(`Successfully downloaded ${fileName}!`);
            res.status(201).send({
                "url": 'http://localhost:8080/images/' + fileName + '.jpg',
                "status": "successful"
            })
          });
        } catch (err) {
        
            console.log ('ignoring error hahahahahah');
            res.status(500).send({
                "message": "oops"
            })
        }
      }; 

    downloadFile (req.body.top, req.body.bottom, req.body.meme, req.body.fontSize, req.body.font, fileName, './public/images/');

    
})

app.get('/jokeme', (req, res) => {
    
    const fileName = uuidv4();
    const downloadFile = async (top, bottom, meme, fontSize, font, fileName, path = './public/') => {
        const request = {
            method: 'GET',
            url: 'https://textoverimage.moesif.com/image',
            params: {
                image_url: `https://mywerld.com/images/${meme}.jpg`,
                text: bottom,
                text_size: fontSize,
                y_align: "bottom",
                margin: 20,
            },
            responseType: 'stream'
        };
    
        if (!fs.existsSync(path)){
            fs.mkdirSync(path, { recursive: true });
        }
    
        try {
            console.log(request);
          const response = await axios(request);
      
          const w = response.data.pipe(fs.createWriteStream(`${path}${fileName}.jpg`));
          w.on('finish', () => {
            console.log(`Successfully downloaded ${fileName}!`);
            res.status(201).send({
                "url": 'http://localhost:8080/images/' + fileName + '.jpg',
                "status": "successful"
            })
          });
        } catch (err) {
        
            console.log ('ignoring error hahahahahah');
            res.status(500).send({
                "message": "oops"
            })
        }
      }; 

    downloadFile (req.query.top, req.query.bottom, req.query.meme, req.query.fontSize, req.query.font, fileName, './public/images/');

    console.log ("req.query", req.query);
})


app.listen(8080, () => {

})

