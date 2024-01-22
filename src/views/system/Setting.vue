<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="system_content">
        <div class="left">
            <span class="title">
                版本
            </span>
            <span class="desc">
                当前版本：阿狸工具V1.0.0
            </span>
        </div>
        <div class="feedback">
            <button @click="this.show_feedback_input = true">意见反馈</button>
            <button class="check_update">检查更新</button>
        </div>
        <div class="feedback_input" v-if="show_feedback_input">
            <div class="feedback_input_content">
                <div class="feedback_input_title">
                    <span class="title">意见反馈</span>
                    <span class="close" @click="this.show_feedback_input = false">X</span>
                </div>
                <div class="feedback_input_item">
                    <span class="item_title">您的意见：</span><textarea rows="7"></textarea>
                </div>

                <div class="feedback_input_item">
                    <span class="item_title">联系方式：</span><input type="text" class="contact_type">
                </div>
                <div class="buttons">
                    <button @click="this.show_feedback_input = false">取消</button>
                    <button>确定</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            show_feedback_input: false
        }
    },
    methods: {
        feedback() {
            this.show_feedback_input = true
        }
    },
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
    // background-color: rgb(242, 242, 242);
    color: rgb(43, 43, 43);

    button {
        border: 1px solid rgb(218, 218, 218);
        background-color: rgb(242, 242, 242);

        border-radius: 3px;
        padding: 3px 25px 3px 25px;
        font-size: 12px;
    }

}

.feedback_input {
    position: fixed;
    top: 0px;
    left: 0px;
    display: flex;
    background: rgba(119, 119, 119, 0.5);
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;

    .feedback_input_content {
        display: flex;
        flex-direction: column; //主轴为垂直方向
        width: 80vh;
        border-radius: 10px;
        box-shadow: 0 4px 12px #00000026;
        background-color: #fff;

        .feedback_input_title {
            width: 100%;
            flex-direction: row; //主轴为水平方向
            display: flex;
            justify-content: space-between; //主轴对齐方式
            padding: 10px 0px 10px 0px;

            .title {
                padding-left: 15px;
            }

            .close {
                cursor: pointer;
                padding-right: 15px;
            }
        }

        .feedback_input_item {
            padding: 10px 20px 15px;
            display: flex;
            flex-direction: row; //主轴为横排
            align-items: center; //交叉轴的对齐方式(这里指表单每一项标题和输入框居中对齐)

            .item_title {
                display: flex;
                flex-basis: 15vh;
                justify-content: flex-end; //主轴对齐方式
            }
        }


        textarea {
            border: 1px solid rgb(239, 239, 239);
            width: 60vh;
        }

        .buttons {
            flex-direction: row; //主轴为水平方向
            justify-content: flex-end; //主轴的对齐方式
            display: flex;
            padding: 15px 0px 15px 0px;

            button {
                border: 1px solid rgb(218, 218, 218);
                background-color: rgb(242, 242, 242);
                border-radius: 3px;
                padding: 3px 25px 3px 25px;
                font-size: 12px;
                margin-right: 20px;
                cursor: pointer;
            }
        }
    }
}

.contact_type {
    border: 1px solid rgb(239, 239, 239);
    height: 20px;
}

button{
    cursor: pointer;
}

.check_update{
    margin-right: 30px;
}
</style>
  