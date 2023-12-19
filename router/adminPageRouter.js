import express from "express";
import multer from 'multer';
import path from 'path';
import uuid from 'uuid4';
import * as adminPageController from '../controller/adminPageController.js';

const router = express.Router();

const roomImgUpload = multer({
    storage : multer.diskStorage({
        filename(req,file,done) {
            const randomId = uuid(); 
            const ext = path.extname(file.originalname);
            const fileName = randomId + ext;
            done(null, fileName);
        },
        destination(req, file, done) {
            done(null, path.join(path.resolve(), 'uploads', 'roomfile')) 
        }
    })
})
const accImgUpload = multer({
    storage : multer.diskStorage({
        filename(req,file,done) {
            const randomId = uuid();
            const ext = path.extname(file.originalname);
            const fileName = randomId + ext;
            done(null, fileName);
        },
        destination(req, file, done) {
            done(null, path.join(path.resolve(), 'uploads', 'accfile')) 
        }
    })
})

const roomImgMiddleWare = roomImgUpload.array('roomImg', 3);
const accImgMiddleWare = accImgUpload.array('accImgs', 5);


router.get('/accs/detail/', adminPageController.detailAcc);
router.post('/accs/insert/', roomImgMiddleWare, accImgMiddleWare, adminPageController.insertAcc);
router.delete('/accs/delete/', adminPageController.countRoomPerAcc);
router.get('/accs/:page', adminPageController.getAccList);

export default router;