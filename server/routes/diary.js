const express = require('express');
const router = express.Router();
const { Diary } = require("../models/Diary");

const { auth } = require("../middleware/auth");
const multer = require("multer");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4' || ext !== '.png') {
            return cb(res.status(400).end('only png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
});

const upload = multer({ storage: storage }).single("file");

//=================================
//             Video
//=================================

//클라이언트 요청이 먼저 서버의 index.js로 와서 /api/video 이부분은 안 써도 됨

router.post('/uploadfiles', (req, res) => {

    //비디오를 서버에 저장한다
    upload(req,res, err => {
        if(err) {
            return res.json({ success: false, err})
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })
    }) 
});         


router.post('/uploadDiary', (req, res) => {

    //비디오 정보들을 저장
   const diary = new Diary(req.body)

   diary.save((err, doc) => {
    if(err) return res.json({ success: false, err })
    res.status(200).json({ success: true })
   })
});         

router.post("/getDiaryDetail", (req,res) =>{

    Diary.findOne({ "_id" : req.body.postId})
    .populate('writer')
    .exec((err, diaryDetail) =>{
        if(err) return res.status(400).send(err)
        return res.status(200).json({ success: true, diaryDetail})
    })
});

router.get('/getDiarys', (req, res) => {

    //비디오를 db에서 가져와서 클라이언트에 보낸다
    Diary.find()
        .populate('writer')
        .exec((err, diarys)=> {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, diarys})
        })
   
});         



module.exports = router;
