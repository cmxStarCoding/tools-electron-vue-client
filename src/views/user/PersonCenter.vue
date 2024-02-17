<template>
    <div class="person_center_content">
        <div class="title">
            <span>个人中心</span>
        </div>
        <div class="account">
            <div class="setting_name">
                <span>账号：</span>
            </div>
            <div class="setting_ele">
                <span>{{ userDetail.account }}</span>
                <button @click="loggout">退出</button>
            </div>

        </div>
        <div class="avatar">
            <div class="setting_name">
                <span>头像：</span>
            </div>
            <div class="setting_ele">
                <div class="avatar_box">
                    <img :src="userDetail.avatar_url" alt="">
                </div>
                <!-- 隐藏的文件上传字段 -->
                <input type="file" ref="fileInput" accept=".jpg, .jpeg, .png," style="display: none"
                    @change="handleFileChange">

                <!-- 自定义按钮，触发文件上传字段点击事件 -->
                <button type="button" class="custom-upload-button" @click="triggerFileInput">修改</button>
            </div>
        </div>
        <div class="nickname">
            <div class="setting_name">
                <span>昵称：</span>
            </div>
            <div class="setting_ele">
                <span v-if="show_edit_nicknanme_button">{{ userDetail.nickname }}</span>
                <input type="text" v-model="editUserProfileForm.nickname" class="nickname_input"
                    v-if="show_save_nicknanme_button">
                <button v-if="show_edit_nicknanme_button" @click="edit_nickname">修改</button>
                <button v-if="show_save_nicknanme_button" @click="save_nickname">保存</button>
            </div>
        </div>
        <div class="password">
            <div class="setting_name">
                <span>密码：</span>
            </div>
            <div class="setting_ele">
                <span>******</span>
                <button @click="this.editPasswordFormConfig.isVisible = true">修改</button>
            </div>
        </div>

        <PopupForm :visible="editPasswordFormConfig.isVisible" :title="editPasswordFormConfig.title"
            :confirmButtonText="editPasswordFormConfig.confirmButtonText"
            :cancelButtonText="editPasswordFormConfig.cancelButtonText" @confirm="editPasswordConfirm"
            @cancel="editPasswordCancel" @update:visible="updatEditPasswordFormVisible">
            <!-- 直接传入HTML代码 -->
            <template #form>
                <div class="edit_password">
                    <div class="form_item">
                        <div class="form_item_title">
                            <label>老密码:</label>
                        </div>
                        <input class="form_input" v-model="editPasswordFormConfig.formData.old_password" type="password" />
                    </div>
                    <div class="form_item">
                        <div class="form_item_title">
                            <label>新密码:</label>
                        </div>
                        <input class="form_input" v-model="editPasswordFormConfig.formData.new_password" type="password" />
                    </div>
                    <div class="form_item">
                        <div class="form_item_title">
                            <label>确认密码:</label>
                        </div>
                        <input class="form_input" v-model="editPasswordFormConfig.formData.confirm_password"
                            type="password" />
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

import VueEvent from '../../models/event.js'
export default {
    components: {
        PopupForm,
        AlertComponent
    },
    created() {
        this.getUserDetail()
    },
    data() {
        return {
            userDetail: {},
            show_save_nicknanme_button: false,
            show_edit_nicknanme_button: true,
            editPasswordFormConfig: {
                isVisible: false,
                title: '修改密码',
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                formData: {}, // 用于存储表单数据
            },
            editUserProfileForm: {}
        }
    },
    methods: {
        getUserDetail() {
            apiService.UserDetailApi().then((response) => {
                this.userDetail = response.data
            }).catch(err => {
                this.showAlert(err?.response?.data?.error ?? "请求异常", 'fail')
            })
        },
        loggout() {
            apiService.UserLogoutApi({}).then(() => {
                VueEvent.emit("to-common-header-logout", {});
                this.$router.push({ path: '/user_login' })

            }).catch(err => {
                this.showAlert(err?.response?.data?.error ?? "请求异常", 'fail')
            })
        },
        edit_nickname() {
            this.editUserProfileForm.nickname = this.userDetail.nickname
            this.show_save_nicknanme_button = true
            this.show_edit_nicknanme_button = false
        },
        save_nickname() {
            apiService.UserEditApi({
                nickname: this.editUserProfileForm.nickname,
                type: 1
            }).then(() => {
                VueEvent.emit("edit-user-profile", {
                    key: "nickname",
                    value: this.editUserProfileForm.nickname,
                });
                this.getUserDetail()
                this.showAlert("修改成功")
                this.show_save_nicknanme_button = false
                this.show_edit_nicknanme_button = true
            }).catch(err => {
                this.showAlert(err?.response?.data?.error ?? "请求异常", 'fail')
            })
        },
        updatEditPasswordFormVisible(value) {
            this.editPasswordFormConfig.isVisible = value;
        },
        editPasswordConfirm() {
            apiService.EditPasswordApi(this.editPasswordFormConfig.formData).then(() => {
                this.editPasswordFormConfig.isVisible = false;
                VueEvent.emit("to-common-header-logout", {});
                this.showAlert('修改成功,即将跳转登录页', 'success')
                setTimeout(() => {
                    this.$router.push({ path: '/user_login' })
                }, 1000)
            }).catch(err => {
                this.showAlert(err?.response?.data?.error ?? "请求异常", 'fail')
            })
        },
        editPasswordCancel() {
            // 处理取消按钮逻辑，可以根据需要调整
            console.log('Cancelled');
            this.editPasswordFormConfig.isVisible = false;


        },
        // 处理文件上传字段的 change 事件
        handleFileChange(event) {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append('file', file);
            apiService.UploadFileApi(formData, {
                headers: {
                    'Content-Type': "multipart/form-data"
                },
            }).then((response) => {
                this.userDetail.avatar_url = response.data.path
                apiService.UserEditApi({
                    avatar_url: response.data.path,
                    type: 2
                }).then(() => {
                    VueEvent.emit("edit-user-profile", {
                        key: "avatar_url",
                        value: response.data.path,
                    });
                    this.showAlert("修改成功")

                }).catch(err => {
                    this.showAlert(err?.response?.data?.error ?? "请求异常", 'fail')
                })

            }).catch(err => {
                this.showAlert(err?.response?.data?.error ?? "请求异常", 'fail')
            })
        },

        // 触发文件上传字段点击事件
        triggerFileInput() {
            this.$refs.fileInput.click();
        }
    },
}
</script>


<style lang="scss" scoped>
@import "../../assets/css/form.css";

.person_center_content {
    // background-color: red;
    display: flex;
    flex-direction: column;
    font-size: 13px;
    color: #495366;

    .title {
        padding-bottom: 20px;
    }
}

.setting_name {
    display: flex;
    width: 40%;
    justify-content: flex-end; //主轴对齐方式
    padding-right: 20px;
}


.avatar,
.nickname,
.password,
.account {
    border-bottom: 1px solid rgb(239, 239, 239);
    display: flex;
    align-items: center;
    padding: 30px 0px 30px 0px;
}

.setting_ele {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-right: 250px;
}

.nickname_input {
    border: 1px solid rgb(218, 218, 218);
    height: 25px;
    border-radius: 3px;
}

.avatar_box {
    width: 50px;
    height: 50px;
    border-radius: 25px;

    img {
        width: 100%;
        height: 100%;
        border-radius: 50%
    }
}

button {
    border: 1px solid rgb(218, 218, 218);
    padding: 3px 15px 3px 15px;
    cursor: pointer;
}

.edit_password {
    display: flex;
    flex-direction: column;
    width: 75%;
}
</style>