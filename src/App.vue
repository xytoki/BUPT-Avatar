<template>
    <div id="app">
        <h1 class="pagetitle">北邮口罩生成器</h1>
        <app-main @save="saveImage=$event"/>
        <transition name="el-zoom-in-top">
            <app-save @close="saveImage=''" :image="saveImage" v-show="saveImage!=''"/>
        </transition>
        <footer class="copyright">@BYR Team:xyToki</footer>
    </div>
</template>

<script>
import appMain from './components/main.vue'
import appSave from './components/save.vue'
export default {
    name: 'app',
    data(){
        return{
            saveImage:""
        }
    },
    components: {
        appMain,
        appSave
    }
}
</script>

<style lang="scss">
html,body{
  margin: 0;
  padding: 0;
}
#app, body, html {
    min-height: 100%;
    width: 100%;
    -webkit-touch-callout: none;
    user-select: none;
    background-color: #ff4b3d;
}
#app {
    position: relative;
    overflow-x: hidden;
    width: 100%;
    min-height: 100vh;
    max-width: 500px;
    margin: 0 auto;
    background-image: url(~@/assets/bg.png);
    background-repeat: no-repeat;
    background-size: cover;
}
.pagetitle{
    text-align: center;
    margin-top: 1em;
    color: #ffe44f;
    font-weight: normal;
}
.copyright {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    color: #fff;
    font-size: 12px;
    font-family: Menlo,Monaco,Consolas,"Courier New",monospace;
}
</style>
