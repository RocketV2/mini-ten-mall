<template>
	<div class="rv-index-detail">
		<!-- 轮播 -->
		<swiper class="rv-swiper" indicator-dots="true" >
			<block v-for="item in goods_detail.goods_gallery_urls" :key="item">
				<swiper-item class="rv-swiper-item">
					<img :src="item" mode="widthFix" lazy-load />
				</swiper-item>
			</block>
		</swiper>

		<!-- 价格 名称 描述 -->
		<div class="rv-goods-info">
			<div class="rv-price">
				<span>￥</span>
				<span>{{goods_detail.min_group_price/1000 || ''}}</span>
				<span>起</span>
			</div>
			<div class="rv-name">{{goods_detail.goods_name}}</div>
		</div>

		<div class="gray-block"></div>

		<!-- 商品详情 -->
		<div class="rv-detail">
			<div class="rv-detail-title">商品详情</div>
			<div class="rv-detail-text">{{goods_detail.goods_desc}}</div>
			<div class="rv-detail-img">
				<block v-for="item in goods_detail.goods_gallery_urls" :key="item">
					<img :src="item" mode="widthFix" lazy-load />
				</block>
			</div>
		</div>

		<!-- 底部购买栏 -->
		<div class="rv-navBar">
			<button plain="true" class="rv-bar-home" @click="bindBack">
				<img src="/static/images/home.png" alt="">
				<span>首页</span>
			</button>
			<button plain="true" class="rv-bar-share" open-type="share">
				<img src="/static/images/share.png" alt="">
				<span>分享好友</span>
			</button>
			<li class="rv-bar-buy1">
				<span>￥ {{goods_detail.min_normal_price/1000}}</span>
				<span>单独购买</span>
			</li>
			<li class="rv-bar-buy2">
				<span>￥ {{goods_detail.min_group_price/1000}}</span>
				<span>发起拼单</span>
			</li>
		</div>

		<!-- 更多商品推荐 -->
		<div class="rv-more">
			<div class="rv-more-text">--- 更多商品推荐 ---</div>
			<div class="rv-more-list">
				<goodsBlock type="2" :goodsList="goods_list_more" />
			</div>
		</div>

		<div style="width: 100%;height: 200px;"></div>

	</div>
</template>

<script>
	import goodsBlock from '@/components/goodsBlock'

	export default {
		data () {
			return {
				goods_id: '', // 商品id
				goods_detail: {}, // 商品详情
				goods_list_more: [], // 更多
			}
		},

		components: {
			goodsBlock,
		},

		created () {
			// let app = getApp()
		},

		onLoad(){
			const { id, } = this.$root.$mp.query;
			this.goods_id = id;
		},

		onShow(){
			const pages = getCurrentPages()
			const options = pages[pages.length - 1].options
			this.goods_id = options.id;
			this.getDetail()
			// console.log('路由相同，数据覆盖',options)
		},

		onShareAppMessage(){
			let title = '推荐！' + this.goods_detail.goods_name.length;
			if(this.goods_detail.goods_name.length > 25){
				title = title + this.goods_detail.goods_name.substring(0,25);
			}
			return {
				title,
				path: `/pages/index-detail/main?id=${this.goods_id}`
			}
		},

		methods: {
			// 获取详情
			getDetail(){
				wx.cloud.callFunction({
					name: "shopping",
					data: { 
						action: "pdd.ddk.goods.detail",
						goods_id: this.goods_id, // 商品id
					}
				}).then(res => {
					const { goods_details } = res && res.result && res.result.goods_detail_response;
					this.goods_detail = goods_details[0]
					console.log('商品详情',res)
					this.getMore()
				});
			},

			// 返回上一页
			bindBack(){
				mpvue.navigateBack({ delta: 1})
			}, 

			// 获取更多
			getMore(){
				wx.cloud.callFunction({
					name: "shopping",
					data: { 
						action: "pdd.ddk.goods.search",
						opt_id: this.goods_detail.opt_id,
						page: this.randomNum(1,5),
						page_size: this.randomNum(20,50), // 随机数
					}
				}).then(res => {
					let { goods_list } = res && res.result && res.result.goods_search_response;
					// 处理数据
					this.goods_list_more = goods_list.map(item => {
						if(item.goods_name.length > 30){
							// item.goods_name = item.goods_name.substr(0,20) + '...'; // 商品名称太长
						}
						return item;
					})
				});
			},

			// 随机数
			randomNum(minNum,maxNum){ 
				switch(arguments.length){ 
					case 1: 
						return parseInt(Math.random()*minNum+1,10); 
					break; 
					case 2: 
						return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
					break; 
						default: 
							return 0; 
						break; 
				} 
			},
		},

	}
</script>

<style src="./style.less" lang="less" scoped></style>
