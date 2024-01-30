<!-- eslint-disable vue/multi-word-component-names -->
<template>

    <div v-for="(item,key) in cate_tool_list_data" :key="key" class="container">
        <div class="parent_category">
            <span>{{item.name}}</span>
        </div>
        <ul class="children_category_list">
            <li v-for="(v,k) in item.tools" :key="k" @click="this.$router.push({path:v.router})">
                <img :src="v.logo" alt="">
                <span>{{v.name }}</span>
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
import apiService from '../models/axios.js';


export default {
    components: {
        PopupForm,
        AlertComponent
    },
    data() {
        return {
            cate_tool_list_data:[],
            show_fixed_bottom_ul: false,
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
        this.checkNewVersion()
        this.getCateToolsList()
        
    },
    methods: {
        getCateToolsList(){
            apiService.CateToolsListApi({}).then((response) => {
                this.cate_tool_list_data = response.data;
            }).catch((err) => {
                this.showAlert(err?.response?.data?.error ?? "请求异常", 'fail')
            })
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
        cancelUpdateVersion() {
            // 处理取消按钮逻辑，可以根据需要调整
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
        cursor: pointer;

    }

    img {
        width: 40px;
        margin-right: 10px;
    }
}
</style>
  