/**
 * 自动拼接群聊头像并生成文件（支持微信式布局 + 居中）
 * @param {string[]} avatars - 群成员头像数组（URL，最多9个）
 * @param {number} [size=300] - 图片尺寸
 * @returns {Promise<File>} 群头像 File 对象
 */
export async function generateGroupAvatar(avatars, size = 300) {
  if (!avatars || avatars.length === 0) {
    throw new Error('头像数组不能为空')
  }

  // 清洗输入
  avatars = avatars.map(a => a.trim().replace(/,$/, '')).filter(Boolean).slice(0, 9)

  // 创建画布
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = size
  canvas.height = size

  // 背景
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, size, size)

  // 加载头像
  const images = await Promise.all(avatars.map(loadImage))

  // 获取布局规则
  const layout = getLayout(avatars.length)
  const padding = 6
  const cell = size / layout.cols
  const totalRows = layout.rows.length
  const layoutHeight = totalRows * cell
  const startY = (size - layoutHeight) / 2 // ✅ 垂直居中偏移

  // 绘制每行
  let index = 0
  for (let r = 0; r < totalRows; r++) {
    const colsInRow = layout.rows[r]
    const rowY = startY + r * cell + padding
    const offsetX = (size - colsInRow * cell) / 2 // 水平居中
    for (let c = 0; c < colsInRow; c++) {
      if (index >= images.length) break
      const x = offsetX + c * cell + padding
      const y = rowY + padding
      const w = cell - padding * 2
      const h = cell - padding * 2
      ctx.drawImage(images[index], x, y, w, h)
      index++
    }
  }

  // 导出文件
  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
  return new File([blob], `group_avatar_${Date.now()}.png`, { type: 'image/png' })
}

/**
 * 加载图片（支持跨域）
 */
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

/**
 * 头像布局规则
 */
function getLayout(count) {
  switch (count) {
    case 1: return { cols: 1, rows: [1] }
    case 2: return { cols: 2, rows: [2] }
    case 3: return { cols: 3, rows: [1, 2] } // 品字形
    case 4: return { cols: 2, rows: [2, 2] }
    case 5: return { cols: 3, rows: [2, 3] }
    case 6: return { cols: 3, rows: [3, 3] }
    case 7: return { cols: 3, rows: [1, 3, 3] }
    case 8: return { cols: 3, rows: [2, 3, 3] }
    default: return { cols: 3, rows: [3, 3, 3] } // 9+
  }
}
