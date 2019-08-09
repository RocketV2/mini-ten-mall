<template>
	<div class="rv-goods-block">
		<block v-if="type!=2">
			<block v-for="item in goodsList" :key="item.goods_id">
				<goodsCard :data="item" />
			</block>
		</block>
		<!-- 竖排两列布局 -->
		<block v-else>
			<div class="rv-block-two">
				<block v-for="item in goodsList" :key="item.goods_id">
					<goodsCardTwo :data="item" />
				</block>
				<div style="clear:both;"></div>
			</div>
		</block>
	</div>
</template>

<script>
	import goodsCard from '@/components/goodsCard'
	import goodsCardTwo from '@/components/goodsCardTwo'

	export default {
		props: [
			'type', // 1-card独占一行布局 2-card两列布局
			'goodsList'
		],

		data(){
			return {

			}
		},

		components: {
			goodsCard,goodsCardTwo,
		},

		onLoad(){

		},

		methods:{

		},
	}
</script>

<style lang="less" scoped>
	.rv-goods-block{
		width: 100%;


	}
</style>
