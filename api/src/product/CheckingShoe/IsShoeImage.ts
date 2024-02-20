// /* eslint-disable prettier/prettier */
// import { FileTypeValidator, ValidationOptions, registerDecorator } from 'class-validator';
// import sharp from 'sharp';
// import { shoeImages } from './shoeImages'; // an array of shoe image buffers

// export function IsShoeImage(options?: ValidationOptions)  {
//     return (object, propertyName: string) => {
//         registerDecorator({
//             target: object.constructor,
//             propertyName,
//             options,
//             validator: {
//                 async validate(file) {
//                     // check file type
//                     const fileType = new FileTypeValidator({ fileType: /. (jpg|jpeg|png)$/ });
//                     if (!fileType.validate(file)) return false;
//                     // read image buffer
//                     const image = await sharp(file.buffer).resize(100, 100).toBuffer(); // resize for faster comparison
//                     // compare with shoe images
//                     let isShoe = false;
//                     for (let shoeImage of shoeImages) {
//                         const { score } = await sharp(image).stats(); // calculate SSIM score
//                         if (score >= 0.8) { // set threshold
//                             isShoe = true;
//                             break;
//                         }
//                     }
//                     return isShoe;
//                 },
//             },
//         });
//     };
// }

// export class UploadImageDto {
//     @IsShoeImage({ message: 'The file is not a shoe image.' })
//     file: any;
// }
