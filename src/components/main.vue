<template>
        <main>

            <section class="avatar-box" @click="$refs.picker.click()">
                <div class="noImage upload-box" v-show="!hasImage">
                    <div class="upload-box">
                        <svg viewBox="0 0 512 512.00099" xmlns="http://www.w3.org/2000/svg"><path d="m373.410156 0h-234.816406c-76.421875 0-138.59375 62.171875-138.59375 138.59375v234.8125c0 76.421875 62.171875 138.59375 138.59375 138.59375h234.816406c76.417969 0 138.589844-62.171875 138.589844-138.59375v-234.8125c0-76.421875-62.171875-138.59375-138.589844-138.59375zm108.574219 373.40625c0 59.871094-48.707031 108.578125-108.578125 108.578125h-234.8125c-59.871094 0-108.578125-48.707031-108.578125-108.578125v-1.316406l86.089844-79.25c2.4375-2.242188 6.257812-2.242188 8.695312-.003906l65.875 60.476562c7.640625 7.015625 17.941407 10.441406 28.269531 9.414062 10.324219-1.03125 19.742188-6.4375 25.847657-14.828124l116.25-159.847657c1.542969-2.117187 3.65625-2.558593 4.777343-2.632812 1.121094-.066407 3.273438.085937 5.078126 1.988281l111.082031 117.050781v68.949219zm0-112.550781-89.3125-94.109375c-7.472656-7.875-17.960937-11.984375-28.808594-11.277344-10.832031.707031-20.707031 6.148438-27.09375 14.929688l-116.253906 159.847656c-1.472656 2.023437-3.488281 2.507812-4.558594 2.613281-1.066406.105469-3.136719.035156-4.980469-1.660156l-65.875-60.472657c-13.839843-12.710937-35.503906-12.691406-49.324218.03125l-65.761719 60.535157v-192.699219c0-59.871094 48.707031-108.578125 108.578125-108.578125h234.816406c59.867188 0 108.574219 48.707031 108.574219 108.578125zm0 0"/><path d="m142.910156 86.734375c-29.082031 0-52.746094 23.664063-52.746094 52.75 0 29.082031 23.664063 52.746094 52.746094 52.746094 29.085938 0 52.746094-23.664063 52.746094-52.746094.003906-29.085937-23.660156-52.75-52.746094-52.75zm0 75.476563c-12.53125 0-22.730468-10.195313-22.730468-22.730469 0-12.53125 10.199218-22.730469 22.730468-22.730469 12.535156 0 22.730469 10.195312 22.730469 22.730469 0 12.535156-10.195313 22.730469-22.730469 22.730469zm0 0"/></svg>
                        点击选择图片
                    </div>
                </div>
                <canvas width="512" height="512" ref="canvas"></canvas>
            </section>

            <section class="choice-box">
                <div class="choice-warp">
                    <div :class="{active:activeHead==a}" class="choice-icon" :key="'head'+a" @click="activeHead=a" v-for="(i,a) in head" >
                        <img class="choice-img" :src="i.preview">
                    </div>
                </div>
            </section>

            <section class="save-box" v-show="hasImage">
                <button @click="saveImage" class="save-btn">
                    保存图片
                </button>
                <div class="save-tips">
                    Tips：点击头像框可更换头像图片！
                </div>
            </section>
            
            <!--Avatar cropper-->
            <div id="pick-avatar" ref="picker"></div>
            <avatar-cropper mimes="image/*" trigger="#pick-avatar" :upload-handler="getImage"/>
        </main>
</template>

<script>
    import AvatarCropper from "vue-avatar-cropper"
    import heads from '@/heads'
    export default {
        components: { AvatarCropper },
        data(){
            return{
                hasImage:false,
                activeHead:-1,
                head:heads
            }
        },
        methods:{
            getImage(e){
                this.$orignalImage=e.getCroppedCanvas({width: 512, height: 512});
                this.drawIcon();
            },
            renewImage(){
                this.$ctx.clearRect(0,0,512,512);
                if(!this.$orignalImage)return;
                this.$ctx.drawImage(this.$orignalImage,0,0,512,512);
                this.hasImage=true;
            },
            drawIcon(){
                this.renewImage();
                if(this.activeHead<0)return;
                this.$ctx.drawImage.apply(this.$ctx,[this.$headImg[this.activeHead]].concat(this.head[this.activeHead].params));
            },
            saveImage(){
                var base64=this.$refs.canvas.toDataURL("image/png");
                this.$emit("save",base64);
            },
            loadImg(url){
                return new Promise(function(resolve,reject){
                    var i=new Image();
                    i.onload=function(){
                        resolve(i);
                    }
                    i.onerror=reject;
                    i.src=url;
                });
            }
        },
        async mounted(){
            await this.$nextTick();
            this.$ctx=this.$refs.canvas.getContext("2d");
            var promises=[];
            for(var i of this.head){
                promises.push(this.loadImg(i.src));
            }
            this.$headImg=await Promise.all(promises);
        },
        watch:{
            activeHead(){
                this.drawIcon();
            }
        }
    }
</script>

<style lang="scss" scoped>
.avatar-box {
    position: relative;
    width: 200px;
    height: 200px;
    background: rgba(255,255,255,0.5);
    margin: 0 auto;
    border: 2px solid #ffe34b;
    border-radius: 30px;
    overflow: hidden;
    cursor: pointer;
    .noImage {
        position: absolute;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        z-index:1;
        text-align: center;
        .upload-box{
            color:#77362c;
            margin-top:65px;
            svg {
                fill: #77362c;
                width: 50px;
                height: 50px;
                display: block;
                margin: 0 auto;
                margin-bottom:7px;
            }
        }
    }
    canvas{
        width:100%;
        height: 100%;
        display: block;
        position:relative;
        z-index:2;
    }
}
.choice-box{
    height:70px;
    margin: 20px 30px;
    background: rgba(255,255,255,.5);
    border-radius: 10px;
    padding:0 10px;
    .choice-warp {
        width: 100%;
        overflow-x: auto;
    }
    .choice-icon {
        padding: 10px 5px;
        display: inline-block;
        overflow: hidden;
        img{
            border-radius: 7px;
            width: 50px;
            height: 50px;
            display:block;
        }
        &.active {
            background: rgba(255,255,255,0.3);
        }
    }
}
.save-btn {
    height: 60px;
    margin: 0 30px;
    background: #ffde2b;
    color: #c65700;
    border-radius: 30px;
    padding: 0 10px;
    -webkit-appearance: none;
    display: block;
    width: calc(100% - 60px);
    border: 0;
    font-size: 17px;
}
.save-tips {
    text-align: center;
    color: #fff;
    margin-top: 5px;
}
main::v-deep{
    .avatar-cropper .avatar-cropper-container .avatar-cropper-footer .avatar-cropper-btn:hover {
        background-color: #e56b57;
        color: #fff;
    }
    .cropper-line,.cropper-point.point-se::before,.cropper-point {
        background-color: #ffde2b !important;
    }
    .cropper-view-box{
        outline:#ffde2b !important;
    }
    .avatar-cropper .avatar-cropper-overlay {
        background: rgba(0,0,0,.5);
    }
}
</style>