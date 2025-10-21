/**
 * 自动拼接群聊头像并生成文件
 * @param {string[]} avatars - 群成员头像数组（URL，最多9个）
 * @param {number} [size=300] - 图片尺寸
 * @returns {Promise<File>} 群头像 File 对象
 */
export async function generateGroupAvatar(avatars, size = 300) {
  if (!avatars || avatars.length === 0) {
    throw new Error('头像数组不能为空')
  }

  // 过滤掉空字符串和多余逗号
  avatars = avatars.map(a => a.trim().replace(/,$/, '')).filter(Boolean)

  // 创建画布
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = size
  canvas.height = size

  const count = avatars.length
  const grid = count <= 4 ? 2 : 3
  const cell = size / grid
  const padding = 4

  // 背景
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, size, size)

  // 加载头像
  const images = await Promise.all(avatars.slice(0, 9).map(loadImage))

  // 绘制到 canvas
  images.forEach((img, i) => {
    const x = (i % grid) * cell + padding
    const y = Math.floor(i / grid) * cell + padding
    const w = cell - padding * 2
    const h = cell - padding * 2
    ctx.drawImage(img, x, y, w, h)
  })

  // 转为 Blob 并包装为 File（带文件名）
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
  return new File([blob], `group_avatar_${Date.now()}.png`, { type: 'image/png' })
}

/**
 * 异步加载图片（支持跨域）
 */
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = (e) => reject(e)
    img.src = src
  })
}
