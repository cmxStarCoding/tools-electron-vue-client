<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="container">
        <div class="title">
            <span>开通VIP</span>
        </div>
        <div class="container_content">

            <ul class="tabs">
                <li class="tab" @click="showTab('month')" :class="{ 'active': activeTab === 'month' }">月度会员</li>
                <li class="tab" @click="showTab('quarterly')" :class="{ 'active': activeTab === 'quarterly' }">季度会员</li>
                <li class="tab" @click="showTab('year')" :class="{ 'active': activeTab === 'year' }">年度会员</li>
            </ul>

            <div class="content">
                <div id="tab1" class="tab-content" v-if="activeTab === 'month'">
                    <img src="../../assets/images/my-wechat.jpg">
                    <div class="desc">
                        <p><span>月度会员</span></p>
                        <p>付款：<span class="price">30元</span></p>
                        <p><span>请使用微信扫码支付</span></p>
                    </div>
                </div>
                <div id="tab2" class="tab-content" v-if="activeTab === 'quarterly'">
                    <img src="../../assets/images/my-wechat.jpg">
                    <div class="desc">
                        <p><span>季度会员</span></p>
                        <p>付款：<span class="price">30元</span></p>
                        <p><span>请使用微信扫码支付</span></p>
                    </div>
                </div>
                <div id="tab3" class="tab-content" v-if="activeTab === 'year'">
                    <img src="../../assets/images/my-wechat.jpg">
                    <div class="desc">
                        <p><span>年度会员</span></p>
                        <p><span>付款：30元</span></p>
                        <p><span>请使用微信扫码支付</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeTab: 'month'
        }
    },
    methods: {
        showTab(tabIndex) {
            this.activeTab = tabIndex;
        }
    },
}
</script>

<style lang="scss" scoped>
.container{
    display: flex;
    flex-direction: column;;
    align-items: center;
    width: 100%;
    height: 100%;
    .title{
        display: flex;
        width: 100%;
    }
}

.container_content{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 80vh;
    margin-top: 30px;
}

.content{
    width: 100%;
}
.tabs{
    font-size: 16px;
    
    display: flex;
    justify-content: flex-start;
    list-style: none;
    align-items: center;
    padding:0px;
    background-color: rgb(243, 245, 248);
    border:1px solid #67C23A;

    li{
        padding: 10px 70px;
        cursor: pointer;
        // border-radius: 5px;
    }

}

.tab.active {
    background-color: #67C23A;
    color: white;
}

.tab-content{
    display: flex;
    margin-top: 30px;
    width: 100%;
    img{
        height: 24.5vh;
        margin-right: 20px;
    }
}

.desc{
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    p{
        margin-top: 33px;
    }
}
.price{
    color: rgb(252, 79, 9);
}
</style>