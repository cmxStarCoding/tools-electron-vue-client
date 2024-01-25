<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="container">
        <div class="parent_category">
            <span>图片处理</span>
        </div>
        <ul class="children_category_list">
            <li>
                <img src="../assets/images/category.png" alt="">
                <span>贴图工具</span>
            </li>
            <li>
                <img src="../assets/images/category.png" alt="">
                <span>无损放大</span>
            </li>
            <li>
                <img src="../assets/images/category.png" alt="">
                <span>贴图工具</span>
            </li>
            <li>
                <img src="../assets/images/category.png" alt="">
                <span>贴图工具</span>
            </li>
            <li>
                <img src="../assets/images/category.png" alt="">
                <span>贴图工具</span>
            </li>
            <li>
                <img src="../assets/images/category.png" alt="">
                <span>贴图工具</span>
            </li>
            <li>
                <img src="../assets/images/category.png" alt="">
                <span>贴图工具</span>
            </li>
        </ul>
    </div>

    <div class="container">
        <div class="parent_category">
            <span>识别转换</span>
        </div>
        <ul class="children_category_list">
            <li>
                <img src="../assets/images/category.png" alt="">
                <span>Word转Pdf</span>
            </li>
            <li>
                <img src="../assets/images/category.png" alt="">
                <span>Pdf转word</span>
            </li>
        </ul>

    </div>

    <PopupForm :visible="versionUpdateFormConfig.isVisible" :title="versionUpdateFormConfig.title"
        :confirmButtonText="versionUpdateFormConfig.confirmButtonText"
        :cancelButtonText="versionUpdateFormConfig.cancelButtonText" @confirm="updateVersion" @cancel="cancelUpdateVersion"
        @update:visible="updateUpdateVersionVisible">
        <!-- 直接传入HTML代码 -->
        <template #form>
            <div class="download_new_version">
                <p>发现新版本是否更新?</p>
                <div v-if="showDownloadProgress" class="progress">
                    <!-- <span>下载进度：</span> -->
                    <progress :value="downloadProgress" max="100"></progress>
                    <!-- <span class="jindu">{{ progress }}%</span> -->
                </div>

            </div>
        </template>
    </PopupForm>
    <AlertComponent :config="alertConfig"></AlertComponent>

</template>
  
<script>
import PopupForm from '../components/ToastFormComponent.vue'
import AlertComponent from '../components/AlertComponent.vue'
import { ipcRenderer } from 'electron';
import apiService from '../models/axios.js';
import Cookie from '../models/cookie.js';


export default {
    name: 'App',
    components: {
        PopupForm,
        AlertComponent
    },
    data() {
        return {
            show_fixed_bottom_ul: false,
            showDownloadProgress: false,
            downloadProgress: 0,
            versionUpdateFormConfig: {
                isVisible: false,
                title: '版本更新',
                confirmButtonText: '是',
                cancelButtonText: '否',
                formData: {}, // 用于存储表单数据
            }
        }
    },
    mounted() {
        this.getVersion()
    },
    methods: {
        async getVersion() {
            //invoke异步，与之对应的是主进程使用handle
            ipcRenderer.invoke('getPackageVersion').then((version) => {
                apiService.CheckSystemUpdateApi({
                    client_version: version
                }).then((response) => {
                    if (response.data.is_exist_new_version == 1 && Cookie.get('version-' + response.data.new_version.version) == undefined) {
                        Cookie.set('version-' + response.data.new_version.version, 1, 86400)
                        this.versionUpdateFormConfig.isVisible = true;
                    }
                }).catch((err) => {
                    this.showAlert(err?.response?.data?.error ?? "请求异常", 'fail')
                })
            });
        },
        close_fixed_icons_list() {
            this.show_fixed_bottom_ul = !this.show_fixed_bottom_ul
            setTimeout(() => {
                if (this.show_fixed_bottom_ul) {
                    this.show_fixed_bottom_ul = false
                }
            }, 7000);
        },
        updateUpdateVersionVisible(value) {
            this.versionUpdateFormConfig.isVisible = value;
        },
        async updateVersion() {
            this.showDownloadProgress = true;
            ipcRenderer.send('download-file', {
                file_url: "http://127.0.0.1:8083/static/download/app/阿狸工具-0.1.0.dmg"
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
        cancelUpdateVersion() {
            // 处理取消按钮逻辑，可以根据需要调整
            console.log('Cancelled');
            this.versionUpdateFormConfig.isVisible = false
        },
    }
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    font-size: 13px;
}

.parent_category {
    padding: 0px 0px 5px 0px;
    width: 100%;
}

.children_category_list {
    display: flex;
    flex-wrap: wrap;
    padding: 0px;

    li {
        width: 180px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        list-style: none;
        padding: 10px 55px 10px 15px;
        background-color: #fff;
        border-radius: 10px;
        margin-right: 20px;
        margin-bottom: 20px;
    }

    img {
        width: 60px;
        margin-right: 10px;
    }
}
</style>
  