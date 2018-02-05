<template>
	<section id="goods" class="goods-box" ref="scroll">
		<slot></slot>
	</section>
</template>
<script>
import BScroll from 'better-scroll';

export default{
	name: 'Scroll',
	mounted(){
		this.$nextTick(() => {
			let scrollBox = this.$refs.scroll;

			this.scroll = new BScroll(scrollBox,{
				probeType: 3,
				click: true,
				scrollbar : true,
				scrollfree : true,
			});
		});
	}
}
</script>
<style>
	.goods-box{
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
</style>
