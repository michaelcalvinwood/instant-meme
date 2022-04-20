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
    console.log('req', req);
    const fileName = uuidv4();
    downloadFile (req.body.top, req.body.bottom, req.body.meme, req.body.fontSize, req.body.font, fileName, './public/images/');

    res.status(201).send({
        "url": `${process.env.REACT_APP_BASE_URL}/images/` + fileName + '.jpg',
        "status": "successful"
    })
})

/*
 * Download all the memes from the site
 */
// getImages = () => {
//     let request = 
//     {
//         method: 'GET',
//         url: 'https://ronreiter-meme-generator.p.rapidapi.com/images',
//         headers: {
//             'x-rapidapi-host': 'ronreiter-meme-generator.p.rapidapi.com',
//             'x-rapidapi-key': 'f24c60d820mshb2979420e7a5ac6p149b10jsn4470f1c4ff42'
//         }
//     };

//     axios.request(request)
//     .then(function (response) {
//         fs.writeFileSync('./public/images/defaultMemes.json', JSON.stringify(response.data));
//         console.log(response.data);
//     })
//     .catch(function (error) {
//         console.error(error);
//     });
// }

const downloadFile = async (top, bottom, meme, fontSize, font, fileName, path = './public/') => {
    console.log ('in ' + meme);

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
      });
    } catch (err) {
    //   throw new Error(err);
    console.log ('ignoring error hahahahahah');
    }
  }; 

//downloadFile("Better to do it now", "than to wait ya know", "Condescending-Wonka", '50', 'Impact', uuidv4(), './public/images/');

//getImages();

// let next = 522;
// let defaults = fs.readFileSync('./public/images/defaultMemes.json');
// defaults = JSON.parse(defaults);
// console.log(defaults);

// getNextImage = () => {
//     const path = "./public/" + Math.floor(next/100) + '/';
//     console.log (next);
//     if (next >= defaults.length) {
//         clearInterval(interval);
//     }
//     downloadFile('', '', defaults[next], '50', 'Impact', defaults[next] + '.jpg', path);
//     ++next;
// }

// let interval = setInterval(getNextImage, 500);

app.listen(8080, () => {

})

