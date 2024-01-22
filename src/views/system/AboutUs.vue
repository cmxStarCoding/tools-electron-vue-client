<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <div class="about_us_content">
            <div class="title">
                <span>关于我们</span>
            </div>
            <div class="top">
                <span>阿狸工具是一款多功能软件，旨在为用户提供便捷、高效的工具体验，如果您对高效工作、创意设计有着共同的热爱，那么我诚挚邀请您加入阿狸工具的开发工作中。让我们一起分享使用体验，共同成长。我相信志同道合的朋友能够激发更多的创新和合作，一同打造更加优秀的工具，期待您的加入。</span>
            </div>
            <hr/>
            <div class="middle">
                <span>我的微信</span>
                <img src="../../assets/images/my-wechat.jpg">
            </div>
            <div class="sponsor">
                <span>觉得不错 赞助一下作者</span>
                <img src="../../assets/images/sponsor.jpg">
            </div>
            <div class="bottom">
                <p @click="openExternalLink" >Github个人主页</p>
            </div>

        </div>
    </div>
</template>
  
<script>
// import fs from 'fs'
import { shell } from 'electron';

// import { shell } from "electron";
export default {
    data() {
        return {

        }
    },
    mounted() {
        // var data = fs.readFileSync("/Users/cuimingxing/11233.txt")
        // console.log(data.toString())
    },
    computed: {

    },
    methods: {
        openExternalLink() {
            const url = 'https://github.com/cmxStarCoding'; // 替换为你要打开的外部链接
            shell.openExternal(url);
        }
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.about_us_content {
    font-size: 13px;
    width: 100%;
    display: flex;
    flex-direction: column;
    .top{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin-top: 10px;
        border-top:1px solid rgb(239, 239, 239);
        span{
            display: flex;
            padding: 5px 0px 5px 0px;
            text-indent: 4ch;
            line-height: 25px;
            color: #495366;
        }
    }
    .middle,.sponsor{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        // border-bottom:1px solid rgb(239, 239, 239);
        align-items: center;
        margin-top: 10px;
        img{
            width: 200px;
        }
        span{
            display: flex;
            padding: 10px 0px 10px 0px;
        }
    }
    .bottom{
        display: flex;
        flex-direction: row;
        justify-content: center;
        p {
            color: #3498db; /* 设置链接颜色 */
            transition: color 0.3s ease; /* 添加颜色过渡效果 */
            cursor: pointer;
        }
        padding-top: 10px;
        border-bottom:1px solid rgb(239, 239, 239);
        padding-bottom: 10px;
    }
}
</style>
  