<template>
	<section id="goods" class="goods-box">
		<oHeader class="goods-header" :title="name"></oHeader>
		<main class="goods-mian">
			<Scroll>
				<ul class="goods-list">
					<li class="goods-item cui-flex" 
						v-for="(list,index) in goodsApi.goods"
						:key="list.id">
						<div class="goods-content">
							<img class="goods-view" :src="list.image" />	
						</div>	
						<div class="goods-info cui-flex-item cui-flex">
							<h3 class="goods-info-title">{{ list.name }}</h3>
							<div class="goods-description cui-flex-item">
								<p class="cui-ellipsis-3">{{ list.info }}</p>
							</div>
							<div class="goods-info-footer cui-flex cui-flex-algin">
								<div class="goods-price cui-flex-item">
									<p class="new-price">现价: <b class="price-box">¥ <span class="price-info">{{ list.price }}</span></b></p>
									<p class="old-price"><del>原价: ¥ {{ list.oldPrice }}</del></p>
								</div>	
								<div class="goods-cart cui-flex">
									<span class="goods-btn reduce-btn" 
										:class="{'goods-disable': list.num == 0}"
									 	@click="onReduce(index)">-</span>
									<div class="goods-input cui-flex-item">
										<input class="goods-input-view"type="text" v-model="list.num" readonly="readonly" />
									</div>	
									<span  class="goods-btn add-btn" @click="onAdd(index)">+</span>
								</div>	
							</div>
						</div>	
					</li>	
				</ul>	
			</Scroll>	
		</main>
		<footer class="goods-footer cui-flex cui-flex-algin">
			<div class="goods-footer-info cui-flex cui-flex-item cui-flex-algin">
				<p class="goods-tatol-price">
					合计:<b class="price-box">¥ <span class="price-info">{{ tatolPrice || 0 }}</span></b></b>
				</p>
				<p class="cui-flex-item goods-delivery-price">
					配送费:¥ {{ goodsApi.deliveryPrice }}
				</p>
			</div>	
			<button type="button" class="goods-submit" 
			:class="{'goods-submit-active': tatolPrice >= parseFloat(goodsApi.minPrice) }">
				{{ cartStatus }}({{ tatolNum }})
			</button>	
		</footer>
	</section>
</template>
<script>
import Scroll from "@/components/Scroll.vue";
import oHeader from "@/components/Header.vue";
import { mapState,mapGetters,mapMutations } from "vuex";

export default{
	name: 'Goods',
	computed:{
		...mapState(['name','goodsApi']),
		...mapGetters(['tatolPrice','tatolNum']),
		cartStatus(){
			let cartStatusInfo = '';
			if(this.tatolPrice == 0){
				cartStatusInfo = `${ this.goodsApi.minPrice}元起送`
			}else if(parseFloat(this.tatolPrice) < this.goodsApi.minPrice && parseFloat(this.tatolPrice) > 0){
				cartStatusInfo = `还差 ${this.goodsApi.minPrice - this.tatolPrice}元起送`;
			}else{
				cartStatusInfo = '去买单'
			}
			return cartStatusInfo
		}
	},
	components:{
		Scroll,
		oHeader
	},
	methods:{
		...mapMutations(['goodsReduce','goodsAdd']),
		onReduce(index){
			this.goodsReduce(index);
		},
		onAdd(index){
			this.goodsAdd(index);
		}
	}
}
</script>
<style>
	.goods-mian{
		height: calc(100vH - 90px);
		overflow: hidden;
	}
	.goods-item{
		position: relative;
		padding: 10px;
	}
	.goods-item:not(:last-child):after{
		content: '';
		position: absolute;
		left: 10px;
		right: 10px;
		bottom: 0;
		height: 1px;
		background: #ccc;
		border-radius: 10px;
	}
	.goods-content{
		width: 120px;
		height: 120px;
		margin-right: 10px;
	}
	.goods-info{
		flex-direction: column;
	}
	.goods-view{
		position: relative;
		display: block;
		max-height: 100%;
		max-width: 100%;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}
	.goods-info-title{
		margin-bottom: 10px;
		font: 18px/1 "仿宋";
		font-weight: bold;

	}
	.goods-description{
		color: #666;
		font: 13px/1.2 "仿宋";
	}
	.new-price{
		color: #000;
		margin-bottom: 2px;
		font: 12px/1 "仿宋";
	}
	.price-box{
		color: #ff0000;
	}
	.price-info{
		font: 18px/1 "仿宋";
		font-weight: bold;
	}
	.old-price{
		font: 12px/1 "仿宋";
		color: #999;
	}
	.goods-cart{
		width: 80px;
		overflow: hidden;
	}
	.goods-btn{
		display: block;
		width: 25px;
		height: 25px;
		text-align: center;
		line-height: 24px;
		border-radius: 50px;
		cursor: pointer;
		border: 1px solid #2bbbd4;
		color: #fff;
		background: #2bbbd4;
	}
	.goods-input{
		margin: 0
	}
	.goods-input-view{
		width: 100%;
		height: 25px;
		text-align: center;
		border: none;
		color: #ff0000;
		font: 16px/1 "仿宋";
		font-weight: bold;
	}

	.goods-footer{
		position: relative;
		height: 45px;
		box-shadow: 0 0 2px rgba(0,0,0,.5);
		z-index: 10;
		background: #333;
		color: #fff;
		padding-left: 10px;
	}
	.goods-tatol-price{
		position: relative;
		padding-right: 10px;
		height: 45px;
		margin-right: 10px;
		font: 14px/45px "仿宋";
	}
	.goods-tatol-price:after{
		content: '';
		position: absolute;
		right: 0;
		top: 10px;
		bottom: 10px;
		background: #999;
		width: 2px;
		border-radius: 10px;
	}
	.goods-footer .price-info{
		font-size: 22px;
	}
	.goods-delivery-price{
		color: #666;
	}
	.goods-submit{
		height: 45px;
		min-width: 80px;
		border: none;
		padding: 0 10px;
		font: 16px/1 "仿宋";
		background: #999;
		color: #fff;
	}
	.goods-submit-active{
		background: #008000;
		color: #fff;
	}
	.goods-disable{
		background: #DDD;
		border-color: #ddd;
		cursor: not-allowed;
	}
</style>
