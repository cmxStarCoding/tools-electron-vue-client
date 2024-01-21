<!-- PopupForm.vue -->

<template>
    <teleport to="body">
        <div class="popup-container" v-if="visible">
            <div class="popup">
                <div class="popup-header">
                    <span>{{ title }}</span>
                    <span @click="closePopup" class="close">X</span>
                </div>
                <div class="popup-body">
                    <slot name="form"></slot>
                </div>
                <div class="popup-footer">
                    <button @click="cancelForm" class="cancel_button">{{ cancelButtonText }}</button>
                    <button @click="confirmForm" class="confirm_button">{{ confirmButtonText }}</button>
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
  
<style lang="scss" scoped>
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
    font-size: 14px;
}

.popup-body{
    width: 100%;
}
.popup {
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 90vh;
}

.popup-header {
    display: flex;
    width: 100%;    
    justify-content: space-between;
    /* align-items: center;  */
    margin-bottom: 10px;
    span {
        padding: 8px 12px;
        margin-left: 8px;
    }
    .close{
        cursor: pointer;
    }
}

.popup-footer {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    button{
        margin: 10px 15px;
        padding: 3px 25px;
        height: 30px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    .confirm_button{
        background-color: #409EFF;
    }
    .cancel_button{
        background-color: #F2F6FC;
    }
}


</style>
  