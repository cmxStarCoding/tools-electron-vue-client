<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="system_content">
        <div class="left">
            <span class="title" @click="startCotrol">
                版本
            </span>
            <span class="desc">
                当前版本：阿狸工具{{client_package_info.version }}
            </span>
        </div>
        <div class="feedback">
            <button @click="this.feedbackFormConfig.isVisible = true">意见反馈</button>
            <button class="check_update" @click="check_update">检查更新</button>
        </div>
        <PopupForm :visible="feedbackFormConfig.isVisible" :title="feedbackFormConfig.title"
            :confirmButtonText="feedbackFormConfig.confirmButtonText"
            :cancelButtonText="feedbackFormConfig.cancelButtonText" @confirm="feedbackConfirm"
            @cancel="feedbackCancel" @update:visible="updatFeedbackFormVisible">
            <template #form>
                <div class="feedback_form">
                    <div class="form_item">
                        <div class="form_item_title">
                            <label>您的意见：</label>
                        </div>
                        <textarea rows="7" class="form_input" v-model="feedbackFormConfig.formData.content"></textarea>
                    </div>
                    <div class="form_item">
                        <div class="form_item_title">
                            <label>联系方式：</label>
                        </div>
                        <input type="text" class="form_input" v-model="feedbackFormConfig.formData.contract_phone">
                    </div>
                </div>
            </template>
        </PopupForm>

        <PopupForm :visible="versionUpdateFormConfig.isVisible" :title="versionUpdateFormConfig.title"
        :confirmButtonText="versionUpdateFormConfig.confirmButtonText"
        :cancelButtonText="versionUpdateFormConfig.cancelButtonText" @confirm="updateVersion" @cancel="cancelUpdateVersion"
        @update:visible="updateUpdateVersionVisible">
        <!-- 直接传入HTML代码 -->
        <template #form>
            <div class="download_new_version">
                <p>发现新版本是否下载?</p>
                <div v-if="showDownloadProgress" class="progress">
                    <!-- <span>下载进度：</span> -->
                    <progress :value="downloadProgress" max="100"></progress>
                    <!-- <span class="jindu">{{ progress }}%</span> -->
                </div>
            </div>
        </template>
        </PopupForm>

        <AlertComponent :config="alertConfig"></AlertComponent>

    </div>
</template>
  
<script>
import PopupForm from '../../components/ToastFormComponent.vue';
import AlertComponent from '../../components/AlertComponent.vue';
import apiService from '../../models/axios'
import { ipcRenderer } from 'electron';
export default {
    components:{
        PopupForm,
        AlertComponent
    },
    data() {
        return {
            startCotrolNum:0,
            show_feedback_input: false,
            feedbackFormConfig: {
                isVisible: false,
                title: '意见反馈',
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                formData: {}, // 用于存储表单数据
            },
            showDownloadProgress: false,
            downloadProgress: 0,
            versionUpdateFormConfig: {
                isVisible: false,
                title: '版本更新',
                confirmButtonText: '是',
                cancelButtonText: '否',
                formData: {}, // 用于存储表单数据
            },
            new_version_info:{},
            client_package_info:{}
        }
    },
    mounted() {
        ipcRenderer.invoke('getClientPackageInfo').then((client_package_info) => {
            this.client_package_info = client_package_info
        })
    },
    methods: {
        feedback() {
            this.show_feedback_input = true
        },
        startCotrol(){
            
            this.startCotrolNum++
            if(this.startCotrolNum >= 5){
                ipcRenderer.send('sendStartControl',{})
            }
        },
        updatFeedbackFormVisible(value) {
            this.feedbackFormConfig.isVisible = value;
        },
        feedbackConfirm() {
            apiService.FeedbackApi(this.feedbackFormConfig.formData).then(() => {
                this.showAlert("提交成功")
                this.feedbackFormConfig.isVisible = false;
            }).catch(err => {
                this.showAlert(err?.response?.data?.error ?? "请求异常", 'fail')
            })
        },
        check_update(){
            this.checkNewVersion(1)
        },
        cancelUpdateVersion() {
            // 处理取消按钮逻辑，可以根据需要调整
            this.versionUpdateFormConfig.isVisible = false
        },
        updateUpdateVersionVisible(value) {
            this.versionUpdateFormConfig.isVisible = value;
        },
        feedbackCancel() {
            // 处理取消按钮逻辑，可以根据需要调整
            console.log('Cancelled');
            this.feedbackFormConfig.isVisible = false;
        },
    },
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

@import "../../assets/css/form.css";
.system_content {
    border-top: 1px solid rgb(239, 239, 239);
    border-bottom: 1px solid rgb(239, 239, 239);
    padding: 20px 0px 20px 0px !important;
    display: flex;
    height: 30px;
    width: 100%;
    font-size: 13px;
    align-items: center;
}

.left{
    width: 80%;
    display: flex;
    .desc{
        margin-left: 80px;
    }

}

.feedback {
    display: flex;
    justify-content: space-between;
    width: 100%;
    color: rgb(43, 43, 43);

    button {
        border: 1px solid rgb(218, 218, 218);
        background-color: rgb(242, 242, 242);   
        border-radius: 3px;
        padding: 3px 25px 3px 25px;
        font-size: 12px;
    }

}

.feedback_form {
    display: flex;
    width: 80%;
    flex-direction: column;

    textarea {
        border: 1px solid rgb(239, 239, 239);
        height: 130px;
    }
}

button{
    cursor: pointer;
}

.check_update{
    margin-right: 30px;
}
</style>
  