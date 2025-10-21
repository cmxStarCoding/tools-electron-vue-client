/**
 * 自动拼接群聊头像并生成文件（支持微信式布局）
 * @param {string[]} avatars - 群成员头像数组（URL，最多9个）
 * @param {number} [size=300] - 图片尺寸
 * @returns {Promise<File>} 群头像 File 对象
 */
export async function generateGroupAvatar(avatars, size = 300) {
  if (!avatars || avatars.length === 0) {
    throw new Error('头像数组不能为空')
  }

  // 过滤掉空字符串和多余逗号
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

  // 获取布局信息
  const layout = getLayout(avatars.length)
  const padding = 6
  const cell = size / layout.cols

  // 绘制
  let index = 0
  for (let r = 0; r < layout.rows.length; r++) {
    const colsInRow = layout.rows[r]
    const rowY = r * cell + padding
    const offsetX = (size - colsInRow * cell) / 2 // 居中偏移
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

  // 导出为 File 对象
  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
  return new File([blob], `group_avatar_${Date.now()}.png`, { type: 'image/png' })
}

/**
 * 加载图片
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
 * 根据头像数量返回布局规则
 * rows 表示每行放几个头像
 */
function getLayout(count) {
  switch (count) {
    case 1:
      return { cols: 1, rows: [1] }
    case 2:
      return { cols: 2, rows: [2] }
    case 3:
      return { cols: 3, rows: [1, 2] } // 品字形
    case 4:
      return { cols: 2, rows: [2, 2] }
    case 5:
      return { cols: 3, rows: [2, 3] }
    case 6:
      return { cols: 3, rows: [3, 3] }
    case 7:
      return { cols: 3, rows: [1, 3, 3] }
    case 8:
      return { cols: 3, rows: [2, 3, 3] }
    default:
      return { cols: 3, rows: [3, 3, 3] } // 9个及以上
  }
}
