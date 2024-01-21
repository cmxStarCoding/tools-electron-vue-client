<template>
    <teleport to='body'>
        <div v-if="config.show" :class="{'alert_container_top':config.position == 'top','alert_container_middle':config.position == 'middle'}">

            <svg v-if="config.successIcon" t="1705543070110" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="1655">
                <path
                    d="M512 0C228.430769 0 0 228.430769 0 512s228.430769 512 512 512 512-228.430769 512-512S795.569231 0 512 0z m256 413.538462l-271.753846 271.753846c-7.876923 7.876923-19.692308 11.815385-31.507692 11.815384-11.815385 0-23.630769-3.938462-31.507693-11.815384l-169.353846-169.353846c-15.753846-15.753846-15.753846-47.261538 0-63.015385 15.753846-15.753846 47.261538-15.753846 63.015385 0l137.846154 137.846154 240.246153-240.246154c15.753846-15.753846 47.261538-15.753846 63.015385 0 19.692308 15.753846 19.692308 47.261538 0 63.015385z"
                    fill="#94C86C" p-id="1656"></path>
            </svg>
            <svg v-if="config.failIcon" t="1705543948864" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="2660">
                <path
                    d="M511.999488 65.290005C265.29162 65.290005 65.290517 265.291109 65.290517 511.998977c0 246.708891 200.001103 446.709995 446.708971 446.709995S958.70846 758.707868 958.70846 511.998977C958.70846 265.291109 758.707356 65.290005 511.999488 65.290005L511.999488 65.290005zM716.82855 637.854383c6.803963 6.819313 6.803963 17.856693 0 24.676006l-54.298673 54.29765c-6.819313 6.804986-17.85567 6.820336-24.676006 0L511.999488 590.973656 386.144082 716.828039c-6.819313 6.804986-17.871019 6.804986-24.676006 0l-54.29765-54.29765c-6.804986-6.804986-6.804986-17.856693 0-24.676006l125.869732-125.855406L307.170426 386.144594c-6.804986-6.819313-6.804986-17.871019 0-24.676006l54.29765-54.298673c6.820336-6.803963 17.856693-6.803963 24.676006 0l125.855406 125.870756 125.854383-125.870756c6.820336-6.803963 17.856693-6.803963 24.676006 0l54.298673 54.298673c6.803963 6.804986 6.803963 17.856693 0 24.676006L590.973144 511.998977 716.82855 637.854383 716.82855 637.854383zM716.82855 637.854383"
                    fill="#FF696A" p-id="2661"></path>
            </svg>
            <svg v-if="config.warnIcon" t="1705544018287" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="6182">
                <path d="M511.4 511.9m-426.3 0a426.3 426.3 0 1 0 852.6 0 426.3 426.3 0 1 0-852.6 0Z" fill="#FFFFFF"
                    p-id="6183"></path>
                <path
                    d="M511.4 958.2c-60.2 0-118.7-11.8-173.7-35.1-53.1-22.5-100.9-54.7-141.9-95.6-41-41-73.2-88.7-95.6-141.9-23.3-55-35.1-113.5-35.1-173.7s11.8-118.7 35.1-173.7c22.5-53.1 54.7-100.9 95.6-141.9 41-41 88.7-73.2 141.9-95.6 55-23.3 113.5-35.1 173.7-35.1 60.2 0 118.7 11.8 173.7 35.1 53.1 22.5 100.9 54.7 141.9 95.6 41 41 73.2 88.7 95.6 141.9 23.3 55 35.1 113.5 35.1 173.7s-11.7 118.7-35 173.7C900.2 738.8 868 786.5 827 827.5s-88.7 73.2-141.9 95.6c-55 23.3-113.4 35.1-173.7 35.1z m0-852.6c-224 0-406.3 182.3-406.3 406.3s182.3 406.3 406.3 406.3 406.3-182.3 406.3-406.3c0.1-224-182.2-406.3-406.3-406.3z"
                    fill="#FF7A4E" p-id="6184"></path>
                <path
                    d="M511.4 634.7c-44.7 0-81-36.3-81-81V274.3c0-44.7 36.3-81 81-81s81 36.3 81 81v279.4c0 44.7-36.2 81-81 81z"
                    fill="#FF7A4E" p-id="6185"></path>
                <path d="M511.4 752m-61.8 0a61.8 61.8 0 1 0 123.6 0 61.8 61.8 0 1 0-123.6 0Z" fill="#FF7A4E" p-id="6186">
                </path>
            </svg>
            <slot><span :class="config.class">{{ config.title }}</span></slot>
        </div>
    </teleport>
</template>

<script>

export default {

    props: {
        config: {
            type: Object,
            default: function () {
                return {};
            }
        }
    },
    data() {
        return {
        };
    }
};
</script>

<style lang="scss" scoped>
.alert_container_top {
    position: absolute;
    font-size: 13px;
    top: 0;
    left: 50%;
    display: flex;
    align-items: center;
    transform: translate(-50%, -100%);
    background-color: #eaeaea;
    padding: 10px 50px 10px 5px;
    border-radius: 5px;
    //   animation: fadeInDown 1.2s ease-out 0.1s forwards;
    animation: fadeInDownTop 1.3s forwards;

    // fadeInDown 是动画的名称，与 @keyframes 规则中定义的名称相匹配。
    // 1.3s 是动画的持续时间，表示整个动画从开始到结束的时间为1.3秒。
    // ease-out 是动画的过渡函数，控制动画的速度变化。ease-out 表示动画会以较慢的速度开始，然后加速结束，呈现一种缓慢进入、快速退出的效果。
    // 0.5s 是动画的延迟时间，表示动画将在0.5秒后开始播放。
    // forwards 是动画填充模式（fill-mode），它指定在动画完成后，元素应该保持动画结束时的状态。forwards 表示元素将保持动画的最后一帧状态

    .icon {
        flex-shrink: 0; //子元素自动换行时，会导致其他同级子元素的宽高发生变化，这里可控制其他同级子元素的宽高发生变化
        width: 20px;
        margin: 0px 10px 0px 10px;
    }
}

@keyframes fadeInDownTop {
    0% {
        transform: translate(-50%, -100%);
        opacity: 0;
    }

    50% {
        transform: translate(-50%, 25%);
        opacity: 1;
    }

    100% {
        transform: translate(-50%, 50%);
        opacity: 0;
    }
}

.alert_container_middle {
    position: absolute;
    font-size: 13px;
    top: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    transform: translate(-50%, 0);
    background-color: #eaeaea;
    padding: 10px 50px 10px 5px;
    border-radius: 5px;
    //   animation: fadeInDown 1.2s ease-out 0.1s forwards;
    animation: fadeInDownMiddele 1.3s forwards;

    // fadeInDown 是动画的名称，与 @keyframes 规则中定义的名称相匹配。
    // 1.3s 是动画的持续时间，表示整个动画从开始到结束的时间为1.3秒。
    // ease-out 是动画的过渡函数，控制动画的速度变化。ease-out 表示动画会以较慢的速度开始，然后加速结束，呈现一种缓慢进入、快速退出的效果。
    // 0.5s 是动画的延迟时间，表示动画将在0.5秒后开始播放。
    // forwards 是动画填充模式（fill-mode），它指定在动画完成后，元素应该保持动画结束时的状态。forwards 表示元素将保持动画的最后一帧状态

    .icon {
        flex-shrink: 0; //子元素自动换行时，会导致其他同级子元素的宽高发生变化，这里可控制其他同级子元素的宽高发生变化
        width: 20px;
        margin: 0px 10px 0px 10px;
    }
}

@keyframes fadeInDownMiddele {
    0% {
        transform: translate(-50%, -100%);
        opacity: 0;
    }

    50% {
        transform: translate(-50%, -50%);
        opacity: 1;
    }

    100% {
        transform: translate(-50%, 0);
        opacity: 0;
    }
}



.success {
    color: #67C23A;
}

.fail {
    color: #F56C6C;
}

.warn {
    color: #E6A23C;
}
</style>