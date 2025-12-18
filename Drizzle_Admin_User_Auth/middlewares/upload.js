// middleware/upload.js
import multer from "multer";
import path from "path";
import crypto from "crypto";

const productStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/image/uploads"); // make sure this folder exists
    },
    filename: (req, file, cb) => {
        crypto.randomBytes(12, (err, bytes) => {
            if (err) return cb(err);
            cb(null, bytes.toString("hex") + path.extname(file.originalname));
        });
    },
});

// export const upload = multer({ storage });
export const upload = multer({ storage: productStorage });



// user image multer


const userImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/image/userimage");
    },
    filename: (req, file, cb) => {
        crypto.randomBytes(12, (err, bytes) => {
            if (err) return cb(err);
            cb(null, bytes.toString("hex") + path.extname(file.originalname));
        });
    },
});

export const userImageUpload = multer({ storage: userImageStorage });



//admin multer

// const adminImageStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "public/image/adminimage");
//     },
//     filename: (req, file, cb) => {
//         crypto.randomBytes(12, (err, bytes) => {
//             if (err) return cb(err);
//             cb(null, bytes.toString("hex") + path.extname(file.originalname));
//         });
//     },
// });

// export const adminImageStorage = multer({ storage: adminImageStorage });



const adminImageDiskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/image/adminimage");
    },
    filename: (req, file, cb) => {
        crypto.randomBytes(12, (err, bytes) => {
            if (err) return cb(err);
            cb(null, bytes.toString("hex") + path.extname(file.originalname));
        });
    },
});

export const adminImageUpload = multer({ storage: adminImageDiskStorage });