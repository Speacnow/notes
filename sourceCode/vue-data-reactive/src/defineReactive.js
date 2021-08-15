import observe from './observe.js';
import Dep from './Dep.js';
/**
 个人目前觉得:
 __ob__上的dep没起到实际作用,起到作用的还是闭包里的dep,
 通过:if (Dep.target) {
                dep.depend();
                if (childOb) {
                    childOb.dep.depend();//找到上一步的Observer的dep
                    //这一步感觉
                }
            }
            闭包的dep与childOb里的dep的subs保持一致,感觉就是给人看的
            除非data[key]不是对象了,这个时候没有__ob__了,但是还会有
            一个闭包dep,起到了监视的作用
 */

export default function defineReactive(data, key, val) {
    const dep = new Dep();//闭包环境dep,打印对象是找不到的
    // console.log('我是defineReactive', key);
    if (arguments.length == 2) {
        val = data[key];//触发setter,
    }

    // 子元素要进行observe，至此形成了递归。这个递归不是函数自己调用自己，而是多个函数、类循环调用
    let childOb = observe(val);//获取了data[key]上__ob__上的dep,而不是闭包的dep
    console.log("===============" + key + ":childOb===============");
    console.log(childOb);

    Object.defineProperty(data, key, {
        // 可枚举
        enumerable: true,
        // 可以被配置，比如可以被delete
        configurable: true,
        // getter
        get() {
            //console.log('你试图访问' + key + '属性');
            // 如果现在处于依赖收集阶段
            if (Dep.target) {
                dep.depend();
                if (childOb) {
                    childOb.dep.depend();//找到上一步的Observer的dep
                    //这一步感觉
                }
            }
            return val;
        },
        // setter
        set(newValue) {
            console.log('你试图改变' + key + '属性', newValue);
            if (val === newValue) {
                return;
            }
            val = newValue;
            // 当设置了新值，这个新值也要被observe
            childOb = observe(newValue);
            // 发布订阅模式，通知dep
            dep.notify();
        }
    });
};