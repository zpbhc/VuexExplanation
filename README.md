# vuexteaching

> A Vue.js project

## Build Setup

## 写在前面

我很欣赏震惊部，因为他们的标题每次写的都很好0.0

## 什么是vuex
先给出[官网地址](https://vuex.vuejs.org/zh-cn/)

> 官方解释: Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化<br />
大白话：对数据(data)统一的管理,如果涉及到了数据的处理，来，到vuex里面进出吧！就像是超市对商品的统一管理一样

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
    }
})

//可能有的地方书写的风格不是这样的，如果需要的了解的可以百度看看其他人的
```
好了，基本的配置到这里就结束了，接下来我们可以开始使用它们了；<br />
下面结合一个购物车示例，我们来全面了解一下vuex的使用

## 开始使用vuex

我们约定store中的数据是以下形式

```js
state:{
    goods: {
        totalPrice: 0,
        totalNum:0,
        goodsData: [
            {
                id: '1',
                title: '好吃的苹果',
                price: 8.00,
                image: 'https://www.shangdian.com/static/pingguo.jpg',
                num: 0
            },
            {
                id: '2',
                title: '美味的香蕉',
                price: 5.00,
                image: 'https://www.shangdian.com/static/xiangjiao.jpg',
                num: 0
            }
        ]
    }
},
getters:{ //其实这里写上这个主要是为了让大家明白他是怎么用的，
    totalNum(state){
        let aTotalNum = 0;
        state.goods.goodsData.forEach((value,index) => {
            aTotalNum += value.num;
        })
        return aTotalNum;
     },
     totalPrice(state){
        let aTotalPrice = 0;
        state.goods.goodsData.forEach( (value,index) => {
            aTotalPrice += value.num * value.price
         })
         return aTotalPrice.toFixed(2);
    }
},
mutations:{
    reselt(state,msg){
        console.log(msg) //我执行了一次；
        state.goods.totalPrice = this.getters.totalPrice;
        state.goods.totalNum = this.getters.totalNum;
    },
    reduceGoods(state,index){ 
        //第一个参数为默认参数，即上面的state,后面的参数为页面操作传过来的参数
        state.goods.goodsData[index].num-=1;
        
        let msg = '我执行了一次'
        this.commit('reselt',msg);
    },
    addGoods(state,index){
        state.goods.goodsData[index].num+=1;
        
        let msg = '我执行了一次'
        this.commit('reselt',msg);
        /**
            想要重新渲染store中的方法，一律使用commit 方法 
            你可以这样写 commit('reselt',{
                state: state
            })
            也可以这样写 commit({
                type: 'reselt',
                state: state 
            })
            主要看你自己的风格
        **/
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
    <div id="goods" class="goods-box">
        <ul class="goods-body">
            <li v-for="(list,index) in goods.goodsData" :key="list.id">
                <div class="goods-main">
                    <img :src="list.image">
                </div>
                <div class="goods-info">
                    <h3 class="goods-title">{{ list.title }}</h3>
                    <p class="goods-price">¥ {{ list.price }}</p>
                    <div class="goods-compute">
                        <!--在dom中使用方法为：$store.commit()加上store.js中的属性的名称，示例如下-->
                        <span class="goods-reduce" @click="$store.commit('reduceGoods',index)">-</span>
                        <input readonly v-model="list.num" />
                        <span class="goods-add" @click="$store.commit('addGoods',index)">+</span>
                    </div>
                </div>
            </li>
        </ul>
        <div class="goods-footer">
            <div class="goods-total">
                合计：¥ {{ goods.totalPrice }}
                <!--
                    如果你想要直接使用一些数据，但是在computed中没有给出来怎么办？
                    可以写成这样
                    {{ $store.state.goods.totalPrice }}
                    或者直接获取gettles里面的数据
                    {{ $store.gettles.totalPrice }}
                -->
            </div>
            <button class="goods-check" :class="{activeChecke: goods.totalNum <= 0}">去结账({{ goods.totalNum }})</button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Goods',
        computed:{
            goods(){
                return this.$store.state.goods;
            }
        }
    }
</script>
```
如果上面的方式写参数让你看的很别扭，我们继续看第二种方式

### 第一种方式使用store.js中的数据(通过辅助函数使用)
```html
<!--goods.vue 购物车页面-->
<template>
    <div id="goods" class="goods-box">
        <ul class="goods-body">
            <li v-for="(list,index) in goods.goodsData" :key="list.id">
                <div class="goods-main">
                    <img :src="list.image">
                </div>
                <div class="goods-info">
                    <h3 class="goods-title">{{ list.title }}</h3>
                    <p class="goods-price">¥ {{ list.price }}</p>
                    <div class="goods-compute">
                        <span class="goods-reduce" @click="goodsReduce(index)">-</span>
                        <input readonly v-model="list.num" />
                        <span class="goods-add" @click="goodsAdd(index)">+</span>
                    </div>
                </div>
            </li>
        </ul>
        <div class="goods-footer">
            <div class="goods-total">
                合计：¥ {{ goods.totalPrice }}
                <!--
                    getters里面的数据可以直接这样写
                    {{ totalPrice }}
                -->
            </div>
            <button class="goods-check" :class="{activeChecke: goods.totalNum <= 0}">去结账({{ goods.totalNum }})</button>
        </div>
    </div>
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

![效果图](https://user-gold-cdn.xitu.io/2018/2/1/16150e534682cec7?w=305&h=569&f=gif&s=99902)

## 写在最后

谢谢大家的阅读，如果本文让你能有所收获，深表荣幸，如果喜欢的，点个赞行 0.0

最后打一波广告：欢迎大家关注我的微信公众号：大前端js，当然为了回馈大家关注，里面我放了一些学习资源，热烈欢迎大家关注交流前端方面但不局限前端方面的知识；

> **之前发出来的有很多单词出错的地方，对这样的错误，深表歉意，也非常感谢大家的指正**

> **原创不易，非商业转载时请注明出处与原文链接，商业转载请得到本人允许，谢谢！**
