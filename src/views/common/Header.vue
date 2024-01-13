<template>
    <div class="header_content">
        <div class="site_title">
            <div class="site_logo">
                <img src="../../assets/icon.png" alt="">
                <span>阿狸工具</span>
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
.header_content {
    font-size: 15px;
    color: #495366;
    background-color: rgb(255, 255, 255);
    border: none;
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, .06);
    height: 65px;
}

.site_title {
    height: 65px;
    line-height: 65px;
    padding-left: 15px;
    display: flex;
    align-items: center;
    /* 垂直居中对齐 */
}

.site_logo {
    display: flex;
    align-items: center;
    /* 垂直居中对齐 */
}

.site_logo img {
    width: 24px;
    /* 调整图片宽度，确保高度一致 */
    height: 24px;
    /* 调整图片高度，确保高度一致 */
    margin-right: 5px;
}

.site_logo span {
    font-weight: bold;
    /* 调整文字大小，确保和图片对齐 */
}</style>
  