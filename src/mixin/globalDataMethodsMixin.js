import { ipcRenderer } from 'electron';
import apiService from '../models/axios.js';
import Cookie from '../models/cookie.js';
var baseMixin = {
    data() {
        return {
            alertConfig: {
                show: false,
                title: "默认标题",
                class: "green",
                successIcon: false,
                failIcon: false,
                warnIcon: false,
                position:'top'
            }
        }
    },
    methods: {
        showAlert(title, icon = "success",position = 'top') {

            this.alertConfig.show = true
            this.alertConfig.title = title
            this.alertConfig.position = position

            if (icon == 'success') {
                this.alertConfig.successIcon = true;
                this.alertConfig.class = "success";
            } else if (icon == 'fail') {
                this.alertConfig.failIcon = true;
                this.alertConfig.class = "fail";
            } else if (icon == 'warn') {
                this.alertConfig.warnIcon = true;
                this.alertConfig.class = "warn";
            }
            setTimeout(() => {
                this.alertConfig.show = false
                this.alertConfig.successIcon = false;
                this.alertConfig.failIcon = false;
                this.alertConfig.warnIcon = false;
            }, 1300);
        },
        async checkNewVersion(initiative = 0) {
            //invoke异步，与之对应的是主进程使用handle
            ipcRenderer.invoke('getClientPackageInfo').then((client_package_info) => {
                this.client_package_info = client_package_info
                apiService.CheckSystemUpdateApi({
                    client_version: client_package_info.version
                }).then((response) => {
                    if (response.data.is_exist_new_version == 1 && initiative == 0 && Cookie.get('version-' + response.data.new_version.version) == undefined) {
                        Cookie.set('version-' + response.data.new_version.version, 1, 3600)
                        this.new_version_info = response.data.new_version
                        this.versionUpdateFormConfig.isVisible = true;
                    }

                    if (response.data.is_exist_new_version == 1 && initiative == 1) {
                        this.new_version_info = response.data.new_version
                        this.versionUpdateFormConfig.isVisible = true;
                    }

                }).catch((err) => {
                    this.showAlert(err?.response?.data?.error ?? "请求异常", 'fail')
                })
            });
        },
        async updateVersion() {
            this.showDownloadProgress = true;
            ipcRenderer.send('download-file', {
                file_url: this.client_package_info.platform == "darwin" ? this.new_version_info.mac_download_url : this.new_version_info.window_download_url,
                file_name: this.client_package_info.platform == "darwin" ? this.new_version_info.version_name + ".dmg" : this.new_version_info.version_name + ".exe"
            });

            ipcRenderer.on('download-progress', (event, progress) => {
                console.log(progress, '下载进度')
                this.downloadProgress = progress;
            });

            ipcRenderer.on('download-complete', () => {
                this.showAlert('下载完成', 'success')
                setTimeout(()=>{
                    this.showDownloadProgress = false;
                    this.versionUpdateFormConfig.isVisible = false
                },1500)

            });

            ipcRenderer.on('download_error', () => {
                console.log("下载出错了")
            });
        },
    },
}

export default baseMixin;