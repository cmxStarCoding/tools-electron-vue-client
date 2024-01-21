<template>
    <div class="container">
        <div class="title">
            <span>重置密码</span>
        </div>
        <div class="form_item">
            <div class="form_item_title">
                <span>账号：</span> 
            </div>
            <div>
                <input type="text" placeholder="请输入账号">
            </div>
        </div>
        <div class="form_item">
            <div class="form_item_title">
                <span>邮箱：</span> 
            </div>
            <div>
                <input type="password" placeholder="请输入您的邮箱"><span class="sendCode">发送邮箱验证码</span>
            </div>
        </div>
        <div class="form_item">
            <div class="form_item_title">
                <span>验证码：</span> 
            </div>
            <div>
                <input type="text" placeholder="请输入邮箱接收的验证码">
            </div>
        </div>
        <div class="form_item">
            <div class="form_item_title">
                <span></span> 
            </div>
            <div class="resetbutton">
                <button>发送重置邮件</button>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 13px;
}

.title{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    padding: 10px 0px 10px 0px;
}

.form_item{
    display: flex;
    align-items: center;
    width: 100%;
    padding-top: 30px;
    border-bottom:1px solid rgb(239, 239, 239);
}
.form_item_title{
    display: flex;
    width: 40%;
    justify-content: flex-end;
    margin-right: 10px;
}

input{
    border: 1px solid rgb(218, 218, 218);
    height: 25px;
    width: 200px;
    border-radius: 5px; 
}
.resetbutton{
    display: flex;
    button{
        padding: 5px 62px;
        background-color: rgb(104, 215, 163);
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
}
.sendCode{
    margin-left: 15px;
    cursor: pointer;
    color: darkcyan;
}
</style>
  