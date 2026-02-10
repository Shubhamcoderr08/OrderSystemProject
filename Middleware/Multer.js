import multer from "multer";
import path from "path";
import fs from "fs"

const uploadDir = path.join(process.cwd(), "public", "tempFiles");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, "./public/tempFiles");
    cb(null,uploadDir)
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${Date.now()}-${file.originalname}`
    );
  },
});

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|webp/;
//   const extName = allowedTypes.test(
//     path.extname(file.originalname).toLowerCase()
//   );

//   if (extName) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only images allowed"));
//   }
// };

export const upload = multer({
  storage,
  // fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});
