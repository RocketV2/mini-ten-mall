<template>
	<div class="rv-goods-card">
		<div class="rv-img">
			<img src="/static/images/test.jpeg" alt="">
		</div>
		<div class="rv-card-info">
			<div class="rv-card-title">
				【2.9元抢50000件，抢完恢复4.9元】 不沾油抹布厨房吸水不掉
			</div>
			<div class="rv-card-foot">
				<div class="rv-card-price">
					<span>￥</span>
					<span>10.90</span>
				</div>
				<div class="rv-card-btn">去购买</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['text'],

		data(){
			return {

			}
		},

		onLoad(){

		},

		methods:{

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
		box-shadow: #f2f2f2 5px 5px;
		// border: 1px solid #ddd;
		margin-bottom: 6px;

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
					color: #f00;
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
