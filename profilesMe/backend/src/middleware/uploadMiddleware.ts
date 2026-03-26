import multer from 'multer';
import path from 'path';

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// export const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB limit
//   },
//   fileFilter: (req, file, cb) => {
//     if (file.fieldname === 'profilePicture') {
//       if (!file.mimetype.startsWith('image/')) {
//         return cb(new Error('Only images are allowed for profile picture'));
//       }
//     } else if (file.fieldname === 'backgroundMedia') {
//       if (!file.mimetype.startsWith('image/') && !file.mimetype.startsWith('video/')) {
//         return cb(new Error('Only images or videos are allowed for background'));
//       }
//     }
//     cb(null, true);
//   }
// });


const storage = multer.memoryStorage(); 
export const upload = multer({ storage });