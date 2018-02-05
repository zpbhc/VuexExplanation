import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		name: '极品粥铺',
		goodsApi : {
			minPrice: '20', //起送价格
			deliveryPrice: '4',	// 配送费
			goods: [
				{
					"id": "0000001",
					"name": "皮蛋瘦肉粥",
					"price": 10,
					"oldPrice": "12",
					"description": "咸粥",
					"sellCount": 229,
					"rating": 100,
					"image": require('../assets/pdsrz.jpg'),
					"num": 0,
					"info": "皮收瘦肉粥是一种营养丰富的粥品，这种粥的主要食材是大米、瘦肉和皮蛋，它们的都含有大量的蛋白质和多种维生素以及适量的脂肪和微量元素，人们食用以后能快速把这些营养吸收，满足身体各器官对不同营养成分的需要。",
				},
				{
					"id": "0000002",
					"name": "红豆薏米美肤粥",
					"price": 8,
					"oldPrice": "10",
					"description": "甜粥",
					"sellCount": 86,
					"rating": 100,
					"image": require('../assets/hdymz.jpg'),
					"num": 0,
					"info": "红豆薏米美肤粥有去湿利水的作用，红豆含有丰富的维生素，可利尿消肿，芡实也有补中益气的效果，以上材料一起煮的五谷杂粮粥，不仅能让你拥有完美身材，还能帮助靓丽容颜，是男女老幼不可多得的养生食谱。",
				},
				{
					"id": "0000003",
					"name": "南瓜粥",
					"price": 9,
					"oldPrice": "12",
					"description": "甜粥",
					"sellCount": 91,
					"rating": 100,
					"image": require('../assets/ngz.jpg'),
					"num": 0,
					"info": "南瓜是非常养胃的一种食材，尤其适合脾胃虚弱、营养不良、食欲不振的朋友食用。南瓜因为营养成分丰富，所以功效也特别多样"
				},
				{
					"id": "0000004",
					"name": "红枣山药糙米粥",
					"price": 10,
					"oldPrice": "12",
					"description": "甜粥",
					"sellCount": 81,
					"rating": 91,
					"image": require('../assets/hzsyz.jpg'),
					"num": 0,
					"info": "山药：强健机体，滋肾益精、益智安神，还预防心脑血管疾病。但便秘者慎用。红枣：益肾暖胃，补中益气，治阴虚。但糖尿病人慎食",
				},
				{
					"id": "0000005",
					"name": "青菜肉丝粥",
					"price": 12,
					"oldPrice": "13",
					"description": "咸粥",
					"sellCount": 86,
					"rating": 100,
					"image": require('../assets/qcrsz.jpg'),
					"num": 0,
					"info": "中医认为青菜性味寒凉、易伤脾胃，少许寒必温缓和寒凉之性。能活血化瘀、散血消肿的作用，可用于孕妇产后淤血腹痛以及治疗疖肿、丹毒",
				},
				{
					"id": "0000006",
					"name": "银耳莲子粥",
					"price": 12,
					"oldPrice": "15",
					"description": "甜粥",
					"sellCount": 362,
					"rating": 100,
					"image": require('../assets/yelzz.jpg'),
					"num": 0,
					"info": "银耳性质平和，味甘、淡，无毒，具有润肺生津、滋阴养胃。益气安神，强心健脑等作用，有“滋阴补肾，润肺止咳。和胃益气之功”，是“润肺滋阴要品”。养生学家甚至认为其滋阴润肺的作用可与燕窝媲美。因其物美价廉，故人人都能享用",
				}
			]
		}
	},
	getters: {
		tatolPrice(state){
			let tatolP = 0;
			state.goodsApi.goods.forEach((val,index) => {
				tatolP+= val.num * val.price;
			});

			if(tatolP>0){
				tatolP = parseFloat(tatolP) + parseInt(state.goodsApi.deliveryPrice)
			}else{
				tatolP = 0;
			}

			return tatolP.toFixed(2);
		},
		tatolNum(state){
			let tatolN = 0;
			state.goodsApi.goods.forEach((val,index) => {
				tatolN+= val.num;
			})
			return tatolN;
		}
	},
	mutations: {
		goodsReduce(state,index){
			if(state.goodsApi.goods[index].num > 0){
				state.goodsApi.goods[index].num-=1;
			}
		},
		goodsAdd(state,index){
			state.goodsApi.goods[index].num+=1;
		}
	},
	actions: {

	}
})