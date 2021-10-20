const path = require('path');
const router = require('express').Router();
const uuid = require('uuid').v4;
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');

const { Video } = require('./../models');

// Creating Multure Storage
const storage = multer.diskStorage({
  destination: path.join(__dirname, './../../data/videos'),
  filename: (req, file, cb) => cb(null, uuid())
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
  const files = await Video.find().lean();
  if (!files) return res.status(404).json({ message: 'Videos Not Found!' });

  return res.status(200).json({ data: files });
});

router.post('/', upload.single('video'), async (req, res) => {
  const file = req.file;

  const SCREENSHOT_STORAGE = path.join(__dirname, './../../data/screenshots');
  const SCREENSHOT_TIMEMARK = process.env.SCREENSHOT_TIMEMARK || 1;
  const SCREENSHOT_FORMAT = 'png';

  const screenshot = `${file.filename}-screenshot.${SCREENSHOT_FORMAT}`;

  // Creating Screenshot
  ffmpeg({ source: file.path })
    .on('error', e => console.error(err))
    .screenshot({
      count: 1,
      folder: SCREENSHOT_STORAGE,
      timemarks: [SCREENSHOT_TIMEMARK],
      filename: screenshot
    });

  // Creating File
  const createdFile = await Video.create({
    id: uuid(),
    data: file.filename,
    screenshot
  });
  if (!createdFile)
    return res.status(403).json({ message: 'Video Not Created!' });

  return res.status(200).json({ message: 'Video Created!', data: createdFile });
});

module.exports = router;
