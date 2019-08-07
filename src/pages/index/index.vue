<template>
	<div class="rv-index">
		<!-- 搜索框 -->
		<div class="rv-search-wrap">
			<div class="rv-search">
				<img src="/static/images/search.png" alt="">
				<span>搜索商品</span>
			</div>
		</div>

		<!-- tab标签分类 -->
		<div class="rv-tabs">
			<van-tabs active="activeTab" swipeable sticky @change="swicthTab">
				<van-tab title="精选">
					<div class="rv-block">
						<block v-for="item in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]" :key="item">
							<goodsCard />
						</block>
					</div>
				</van-tab>
				<van-tab title="清仓">
					<div class="rv-block">
						<block v-for="item in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]" :key="item">
							<goodsCard />
						</block>
					</div>
				</van-tab>
				<van-tab title="百货">百货 3</van-tab>
				<van-tab title="母婴">母婴 4</van-tab>
				<van-tab title="食品">食品 4</van-tab>
				<van-tab title="女装">女装 4</van-tab>
				<van-tab title="电器">电器 4</van-tab>
				<van-tab title="鞋包">鞋包 4</van-tab>
				<van-tab title="内衣">内衣 4</van-tab>
				<van-tab title="美妆">美妆 4</van-tab>
				<van-tab title="男装">男装 4</van-tab>
				<van-tab title="水果">水果 4</van-tab>
				<van-tab title="家纺">家纺 4</van-tab>
				<van-tab title="文具">文具 4</van-tab>
				<van-tab title="运动">运动 4</van-tab>
				<van-tab title="汽车">汽车 4</van-tab>
				<van-tab title="家装">家装 4</van-tab>
				<van-tab title="医药">医药 4</van-tab>
			</van-tabs>
		</div>
		

	</div>
</template>

<script>
	import goodsCard from '@/components/goodsCard'

	export default {
		data () {
			return {
				activeTab: 1, // 高亮的tab

			}
		},

		components: {
			goodsCard,
		},

		created () {
			// let app = getApp()
		},

		// 下拉刷新
		onPullDownRefresh(){
			wx.stopPullDownRefresh()
			wx.showNavigationBarLoading()
			setInterval(() => {
				wx.hideNavigationBarLoading()
			},1000)
		},

		// 下拉加载
		onReachBottom(){

		},

		onShareAppMessage() {
			return {
				title: '十元超市',
				path: '/pages/index/main'
			}
		},

		methods: {
			// 切换tab
			swicthTab(){},
		},

	}
</script>
<style>
	page{
		background: #fff;
	}
</style>

<style src='./style.less' lang='less' scoped></style>
