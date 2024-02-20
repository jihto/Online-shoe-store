import { Document } from "mongoose"; 

type Data = Document; 

const convertToPlainObject = (data: Data): Record<string, any>  => {
    return data.toObject();
};

// Function to convert an array of orders to an array of plain JavaScript objects
const convertArrayToPlainObjects = (data: Data[]): Record<string, any> => {
    return data.map((item) => convertToPlainObject(item));
};

export { convertToPlainObject, convertArrayToPlainObjects };