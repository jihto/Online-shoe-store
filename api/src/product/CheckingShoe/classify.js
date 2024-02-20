/* eslint-disable prettier/prettier */
 
const tf = require('@tensorflow/tfjs');
const { createCanvas, loadImage } = require('canvas');


async function classifyImage(modelPath, imagePath) {
    const model = await tf.loadLayersModel(`file://${modelPath}`);

    const canvas = createCanvas(224, 224);
    const context = canvas.getContext('2d');
    const image = await loadImage(imagePath);
    context.drawImage(image, 0, 0, 224, 224);

    const imageData = context.getImageData(0, 0, 224, 224).data;
    const inputTensor = tf.tensor4d(Array.from(imageData), [1, 224, 224, 4]);

    const predictions = model.predict(inputTensor);
    const predictionArray = await predictions.data();
    return predictionArray[0];
}

// Usage
const modelPath = './model.json';
const imagePath = './49757.jpg';

classifyImage(modelPath, imagePath)
    .then((prediction) => {
        console.log('Prediction:', prediction);
        const isShoe = prediction > 0.5; // Adjust threshold as needed
        console.log('Is shoe:', isShoe);
    })
    .catch((error) => console.error('Error:', error));
