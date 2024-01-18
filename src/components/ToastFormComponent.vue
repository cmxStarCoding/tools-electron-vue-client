<!-- PopupForm.vue -->

<template>
    <teleport to="body">
        <div class="popup-container" v-if="visible">
            <div class="popup">
                <div class="popup-header">
                    <span>{{ title }}</span>
                    <button @click="closePopup">关闭</button>
                </div>
                <div class="popup-body">
                    <slot name="form"></slot>
                </div>
                <div class="popup-footer">
                    <button @click="cancelForm">{{ cancelButtonText }}</button>
                    <button @click="confirmForm">{{ confirmButtonText }}</button>
                </div>
            </div>
        </div>
    </teleport>
</template>
  
<script>
export default {
    props: {
        visible: Boolean,
        title: String,
        confirmButtonText: {
            type: String,
            default: '确定',
        },
        cancelButtonText: {
            type: String,
            default: '取消',
        },
    },
    emits: ['confirm', 'cancel','update:visible'], // 在这里声明允许的事件
    methods: {
        closePopup() {
            this.$emit('update:visible', false);
        },
        confirmForm() {
            // 触发确定按钮的方法
            this.$emit('confirm');
            this.closePopup();
        },
        cancelForm() {
            // 触发取消按钮的方法
            this.$emit('cancel');
            this.closePopup();
        },
    },
};
</script>
  
<style scoped>
/* 样式可以根据需要自行调整 */
.popup-container {
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

.popup {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.popup-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
}

button {
    padding: 8px 16px;
    margin-left: 8px;
}
</style>
  