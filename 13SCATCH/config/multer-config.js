const multer = require("multer");

const storage = multer.memoryStorage();     //By using this we can upload the file into the memory (On Ram only) .
const upload = multer({storage: storage});

module.exports = upload;