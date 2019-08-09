<template>
	<div class="rv-goods-card-two" @click="bindDetail">
		<div class="rv-img">
			<img :src="data.goods_thumbnail_url" lazy-load alt="">
		</div>
		<div class="rv-card-info">
			<div class="rv-card-title">
				{{data.goods_name}}
			</div>
			<div class="rv-card-foot">
				<div class="rv-card-price">
					<span>￥</span>
					<span>{{data.min_group_price/100}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['data'],

		data(){
			return {

			}
		},

		onLoad(){
		},

		methods:{
			bindDetail(){
				mpvue.navigateTo({
					url: `/pages/index-detail/main?id=${this.data.goods_id}`
				});
			},
		},
	}
</script>

<style lang="less" scoped>
	.rv-goods-card-two{
		width: 49%;
		height: 280px;
		background: #fff;
		display: flex;
		flex-direction: column;
		box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
		margin-bottom: 8px;
		box-sizing: border-box;
		// border-radius: 8px;
		float: left;
		margin-right: 2%;

		.rv-img{
			height: 150px;
			margin-bottom: 10px;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.rv-card-info{
			width: 100%;
			height: 130px;
			.rv-card-title{
				height: 80px;
				padding: 0 8px;
				box-sizing: border-box;
				overflow: hidden;
			}
			.rv-card-foot{
				height: 50px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 8px;
				box-sizing: border-box;
				.rv-card-price{
					color: #f6332f;
					span:first-child{
						font-size: 12px;
					}
					span:last-child{
						font-size: 16px;
						font-weight: 600;
					}
				}
			}
		}
	}
	.rv-goods-card-two:nth-child(2n+2){
		margin-right: 0;
	}
</style>
