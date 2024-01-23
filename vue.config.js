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
                //MAC打包需要此配置
                // electronDownload: {
                //     // cache: '/Users/cuimingxing/Downloads/electron/Cache',
                //     cache: '../cache/',
                //     mirror: 'https://npm.taobao.org/mirrors/electron/',
                //     customDir: 'v13.6.9-darwin-x64',
                // },
                productName: productName,
                appId: appId,

                win: {
                    // icon: 'xxx/icon.ico',
                    icon: './public/icon/task.ico',//桌面快捷方式以及开始程序中的应用图标
                    artifactName: '${productName}_setup_${version}.${ext}',
                    target: ['nsis']
                  },
                  nsis: {
                    oneClick: false, // 一键安装
                    menuCategory: menuCategory,
                    // guid: 'xxxx', // 注册表名字，不推荐修改
                    perMachine: true, // 是否开启安装时权限限制（此电脑或当前用户）
                    allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
                    allowToChangeInstallationDirectory: true, // 允许修改安装目录

                    installerIcon: './public/icon/system.ico', // 安装图标打包时的exe文件对应的安装图标
                    uninstallerIcon: './public/icon/vip.ico', // 卸载图标
                    installerHeaderIcon: './public/icon/icon.ico', // 安装时头部图标
                    createDesktopShortcut: true, // 创建桌面快捷方式图标
                    shortcutName: 'I便笺', // 桌面快捷方式图标名称
                    createStartMenuShortcut: true, // 创建开始菜单图标
                    runAfterFinish:true
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
