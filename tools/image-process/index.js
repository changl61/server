const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'input');
const outputDir = path.join(__dirname, 'output');

try {
    const filenames = fs.readdirSync(inputDir);
    // 文件是文件名的数组，包括'.' 和 '..'

    filenames.forEach(filename => {
        if (filename.endsWith('.png')) {
            processClothingThumbs(filename);
            processFaceAndHairThumbs(filename);
        }
    });

    // 处理完成
    console.log('完成，已处理文件:', filenames.length);
} catch (err) {
    console.log('Unable to scan directory: ' + err);
}

function processClothingThumbs(filename) {
    if (filename.includes('clothing')) {
        resizeImg(filename, {
            width: 256,
            height: Math.round(256 * 1920 / 1080)
        });
    }
}

function processFaceAndHairThumbs(filename) {
    if (filename.includes('face') || filename.includes('hair')) {
       if (filename.startsWith('male')) {
           extractImg(filename, {width: 256, height: 256, left: 415, top: 70});
       }

       if (filename.startsWith('female')) {
           extractImg(filename, {width: 256, height: 256, left: 415, top: 165});
       }
    }
}


function resizeImg (filename, {width, height}) {
    sharp(`${inputDir}/${filename}`)
        .resize(width, height)
        .toFile(`${outputDir}/${filename}`, (err) => {
            if (err) {
                console.log(err);
            }
        });
}

function extractImg (filename, pos) {
    sharp(`${inputDir}/${filename}`)
        .extract(pos)
        .toFile(`${outputDir}/${filename}`, (err) => {
            if (err) {
                console.log(err);
            }
        });
}
