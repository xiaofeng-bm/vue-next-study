// import { reactive } from 'vue'
// 注释掉vue的reactive方法，引入我们自己写的方法
import { reactive } from "../../reactivity/src/index";

// 创建一个用户
const user = {
  name: "晓枫",
  age: 26,
  children: {
    name: "小小枫",
    age: 5,
  },
};

const user1 = reactive(user);
const user2 = reactive(user);
// 1
console.log(user1); // Proxy { name: '晓枫' }
// 2
console.log(user1.children); // {name: "小小枫", age: 5}
// 3
console.log(user1 === user2); // true
