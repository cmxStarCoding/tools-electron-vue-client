// electron/wsManager.js
import WebSocket from 'ws'
import { ipcMain } from 'electron'

let ws = null
let wsReconnectTimer = null
let unreadCount = 0
let mainWindow = null
let currentUrl = null
let token = null

export function initWS(window, url) {
    mainWindow = window
    currentUrl = url
    connectWebSocket(url)


    // ❌ 不要在这里直接 connectWebSocket(url)
    // 等渲染进程传 token 后再连接

    // 渲染进程传 token
    ipcMain.handle('ws-set-token', (_, t) => {
        token = t
        console.log("WS 设置 token:", token)

        // token 设置后立即重连 WS
        reconnectWebSocket(currentUrl, true)

        return true
    })


    // 当渲染进程执行 ipcRenderer.invoke('ws-send', msg) 时，Electron 会自动触发主进程里的 ipcMain.handle('ws-send') 回调函数
    ipcMain.handle('ws-send', (_, msg) => {
        sendMessage(msg)
        return true
    })

    ipcMain.handle('ws-clear-unread', () => {
        clearUnread()
        return true
    })

    ipcMain.handle('ws-reconnect', () => {
        reconnectWebSocket(currentUrl)
        return true
    })
}

// ---------- WebSocket 核心逻辑 ----------
function connectWebSocket(url) {
    if (!token) {
        console.log("WS 未连接：token 为空")
        return
    }

    if (ws) {
        ws.removeAllListeners()
        ws.close()
    }
    const wsOptions = {
        headers: {
            Authorization: `${token}`,
        }
    }

    ws = new WebSocket(url, wsOptions)

    ws.on('open', () => {
        console.log('WebSocket connected')
        startHeartbeat()   // ❤️加这句
        sendToRenderer('open', { message: 'WebSocket connected' })
    })

    ws.on('message', (data) => {
        try {
            const msg = JSON.parse(data.toString())
            sendToRenderer('message', msg)

            if (msg.type === 'chat') addUnread()
        } catch (e) {
            console.error('Invalid WS message:', e)
        }
    })

    ws.on('close', (code, reason) => {
        console.log("WS CLOSED:", code, reason.toString())
        sendToRenderer('close', { message: 'WebSocket closed' })
        reconnectWebSocket(url)
    })

    ws.on('error', (err) => {
        console.error('WebSocket error:', err)
        sendToRenderer('error', { message: err.message })
        reconnectWebSocket(url)
    })
}

// ---------- 重连 ----------
function reconnectWebSocket(url) {
    if (wsReconnectTimer) return
    wsReconnectTimer = setTimeout(() => {
        wsReconnectTimer = null
        console.log('WebSocket reconnecting...')
        sendToRenderer('reconnecting', { message: 'WebSocket reconnecting...' })
        connectWebSocket(url)
    }, 5000)
}

// ---------- 发送消息 ----------
function sendMessage(msg) {
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(msg))
    } else {
        sendToRenderer('error', { message: 'WebSocket not connected' })
    }
}

// ---------- 未读消息 ----------
function addUnread() {
    unreadCount += 1
    sendToRenderer('unread-update', { unreadCount })
}

function clearUnread() {
    unreadCount = 0
    sendToRenderer('unread-update', { unreadCount })
}

// ---------- 通用发送到渲染进程 ----------
function sendToRenderer(event, data) {
    if (mainWindow && mainWindow.webContents) {
        mainWindow.webContents.send('ws-event', { event, data })
    }
}

function startHeartbeat() {
    setInterval(() => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ frameType: 1, method: "user.online" }));
        }
    }, 3000);  // 每 3 秒 ping 一次
}
