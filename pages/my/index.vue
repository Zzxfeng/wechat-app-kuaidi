<template>
	<view class="global">
		<view class="tou" v-if='isLogin'>
			<view class="names">
				<image @click="chooesImg" :src="memberinfo.headImgUrl"></image><text>{{memberinfo.managerNickName}}</text>
			</view>
			<view class="school">
				——{{memberinfo.schoolName}}的小伙伴
			</view>
		</view>
		<view class="tou" v-else>
			<view class="names" @tap='goLogin'>
				<image src="../../static/logo.png"></image><text>请登录</text>
			</view>
		</view>
		<view class="orderList">
			<view class="myorder">
				<view class="order">
					我的订单
				</view>
				<view class="allOrder">
					<text @tap="isLogin?toOrderList(-1):''">全部订单</text>
					<uni-icon type="arrowright" size="20" color="#7a7a7a"></uni-icon>
				</view>
			</view>
			<view class="status">
				<view class="sItem sItem1" v-for="(row,index) in orderList" :key="index" @tap="toOrderList(index)">
					<image :src="row.img" mode=""></image>
					<view class="dfk">
						{{row.text}}
					</view>
				</view>
			</view>
		</view>
		<view class="orderList fuwu">
			<view class="myorder">
				<view class="order">
					我的服务
				</view>
			</view>
			<view class="status">
				<view class="sItem" v-for='(item,index) in list' :key='index'>
					<!-- <template v-if='index==3'> -->
					<uni-badge :text="forumMsgNum" type="error" class="badge" v-if='index==3&&forumMsgNum>0' />
					<!-- </template> -->
					<!-- <template v-if='index==2'> -->
					<uni-badge :text="goodMsgNum" type="error" class="badge" v-if='index==2&&goodMsgNum>0' />
					<!-- </template> -->

					<template v-if='item.url'>
						<navigator :url="isLogin?item.url:null">
							<image :src="item.img" mode="" style="width: 46upx;"></image>
							<view class="dfk">
								{{item.text}}
							</view>
						</navigator>
					</template>
					<template v-else>
						<view @tap="doSomething(item.text)">
							<image :src="item.img" mode="" style="width: 56upx;"></image>
							<view class="dfk">
								{{item.text}}
							</view>
						</view>
					</template>

				</view>
			</view>
		</view>
		<view class="orderList fensi">
			<view class="myorder" @tap="isLogin?toFans():null">
				<view class="order">
					我的粉丝
				</view>
				<view class="order">
					<uni-icon type="arrowright" size="20" color="#666"></uni-icon>
				</view>
			</view>
			<view class="mains">
				<view class="main">
					<view class="count">
						{{memberinfo.followersNum}}
					</view>
					<view class="fs">
						我的粉丝
					</view>
				</view>
				<view class="main">
					<view class="count">
						{{memberinfo.lookNum}}
					</view>
					<view class="fs">
						我的访问
					</view>
				</view>
			</view>
		</view>
		<view class="orderList shouru">
			<view class="myorder" @tap="isLogin?income():null">
				<view class="order">
					我的收入(元)
				</view>
				<view class="order">
					<uni-icon type="arrowright" size="20" color="#666"></uni-icon>
				</view>
			</view>
			<view class="tx">
				<view class="left">
					<view class="main main1">
						<view class="count">
							{{memberinfo.todayMoney}}
						</view>
						<view class="fs">
							今日(元)
						</view>
					</view>
					<view class="mains">
						<view class="main">
							<view class="count">
								{{memberinfo.monthMoney}}
							</view>
							<view class="fs">
								本月(元)
							</view>
						</view>
						<view class="main">
							<view class="count">
								{{memberinfo.totalMoney}}
							</view>
							<view class="fs">
								累计(元)
							</view>
						</view>
					</view>
				</view>
				<view class="mainsss">
					<view class="count red">
						{{memberinfo.blanceMoney}}
					</view>
					<view class="fs">
						可提现余额
					</view>
					<view class="txs" @tap="isLogin?tixian():null">
						提现
					</view>
				</view>
			</view>
		</view>
		<view class="orderList rz">
			<view class="status">
				<view class="sItems" @tap="isLogin?gogong('enter',memberinfo.supplierImg):null">
					<image src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/gys.png?sign=7329a4585f019bf5815fc8f9414e0902&t=1567395079"
					 mode=""></image>
					<view class="dfk">
						供应商入驻
					</view>
				</view>
				<view class="sItems" @tap="isLogin?gogong('hehuo',memberinfo.sharImg):null">
					<image src="https://6465-dev-iey4o-1257667322.tcb.qcloud.la/hehuo.png?sign=796ae9a52fb7f619923a66d5004e9b10&t=1567395095"
					 mode=""></image>
					<view class="dfk">
						校园合伙人
					</view>
				</view>
			</view>
		</view>
		<!-- <hchPoster ref="hchPoster" :canvasFlag.sync="canvasFlag" @cancel="canvasCancel" :posterObj.sync="posterData"/> -->
		<!-- <view :hidden="canvasFlag">
		    <canvas class="canvas"  canvas-id="myCanvas" ></canvas>
		</view> -->

		<uni-popup ref="image1" type="center" :custom="true" :mask-click="false">
			<view class="uni-image">
				<view class="uni-image-close" @click="onCancel()">
					<uni-icon type="clear" color="#fff" size="30" />
				</view>
				<wm-poster :imgSrc="poster.img" :QrSrc="poster.QrSrc" :Title="poster.title" :ViewDetails='poster.view'  Width="600" @success="OnImg" :Referrer='poster.Referrer'></wm-poster>
				<view class="Poster_main" v-show="posterType">
					<view class="Poster_btn" @tap="onBtn">保存到相册</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
		import uParse from '@/components/gaoyia-parse/parse.vue'
	import {
		showToast,
		showModal,
		getStorageSync
	} from '@/assets/js/common'
	import {
		sharCode,
		memberInfo,
		postPhoto
	} from '@/api/api.js'
	import {
		IMG_URL,
		UPLOAD_URL
	} from '../../assets/js/const.js'
	import uniBadge from '@/components/uni-badge/uni-badge.vue'
	import wmPoster from "@/components/wm-poster/wm-poster.vue"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			uniBadge,
			wmPoster,
			uniPopup,
			uParse
		},
		data() {
			return {
				// 订单类型
				orderList: [{
						text: '待付款',
						img: "https://6465-dev-iey4o-1257667322.tcb.qcloud.la/pay.png?sign=4764662a01d7201a5ed287b4419472f7&t=1567395117"
					},
					{
						text: '运输中',
						img: "https://6465-dev-iey4o-1257667322.tcb.qcloud.la/paijian.png?sign=f5d824d5992303521d0cbcceaec1d706&t=1567395129"
					},
					{
						text: '已签收',
						img: "https://6465-dev-iey4o-1257667322.tcb.qcloud.la/qs.png?sign=6dd6c1770cbc17b4efdf714d354a8c78&t=1567395141"
					},
				],
				list: [{
						text: '收货地址',
						img: "https://6465-dev-iey4o-1257667322.tcb.qcloud.la/dzhi.png?sign=3ed3aeb9ca26eaf498a1e8dfaa529551&t=1568940353"
					},
					{
						url: '../../pageStatic/discount/discount',
						text: '优惠券',
						img: "https://6465-dev-iey4o-1257667322.tcb.qcloud.la/youhui.png?sign=7e5672f131a0b99a4d2016cd5a053fd3&t=1567395350"
					},
					{
						url: '../../pageStatic/transactions/transactions?state=my',
						text: '二手交易',
						img: "https://6465-dev-iey4o-1257667322.tcb.qcloud.la/er.png?sign=8d3e7d22db8c871bfa92a0a04d1e2407&t=1567395373"
					},
					{
						url: '../../pageStatic/bbs/bbs?state=my',
						text: '校园论坛',
						img: "https://6465-dev-iey4o-1257667322.tcb.qcloud.la/xy.png?sign=cbce07233b739b4ff59a1a0fefa475e7&t=1567395384"
					},
					{
						// url: '../../pageStatic/share/share',
						text: '分享',
						img: "https://6465-dev-iey4o-1257667322.tcb.qcloud.la/fx.png?sign=b09897ebaffa309a82a50d65c336b4fe&t=1567395421"
					},
					{
						url: '../../pageStatic/question/question?type=1',
						text: '常见问题',
						img: "https://6465-dev-iey4o-1257667322.tcb.qcloud.la/cj.png?sign=27f62b2b9bfa03a084897fea160db145&t=1567400289"
					},
					{
						url: '../../pageStatic/question/question?type=2',
						text: '奖励金攻略',
						img: "https://6465-dev-iey4o-1257667322.tcb.qcloud.la/gl.png?sign=aff994d6f96384edafe7b00bf2ee935c&t=1567400304"
					}
				],
				deliveryFlag: false,
				canvasFlag: true,
				posterData: {},
				codeImgs: '',
				memberinfo: {
					blanceMoney: 0,
					totalMoney: 0,
					monthMoney: 0,
					followersNum: 0,
					lookNum: 0,
					monthMoney: 0,
					todayMoney: 0
				},
				forumMsgNum: 0,
				goodMsgNum: 0,
				isLogin: false,
				schoolMsg: {},
				poster: {
					img: "",
					QrSrc: "",
					title: '',
					width: '350',
					view: "扫描识别二维码",
					Referrer:''
				},
				posterType: false,
				InitImg: '',
				isshowPo:false //海报是否生成
			};
		},
		onLoad() {
			if (getStorageSync('token')) {
				this.codeImg()
				this.memberInfo()
				this.isLogin = true
			} else {
				this.isLogin = false
			}
			this.schoolMsg = getStorageSync('schoolMsg')
		},
		onShow() {
			if (uni.getStorageSync('getMoney')) {
				uni.setStorageSync('getMoney', false)
				this.memberInfo()
			}
			this.schoolMsg = getStorageSync('schoolMsg')
		},
		onPullDownRefresh() {
			if (getStorageSync('token')) {
				this.memberInfo()
				this.isLogin = true
			} else {
				this.isLogin = false
			}
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		watch: {
			'schoolMsg.schoolName'(n) {
				if (getStorageSync('token')) {
					this.isLogin = true
					this.memberInfo()
				} else {
					this.isLogin = false
				}
				// console.log(n)
			}
		},
		methods: {
			goLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			toOrderList(index) {
				if (this.isLogin) {
					console.log(index)
					if (index == 1) {
						index = 2
					} else if (index == 2) {
						index = 3
					}
					uni.setStorageSync('tbIndex', index);
					uni.navigateTo({
						url: '../../pageStatic/order_list/order_list?tbIndex=' + index
					})
				}

			},
			toFans() {
				if(this.memberinfo.followersNum>0){
					uni.navigateTo({
						url: '../../pageStatic/fans/fans'
					})
				}else{
					showToast('暂无粉丝，快去邀请吧。')
				}
				
			},
			income() {
				uni.navigateTo({
					url: '../../pageStatic/incomes/incomes'
				})
			},
			gogong(state, url) {
				uni.navigateTo({
					url: '../../pageStatic/detial/detial?state=' + state + '&img=' + url
				})
			},
			tixian() {
				uni.navigateTo({
					url: '../../pageStatic/deposit/deposit'
				})
			},
			doSomething(text) {
				if (text !== '分享') {
					uni.chooseAddress({
						success: res => {},
						fail: e => {
							uni.getSetting({
								success: set => {
									if (!set.authSetting['scope.address']) {
										uni.showModal({
											title: '警告',
											content: '系统无法访问您的地址,将无法享受快递寄件功能。',
											showCancel: false,
											success: res => {
												console.log(res)
												if (res.confirm) {
													uni.openSetting({
														success: re => {
															console.log(re)
														},
														fail: e => {
															console.log(e)
														}
													})
												}
											}
										})
									}
								},
								fail: e => {

								}
							})
						}
					})
				} else {
					if (this.isLogin) {
						uni.showLoading({
							title: "生成中..."
						})
						if(this.isshowPo){
							setTimeout(()=>{
								uni.hideLoading();
							},1000)
						}
						this.poster.img = 'https://6465-dev-h2dus-1300900499.tcb.qcloud.la/44af0c19772615716a26b3687980383.jpg?sign=53b406f3dd2544e9fe7c30cf202f576b&t=1576118646'
						this.poster.QrSrc = IMG_URL + this.codeImgs
						this.poster.Referrer=`${this.memberinfo.managerNickName}推荐给你`
						this.$refs['image1'].open()

						// 这个是固定写死的小程序码
						// Object.assign(this.posterData, {
						// 	url: 'https://school-express.oss-cn-hangzhou.aliyuncs.com/upload/2019/9/5/1567653228422.jpg', //商品主图
						// 	title: "奇校园小程序，一款可以赚钱的校园寄件小程序哟！", //标题
						// 	code: IMG_URL + this.codeImgs
						// })
						// this.$forceUpdate(); //强制渲染数据
						// setTimeout(() => {
						// 	this.canvasFlag = false; //显示canvas海报
						// 	this.deliveryFlag = false; //关闭分享弹窗
						// 	this.$refs.hchPoster.createCanvasImage(); //调用子组件的方法
						// }, 500)
					} else {
						showToast('请先登录！')
					}

				}

			},
			onCancel() {
				this.$refs['image1'].close()
			},
			OnImg: function(e) {
				console.log(e);
				this.InitImg = e.tempFilePath;
				this.type = true;
				if(!this.isshowPo){
					this.isshowPo=true
					uni.hideLoading();
					
				}
			},
			onBtn: function() {
				let that=this
				uni.saveImageToPhotosAlbum({
					filePath: this.InitImg,
					success: function() {
						showToast('图片保存成功快去分享吧。')
						that.$refs['image1'].close()
					}
				});
			},
			// 获取海报的小程序码
			async codeImg() {
				let res = await sharCode()
				if (res.code == 0) {
					this.codeImgs = res.data
				}
			},
			// 分享弹窗
			shareEvn() {
				this.deliveryFlag = true;
			},
			// 关闭分享弹窗
			closeShareEvn() {
				this.deliveryFlag = false;
			},
			// 取消海报
			canvasCancel(val) {
				this.canvasFlag = val;
			},
			async memberInfo() {
				let res = await memberInfo()
				if (res.code == 0) {
					this.memberinfo = res.data.memberVo
					this.forumMsgNum = res.data.forumMsgNum
					this.goodMsgNum = res.data.goodMsgNum
					this.memberinfo.headImgUrl = res.data.memberVo.headImgUrl
					console.log(res.data.headImgUrl)
					console.log(this.forumMsgNum, this.goodMsgNum)
				}
			},
			chooesImg() {
				let that = this
				uni.chooseImage({
					count: 1,
					success(res) {

						uni.uploadFile({
							url: UPLOAD_URL, //仅为示例，非真实的接口地址
							filePath: res.tempFilePaths[0],
							name: 'file',
							success(re) {
								const data = JSON.parse(re.data).data
								that.memberinfo.headImgUrl = IMG_URL + data
								postPhoto({
									headImg: that.memberinfo.headImgUrl
								}).then(ress => {
									if (ress.code != 0) {
										showToast(ress.msg)
									}
								}).catch(() => {})
							}
						})


					},
					fail(e) {
						console.log(e)
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.global {
		padding-bottom: 100upx;
	}

	.tou {
		height: 240upx;
		background: #ffd84d;
		// display: flex;
		align-items: center;
		padding-left: 55upx;
		padding-right: 25upx;

		.names {
			align-items: center;
			font-size: 36upx;
			padding-top: 40upx;
			font-weight: bold;
			display: flex;

			image {
				width: 120upx;
				height: 120upx;
				margin-right: 30upx;
				border-radius: 50%;
			}
		}

		.school {
			text-align: right;
			font-size: 28upx;
		}
	}

	.orderList {
		width: 700upx;
		margin-left: 25upx;
		position: relative;
		top: -25upx;
		background: #fff;
		border-radius: 6px;
		padding-bottom: 30upx;
		box-shadow: 0 2px 4px 0 #C6CFD7;

		.myorder {
			display: flex;
			padding: 0 45upx;
			line-height: 100upx;
			justify-content: space-between;

			.order {
				font-size: 32upx;
				color: #333;
			}

			.allOrder {
				color: #7a7a7a;
				display: flex;
				align-items: center;
				font-size: 28upx;

			}
		}
	}

	.status {
		display: flex;
		margin-top: 20upx;
		padding: 0 25upx;

		// justify-content: space-between;
		.sItem {
			text-align: center;
			font-size: 26upx;
			color: #333;
			line-height: 40upx;
			width: 25%;
			position: relative;

			image {
				width: 56upx;
				height: 50upx;
			}

			.badge {
				position: absolute;
				right: 45upx;
				top: -22upx;
			}
		}

		.sItem1 {
			width: 33.3%;
		}
	}

	.fuwu {
		flex-direction: row-reverse;
		top: 10upx;

		.status {
			padding: 0;
			flex-wrap: wrap;

			.sItem {
				margin-bottom: 35upx;
			}
		}
	}

	.fensi {
		top: 35upx;
		padding-bottom: 0;

		.myorder {
			border-bottom: 1px solid #e0e0e0;
		}

		.mains {
			display: flex;

			.main {
				width: 50%;
				text-align: center;
				border-right: 1px solid #e0e0e0;
				padding: 32upx 0;

				.count {
					font-size: 42upx;
				}

				.fs {
					color: #999;
					font-size: 26upx;
					line-height: 40upx;
				}
			}
		}
	}

	.shouru {
		top: 65upx;
		padding-bottom: 0;

		.myorder {
			border-bottom: 1px solid #e0e0e0;
		}
	}

	.tx {
		align-items: center;
		text-align: center;
		display: flex;

		.left {
			width: 60%;
			border-right: 1px solid #e0e0e0;

			.main1 {
				border-bottom: 1px solid #e0e0e0;
				padding: 15upx 0;
			}
		}

		.mains {
			display: flex;
			padding: 15upx 0;

			.main {
				text-align: center;
				width: 50%;
			}
		}

		.mainsss {
			width: 40%;
		}

		.fs {
			color: #999;
			font-size: 26upx;
			line-height: 40upx;
		}

		.txs {
			width: 100upx;
			font-size: 28upx;
			margin: auto;
			line-height: 40upx;
			border: 1px solid #d32222;
			color: #d32222;
			border-radius: 20upx;
			margin-top: 10upx;
		}

		.red {
			color: #d32222;
		}
	}

	.rz {
		top: 85upx;
		padding: 20upx 0;

		.sItems {
			text-align: center;
			font-size: 30upx;
			width: 50%;

			image {
				width: 56upx;
				height: 48upx;
			}
		}
	}

	.canvas {
		position: fixed !important;
		top: 0 !important;
		left: 0 !important;
		display: block !important;
		width: 100% !important;
		height: 100% !important;
		z-index: 10;
	}

	.Poster_main {
		display: flex;
		justify-content: center;
		padding: 20upx;

		.Poster_btn {
			padding: 10upx 30upx;
			background-color: #ffd84d;
			font-size: 28upx;
			color: #000;
			border-radius: 5upx;
			transform: translate(0, 0);

			&:active {
				transform: translate(1px, 1px);
				cursor: pointer;
			}
		}
	}
</style>
