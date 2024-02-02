<template>
<div><h2>你好 我是1.2.4</h2>
    <button @click="updateApp" style="width:100px;height: 40px;">更新</button>
    <SystemUpdate v-model:show="show" :percent="percent"></SystemUpdate>
    <ImageViewer :image_path_array="[
                'http://127.0.0.1:8083/static/image_viewer.jpeg',
                'http://127.0.0.1:8083/static/2.jpeg'
            ]" :visible="visible" @update-visible="bb"></ImageViewer>
</div>
</template>

<script>

import SystemUpdate from "../../components/SystemUpdateComponent.vue";
import ImageViewer from "../../components/ImageViewerComponent.vue";

import { ipcRenderer } from 'electron';
export default {
    components: {
        SystemUpdate,
        ImageViewer
    },
    data() {
        return {
            visible:true,
            src:[
                // "http://127.0.0.1:8083/static/image_viewer.jpeg",
                // "http://127.0.0.1:8083/static/2.jpeg"
            ],
            percent: 0,
            show: false
        }
    },
    mounted() {
        //更新进度
        ipcRenderer.on('downloadProgress', (event, data) => {
          
            this.percent = (data.percent).toFixed(2);
            if (data.percent >= 100) {
                // this.show = false;
            }
        });

        /**
         * 主进程返回的检测状态
         */
        ipcRenderer.on('message', (event, data) => {
            switch (data.status) {
                case -1:
                    console.log(data,'更新错误了')
                    break;
                case 0:
                    console.log(data,'正在检查应用程序更新')
                    break;
                case 1:
                console.log(data,'检测到新版本')
                    this.show = true;
                    break;
            }
        });
    },
    methods: {
        bb(value){
            console.log(value,33333)
            this.visible = false
        },
        updateApp() {
            ipcRenderer.send('checkForUpdate', 'asdad')
        }
    }
}
</script>

