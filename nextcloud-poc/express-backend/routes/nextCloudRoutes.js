const express = require('express');
const router = express.Router();
const {
  getQuota,
  getSystemInfo,
  createFolder,
  deleteFolder,
  createFile,
  deleteFile,
  moveFile,
  getFileContent,
  addTagToFile,
  createShare,
  getFiles
} = require('../services/nextCloudService');

router.get('/quota', async (req, res) => {
  try {
    const quota = await getQuota();
    res.json(quota);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/system-info', async (req, res) => {
  try {
    const info = await getSystemInfo();
    res.json(info);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/create-folder', async (req, res) => {
  const { folderPath } = req.body;
  try {
    const result = await createFolder(folderPath);
    res.json({ success: true, message: `Folder '${folderPath}' created successfully.`, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/delete-folder', async (req, res) => {
  const { folderPath } = req.body;
  try {
    const result = await deleteFolder(folderPath);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/create-file', async (req, res) => {
  const { folderPath, fileName, content } = req.body;
  try {
    const result = await createFile(folderPath, fileName, content);
    res.json({ success: true, message: `File '${fileName}' created successfully.`, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/delete-file', async (req, res) => {
  const { filePath } = req.body;
  try {
    const result = await deleteFile(filePath);
    res.json(result);
  } catch (error) {
    console.log("Error delete", error)
    res.status(500).json({ error: error.message });
  }
});

router.post('/move-file', async (req, res) => {
  const { filePath, newFilePath } = req.body;
  try {
    const result = await moveFile(filePath, newFilePath);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/add-tag', async (req, res) => {
  const { filePath, tag } = req.body;
  try {
    const result = await addTagToFile(filePath, tag);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/create-share', async (req, res) => {
  const { filePath, password, note, expirationDate } = req.body;
  try {
    const result = await createShare(filePath, password, note, expirationDate);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/files', async (req, res) => {
  const { folderPath } = req.body;
  try {
    const result = await getFiles(folderPath);
    console.log("Result is", result)
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
