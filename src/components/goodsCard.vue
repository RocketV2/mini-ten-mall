<template>
	<div class="rv-goods-card">
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
					<span>{{data.min_normal_price/1000}}</span>
				</div>
				<div class="rv-card-btn" @click="bindDetail">去购买</div>
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
	.rv-goods-card{
		width: 100%;
		height: 140px;
		padding: 10px;
		box-sizing: border-box;
		background: #fff;
		display: flex;
		box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
		margin-bottom: 10px;
		border-radius: 8px;

		.rv-img{
			margin-right: 10px;
			img{
				width: 120px;
				height: 120px;
			}
		}
		.rv-card-info{
			flex-grow: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.rv-card-title{

			}
			.rv-card-foot{
				display: flex;
				justify-content: space-between;
				align-items: center;
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
				.rv-card-btn{
					font-size: 16px;
					color: #fff;
					padding: 8px 20px;
					box-sizing: border-box;
					border-radius: 20px;
					background: linear-gradient(to right, #f6332f , #f85d32);
				}
				.rv-card-btn:active{
					opacity: 0.6;
				}
			}
		}
	}
</style>
