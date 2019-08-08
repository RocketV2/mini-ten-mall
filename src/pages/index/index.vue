<template>
	<div class="rv-index">

		<div class="rv-header">
			<!-- 搜索框 -->
			<div class="rv-search-wrap">
				<div class="rv-search">
					<img src="/static/images/search.png" alt="">
					<span>搜索商品</span>
				</div>
			</div>

			<!-- tab标签分类 -->
			<div class="rv-tabs">
				<van-tabs active="activeTab" @change="swicthTab">
					<block v-for="(item,sindex) in goods_opt_list" :key="item.id + sindex">
						<van-tab :title="item.label"></van-tab>
					</block>
				</van-tabs>			
			</div>
		</div>

		<!-- 骨架屏 -->
		<!-- <skeleton v-if="tab_goods_list.length==0" /> -->

		<!-- 列表展示区 -->
		<!-- <div class="rv-list-wrap">
			<div class="rv-block">
				<goodsBlock :goodsList="tab_goods_list" />
			</div>
		</div> -->

		<div class="rv-list-wrap">
			<block v-for="item in goods_opt_list" :key="item.id" >
				<div class="rv-block" :style=" item.id==opt_id ? 'display:block':'display:none' ">
					<!-- 骨架屏 -->
					<skeleton v-if="item.list.length==0" />
					<goodsBlock v-else :goodsList="item.list" />
				</div>
			</block>
		</div>

		<!-- 加载动画 -->
		<div v-if="isLoadMore" class="rv-loading">--- 加载中 ---</div>

	</div>
</template>

<script>
	import goodsBlock from '@/components/goodsBlock'
	import skeleton from '@/components/skeleton'
	import goodsOpt from '@/utils/goodsOpt'

	export default {
		data () {
			return {
				activeTab: 1, // 高亮的tab
				goods_opt_list: [], // opt类目 list 也放在其中

				// 用于查询商品
				opt_id: 0, // 当前选中的标签类目
				page: 1,
				page_size: 10,

				isLoadMore: false, // 是否加载
			}
		},

		components: {
			goodsBlock,skeleton,
		},

		created () {
			// let app = getApp()
		},

		onReady(){
			this.getOptList()
		},

		onShow(){
			
		},

		// 下拉刷新
		onPullDownRefresh(){
			this.page = 1;

			wx.stopPullDownRefresh()
			this.getGoodsList()
		},

		// 下拉加载
		onReachBottom(){
			this.page = this.page + 1;
			this.isLoadMore = true;
			wx.cloud.callFunction({
				name: "shopping",
				data: { 
					action: "pdd.ddk.goods.search",
					opt_id: this.opt_id,
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
				// 将数据放到选择的tab下
				this.goods_opt_list.map(item => {
					if(item.id == this.opt_id){
						item.list = item.list.concat(goods_list);
					}
				});
			});
		},

		onShareAppMessage() {
			return {
				title: '十元百货',
				path: '/pages/index/main'
			}
		},

		methods: {
			// 切换tab
			swicthTab(event){
				const { index, } = event && event.mp.detail;
				const opt_id = this.goods_opt_list[index].id;
				this.opt_id = opt_id;

				// 当前标签类目下无列表
				if(this.goods_opt_list[index].list.length == 0){ 
					this.getGoodsList()
				}
			},

			// 获取分类列表
			getOptList(){
				wx.cloud.callFunction({
					name: "shopping",
					data: { action: "pdd.goods.opt.get",}
				}).then(res => {
					const { goods_opt_list } = res && res.result && res.result.goods_opt_get_response;
					// 构造opt_id
					let midArr = goodsOpt;
					goods_opt_list.map(item => {
						midArr.map(sitem => {
							if(item.opt_name == sitem.label){
								sitem.id = item.opt_id;
							}
						});		
					});
					// 保证配置中类目都存在
					this.goods_opt_list = midArr.map(item => {
						if(item.id != null){ return item; }
					});
					// 首次进入 在获取标签类目后 获取商品列表
					this.opt_id = this.goods_opt_list[0].id;
					this.getGoodsList()

					console.log('类目列表opt',this.goods_opt_list)
				});
			},

			// 获取某类目下商品列表 用于刷新
			getGoodsList(){
				wx.showNavigationBarLoading()
				wx.cloud.callFunction({
					name: "shopping",
					data: { 
						action: "pdd.ddk.goods.search",
						opt_id: this.opt_id,
						page: this.page,
						page_size: this.page_size,
					}
				}).then(res => {
					wx.hideNavigationBarLoading()
					console.log('类别下的list',res)
					let { goods_list } = res && res.result && res.result.goods_search_response;
					// 处理数据
					goods_list.map(item => {
						if(item.goods_name.length > 30){
							item.goods_name = item.goods_name.substr(0,30) + '...'; // 商品名称太长
						}
						return item;
					})
					// 将数据放到选择的tab下
					this.goods_opt_list.map(item => {
						if(item.id == this.opt_id){
							item.list = goods_list;
						}
					});
				});
			},
		},

	}
</script>

<style src='./style.less' lang='less' scoped></style>
