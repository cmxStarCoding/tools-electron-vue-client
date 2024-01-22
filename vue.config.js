const { defineConfig } = require('@vue/cli-service')

const productName = 'electron-测试';
const appId = 'com.itying.app.' + productName;
const menuCategory = 'electron-测试';
const shortcutName = 'electron-测试';


module.exports = defineConfig({
    transpileDependencies: true,
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                electronDownload: {
                    mirror: "http://npm.taobao.org/mirrors/electron/",
                },
                productName: productName,
                appId: appId,
                win: {
                    icon: 'public/icon/icon.ico',
                    artifactName: '${productName}_setup_${version}.${ext}',
                    target: ['nsis'],
                },
                nsis: {
                    oneClick: false,
                    menuCategory: menuCategory,
                    shortcutName: shortcutName,
                    allowToChangeInstallationDirectory: true,
                    perMachine: true,
                    runAfterFinish: true,
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
                mac: {
                    icon: 'public/icon/icon.icns',
                },
                linux: {
                    icon: 'public/icon/icon.ico',
                },
            },
        }
    }
})
