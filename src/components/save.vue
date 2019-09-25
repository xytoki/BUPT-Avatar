<template>
    <div class="save-wrap">
        <div class="save-box">
            <div class="save-image">
                <h2>长按下方图片保存</h2>
                <img :src="image" alt="长按图片保存">
                <button @click="$emit('close')" class="save-close-btn">
                    关闭
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            image:{
                type:String,
                default:""
            }
        }
    }
</script>

<style lang="scss" scoped>
.save-wrap {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    background: rgba(0,0,0,.5);
}
.save-box {
    position: absolute;
    top: 30px;
    left: 0;
    right: 0;
    .save-image {
        width: 90%;
        text-align: center;
        margin: 0 auto;
        background: #fff;
        padding: 30px;
        box-sizing: border-box;
        border-radius: 20px;
        h2 {
            margin-top: 0;
            font-weight: normal;
        }
        img {
            width: 200px;
            display:block;
            margin:0 auto;
        }
    }
}
.save-close-btn {
    -webkit-appearance: none;
    margin-top: 10px;
    width: 200px;
    border: 0;
    background: #ffde2b;
    color: #c65700;
    height: 40px;
    line-height: 30px;
    border-radius: 30px;
    margin-bottom: 5px;
    font-size: 16px;
}
</style>