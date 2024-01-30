exports.initMenu = (Menu,dialog,app,path,fs) => {
    //https://www.electronjs.org/docs/api/menu-item
    var menuTemplate = [
        {
            label: "",
            submenu: [
                {
                    label: "关于阿狸工具",
                    accelerator: "ctrl+n",
                    click: () => {
                        console.log("Ctrl+N")

                        const packageJsonPath = path.join(app.getAppPath(), 'package.json');
                        const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
                        const packageJson = JSON.parse(packageJsonContent);

                        dialog.showMessageBoxSync({
                            type: 'info',
                            title: '关于阿狸工具',
                            message: '版本v'+ packageJson.version,
                            buttons: ['OK'],
                          });
                    }
                },
                // {
                //     label: "打开",
                //     accelerator: "ctrl+o",
                //     click: () => {
                //         console.log("Ctrl+O")
                //     }
                // },
                // {
                //     type: "separator"
                // },
                // {
                //     label: "保存"
                // }
            ]
        },
        // {
        //     label: "编辑",
        //     submenu: [
        //         {
        //             label: "复制",
        //             role: "copy",
        //             click: () => {
        //                 console.log("copy")
        //             }
        //         },
        //         {
        //             label: "黏贴",
        //             role: "paste"
        //         }
        //     ]
        // }
    ];

    var menuBuilder = Menu.buildFromTemplate(menuTemplate);

    Menu.setApplicationMenu(menuBuilder);
}