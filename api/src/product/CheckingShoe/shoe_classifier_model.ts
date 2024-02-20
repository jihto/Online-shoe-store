/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const  tf =  require('@tensorflow/tfjs');
const fs =  require('fs');
const path = require('path');
// Define a simple Convolutional Neural Network (CNN) for demonstration
function createShoeClassifierModel() {
    const model = tf.sequential();

    // Add a convolutional layer
    model.add(tf.layers.conv2d({
        inputShape: [224, 224, 3], // Input shape for a standard RGB image
        filters: 16,
        kernelSize: 3,
        activation: 'relu',
    }));

    // Add a max pooling layer
    model.add(tf.layers.maxPooling2d({
        poolSize: [2, 2],
    }));

    // Flatten the output and add a dense layer
    model.add(tf.layers.flatten());
    model.add(tf.layers.dense({
        units: 1, // Output units (binary classification: shoe or not shoe)
        activation: 'sigmoid',
    }));

    // Compile the model
    model.compile({
        optimizer: tf.train.adam(),
        loss: 'binaryCrossentropy',
        metrics: ['accuracy'],
    }); 
    return model;
}

// Save the model to a file
async function saveModel() {
    const model = createShoeClassifierModel();  
    // Save the model using the tf.node.save API
    const modelPath = 'C:/Users/ASUS/OneDrive/Documents/model/shoe.json';
    const modelJSON = model.toJSON();

    // Write the JSON object to a file
    fs.writeFileSync(modelPath, modelJSON); 
    console.log('Model saved successfully.');
}

// Save the model
saveModel();
 