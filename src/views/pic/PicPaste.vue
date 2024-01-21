<!-- ParentComponent.vue -->
<template>
    <div>
        <button @click="showPopup">打开弹出框</button>
        <PopupForm :visible="isPopupVisible" :title="popupTitle" :confirmButtonText="confirmButtonText"
            :cancelButtonText="cancelButtonText" @confirm="handleConfirm" @cancel="handleCancel"
            @update:visible="updatePopupVisible">
            <!-- 直接传入HTML代码 -->
            <template #form>
                <div>
                    <label>
                    用户名:
                    <input v-model="formData.username" type="text" />
                </label>
                </div>
                <div>
                    <label>
                    密码:
                    <input v-model="formData.password" type="password" />
                </label>
                </div>

                <!-- 其他表单字段... -->
            </template>
        </PopupForm>

        <button @click="showAlert('西休息','success')">打开提示框</button>
        <div id="alert-container"></div>
        <AlertComponent :config="alertConfig"></AlertComponent>
    </div>
</template>
  
<script>
import PopupForm from '../../components/ToastFormComponent.vue';
import AlertComponent from '../../components/AlertComponent.vue';

export default {
    components: {
        PopupForm,
        AlertComponent
    },
    data() {
        return {
            isPopupVisible: false,
            popupTitle: '自定义标题',
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            formData: {}, // 用于存储表单数据
        };
    },
    methods: {
        showPopup() {
            this.isPopupVisible = true;
        },
        updatePopupVisible(value) {
            this.isPopupVisible = value;
        },
        handleConfirm() {
            // 处理确定按钮逻辑，可以根据需要调整
            console.log('Confirmed with data:', this.formData);
        },
        handleCancel() {
            // 处理取消按钮逻辑，可以根据需要调整
            console.log('Cancelled');
        },
    },
};
</script>
  