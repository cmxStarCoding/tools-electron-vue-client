<template>
    <transition name="fade">
        <div v-if="show" class="modal">
            <!-- 弹窗内容 -->
            <div class="modal-content">
                <!-- 内容 -->
                <slot></slot>
                <!-- 关闭按钮 -->
                <!-- 确定按钮 -->
                <button v-if="showConfirmButton" @click="handleConfirm">确定</button>
                <!-- 取消按钮 -->
                <button v-if="showCancelButton" @click="handleCancel">取消</button>
                <!-- 关闭按钮 -->
                <button @click="closeModal">关闭</button>
            </div>
        </div>
    </transition>
</template>
  
<script>
export default {
    props: {
        showConfirmButton: {
            type: Boolean,
            default: true,
        },
        showCancelButton: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            show: false,
        };
    },
    methods: {
        openModal() {
            this.show = true;
        },
        closeModal() {
            this.show = false;
        },
        handleConfirm() {
            this.$emit('confirm'); // 触发自定义 confirm 事件
            this.closeModal();
        },
        handleCancel() {
            this.$emit('cancel'); // 触发自定义 cancel 事件
            this.closeModal();
        },
    },
};
</script>
  
<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
    {
    opacity: 0;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
}</style>
  