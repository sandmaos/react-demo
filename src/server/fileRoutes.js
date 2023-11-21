// fileRoutes.js

const express = require('express');
const fileRouter = express.Router();
const multer = require('multer');
const File = require('./modules/fileSchema'); // Assuming you have a Mongoose model for files
const { auth } = require('./utils/auth')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

fileRouter.get('/file/all', async (req, res) => {
    try {
        const files = await File.find().select('_id filename contentType size');
        return res.status(200).json({ success: true, files: files })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false })
    }
})

fileRouter.post('/file/upload', auth, upload.single('file'),  async (req, res) => {
    // Multer middleware looks for a field named 'file' in the incoming request.
    // Processes the uploaded file and attaches it to req.file
    try {
        const uploadedFile = req.file;
        const file = new File({
            filename: uploadedFile.originalname,
            contentType: uploadedFile.mimetype,
            size: uploadedFile.size,
            data: uploadedFile.buffer,
        });
        await file.save();
        return res.json({
            success: true,
            message: 'File uploaded successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error uploading file' });
    }
});

fileRouter.get('/file/download/:id', auth, async (req, res) => {
    try {
        const fileId = req.params.id;
        const file = await File.findById(fileId);
        if (!file) {
            return res.status(404).json({ success: false, message: 'File not found' });
        }
        // Set headers for file download
        res.set({
            'Content-Type': file.contentType,
            'Content-Disposition': `attachment; filename="${file.filename}"`,
        });
        return res.send(file.data); // send the raw binary data

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error downloading file' });
    }
});

fileRouter.delete('/file/delete/:id', async (req, res) => {
    try {
        const fileId = req.params.id;
        const result = await File.findByIdAndDelete({ _id: fileId });
        return res.status(200).json({ message: 'File deleted' });
    } catch (error) {
        return res.status(500).json({ message: 'failed' })
    }
})

module.exports = fileRouter;
