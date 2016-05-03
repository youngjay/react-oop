这是一个展示嵌套model的demo

基本原理是使用


react-redux的connect让component来追踪state的变化


但是没有使用redux的复杂模型


而是自己实现了一个store，这个store可以通过dispatch方法来修改一个深度路径的值，然后触发change事件


一般的action可以直接在connect里面写,例如这个demo里面的`handleChange`, `addShop`这些


如果有通用的action可以写在单独的文件里面，这里的



```
npm install
webpack-dev-server --port 8082
http://localhost:8082/webpack-dev-server/index.html
```