<template>
    <div id="elHeader">
        <div class="titlebtn" v-if="is_win">
            <div class="min" @click="min" :class="{'active' : mourse_area == 'min'}" @mousemove="changeColor('min')" @mouseout="clearColor()">
                <img src="../../assets/images/system_icon/min.png" />
            </div>
            <div class="max" @click="max" :class="{'active' : mourse_area == 'max'}" @mousemove="changeColor('max')" @mouseout="clearColor()">
                <img src="../../assets/images/system_icon/max.png" />
            </div>
            <div class="close" @click="close" :class="{'active' : mourse_area == 'close'}" @mousemove="changeColor('close')" @mouseout="clearColor()">
                <img src="../../assets/images/system_icon/close.png" />
            </div>
        </div>
    </div>
</template>
  
<script>

import { ipcRenderer } from "electron";
export default {

    data() {
        return {
          is_win:false,
          mourse_area:""
        };
    },  
    mounted() {
        this.initPageInfo()
    },
    methods: {
        initPageInfo(){
          ipcRenderer.invoke('getClientPackageInfo').then((client_package_info) => {
            // this.is_win = false
            console.log(client_package_info)
              this.is_win = client_package_info.platform == "win32" ? true : false
          })
        },
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
        clearColor(){
          this.mourse_area =""

        },
        changeColor(value){
          console.log(value)
          this.mourse_area = value
        }
    },
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
#elHeader {
    width: 100%;
    height: 30px;
    background-color: #eee;
    display: flex;
    justify-content: flex-end;

    -webkit-app-region: drag;
}

.titlebtn {
    position: relative;
    display: flex;
    -webkit-app-region: no-drag;

    .min {
        padding: 2px 5px 2px 5px;
        cursor: pointer;
        img {
            width: 20px;
            height: 20px;
        }
    }

    .max {
        padding: 2px 5px 2px 5px;
        cursor: pointer;

         img {
            width: 20px;
            height: 20px;
        }
    }

    .close {
        padding: 2px 5px 2px 5px;
        cursor: pointer;
        border-radius: 5px;

        img {
            width: 20px;
            height: 20px;
        }
    }
}

.active {
    background-color: #74b1be;
}
</style>