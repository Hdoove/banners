#### React Component 轮播图（适用于三张图片的轮播图）
12345
#### npm地址 https://www.npmjs.com/package/react-banners-third

#### 在线访问地址  http://101.200.191.21:8082/

#### 1.使用方法
````

// 安装

npm i react-banners-third

// 引入

import ReactDemo from 'react-banners-third'; // 引入
import 'react-banners-third/lib/main.min.css'; // ！需要引入样式！

// 使用

const App = () => < ReactDemo imageDatas = {data} />
render( <App /> , document.getElementById('root'));

// 调用方法(实例)

const ref = useRef(null);

const { next, index, prev } = ref.current;

next(index) 上一页
prev(index) 下一页
goTo(index) 指定页
index 当前页

function handleGetInfo(data) {
    //获取的信息data
}

<App imageDatas={data} ref={ref} getImageInfo={handleGetInfo} />

````

#### 2.Api

参数 | 说明 | 类型 | 默认值 
- | :-: | :-: | :-: | -:
imageDatas | 图片参数 | Array({ index: number, imgUrl: string }) | 无 |
autoplay | 是否自动切换 | boolean | false |
delay | 切换间隔 | number | 2000 |
dots | 是否显示面板指示点| boolean | true |
dotPosition | 面板指示点位置，可选 inset、outset| string | outset |
getImageInfo | 获取点击图片信息| function | 无 |

#### 3.方法

名称 | 描述 
- | :-: | :-: | :-: | -:
next(index: number) | 切换到下一面板
prev(index: number) | 切换到上一面板
goTo(index: number) | 切换到指定面板
