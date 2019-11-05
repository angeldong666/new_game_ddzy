<template>
	<div class="app">
		<!-- 导航栏 -->
		<div class="navbar flex-bt">
			<div class="nav-left" @click="goHome()"></div>
			<div class="nav-center">蛋蛋庄园</div>
			<!-- <div class="nav-right" @click="_clearUserInfo">重置</div> -->
			<div class="nav-right"></div>
		</div>
		<!-- <router-view :base-info="baseInfo"></router-view> -->
		<Home></Home>
	</div>
</template>

<script>
	import {
		gameApi
	} from '../../config/api'
	import Home from './home'
	export default {
		name: 'app',
		components: {
			Home
		},
		data() {
			return {
				baseInfo: {
					userid: '',
					deviceid: '',
					ptype: '',
					unix: '',
					token: '',
				},
			}
		},
		mounted() {
			let that = this;
			// 获取	基础信息
			that.baseInfo.userid = document.getElementById('userid').value;
			that.baseInfo.deviceid = document.getElementById('deviceid').value;
			that.baseInfo.ptype = document.getElementById('ptype').value;
			that.baseInfo.unix = document.getElementById('unix').value;
			that.baseInfo.token = document.getElementById('token').value;
			that.baseInfo.keycode = document.getElementById('keycode').value;

		},
		methods: {
			_clearUserInfo: function () {
				// clearApi
				let that = this;
				that.$http({
					url: gameApi.clearApi,
					method: "post",
					data: {
						userid: that.baseInfo.userid,
						ptype: that.baseInfo.ptype,
						token: that.baseInfo.token,
						unix: that.baseInfo.unix,
						deviceid: that.baseInfo.deviceid,
						keycode: that.baseInfo.keycode,
					}
				}).then(function (res) {
					if (res.data.status == 0) {
						that.$toast('数据清除成功~ 请退出重进~')
					}
				})
				// localStorage.clear()
			},
			goHome: function () {
				try {
					android.goBack()
				} catch (error) {
					try {
						// window.webkit.messageHandlers.goBack.postMessage();
						window.goBack();
					} catch (error) {
						console.log('h5')
					}
				}
			}
		}
	}
</script>

<style lang="less">
	// 导航条高度
	@nav: .8rem;

	.app {
		width: 100vw;
		height: 100vh;
		overflow: hidden;

		.navbar {
			width: 100%;
			height: @nav;
			line-height: @nav;
			color: #fff;
			font-size: .32rem;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;

			.nav-left {
				width: @nav;
				height: 100%;
				background: url(http://download.pceggs.com:8080/xjyx/egg/img/j3.png) no-repeat center;
				background-size: 30% auto;
			}

			.nav-right {
				width: @nav;
				height: 100%;
			}
		}
	}

	.stroke {
		-webkit-text-stroke: 1px #442715;
		text-stroke: 1px #442715;
		font-weight: bold;
	}

	.stroke2 {
		-webkit-text-stroke: 1px #AC611A;
		text-stroke: 1px #AC611A;
		font-weight: bold;
	}

	.stroke3 {
		-webkit-text-stroke: 1px #C24224;
		text-stroke: 1px #C24224;
		font-weight: bold;
	}

	.fixed {
		position: fixed;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.8);
		z-index: 100;
		top: 0;
		left: 0;
	}

	.list-cont {
		width: 6.7rem;
		height: 10.99rem;
		background: url(http://download.pceggs.com:8080/xjyx/egg/img/list.png) no-repeat;
		background-size: 100% auto;
		-webkit-backface-visibility: hidden;
		-moz-backface-visibility: hidden;
		-ms-backface-visibility: hidden;
		backface-visibility: hidden;

		-webkit-perspective: 1000;
		-moz-perspective: 1000;
		-ms-perspective: 1000;
		perspective: 1000;
	}

	.list-title {
		position: absolute;
		top: 1.8rem;
		width: 3.41rem;
		height: .63rem;
		line-height: .63rem;
		font-weight: bold;
		color: #FCF7E6;
		font-size: .35rem;
		text-align: center;
	}

	.list-list {
		position: absolute;
		width: 6.3rem;
		height: 6.8rem;
		top: 2.9rem;
		padding: 0 .35rem 0;
		overflow-y: scroll;
	}

	.list-close {
		position: absolute;
		width: .91rem;
		height: .97rem;
		background: url(http://download.pceggs.com:8080/xjyx/egg/img/w7.png) no-repeat;
		background-size: 100% auto;
		top: 1.3rem;
		right: -.2rem;
	}

	.list-pop-up {
		animation: popUp .5s;
		-webkit-animation: popUp .5s;
		top: 0;
	}

	.list-pop-down {
		animation: popDown .5s;
		-webkit-animation: popDown .5s;
		top: -100%;
	}

	@keyframes popUp {
		from {
			top: -100%;
		}

		to {
			top: 0;
		}
	}

	@-webkit-keyframes popUp {
		from {
			top: -100%;
		}

		to {
			top: 0;
		}
	}

	@keyframes popDown {
		from {
			top: 0;
		}

		to {
			top: -100%;
		}
	}

	@-webkit-keyframes popDown {
		from {
			top: 0;
		}

		to {
			top: -100%;
		}
	}

	.egg-recived {
		animation: lines 1s infinite;
		-webkit-animation: lines 1s infinite;
	}

	@keyframes lines {
		0% {
			box-shadow: 0 0 10px 10px yellow;
		}

		50% {
			box-shadow: 0 0 20px 10px yellow;
		}

		100% {
			box-shadow: 0 0 10px 10px yellow;
		}
	}

	@-webkit-keyframes lines {
		0% {
			box-shadow: 0 0 10px 10px yellow;
		}

		50% {
			box-shadow: 0 0 20px 10px yellow;
		}

		100% {
			box-shadow: 0 0 10px 10px yellow;
		}
	}

	.msg-container {
		max-width: 4rem;
		min-width: 2.2rem;
		// min-height: .88rem;
		padding: .2rem .12rem;
		background: #FCF7E6;
		border-radius: .1rem;
		color: #B26D40;
		position: absolute;
	}

	.msg-san {
		position: absolute;
		width: 0;
		height: 0;
		border-width: 8px;
		border-style: solid;
	}

	.msg-san-up {
		top: -16px;
		left: 8px;
		border-color: transparent transparent #FCF7E6 transparent;
	}

	.msg-san-down {
		bottom: -16px;
		left: 8px;
		border-color: #FCF7E6 transparent transparent transparent;
	}

	.msg-san-left {
		top: 8px;
		left: -16px;
		border-color: transparent #FCF7E6 transparent transparent;
	}

	.msg-san-right {
		top: 8px;
		right: -16px;
		border-color: transparent transparent transparent #FCF7E6;
	}

	.msg-updown {
		animation: updown .1s infinite;
		-webkit-animation: updown 1s infinite;
	}

	@keyframes updown {
		0% {
			transform: translate(0, -5px)
		}

		50% {
			transform: translate(0, 0)
		}

		100% {
			transform: translate(0, -5px)
		}
	}

	@-webkit-keyframes updown {
		0% {
			transform: translate(0, -5px)
		}

		50% {
			transform: translate(0, 0)
		}

		100% {
			transform: translate(0, -5px)
		}
	}

	.msg-lr {
		animation: lrs .1s infinite;
		-webkit-animation: lrs 1s infinite;
	}

	@keyframes lrs {
		0% {
			transform: translate(-5px, 0)
		}

		50% {
			transform: translate(5px, 0)
		}

		100% {
			transform: translate(-5px, 0)
		}
	}

	@-webkit-keyframes lrs {
		0% {
			transform: translate(-5px, 0)
		}

		50% {
			transform: translate(5px, 0)
		}

		100% {
			transform: translate(-5px, 0)
		}
	}

	.scale-box {
		animation: scaledraw 1.5s infinite;
		-webkit-animation: scaledraw 1.5s infinite;
	}

	@keyframes scaledraw {

		0% {
			transform: scale(1);
		}

		25% {
			transform: scale(1.1);
		}

		50% {
			transform: scale(1);
		}

		75% {
			transform: scale(1.1);
		}
	}

	@-webkit-keyframes scaledraw {

		0% {
			transform: scale(1);
		}

		25% {
			transform: scale(1.1);
		}

		50% {
			transform: scale(1);
		}

		75% {
			transform: scale(1.1);
		}
	}

	.center3 {
		position: absolute;
		top: 50%;
		-ms-transform: translate(0, -50%);
		-moz-transform: translate(0, -50%);
		-o-transform: translate(0, -50%);
		transform: translate(0, -50%);
	}
</style>