# 震惊！喝个茶的学会了vuex

> 震惊！喝个茶的学会了vuex

## Build Setup

## 写在前面

我很欣赏震惊部，因为他们的标题每次写的都很好0.0

## 什么是vuex
先给出[官网地址](https://vuex.vuejs.org/zh-cn/)

> 官方解释: Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化<br />
大白话：对数据(data)统一的管理,如果涉及到了数据的处理，来，到vuex里面进出吧！就像是超市对商品的统一管理一样


## 什么情况下使用vuex?

只要有公共数据的使用，都可以使用vuex, 如果你的数据只是在单一组件中使用，而不是多个组件公用的，就没有多大必要使用vuex，直接从后台请求数据就行了

## 为了使用vuex而做的准备

### 安装vuex

```html
npm install --save vuex
<!--这里假定你已经搭好vue的开发环境了--> 
```
### 配置vuex

1、首先创建一个js文件，假定这里取名为store.js <br />
2、在main.js文件中引入上面创建的store.js
```js
//main.js内部对store.js的配置
import store from '"@/store/store.js' 
//具体地址具体路径
new Vue({
    el: '#app',
    store, //将store暴露出来
    template: '<App></App>',
    components: { App }
});
```
### store.js中的配置
```js
import Vue from 'vue'; //首先引入vue
import Vuex from 'vuex'; //引入vuex
Vue.use(Vuex) 


//在使用vuex绝大多数情况下，我们只要弄清楚 state,getters,mutations,actions 四个属性的意思就行了，这也是重中之重，一定要记住
//看下面的写法和解释

export default new Vuex.Store({
    state: { 
        // state 类似 data
        //这里面写入数据
    },
    getters:{ 
        // getters 类似 computed 
        // 在这里面写个方法
    },
    mutations:{ 
        // mutations 类似methods
        // 写方法对数据做出更改(同步操作)
    },
    actions:{
        // actions 类似methods
        // 写方法对数据做出更改(异步操作)
        // 比如在这里请求数据，做类似setTimeout的操作
    }
})

//可能有的地方书写的风格不是这样的，如果需要的了解的可以百度看看其他人的
```
好了，基本的配置到这里就结束了，接下来我们可以开始使用它们了；<br />
下面结合一个购物车示例，我们来全面了解一下vuex的使用

## 开始使用vuex

我们约定store中的数据是以下形式

```js
state: {
    name: '极品粥铺',
    goodsApi : {
        minPrice: '20', //起送价格
        deliveryPrice: '4', // 配送费
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
            ...,
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
                "info": "银耳性质平和，味甘、淡，无毒，具有润肺生津、滋阴养胃。益气安神，强心健脑等作用，有“滋阴补肾，润肺止咳。和胃益气之功”，是“润肺滋阴要品”。养生学家甚至认为其滋阴润肺的作用可与燕窝媲美。因其物美价廉，故人人都能享用"
            }

        ]
    }
},
getters: {
    //这里的数据本来是写在state.goodsApi里面的，写在这里主要是为了讲清楚getters的，以及其内部的写法
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
actions:{
    //这里主要是操作异步操作的，使用起来几乎和mutations方法一模一样
    //除了一个是同步操作，一个是异步操作，这里就不多介绍了，
    //有兴趣的可以自己去试一试
    //比如你可以用setTimeout去尝试一下
}
```


好了，简单的数据我们就这样配置了，接下来看看购物车页面吧；

### 第一种方式使用store.js中的数据(直接使用)
```html
<template>
    <section id="goods" class="goods-box">
        <oHeader class="goods-header" :title="name"></oHeader> // 头部
        <main class="goods-mian"> // 购物车主内容
            <Scroll> // better-scroll组件,主要为了优化滚动条
                <ul class="goods-list"> // 商品列表
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
                    合计:<b class="price-box">¥ <span class="price-info">{{ $store.getters.tatolPrice || 0 }}</span></b></b>
                </p>
                <p class="cui-flex-item goods-delivery-price">
                    配送费:¥ {{ goodsApi.deliveryPrice }}
                </p>
            </div>  
            <button type="button" class="goods-submit" 
            :class="{'goods-submit-active': $store.getters.tatolPrice >= parseFloat(goodsApi.minPrice) }">
                {{ cartStatus }}({{ $store.getters.tatolNum }})
            </button>   
        </footer>
    </section>
</template>
<script>
    export default {
        name: 'Goods',
        computed:{
            goodsApi(){
                return this.$store.state.goodsApi;
            }
        }
    }
</script>
```
如果上面的方式写参数让你看的很别扭，我们继续看第二种方式

### 通过辅助函数使用storejs中的数据
```html
<!--goods.vue 购物车页面-->
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
    import {mapState,mapGetters,mapMutations} from 'vuex';
    /**
        上面大括弧里面的三个参数，便是一一对应着store.js中的state,getters,mutations
        这三个参数必须规定这样写，写成其他的单词无效，切记
        毕竟是这三个属性的的辅助函数
    **/
    
    export default {
        name: 'Goods',
        computed:{
            ...mapState(['goods']) 
            ...mapGetters(['totalPrice','totalNum'])
            /**
                ‘...’ 为ES6中的扩展运算符，不清楚的可以百度查一下
                如果使用的名称和store.js中的一样，直接写成上面数组的形式就行，
                如果你想改变一下名字，写法如下
                ...mapState({
                    goodsData: state => state.goods
                })
                
            **/
        },
        methods:{
            ...mapMutations(['reduceGoods','addGoods']),
            /**
                这里你可以直接理解为如下形式,相当于直接调用了store.js中的方法
                reduceGoods(index){
                    // 这样是不是觉得很熟悉了？
                },
                addGoods(index){
                    
                }
                好，还是不熟悉，我们换下面这种写法
                
                onReduce(index){ 
                    //我们在methods中定义了onReduce方法，相应的Dom中的click事件名要改成onReduce
                    this.reduceGoods(index)
                    //这相当于调用了store.js的方法，这样是不是觉得满意了
                }
                
            **/
        }
    }
</script>
```

## 最后来看看Module

在项目比较复杂的时候，数据全部写在一个state 方法全部集中一个mutations中，将会使我们的文件显得太过于臃肿，而且不易维护，那怎么办呢？<br />
还是那句话办法总比问题多，vuex为我们提供了module这样一个模块的概念。<br />
我们可以利用它来根据我们个个组件或者页面所需要的数据一一分割成不同的模块，看下面示例

```js
const moduleA = {
  state: { /*data**/ },
  mutations: { /**方法**/ },
  actions: { /**方法**/ },
  getters: { /**方法**/ }
}

const moduleB = {
  state: { /*data**/ },
  mutations: { /**方法**/ },
  actions: { /**方法**/ }
  getters: { /**方法**/ }
}

export default new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

//那怎么调用呢？看下面！

//在模块内部使用
state.goods //这种使用方式和单个使用方式样，直接使用就行

//在组件中使用
store.state.a.goods //先找到模块的名字，再去调用属性
store.state.b.goods //先找到模块的名字，再去调用属性
```

### 看看效果图吧

![效果图](/src/assets/vuex.gif);

## 写在最后

谢谢大家的阅读，如果本文让你能有所收获，深表荣幸，如果喜欢的, **多多给star** 0.0

最后打一波广告：欢迎大家关注我的微信公众号：大前端js，当然为了回馈大家关注，里面我放了一些学习资源，热烈欢迎大家关注交流前端方面但不局限前端方面的知识；


> **原创不易，非商业转载时请注明出处与原文链接，商业转载请得到本人允许，谢谢！**
