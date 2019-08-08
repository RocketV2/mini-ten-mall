<template>
	<div class="rv-goods-block">
		<block v-for="item in goodsList" :key="item.goods_id">
			<goodsCard :data="item" />
		</block>
	</div>
</template>

<script>
	import goodsCard from '@/components/goodsCard'

	export default {
		props: ['goodsList'],

		data(){
			return {

			}
		},

		components: {
			goodsCard,
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
