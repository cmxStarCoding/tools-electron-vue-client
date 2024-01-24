'use strict'

require('dotenv').config({ path: './electron/.env' });

import { app, protocol, BrowserWindow, Tray, Menu, ipcMain ,shell} from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
// import {autoUpdater} from "electron-updater"

// import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

const path = require('path');
const fs = require('fs');
// const https = require('https');
const http = require('http');

let tray = null

// console.log(process.env.TEST)
protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 1350,
        height: 870,
        minWidth: 1350,
        minHeight: 870,
        webPreferences: {

            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
        }
    })

    // function handleUpdate() {
    //     var returnData = {
    //         error: {status: -1, msg: '检测更新查询异常'},
    //         checking: {status: 0, msg: '正在检查应用程序更新'},
    //         updateAva: {status: 1, msg: '检测到新版本，正在下载,请稍后'},
    //         updateNotAva: {status: -1, msg: '您现在使用的版本为最新版本,无需更新!'},
    //     };

    //     if (process.platform === 'darwin') {
    //         // macOS 更新源 URL
    //         autoUpdater.setFeedURL('http://127.0.0.1:8083/static/download/app');

    //     } else if (process.platform === 'win32') {
    //         // Windows 更新源 URL
    //         autoUpdater.setFeedURL('http://127.0.0.1:8083/static/download/app');
    //     }
    //     //和之前package.json配置的一样


    //     //更新错误
    //     autoUpdater.on('error', function (error) {
    //         returnData.error.data = error
    //         sendUpdateMessage(returnData.error)
    //     });

    //     //检查中
    //     autoUpdater.on('checking-for-update', function () {
    //         sendUpdateMessage(returnData.checking)
    //     });

    //     //发现新版本
    //     autoUpdater.on('update-available', function (info) {
    //         returnData.updateAva.data = info
    //         sendUpdateMessage(returnData.updateAva)
    //     });

    //     //当前版本为最新版本
    //     autoUpdater.on('update-not-available', function (info) {
    //         setTimeout(function () {
    //             returnData.updateAva.data = info
    //             sendUpdateMessage(returnData.updateNotAva)
    //         }, 1000);
    //     });

    //     // 更新下载进度事件
    //     autoUpdater.on('download-progress', function (progressObj) {
    //         win.webContents.send('downloadProgress', progressObj)
    //     });


    //     autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
    //         ipcMain.on('isUpdateNow', (e, arg) => {
    //             //some code here to handle event
    //             autoUpdater.quitAndInstall();
    //         });
    //         // win.webContents.send('isUpdateNow')
    //     });

    //     //执行自动更新检查
    //     autoUpdater.checkForUpdates();
    // }

    // handleUpdate();

    // 通过main进程发送事件给renderer进程，提示更新信息
    // function sendUpdateMessage(text) {
    //     win.webContents.send('message', text)
    // }

    // ipcMain.on("checkForUpdate", (event, data) => {
    //     console.log(data,'执行自动更新检查!!!');
    //     // event.sender.send('reply', 'hi lee my name is yuan, age is 17');
    //     autoUpdater.checkForUpdates();
    // });


    // win.webContents.openDevTools()
    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        win.loadURL('app://./index.html')
    }
}



// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    // if (isDevelopment && !process.env.IS_TEST) {
    //     // Install Vue Devtools
    //     try {
    //         await installExtension(VUEJS3_DEVTOOLS)
    //     } catch (e) {
    //         console.error('Vue Devtools failed to install:', e.toString())
    //     }
    // }
    createWindow()
    // tray = new Tray(path.join(__dirname, 'icon.png'))
    tray = new Tray('./electron/icon.png')


    // 单击系统托盘时触发的事件
    tray.on('click', () => {
        // 在这里编写单击系统托盘时的逻辑
    })

    // 右键点击系统托盘时显示的上下文菜单
    const contextMenu = [
        { label: '选项一', click: () => { /* 在这里编写选项一的逻辑 */ } },
        { label: '选项二', click: () => { /* 在这里编写选项二的逻辑 */ } },
        { type: 'separator' }, // 添加分隔线
        { label: '退出', click: () => { app.quit() } } // 退出应用程序
    ]
    tray.setContextMenu(Menu.buildFromTemplate(contextMenu))


    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})


ipcMain.on('download-file', async (event, data) => {
    try {
        const fileUrl = data.file_url; // Replace with your file URL
        const savePath = path.join(app.getPath('downloads'), '111.dmg');

        const file = fs.createWriteStream(savePath);

        const request = http.get(fileUrl, (response) => {
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


// 主进程监听渲染进程请求
ipcMain.handle('getPackageVersion', () => {
    const packageJsonPath = path.join(app.getAppPath(), 'package.json');
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);
    return packageJson.version;
  });



// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}
