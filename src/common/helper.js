// 创建一个独立的工具函数
export function formatTimestamp(timestamp) {
    if (!timestamp) return '';
    
    // 将纳秒转换为毫秒
    const timestampMs = timestamp / 1000000;
    const date = new Date(timestampMs);
    const now = new Date();
    
    // 今天的开始时间
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // 昨天的开始时间
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    
    // 格式化时间
    const formatTime = (date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };
    
    // 格式化月日
    const formatMonthDay = (date) => {
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${month}/${day}`;
    };
    
    // 判断并返回格式化结果
    if (date >= todayStart) {
        return formatTime(date);
    } else if (date >= yesterdayStart) {
        return `昨天 ${formatTime(date)}`;
    } else {
        return formatMonthDay(date);
    }
}



