<template>
    <div class="contaier">
       <button @click="dialog">弹窗</button>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
    components: {

    },
    data() {
        return {
           
        }
    },
    methods: {
        // 弹窗
        dialog() {
            // 调用主进程方法
            ipcRenderer.send('show-dialog');
            // 监听主进程的回复                              
            ipcRenderer.on('show-dialog-response', (event, result) => {
                console.log(result); // 处理主进程返回的结果
            });
        }
    },
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/form.css";
@import "../../assets/css/table.css";

</style>