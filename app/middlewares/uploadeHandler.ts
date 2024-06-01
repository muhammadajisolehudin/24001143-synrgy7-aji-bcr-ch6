import multer, { StorageEngine } from 'multer';
import path from 'path';
import { Request } from 'express';
import fs from 'fs';

// const PUBLIC_DIR: string = path.join(__dirname, '../public');
// const UPLOAD_DIR: string = path.join(PUBLIC_DIR, 'uploads');
const UPLOAD_DIR: string = path.join(__dirname, '../../uploads');

// Memastikan direktori uploads ada
// if (!fs.existsSync(UPLOAD_DIR)) {
//     fs.mkdirSync(UPLOAD_DIR, { recursive: true });
// }

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, UPLOAD_DIR)
    }, 
    filename: (req, file, cb)=>{
        const id = Math.random()
        cb(null, id+path.extname(file.originalname) )
    }

})

export default multer({ storage });
