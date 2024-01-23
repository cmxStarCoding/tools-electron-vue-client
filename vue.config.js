const { defineConfig } = require('@vue/cli-service')

const productName = 'electron-1';
const appId = 'com.itying.app';
const menuCategory = 'electron-1';
const shortcutName = 'electron-1';


module.exports = defineConfig({
    transpileDependencies: true,
    pluginOptions: {
        electronBuilder: {

            nodeIntegration: true,
            builderOptions: {
                electronDownload: {
                    // cache: '/Users/cuimingxing/Downloads/electron/Cache',
                    cache: '../cache/',
                    mirror: 'https://npm.taobao.org/mirrors/electron/',
                    customDir: 'v13.6.9-darwin-x64',
                },
                productName: productName,
                appId: appId,

                win: {
                    // icon: 'xxx/icon.ico',
                    target: ['nsis', 'zip']
                  },
                  nsis: {
                    oneClick: false, // 一键安装
                    // guid: 'xxxx', // 注册表名字，不推荐修改
                    perMachine: true, // 是否开启安装时权限限制（此电脑或当前用户）
                    allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
                    allowToChangeInstallationDirectory: true, // 允许修改安装目录
                    // installerIcon: './build/icons/aaa.ico', // 安装图标
                    // uninstallerIcon: './build/icons/bbb.ico', // 卸载图标
                    // installerHeaderIcon: './build/icons/aaa.ico', // 安装时头部图标
                    createDesktopShortcut: true, // 创建桌面图标
                    createStartMenuShortcut: true, // 创建开始菜单图标
                    shortcutName: 'I便笺' // 图标名称
                  },

                // win: {
                //     icon: 'public/icon/icon.ico',
                //     // artifactName: '${productName}_setup_${version}.${ext}',
                //     target: ['nsis'],
                // },
                // nsis: {
                //     oneClick: false,
                //     menuCategory: menuCategory,
                //     shortcutName: shortcutName,
                //     allowToChangeInstallationDirectory: true,
                //     perMachine: true,
                //     runAfterFinish: true,
                // },
                mac: {
                    target: 'dmg',
                    icon: 'public/icon/icon.icns',
                    hardenedRuntime: true,
                    gatekeeperAssess: true,
                    extendInfo: {
                        NSAppleEventsUsageDescription: 'Let me use Apple Events.',
                        NSCameraUsageDescription: 'Let me use the camera.',
                        NSScreenCaptureDescription: 'Let me take screenshots.',
                    }
                },
                dmg: {
                    contents: [
                        {
                            x: 410,
                            y: 150,
                            type: 'link',
                            path: '/Applications',
                        },
                        {
                            x: 130,
                            y: 150,
                            type: 'file',
                        },
                    ],
                },
                linux: {
                    icon: 'public/icon/icon.ico',
                },
            },
        }
    }
})
