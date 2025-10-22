// ipcHandlers.js
const { ipcMain, shell, dialog, app } = require('electron');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

function registerIpcHandlers() {

    // 弹窗
    ipcMain.on('show-dialog', (event) => {
        const result = dialog.showMessageBoxSync({
            type: 'info',
            title: 'Information',
            message: 'This is an informational message.',
            buttons: ['OK'],
        });
        event.reply('show-dialog-response', result);
    });

    // 下载文件
    ipcMain.on('download-file', async (event, data) => {
        try {
            const fileUrl = data.file_url;

            const parsedUrl = new URL(fileUrl);
            const protocol = parsedUrl.protocol === 'https:' ? https : http;


            const savePath = path.join(app.getPath('downloads'), data.file_name);

            const file = fs.createWriteStream(savePath);

            const request = protocol.get(fileUrl, (response) => {
                const totalLength = response.headers['content-length'];
                let downloaded = 0;

                response.on('data', (chunk) => {
                    downloaded += chunk.length;
                    const progress = Math.round((downloaded * 100) / totalLength);
                    event.sender.send('download-progress', progress);
                });

                response.pipe(file);

                file.on('finish', () => {
                    file.close(() => {
                        event.sender.send('download-complete', savePath);
                    });
                    // 打开保存文件的目录并选中文件
                    shell.showItemInFolder(savePath);
                });
            });

            request.on('download_error', (error) => {
                console.error('Error during file download:', error);
                event.sender.send('download-error', error.message);
            });
        } catch (error) {
            console.error('Error during file download:', error);
            event.sender.send('download-error', error.message); // Sending error message to renderer process
        }
    });

    // 判断指定文件是否存在
    ipcMain.handle('is_exist_spec_file', async (event, data) => {
        console.log("主进程接受数据",data)
        const localDir = app.getPath('downloads');
        const localPath = path.join(localDir, data.file_name);
        if (fs.existsSync(localPath)) {
            shell.showItemInFolder(localPath);
            return { is_exist: "ok" };
        } else {
            return { is_exist: "no" };
        }
    });

    // 获取包信息
    ipcMain.handle('getClientPackageInfo', () => {
        const packageJsonPath = path.join(app.getAppPath(), 'package.json');
        const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
        const packageJson = JSON.parse(packageJsonContent);
        return {
            version: packageJson.version,
            platform: process.platform
        };
    });

    // 其他 IPC 可以在这里统一注册

}

module.exports = { registerIpcHandlers };
