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
				<span>{{goods_detail.min_group_price/1000}}</span>
				<span>起</span>
			</div>
			<div class="rv-desc">{{goods_detail.goods_name}}</div>
		</div>


	</div>
</template>

<script>

	export default {
		data () {
			return {
				goods_id: '', // 商品id
				goods_detail: {}, // 商品详情
			}
		},

		components: {
			
		},

		created () {
			// let app = getApp()
		},

		onLoad(){
			const { id, } = this.$root.$mp.query;
			this.goods_id = id;
		},

		onShow(){
			this.getDetail()
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
				});
			},
		},

	}
</script>

<style src="./style.less" lang="less" scoped></style>
