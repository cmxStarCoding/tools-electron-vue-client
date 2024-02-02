<template>
    <div class="container" v-if="visible" @click="close">
        <span class="close" @click="close">X</span>
        <span v-html="leftHtmlContent" class="leftHtmlContent"  @click.stop="left"></span>
        <img :src="image_path_array[currentImageIndex]" alt="" :style="{'height':currentHeight +'%','transform':'rotate('+ rotationAngle +'deg)'}" @click.stop>
        <span v-html="rightHtmlContent" class="rightHtmlContent"  @click.stop = "right"></span>
        <ul class="bottom" @click.stop>
            <li @click="shrink">
                <img src="../assets/images/components/shrink.png" alt="">
            </li>
            <li @click="enlarge"> 
                <img src="../assets/images/components/enlarge.png" alt="">
            </li>
            <li @click="clockwise">
                <img src="../assets/images/components/clockwise.png" alt="">
            </li>
            <li @click="counterclockwise">
                <img src="../assets/images/components/counterclockwise.png" alt="">
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        image_path_array:Array,
        visible:Boolean
    },
    emits:['update-visible'],
    data() {
        return {
            currentHeight: 90,
            leftHtmlContent: '<',
            rightHtmlContent: '>',
            currentImageIndex:0,
            rotationAngle:0
        }
    }, 
    mounted() {
        this.image_path = this.image_path_array[0] ?? ''
        // this.getImageSize(this.image_path).then((size) => {
        //     console.log(size.height)
        // })
        this.currentImageIndex = 0;
    },
    watch:{
        image_path_array(   ){
            this.currentHeight = 90
        },
    },
    methods: {
        left(){
            this.currentImageIndex --
            if(this.currentImageIndex < 0){
                this.currentImageIndex = this.image_path_array.length - 1
            }
        },
        right(){
            this.currentImageIndex ++
            if(this.currentImageIndex > this.image_path_array.length - 1){
                this.currentImageIndex = 0
            }
        },
        shrink(){
            this.currentHeight = Math.max(this.currentHeight-20,20)
            this.currentWidth = Math.max(this.currentWidth-20,20)
        },
        enlarge(){
            this.currentHeight = Math.min(this.currentHeight+20,90)
            this.currentWidth = Math.min(this.currentWidth+20,90)
        },
        close(){
            this.$emit('update-visible',false)
        },
        clockwise(){
            this.rotationAngle +=90
        },
        counterclockwise(){
            this.rotationAngle -=90
        }
    },
}
</script>

<style lang="scss" scoped>
.container {
    position: absolute;
    left: 0px;
    top: 0px;
    display: flex;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
    z-index: 0;
    img{
        width: auto;
        height: 100%;
        z-index: 1;
    }
}

.leftHtmlContent,.rightHtmlContent{

    padding: 3px 10px 6px 10px;
    margin-right:10px;
    cursor: pointer;
    font-size: 30px;
    color: white;
    background-color: #606266;
    border-radius: 10px;
    z-index:2;
}
.leftHtmlContent{
    position: absolute;
    top: 50%;
    left: 250px;
}
.rightHtmlContent{
    position: absolute;
    top: 50%;
    right: 250px;
    margin-left:10px;
}
.bottom {
    list-style-type:none;
    padding: 4px 30px;
    z-index:2;
    li{
        padding: 3px 4px;
        cursor: pointer;
        img{
            width: 20px;
            height: auto;
            padding-top: 4px;
        }
    }
    display: flex;
    position: absolute;
    left: 50%;
    bottom: 50px;
    transform: translate(-50%, 0);
    background-color: #606266;

    border-radius: 10%;
}

.close{
    position: absolute;
    z-index:2;
    top: 55px;
    right: 50px;
    cursor: pointer;
    padding: 3px 10px 6px 10px;
    color: white;
    border-radius: 15%;
    background-color: #606266;
}
</style>