<template>
	<div class="rv-mine">
		<!-- 头像昵称 -->
		<div class="rv-person-info">
			<div class="rv-info-img">
				<open-data type="userAvatarUrl"></open-data>
			</div>
			<div class="rv-info-text">
				<open-data type="userNickName"></open-data>
			</div>
		</div>

		<!-- 拼多多相关 -->
		<div class="rv-list">
			<button plain="true" open-type="share">
				<div class="rv-left">
					<img src="/static/images/share.png" lazy-load alt="">
				</div>
				<div class="rv-right">
					<span>分享给好友</span>
					<img src="/static/images/right.png" alt="">
				</div>
			</button>
			<button plain="true" @click="bindGetPinDuoDuo">
				<div class="rv-left">
					<img src="/static/images/money.png" lazy-load alt="">
				</div>
				<div class="rv-right">
					<span>领拼多多红包</span>
					<img src="/static/images/right.png" alt="">
				</div>
			</button>
			<button plain="true" @click="bindNav(10)">
				<div class="rv-left">
					<img src="/static/images/video.png" lazy-load alt="">
				</div>
				<div class="rv-right">
					<span>有约小视频+</span>
					<img src="/static/images/right.png" alt="">
				</div>
			</button>
			<button plain="true" @click="bindNav(11)">
				<div class="rv-left">
					<img src="/static/images/game.png" lazy-load alt="">
				</div>
				<div class="rv-right">
					<span>精品小游戏</span>
					<img src="/static/images/right.png" alt="">
				</div>
			</button>
		</div>

	</div>
</template>

<script>

	export default {
		data () {
			return {

			}
		},

		components: {
			
		},

		created () {
			// let app = getApp()
		},

		onShareAppMessage(){
			return {
				title: "十元百货",
				path: "/pages/index/main"
			}
		},

		methods: {
			// 领取红包
			bindGetPinDuoDuo(){
				wx.showLoading()
                wx.cloud.callFunction({
                    name: "shopping",
                    data: {
                        action: "pdd.ddk.rp.prom.url.generate",
                    }
                }).then(res => {
                    wx.hideLoading()
                    const { url_list } = res && res.result && res.result.rp_promotion_url_generate_response;
                    const { app_id, page_path, } = url_list[0] && url_list[0].we_app_info;
                    // 小程序跳转
                    wx.navigateToMiniProgram({
                        appId: app_id,
                        path: page_path,
                    });
                });
			},

			bindNav(type){
				switch(type){
					case 10: // 跳转 有约恋恋
						return wx.navigateToMiniProgram({appId: 'wxb3aba3a2593cb833', });
					case 11: // 跳转 小游戏
						return wx.navigateToMiniProgram({appId: 'wx8c9673d92a308968',});
					default:
						break;
				}

			},
		},

	}
</script>

<style>
	page{
		background: #edece8;
	}
</style>

<style src="./style.less" lang="less" scoped></style>
