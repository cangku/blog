---
title: 在线学习系统开发历程
date: 2016-04-27 21:35:02
tags: php
---
一次在线学习系统开发过程，过程中其实问题与描述的还是有差别的，诚然总结的时候问题都是解决了的，总结描述的时候却又是淡化了的。
<!-- more -->
### 如何拥有项目的话语权？
在立项的时候我没有机会参与讨论（直白的说就是没有参与的机会），一般说这种话剧情都会出现反转，事实也如此，剧情真的反转了。年终福利，一项目开发得力干将由于在过去的多年里，表现优异，战功赫赫，为公司的发展立下了悍马功劳，于是，公司提供了一次泰国五日游的机会，自然而然我就乘此机会上位了。项目是内部项目，但是要求也逃不了像兼职项目一样的要求，快好美。
### 如何解决流媒体与PPT的技术问题？
每一次开始一个项目的时候，我都暗下决心，这一次我一定要好好的写，毕竟后续如果需要维护的话，还是会自己来维护，一般说这种话剧情也会反转。其实，一开始，我真的有打算好好写。项目时间很紧，分工自然也就细化了一些。设计再出图前，资料的上传是可以同步进行的，本次学习系统主要是以ppt与视频音频为主，本次开发的主要难点之一，视频流畅播放体验，肥水不流外人田，于是乎我们选择了百度强大的实时流媒体处理与分发能力LSS（我只是随便这么一说，你就不要当真了），对于音视频的流畅播放以及转码问题统统也都不是问题了，剩下的ppt的话，ppt直接使用工具转成flash文件或者html5文件，于是乎问题也就解决了。
难点就此在我三言两语的巧妙分析之下轻松败下阵来，要不要剧情反转一下？这次不必了，因为分析就真是这么简单，实际api集成开发不是我做的，这块是另外一个得力干将做的。期间也出现了一些问题，php版本兼容问题，api本身不做评价，因为本身自己的代码能力就不强（不要继续深思api怎么样）就不要评论别人的代码。网络问题，这是一个值得深思的话题，别说功夫网了，公司网都出不去，面对显示器，一句代码都不想写了，逛一会儿全球最大的同性交友网。几番沟通之后给了管理员的权限，前面提到的问题都不是问题了，其实我一直ss着呢，只是想光明正大的拿个权限而已。
### 如何团队协作？
随着视频资源的上传完毕，设计图的出炉，功能api的摸索完毕，我这边基础框架挪用完毕，一切都开始步入正规，切图的小伙伴利刃开工中，基础框架功能修改完善中，相应的完善时负责资料添加的小伙伴就可以复制粘贴了，其实这个过程一直可以程序话的（如果什么都程序化了是一件多么可怕的事实），在基本功能修改的七七八八的时候，拿到了切好的页面，开始原始的静态页面动态化（套模板标签），捡一个过程中不愉快的说。数据化的过程中其实不是单纯的套套标签而已，对于数据后期如何调整，如果更新变化其实也需要在这其中思考，面对重复变化的模块，就一个模块，做了三种特效供老板参考，最后这三种都没用…，还好这一次老板满意了，这一次是两枚美女守着设计小伙做的（一会儿给小伙倒水，一会儿给小伙儿倒水的，服务勤快的不的了，只是小伙突然站了起来，说了句，你们先过去休息休息，我去小个解…）。
快的前提下质量要很高是不可能的，不知道大厂的小伙伴对于这样的问题是如何的处理的。就样式文件这个来说，前面方方面面的功能都七七八八了，这时又来左改改又改改，你是老老实实去样式文件中调试还是说直接就在页面撒谎功能修改样式文件呢？对于这个我是认真的，也是疑惑的，如何真正的优化自己的代码？为其他小伙伴服务，也为自己服务，其实一直到现在都没找到答案，这个过程其实是缺乏交流的过程（由于问题没能解决，还是遗留给小伙伴，后续记得给我意见讨论哦）。
### 如何应对反复修改？
1. 版本控制派上用途（项目版本是基于svn的，为了方便本地切换到了git，用的也不是那么顺利，但大致思路还是有的）。项目主线是可以直接用于生产环境的分支，在此基础上切换一个用于开发的分支，功能认证完毕的模块合并回去，这个过程一定要将功能模块细化。对于领导看了再说的模块，在开发分支上建立特效分支，如果又想看看其他特效的时候，又切换回开发分支建立新的特效分支，以此累推，老板舒坦了，就把舒坦特效分支合并回开发分支，功能模块确定了合并回主线分支。
2. 设计帮忙挡住一部分流量（还记得上面提到的两位美女吗？他们在表达老板的想法的时候，说想要一个闪电一样的特效，这个不是很懂，于是有描述到，就像游戏中刀剑特效，顿时我想到了一个动人的游戏广告）。  
![猪被爆菊花爆出装备的游戏配图]()

### 如何详细分析一个技术点？
针对上面的白话文来说一点技术上的白话文，希望自己可以简明扼要的描述清楚功能点的细节。
功能描述：统计系统每日用户数，培训视频课件音频等学习时间数，学习人数等数据收集。
解决方案：网站流量统计分析工具（tongji.baidu.com等），没有开放接口，数据不能很好的被分析利用（老板不喜欢）；自己写数据收集统计分析模块。
> 需求 version 0.0.1： 统计用户页面打开时间  
粗略的统计还是很容易办到的，页面打开的时候记录页面属性cookie，js定时器记录cookie，隔一段时间更新数据请求。页面打开不关闭做其他时间，时间依旧在统计，学习时间只能说统计到大概数据，第一版本刚刚上线，简单的统计了登录人数，按照集团子公司统计登录学习人数，学习时间，这时发现了昨天的数据有一个问题，学习基数小，页面时间统计到的数据有些太虚假，按照8小时工作制度，3小时在在线学习，工作谁做？为了让数据显得真实，读取数据是手动写了一句：
```
    $time = $time > 60 ? 60 : $time; // 最多学习一小时，这里与网上流传的一段代码有异曲同工之妙
```

更多方案辅助分析：  
* 为了提升统计页面活动时间的精确度，可以借助document.hidden()。于是我们的代码大致形式就可以修改成这样。(其实精确也是相对而言，开tab页面，然后至于后层不最小化，主窗口继续运行其他办公软件)

```
!function(document) {
    var hidden,
          visibilityChange,
          time = 0,
          id,
          reduceTime = function() {
              time += 5;
              console.log( time );
          },
          handleVisibilityChange,
          log;


    // browser ( standard, firfox, IE, chrome )
    if( 'hidden' in document ) {
        hidden = 'hidden';
        visibilityChange = 'visibilitychange';
    } else if( 'mozHidden' in document ) {
        hidden = 'mozHidden';
        visibilityChange = 'mozVisibilitychange';
    } else if( 'msHidden' in document ) {
        hidden = 'msHidden';
        visibilityChange = 'msVisibilitychange';
    } else if( 'webkitHidden' in document ) {
        hidden = 'webkitHidden';
        visibilityChange = 'webkitVisibilitychange';
    }

    handleVisibilityChange = function() {
        if( hidden in document ) {
            if( document[hidden] ) {
                clearInterval( id );
                console.log('暂停统计');
            } else {
                id = setInterval(reduceTime, 5000);
                log = time == 0 ? '开始统计' : '继续统计';
                console.log(log);
            }
        } else {
            id = setInterval(reduceTime, 5000);
        }
    }

    document.addEventListener( visibilityChange, handleVisibilityChange, false );
    return handleVisibilityChange();
}(document)

```

* 页面访问时间差。访问A页面时记录访问开始时间，从A页面到B页面打开时中间的时间就是A页面的访问时间，这样统计也会有最后页面时间统计不到，或者说页面统计的时间也只能是一个大概时间。

> 需求 version 0.0.2：按子公司详细分析用户数据
* 登录次数统计  
用户登录后记录登录日志，直接条件查询日志记录表按照公司返回count数据。  
* 页面停留时间统计  
用户访问学习页面记录的时间表，按照公司统计总的时间求和
* 用户平均学习时间
上面的数据综合使用，过滤重复数据前后计算。

> 需求 version 0.0.3 : 按子公司以及子公司部门（大部门）分析数据
a. 公司数据不固定，后期添加自动增加，每个公司部门数据不固定，可能新增某某分部，情况目前固定，但长远来看还是考虑详细一些的好。  
b. 有分部的以公司为表展示本部以及分部的学习数据分析，无分部的展示在整个集团统计表中分析
c. 公司 - 部门 - 学习内容（视频，案例，课件） - 学习数据（人数，时间，占比，部门总计，公司合计）

由于最开始的需求是没有部门的，为了方便后期数据维护，部门的设计是按照无限级分类的方式设计的联动菜单的形式。按照员工管理系统导出的部门数据，组合生成sql语句（phpexcel）更新现有数据。  
数据分析表，是查询用户表关联用户辅助数据表，部门数据表，学习内容日志记录表，几张表同时关联查询得到的数据内容，数据按照公司名称为一级数组的键名，部门名称为二级数组的键名左右数据组合，最后按照二级数组的值的个数来拆分数组（便于后期数据循环使用）。  
> 需求 version 0.0.4 : 按照数据生成图表  
由于暂时没有需求，这个版本的需求也就暂时没有实现。相对而言数据多有了，使用echarts也就差不多能很快解决的问题。  
> 需求 version 0.0.5 : 改善学习系统的利用率
投入成本其实不小，相对而言就要各种利用起来学习平台，无论是给打鸡血一样的数据还是学习资源，涵盖的内容也基本是公司某一些方面的沉淀。从数据来看，我们公司的数据还想对乐观一些，其他子公司基本是无人来问津。对于这样的现象肯定是有些不太乐观，于是决定直接ERP登录成功后强制弹出学习平台页面，这一点让我想到了网页上的游戏广告，我本来只是想上ERP关注一些工作安排，弹出一个页面就让我有些不能接受了，但是数据却漂亮了，不得不说这样也是一个不错的方法，每天看看首页的鸡血，一天干劲十足。  

### 文末反思
太长时间没写文章了，没太注意总结，就前段时间的成绩统计功能模块的功能本来就打算好好总结总结，也随着一系列时间拖拖拉拉的没有了下文，太忙其实都是借口（就像加班赶项目进度其实也是一样的道理，加班时间的效率是完全不能和平时相比的，诚然，这一项目接近尾声的时候，要不该拼命的时候还是会拼命，毕竟这是工作，养家糊口的指望工作后的回报）。  
对于统计分析数据分析相关的问题，我始终还是一次性查询出数据，然后使用程序按照自己想要的方式把数据组合起来，最后按照实际的情况分析数据，始终觉得这一步骤还有其余的方案，一时也不能跳出知识圈，也就继续使用了当前的方案。  
多交流，圈子还是问题，对于问题的求助我有选择过QQ群，提问的方式是在程序问答设计描述清楚自己的问题，以实际项目的相关例子作为说明，但是最后得到的结果也还是不是那么乐观，最后还是自己老老实实按照原先的逻辑继续往下走，想以提问的方式来偷懒其实是不明智的。
对于知识点的归类可能是接下来会注意的问题，以及对于表达这一块可能会加强，总结为：精炼！  
