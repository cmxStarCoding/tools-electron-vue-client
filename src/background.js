'use strict'
require('dotenv').config({ path: './electron/.env' });
import { app, protocol, BrowserWindow, Tray, Menu, ipcMain, shell, dialog, globalShortcut, nativeImage } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import { initMenu } from "./ipcMain/menu"

// import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');

let tray = null

// 打印electron进程配置信息
// console.log(process.env.TEST)
protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } }
])

// 创建窗口
async function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 1450,
        height: 870,
        minWidth: 1450,
        minHeight: 870,
        //隐藏屏幕上方中间的标题
        titleBarStyle: 'hidden',
        // frame: false,
        // titleBarOverlay: {
        //     color: '#2f3241',
        //     symbolColor: '#74b1be',
        //     height: 60
        // },
        webPreferences: {

            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            sandbox: false,
        }
    })


    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        win.loadURL('app://./index.html')


        // 禁用windows下的f5刷新
        win.webContents.on('before-input-event', (event, input) => {
            // Prevent F5 key
            if (input.key === 'F5') {
                event.preventDefault();
            }
        });

    }
    //开启dev工具
    ipcMain.on('sendStartControl', () => {
        win.webContents.openDevTools()
    })

    //监听渲染进程广播的事件
    ipcMain.on("window-min", () => {
        console.log("window-min")
        win.minimize();
    })

    ipcMain.on("window-max", () => {
        console.log("window-max")
        if (win.isMaximized()) {
            win.restore()
        } else {
            win.maximize()
        }
    })
    ipcMain.on("window-close", () => {
        console.log("window-close")
        win.close();
    })


}



app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})


app.on('will-quit', () => {
    // Unregister the global shortcut when the app is quitting
    globalShortcut.unregister('CommandOrControl+R');
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

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
    tray = new Tray(nativeImage.createFromPath(path.join(__dirname, '../public/icon/20_20.png')))


    // 单击系统托盘时触发的事件
    tray.on('click', () => {
        // 在这里编写单击系统托盘时的逻辑
    })

    // 右键点击系统托盘时显示的上下文菜单
    const contextMenu = [
        // { label: '选项一', click: () => { /* 在这里编写选项一的逻辑 */ } },
        // { label: '选项二', click: () => { /* 在这里编写选项二的逻辑 */ } },
        // { type: 'separator' }, // 添加分隔线
        { label: '退出', click: () => { app.quit() } } // 退出应用程序
    ]
    tray.setContextMenu(Menu.buildFromTemplate(contextMenu))


    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    initMenu(Menu, dialog, app, path, fs)



    if (!process.env.WEBPACK_DEV_SERVER_URL) {
        // 拦截comman+r刷新页面
        globalShortcut.register('CommandOrControl+R', () => {
            // Do nothing or show a custom message
            console.log('Command+R is disabled');
        });
    }

})

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


//弹窗
ipcMain.on('show-dialog', (event) => {
    const result = dialog.showMessageBoxSync({
        type: 'info',
        title: 'Information',
        message: 'This is an informational message.',
        buttons: ['OK'],
    });
    // 向渲染进程发送结果
    event.reply('show-dialog-response', result);
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


// 在开发模式下，根据父进程的请求干净地退出
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
