<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="container">
        <div class="parent_category">
            <span>图片处理</span>
        </div>
        <ul class="children_category_list" >
            <li>
                <img src="../assets/images/category.png" alt="">
                <span>贴图工具</span>
            </li>
            <li>
                <img src="../assets/images/category.png" alt="">
                <span>无损放大</span>
            </li>
            <li>
                <img src="../assets/images/category.png" alt="">
                <span>贴图工具</span>
            </li>
            <li>
                <img src="../assets/images/category.png" alt="">
                <span>贴图工具</span>
            </li>
            <li>
                <img src="../assets/images/category.png" alt="">
                <span>贴图工具</span>
            </li>
            <li>
                <img src="../assets/images/category.png" alt="">
                <span>贴图工具</span>
            </li>
            <li>
                <img src="../assets/images/category.png" alt="">
                <span>贴图工具</span>
            </li>
        </ul>
    </div>

    <div class="container">
        <div class="parent_category">
            <span>识别转换</span>
        </div>
        <ul class="children_category_list" >
            <li>
                <img src="../assets/images/category.png" alt="">
                <span>Word转Pdf</span>
            </li>
            <li>
                <img src="../assets/images/category.png" alt="">
                <span>Pdf转word</span>
            </li>
        </ul>

    </div>
</template>
  
<script>

export default {
    
};
</script>

<style lang="scss" scoped>
.container{
    display: flex;
    flex-direction: column;
    font-size: 13px;
}
.parent_category{
    padding: 0px 0px 5px 0px;
    width: 100%;
}

.children_category_list{
    display: flex;
    flex-wrap:wrap;
    padding: 0px;
    li{
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
    }
    img{
        width: 60px;
        margin-right: 10px;
    }
}
</style>
  