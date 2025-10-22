// electron/wsManager.js
import WebSocket from 'ws'
import { ipcMain } from 'electron'

let ws = null
let wsReconnectTimer = null
let unreadCount = 0
let mainWindow = null

export function initWS(window, url) {
    mainWindow = window
    connectWebSocket(url)

    // IPC 接收渲染进程发送的消息
    ipcMain.on('ws-send', (_, msg) => {
        sendMessage(msg)
    })

    ipcMain.on('ws-clear-unread', () => {
        clearUnread()
    })
}

// ---------- WebSocket 核心逻辑 ----------
function connectWebSocket(url) {
    if (ws) ws.close()


    const wsOptions = {
        headers: {
            // Authorization: `Bearer ${token}`,
            Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Njg4MTQwNjMsImlhdCI6MTc2MDE3NDA2MywiaW1vb2MuY29tIjoiMHgwMDAwMDAwMDAwMDAwMDAxIn0.0irxL80xik5qYww6H12bCX2GQeLNjuovYOBPGalNJXc'
        }
    }

    ws = new WebSocket(url,wsOptions)

    ws.on('open', () => {
        console.log('WebSocket connected')
        mainWindow.webContents.send('ws-status', 'connected')
    })

    ws.on('message', (data) => {
        const msg = JSON.parse(data.toString())

        // 分发消息到渲染进程
        mainWindow.webContents.send('ws-message', msg)

        // 更新未读
        if (msg.type === 'chat') addUnread()
    })

    ws.on('close', () => {
        mainWindow.webContents.send('ws-status', 'closed')
        reconnectWebSocket(url)
    })

    ws.on('error', (err) => {
        console.error('WebSocket error:', err)
        mainWindow.webContents.send('ws-status', 'error')
        reconnectWebSocket(url)
    })
}

// ---------- 重连 ----------
function reconnectWebSocket(url) {
    if (wsReconnectTimer) return
    wsReconnectTimer = setTimeout(() => {
        wsReconnectTimer = null
        console.log('WebSocket reconnecting...')
        connectWebSocket(url)
    }, 5000)
}

// ---------- 发送消息 ----------
function sendMessage(msg) {
    if (ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(msg))
}

// ---------- 未读消息管理 ----------
function addUnread() {
    unreadCount += 1
    mainWindow.webContents.send('unread-update', unreadCount)
}

function clearUnread() {
    unreadCount = 0
    mainWindow.webContents.send('unread-update', unreadCount)
}