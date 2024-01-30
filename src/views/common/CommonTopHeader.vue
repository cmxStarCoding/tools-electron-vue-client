<template>
    <div id="elHeader">
        <div class="titlebtn">
            <div class="min" @click="min">
                <!-- <img src="../assets/min.png" /> -->
                -
            </div>
            <div class="max" @click="max">
                <!-- <img src="../assets/max.png" /> -->
                []
            </div>
            <div class="close" @click="close">
                <!-- <img src="../assets/close.png" /> -->
                x
            </div>
        </div>
    </div>
</template>
  
<script>

import { ipcRenderer } from "electron";
export default {

    data() {
        return {};
    },
    methods: {
        min() {
            // alert("aaa");
            ipcRenderer.send("window-min");
        },
        max() {
            ipcRenderer.send("window-max");
        },
        close() {
            ipcRenderer.send("window-close");
        },
    },
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
#elHeader {
    width: 100%;
    height: 30px;
    line-height: 30px;
    background-color: #eee;
    -webkit-app-region: drag;
}

.titlebtn {
    position: relative;
    width: 200px;
    height: 30px;
    line-height: 30px;
    float: right;
    -webkit-app-region: no-drag;

    .min {
        position: absolute;
        background: "green";
        right: 100px;
        width: 18px;

        img {
            width: 100%;
            margin-top: 6px;
        }
    }

    .max {
        position: absolute;
        background: "yellow";
        right: 60px;
        width: 18px;

        img {
            width: 100%;
            margin-top: 6px;
        }
    }

    .close {
        position: absolute;
        background: "black";
        right: 20px;
        width: 18px;

        img {
            width: 100%;
            margin-top: 6px;
        }
    }
}</style>