<!-- eslint-disable vue/multi-word-component-names -->

<!-- <button @click="this.$router.push({path:'/system_update'})">测试</button> -->
<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="280px">
                <div class="input-container">
                    <el-input v-model="input2" class="responsive-input" placeholder="搜索" :prefix-icon="Search" />
                    <el-icon><Plus /></el-icon>
                </div>
                <div class="conversation_list">
                    
                    <el-avatar shape="square" :size="40" fit="cover" :src="url" /> 
                    <span class="new_msg">12</span>   
                    <div class="conversation_info">
                        <div class="conversation_info_top">
                            <div>
                                <!-- <el-text class="mx-1" size="small">群聊</el-text> -->
                                <span style="font-size: 14px;">婷婷</span>
                            </div>
                            <el-text class="mx-1" size="small">19:21</el-text>
                        </div>
                        <div>
                            <el-text size="small" type="info">大家好啊</el-text>
                        </div>
                    </div>
                </div>
              <div class="conversation_list">
                    
                    <el-avatar shape="square" :size="40" fit="cover" :src="url" /> 
                    <span class="new_msg">5</span>   
                    <div class="conversation_info">
                        <div class="conversation_info_top">
                            <div>
                                <!-- <el-text class="mx-1" size="small">群聊</el-text> -->
                                <span style="font-size: 14px;">老妈</span>
                            </div>
                            <el-text class="mx-1" size="small">19:21</el-text>
                        </div>
                        <div>
                            <el-text size="small" type="info">吃饭了吗</el-text>
                        </div>
                    </div>
                </div>
                
            </el-aside>
            <el-container>
                <el-header height="40px">婷婷</el-header>
                <el-main height="800px">Main</el-main>
                <el-footer height="160px">Footer</el-footer>
            </el-container>
        </el-container>
    </div>
</template>



<script>
import { Search } from '@element-plus/icons-vue'

export default {
    components: {

    },
    computed:{
        Search() {
        //把导入的图标挂到实例上，模板才能用
        return Search
        },
    },
    data() {
        return {
             input2: '',
             url:"https://cms-static.pengwin.com/data/crm/default/cf/b8/d0/cfb8d09d4f09ec93f205b315616d77b8.jpeg"
        }
    },
    mounted() {

    },
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>


.el-aside {
    // border: 1px solid gray;
    // background-color: aqua;
    height: calc(100vh - 30px);
    padding-left: 10px;
    border-right: 1px solid #eae4e4;
    .input-container{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        // border-bottom: 1px solid #ded5d5;
        height: 40px;
        .el-icon{
            margin-right: 5px;
            cursor: pointer;
            height: 22px;
            width: 22px;
            line-height: 10px;
            border-radius: 3px;
            background-color: white;
        }
    }

}


.el-header {
    // border: 1px solid gray;
    display: flex;
    flex-direction: raw;
    align-items: center;
    font-size: 16px;
    border-bottom: 1px solid #eee;
    // background-color: aqua;
}

.el-main {
    // border: 1px solid gray;
    // background-color: aqua;
    border-bottom: 1px solid #eee;
}

.el-footer {
    // border: 1px solid gray;
    // background-color: aqua;
}

.conversation_list {
    height: 50px;
    display: flex;
    flex-direction:row;
    padding-top: 10px;
    // border: 1px solid grey;

    .new_msg{
        background-color: rgb(235, 5, 5);
        width: 16px;
        height: 16px;
        line-height: 16px;
        border-radius: 8px;
        /* 添加以下代码实现完美居中 */
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: white;
        position: relative;
        left: -12px; /* 向左移动15px */
        top: -5px;  /* 向上移动15px，定位到右上角 */
    }

    .conversation_info {
        display: flex;
        flex-direction:column;
        justify-content:flex-start;
        // padding-left: 5px;
        padding-right: 5px;
        flex: 1;
        .conversation_info_top {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
    }
}

.demo-input-with-icon {
    width: 100%;
}

.input-group {
    margin-bottom: 1.5rem;
}

.label {
    display: block;
    margin-bottom: 1rem;
    color: var(--el-text-color-regular);
}

// .input-container {
//     display: flex;
//     gap: 1rem;
//     flex-wrap: wrap;
// }

.responsive-input {
    width: 240px;
}

@media (max-width: 768px) {
    .input-container {
        flex-direction: column;
        gap: 1rem;
    }

    .responsive-input {
        width: 100%;
    }
}
</style>