const { Client, Server } = require('nextcloud-node-client');
require('dotenv').config();

const { NEXTCLOUD_URL, NEXTCLOUD_USERNAME, NEXTCLOUD_PASSWORD } = process.env;

const server = new Server({
  basicAuth: {
    username: NEXTCLOUD_USERNAME,
    password: NEXTCLOUD_PASSWORD,
  },
  url: NEXTCLOUD_URL,
});

const client = new Client(server);

const getQuota = async () => {
  return await client.getQuota();
};

const getSystemInfo = async () => {
  return await client.getSystemInfo();
};

const createFolder = async (folderPath) => {
  return await client.createFolder(folderPath);
};

const getFolder = async (folderPath) => {
  return await client.getFolder(folderPath);
};

const getFiles = async (folderPath) => {
  console.log('client ', await client.getFolder(folderPath));

  const folder = await client.getFolder(folderPath);
  console.log('folder :: ', folder);

  return await folder.getFiles();
};

const deleteFolder = async (folderPath) => {
  const folder = await client.getFolder(folderPath);
  await folder.delete();
  return { success: true, message: `Folder '${folderPath}' deleted successfully.` };
};

const createFile = async (folderPath, fileName, content) => {
  const folder = await client.getFolder(folderPath);
  return await folder.createFile(fileName, Buffer.from(content));
};

const getFile = async (filePath) => {
  return await client.getFile(filePath);
};

const deleteFile = async (filePath) => {
  const file = await client.getFile(filePath);
  await file.delete();
  return { success: true, message: `File '${filePath}' deleted successfully.` };
};

const moveFile = async (filePath, newFilePath) => {
  const file = await client.getFile(filePath);
  await file.move(newFilePath);
  return { success: true, message: `File moved to '${newFilePath}' successfully.` };
};

const getFileContent = async (filePath) => {
  const file = await client.getFile(filePath);
  return await file.getContent();
};

const addTagToFile = async (filePath, tag) => {
  const file = await client.getFile(filePath);
  console.log("file is", file);
  await file.addTag(tag);
  return { success: true, message: `Tag '${tag}' added to file '${filePath}' successfully.` };
};

const createShare = async (filePath, password, note, expirationDate) => {
  const file = await client.getFile(filePath);
  const createShareConfig = { fileSystemElement: file };
  const share = await client.createShare(createShareConfig);

  if (password) await share.setPassword(password);
  if (note) await share.setNote(note);
  if (expirationDate) await share.setExpiration(new Date(expirationDate));

  return { success: true, url: share.url };
};

module.exports = {
  getQuota,
  getSystemInfo,
  createFolder,
  getFolder,
  deleteFolder,
  createFile,
  getFile,
  deleteFile,
  moveFile,
  getFileContent,
  addTagToFile,
  createShare,
  getFiles
};
