import { Request } from "express";
import multer from "multer";
import path from 'path';


const multerStorage = multer.diskStorage({
  destination: (request:any, file:any, callback:any) => {
    callback(null, __dirname);
  },

  filename: (request:any, file:any, callback:any) => {
    callback(null, file.originalname);
  },
});

export const multerUpload = multer({ storage: multerStorage });



// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
// File filter to accept mp4 and webm files
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const filetypes = /mp4|webm/; // Add webm to the accepted formats
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only video files of type mp4 or webm are allowed!'));
  }
};

// Initialize multer with the storage and file filter configuration
export const uploadVideo = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 100000000 } // Set file size limit (e.g., 100MB)
});

// const storage = multer.diskStorage({
//   destination: (req : Request, file:any, cb:any) => {
//     cb(null, 'uploads/videos'); // Destination folder for uploaded videos
//   },
//   filename: (req: Request, file:any, cb:any) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// // File filter to only accept video files
// const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
//   const filetypes = /mp4|mov|avi|mkv/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb(new Error('Only video files are allowed!'));
//   }
// };
