/* eslint-disable prettier/prettier */
import tf  from '@tensorflow/tfjs';

// Define a simple Convolutional Neural Network (CNN) for demonstration
export function createShoeClassifierModel() {
    const model = tf.sequential();

    // Add a convolutional layer
    model.add(tf.layers.conv2d({
        inputShape: [224, 224, 3],
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
        units: 1,
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
