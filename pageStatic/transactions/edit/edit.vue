<template>
	<view>
		<view class="uni-input inputs">
			<input type="text" v-model="title" placeholder="请输入标题" />
		</view>
		<view class="uni-textarea">
			<textarea placeholder="请输入文字,最多150" blur="bindTextAreaBlur" maxlength="150" class="text" v-model="message" />
			</view>
			<ss-upload-image :url="url" :limit="3" :file-list="fileList" :name="name" @on-success="onSuccess" @on-error="" @on-remove="onRemove" @on-process="onProcess" />
			<view class="adds">
				<view class="btn" @tap="edit">
					发布 
				</view>
			</view>
		</view>
</template>
<script>
	import ssUploadImage from '@/components/ss-upload-image/ss-upload-image.vue'
	import {UPLOAD_URL,IMG_URL} from '../../../assets/js/const.js'
	import {
		showToast,
		showLoading,
		hideLoading
	} from '@/assets/js/common'
	import {goodsDetail,updateGoods,saveGoods} from '@/api/api'
	export default { 
		components:{ 
			ssUploadImage
		},
		data() {
			return {
				state:'',
				title: '',
				focus: false,
				fileList: [],
				url: UPLOAD_URL,
				name: 'file',
				message:"",
				messageImgArgs:[],
				id:'',
			}
		},
		onLoad(option){
			this.state=option.state
			this.id=option.id
			if(this.state=='edit'){
				this.goodsDetail(this.id)
			}
		},
		methods: {
			bindTextAreaBlur: function (e) {
				console.log(e.detail.value)
			},
			// 上传成功
			onSuccess(res) {
			console.log(res)
			if (res.code === 0) {
			  this.fileList.push(IMG_URL+res.data)
			hideLoading()
			this.messageImgArgs.push(res.data)
			}
			 
			},
			// 上传进程
			onProcess(res) {
			  showLoading('图片已上传'+res.progress+'%')
			  console.log(res)
			},
			// 上传失败
			onError(err) {
			 console.log(err)
			 hideLoading()
			 showToast('图片上传失败')
			},
			// 移除
			onRemove(index) {
			  this.fileList.splice(index, 1)
			  this.messageImgArgs.splice(index, 1)
			},
			async goodsDetail(id){
				let res=await goodsDetail(id)
				if(res.code==0){
					this.title=res.data.memberGoods.title
					this.message=res.data.memberGoods.message
					console.log(res.data.memberGoods)
					if(res.data.memberGoods.messageImg){
						this.messageImgArgs=res.data.memberGoods.messageImg.split(',')
						this.fileList=this.messageImgArgs.map(item=>{
							return IMG_URL+item
						})
					}
					
				}
			},
			async edit(){
				 if(!this.title){
				 	showToast('请输入文章标题')
				 	return;
				 }else if(!this.message){
				 	showToast('请输入文章内容')
				 }
				let parms={
					messageImgArgs:this.messageImgArgs,
					message:this.message,
					title:this.title,
				}
				if(this.state=='edit'){
					parms.id=Number(this.id)
					let ress=await updateGoods(parms)
					if(ress.code==0){
						showToast('更新成功')
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},500)
					}else{
						showToast(ress.msg)
					}
				}else{
					let res=await saveGoods(parms)
					console.log(res)
					if(res.code==0){
						showToast('发布成功')
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},500)
					}else{
						showToast(res.msg)
					}
				}
				
			},
		}
	}
</script>

<style lang="scss">
	@import '../../../assets/css/uni.css';
	.text{
		height: 500upx !important;
		margin-top: 25upx;
	}
	.inputs{
		margin-top: 20upx;
	}
	.adds{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			background: #ffd84d;
			text-align: center;
			color: #000;
			.btn{
				line-height: 100upx;
			}
		}
</style>
