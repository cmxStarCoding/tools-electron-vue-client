// electron/wsManager.js
import WebSocket from 'ws'
import { ipcMain } from 'electron'

let ws = null
let wsReconnectTimer = null
let unreadCount = 0
let mainWindow = null
let currentUrl = null

export function initWS(window, url) {
    mainWindow = window
    currentUrl = url
    connectWebSocket(url)

    // 注册 ipcMain.handle（更符合你的项目风格）
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
    if (ws) {
        ws.removeAllListeners()
        ws.close()
    }

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Njg4MTQwNjMsImlhdCI6MTc2MDE3NDA2MywiaW1vb2MuY29tIjoiMHgwMDAwMDAwMDAwMDAwMDAxIn0.0irxL80xik5qYww6H12bCX2GQeLNjuovYOBPGalNJXc'

    const wsOptions = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    ws = new WebSocket(url, wsOptions)

    ws.on('open', () => {
        console.log('WebSocket connected')
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

    ws.on('close', () => {
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
