<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <!-- 触发弹窗按钮 -->
        <button @click="openModal">打开弹窗</button>

        <!-- 弹窗组件 -->
        <MyModal @closeModal="closeModal" ref="myModal" :showConfirmButton="true" :showCancelButton="true"
            @confirm="handleConfirm" @cancel="handleCancel">
            <!-- 弹窗内容 -->
            <p>这是弹窗的内容</p>
        </MyModal>
    </div>
</template>
  
<script>
import MyModal from "../../components/ToastComponent.vue";

export default {
    components: {
        MyModal,
    },
    methods: {
        openModal() {
            this.$refs.myModal.openModal();
        },
        closeModal() {
            // 处理关闭弹窗后的逻辑
            console.log("弹窗已关闭");
        },
        handleConfirm() {
            // 处理确定按钮点击后的逻辑
            console.log("确定按钮被点击");
        },
        handleCancel() {
            // 处理取消按钮点击后的逻辑
            console.log("取消按钮被点击");
        },
    },
};
</script>
  