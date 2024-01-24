<template>
    <div>
        <button @click="downloadFile">Download File</button>
        <div v-if="showProgress">
            <p>Downloading... {{ progress }}%</p>
            <progress :value="progress" max="100"></progress>
        </div>
    </div>
</template>
  
<script>
import { ipcRenderer } from 'electron';

export default {
    data() {
        return {
            showProgress: false,
            progress: 0,
        };
    },
    methods: {
        async downloadFile() {
            this.showProgress = true;
            ipcRenderer.send('download-file',{
                file_url:"http://127.0.0.1:8083/static/download/app/阿狸工具-0.1.0.dmg"
            });

            ipcRenderer.on('download-progress', (event, progress) => {
                console.log(progress,'下载进度')
                this.progress = progress;
            });

            ipcRenderer.on('download-complete', () => {
                console.log("下载完成了")
                this.showProgress = false;
            });

            ipcRenderer.on('download_error', () => {
                console.log("下载出错了")
            });
        },
    },
};
</script>
  
<style>
/* Add your styles here */
</style>
  