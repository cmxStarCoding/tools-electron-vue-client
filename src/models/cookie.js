// 使用 js-cookie 库
import Cookies from 'js-cookie';

const cookieUtils = {
    set(name, value, expirationInSeconds) {
        if (expirationInSeconds <= 0) {
            // 如果过期时间小于等于 0，表示立即过期
            Cookies.remove(name);
        } else {
            // 计算到期时间
            const expirationDate = new Date(new Date().getTime() + expirationInSeconds * 1000);
            // 使用 js-cookie 设置 cookie
            Cookies.set(name, value, { expires: expirationDate });
        }
    },
    get(name) {
        // 使用 js-cookie 获取 cookie
        return Cookies.get(name);
    },
    delete(name) {
        // 使用 js-cookie 删除 cookie
        Cookies.remove(name);
    }
};

export default cookieUtils;
