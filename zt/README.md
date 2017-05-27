# 快速创建专题页面

## 目录结构

```
|—— css
    |—— less
        |—— index.less
        |—— common.less
    |—— css
        |—— index.css        #编译未压缩的的css，一般用于差错校对
        |—— index.min.css    #线上
    |—— img
        |—— *.jpg
|——js
|——index.html
```

## 规范
### HTML

.sect 一般作为模块单位的外盒子，用于承载背景（全屏）

.cont 一般作为模块的内容盒子，用于承载内容


```html
<body>
    <div id="#app">
        <div class="sect sect_1">
            <div class="cont cont_1">
                ...自定义内容
            </div>
        </div>
        
        <div class="sect sect_2">
            <div class="cont cont_2">
                ...自定义内容
            </div>
        </div>
        
        <div class="sect sect_3">
            <div class="cont cont_3">
                ...自定义内容
            </div>
        </div>
    </div>
</body>
```

```
技巧：一句Emmet语句可快速生成多个模块
(div.sect.sect_$>div.cont.cont_$)*6
按tab
```

### 样式规范
####    index.less
```less

// 快速初始化
@import 'common.less';

#app{
    /*
    *   参数 @siw、@n
    *   @siw 不设置的话 默认是1200px，
    *   @n  必填，数值为 模块 .sect 的个数
    */
    .init(@siw:1240px;@n:6;)
    
    // 业务代码
    ...
}

```


### 背景图规范
- 类型：.jpg
- 命名：bg_N.jpg（必须按照N的递增）
- 备注：背景图数必须和模块数对应，如 有5个.sect盒子，背景图有5张，则为命名为 bg_1.jpg、bg_2.jpg、bg_3.jpg、bg_4.jpg、bg_5.jpg、


### 欢迎小伙伴补充其他经验以及想法..