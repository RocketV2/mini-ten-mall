<template>
	<div class="rv-skeleton">
		<li v-for="item in [1,2,3,4,5,6]" :key="item">
			<div class="skeleton-head">
				<div class="skeleton-img"></div>
			</div>
			<div class="skeleton-body">
				<div class="skeleton-title"></div>
				<div class="skeleton-content"></div>
			</div>
		</li>
	</div>
</template>

<script>
	export default {
		props: ['data'],
	}
</script>

<style lang="less" scoped>
	// 骨架屏
    .rv-skeleton{
        width: 100%;
        position: relative;
        // margin-top: 80px;
        padding: 0 10px;
        box-sizing: border-box;

        li{
            width: 100%;
            margin: 10px 0;
            display: flex;

            .skeleton-head,
            .skeleton-title,
            .skeleton-content {
                background: rgba(194, 207, 214, 0.3);
                background-image: linear-gradient(90deg,rgba(255, 255, 255, 0.35) 25%, transparent 25%);
                background-size: 20rem 20rem;
                animation: skeleton-stripes 1s linear infinite;
            }

            @keyframes skeleton-stripes {
                from {
                    background-position: 0 0 ;
                }
                to {
                    background-position: 20rem 0;
                }
            }
            
            .skeleton-head {
                margin-right: 10px;
                .skeleton-img{
                    width: 100px;
                    height: 100px;
                }
            }
            
            .skeleton-body {
                flex-grow: 1;
                .skeleton-title {
                    width: 100%;;
                    height: 60px;
                }
                
                .skeleton-content {
                    width: 100%;
                    height: 30px;
                    margin-top: 10px;
                }    
            }
        }
    
    }
</style>
