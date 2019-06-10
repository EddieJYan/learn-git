# HTML常用标签

## 基本的文档结构结构标签
```
<!DOCTYPE html>
<html>
    <head>
        <!-- 文档设置内容 -->
    </head>
    <body>
        <!-- 网页正文部分 -->
    </body>
<html>
```
1. ```<!DOCTYPE html>``` HTML5规范标准的文档类型定义，在过去HTML4时代存在多种文档解析呈现的类型，可以查阅W3C组织的官方文档： https://www.w3.org/qa/2002/04/valid-dtd-list.html
2. ```<html>``` HTML文档结构体，作为XHTML树状结构的根标签存在，是一种规范写法
3. ```<head>``` 也是一种规范写法，便于区分页面设置与正文内容的标签进行划分。
4. ```body``` 网页的正文部分。
   
*注：虽然html head和body都可以在大部分情况下省略，因为浏览器会自动补全，但考虑到结构的规范性，还是鼓励写全基本结构。*

## 文档设置内容
\<meta\>  功能设置标签
```
<meta charset="urf-8">   *h5规范中的文档编码*
<meta name="viewport" content="width=device-width, initial-scale=1.0"> *移动设备适配，样式像素宽度等于设备独立像素宽度 初始化不进行缩放*
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<meta http-equiv="refresh" content="3;url=http://www.mozilla.org/">  *3秒后重定向到 http://www.mozilla.org/ 网站*

*meta还包括如网站说明，设备浏览器呈现预设等多种多样的配置*  
```
详细可见：https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta。

---
\<link\>  资源引用标签
```
<link rel="stylesheet" href="index.css">     *引入样式表*
<link rel="icon" href="favicon.ico">         *网站图标引用*

*href：链接资源的URL*
*rel: 指明被链接资源对于当前文档的关系*
```

详细可见：https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link

---
\<title\>  网站头部内容标签
```
<title>首页</title>   *网站头部标题，一般这部分会与正文H1标题相呼应，达到网页的一致性并以提升其搜索引擎算法的权分*
```

---
\<script\>  脚本引用标签
```
<script src="index.js"></script>   *引入JS脚本文件，在一般开发中，该标签往往会写在body中，这主要是为了等待正文标签加载完毕后再执行脚本。*
```

---
\<noscript\>  脚本引用标签
```
<noscript>请打开javascript的使用权限</noscript>    *当JS被限制时显示的内容*
```
---
\<style\>  页面内部样式
```
<style>    *可在内部书写样式文件*
```

## 网页正文部分

常用布局标签
```
<header>   *[html5标签] 页面头部内容，包括导航菜单 banner 登录注册等*
<main>     *[html5标签] 主要内容，一个页面仅只能由一个main*
<aside>    *[html5标签] 侧边栏，与页面主题无关的内容，比如广告 其他外链导航等*
<nav>      *[html5标签] navigate 网站主要导航，一般首页头部内使用*
<footer>   *[html5标签] 页面底部，一般包括备案信息等内容*
<div>      *divide 纵向内容分割，一般用于大板块划分*
<span>     *水平内容分割，一般用于一个版块内的局部划分*
<article>  *[html5标签] 用于HTML（可复用）的独立结构的根包裹使用，article更加强调技术结构性，section更加强调内容一致性*
```
常用内容标签
```
<section>  *[html5标签] 章节标签，主要用于大纲内容的划分，与article一起替代了过去只能由IDV完成分割的无语义化的情况*
<p>        *段落标签，一个完整的段落，标签与标签自动换行*
<img>      *图片引用标签*
<br>       *换行标签*
<hr>       *分割线标签*
<b>        *粗体标签*
<i>        *斜体标签*
<em>       *斜体标签 语气加强*
<strong>   *粗体标签 加重地位*
<table>    *表格标签 内置配套的有 <thead><tbody><tfoot><caption><colgroup><tr><td><th>等标签*
```
其他标签
```
<iframe>   *内置窗口标签 可以在一个页面中嵌入另一个网页标签*
<a>        *链接跳转至对应页面的标签*
<form>     *表单内容提交标签*
```
---

## 一个完整的示例

```
<!DOCTYPE html>
<html lang="zh-CN">

<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">

   <title>重要的话</title>
   <link rel="stylesheet" href="index.css">
   <style>
     .banner{width:100%;height:200px;background:#f0f0f0}
     th{background:gray;color:#fff}
     ul{list-style:none;}
     nav li{display:inline-block}
     .content{overflow:hidden}
     main{width:80%;float:left;}
     aside{width:20%;float:right;}
     aside li{height:80px;background:#f0f0f0;text-align:center;border:1px black solid}
     footer{text-align:center;margin-top:50px} 
  </style>
</head>

<body>
   <header>
      <div>
         <!-- logo 登录等信息 -->
         <a href="home.html"><img src="logo.jpg" alt="公司logo"></a>
      </div>
      <article class="banner">
         <!-- BANNER广告 --> 网站推广内容 </article>
      <nav>
         <!-- 主导航 -->
         <ul>
            <li><a href="#">首页</a></li>
            <li><a href="#">关于</a></li>
            <li><a href="#">联系我</a></li>
         </ul>
      </nav>
   </header>

   <article class="content">
      <main>
         <!-- 主要内容 -->
         <section>
            <h1>重要的话</h1>
            <p><b>你们好</b>：<br>我要讲的最重要的一句话就是，<strong>多劳多得！</strong></p>
         </section>
         <hr>
         <section>           
            <table border="1" width="100%">
               <caption>成绩榜单</caption>
               <colgroup class="colstyle">
                  <col>
                  <col width="40%">
                  <col width="40%">
               </colgroup>
               <thead>
                  <tr>
                     <th></th>
                     <th>姓名</th>
                     <th>成绩</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <th></th>
                     <td>小妹</td>
                     <td>60</td>
                  </tr>
                  <tr>
                     <th></th>
                     <td>老哥</td>
                     <td>80</td>
                  </tr>
               </tbody>
               <tfoot>
                     <th>平均分</th>
                     <td></td>
                     <td>70</td>
               </tfoot>
            </table>
         </section>
         <hr>
         <article>
            <span>留下你的信息</span>
            <form action="https://postpage.html">
               <input type="text" name="name" />
               <input type="text" name="email" />
               <input type="submit" />
            </form>
         </article>
      </main>

      <aside>
         <!-- 广告侧边栏 -->
         <ul>
            <li>广告A</li>
            <li>广告B</li>
            <li>广告C</li>
         </ul>
      </aside>
   </article>


   <footer>
      <!-- 关于网站信息 -->
      <a>沪网备案</a>
      <a>网警举报</a>
   </footer>
   <script src="index.js"></script>
</body>

</html>
```



