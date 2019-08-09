<template>
	<div class="rv-search">
		<!-- 搜索框 -->
		<div class="rv-search-wrap" @click="bindNavSearch">
			<div class="rv-search">
				<img src="/static/images/search.png" alt="">
				<input v-model="keyword" type="text" placeholder="搜索商品" maxlength="20" />
			</div>
			<div v-if="!isSearching" class="rv-text" @click="bindSearch">搜索</div>
			<div v-else class="rv-text rv-text-red" @click="bindClear">清空</div>
		</div>

		<!-- 热搜标签 -->
		<div v-if="!isSearching" class="rv-hot">
			<div class="rv-hot-title">热搜</div>
			<div class="rv-hot-search">
				<block v-for="item in hotWordsList" :key="item">
					<li @click="bindKeywordSearch(item)">{{item}}</li>
				</block>
				<div style="clear:both;"></div>
			</div>
		</div>
		
		<!-- 搜索结果 -->
		<div v-if="isSearching" class="rv-list">
			<goodsBlock :goodsList="goods_list" />
		</div>
		<!-- 加载动画 -->
		<div v-if="isLoadMore" class="rv-loading">--- 加载中 ---</div>

	</div>
</template>

<script>
	import goodsBlock from '@/components/goodsBlock'
	const db = wx.cloud.database()
	const hotKeywordList_Col = db.collection('hot_keyword_list')

	export default {
		data () {
			return {
				isSearching: false, // 是否在搜索
				keyword: '', // 关键字
				hotWordsList: [], // 热门词列表
				isLoadMore: false, // 是否加载更多
				page: 1, 
				page_size: 30,
				goods_list: [],
			}
		},

		components: {
			goodsBlock,
		},

		created () {
			// let app = getApp()
		},

		onShow(){
			this.getHotKeyword()
		},

		onUnload(){
			this.bindClear()
		},

		// 下拉加载
		onReachBottom(){
			this.page = this.page + 1;
			this.isLoadMore = true;
			wx.cloud.callFunction({
				name: "shopping",
				data: { 
					action: "pdd.ddk.goods.search",
					keyword: this.keyword,
					page: this.page,
					page_size: this.page_size,
				}
			}).then(res => {
				this.isLoadMore = false;
				const { goods_list } = res && res.result && res.result.goods_search_response;
				// 处理数据
				goods_list.map(item => {
					if(item.goods_name.length > 30){
						item.goods_name = item.goods_name.substr(0,30) + '...'; // 商品名称太长
					}
					return item;
				})
				this.goods_list = this.goods_list.concat(goods_list);
			});
		},

		onShareAppMessage(){
			return {
				title: "十元百货",
				path: "/pages/index/main"
			}
		},

		methods: {
			// 点击热门词
			bindKeywordSearch(word){
				this.keyword = word;
				this.bindSearch()
			},

			// 搜索商品
			bindSearch(){
				wx.showLoading({title: ''})
				wx.cloud.callFunction({
					name: "shopping",
					data: { 
						action: "pdd.ddk.goods.search",
						keyword: this.keyword,
						page: 1,
						page_size: 100,
					}
				}).then(res => {
					wx.hideLoading()
					this.isSearching = true;
					let { goods_list } = res && res.result && res.result.goods_search_response;
					// 处理数据
					goods_list.map(item => {
						if(item.goods_name.length > 30){
							item.goods_name = item.goods_name.substr(0,30) + '...'; // 商品名称太长
						}
						return item;
					})
					this.goods_list = goods_list;
				});
			},

			// 清空商品
			bindClear(){
				this.isSearching = false;
				this.goods_list = [];
				this.keyword = ''
			},

			getHotKeyword(){
				hotKeywordList_Col.get().then(res => {
					const data = (res && res.data) || [];
					this.hotWordsList = data[0].hotWordsList
				}).catch(err => {
					console.log('列表获取错误',err)
				});
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
