const multer = require('multer');
const JobApplication = require('../model/applicationModel');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Generate unique filenames
    }
});

const fileFilter = function (req, file, cb) {
    if (file.mimetype === 'application/pdf' || file.mimetype === 'application/msword') {
        cb(null, true); 
    } else {
        cb(new Error('Invalid file type. Only PDF or Word files are allowed.'), false);
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

const apply = async (req, res) => {
    const { fullname, email, message } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: 'Resume file is required.' });
    }

    let application;
    try {
        application = new JobApplication({ fullname, email, message, resume: req.file.path });
        await application.save();
        res.status(201).json({ message: 'Congratulations! Your application was successful.' });
    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong. Try again later.' });
    }
}

module.exports = { apply, upload }; 
