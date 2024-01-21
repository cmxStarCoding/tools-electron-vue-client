'use strict'

require('dotenv').config({ path: './electron/.env' });

import { app, protocol, BrowserWindow, Tray, Menu } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
// import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
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
    tray = new Tray('./electron/icon.png' )


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
