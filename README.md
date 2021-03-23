# NEFU课表

### 介绍
“NEFU课表”是一款用于分周次显示nefuer课表的小程序


### 开发环境
- 微信开发者工具 1.05.2102010
- node-xlsx ^0.16.1
- wx-serve-sdk ~2.4.0
- wx-cloud-env 1.0
- vant 1.6.8

### 功能业务（拓展）
- 用户上传多个课程表文件
- 课表分周次展示功能
- 删除课表文件功能
- 自定义正则表达式个性化解析表格
- 用户手动添加课程

### 快速开始
- clone本项目
- 在本地微信开发工具中打开，配置云开发环境
  - 右键cloudfunction-> 选择当前环境
  - 将cloudfunction包下的login 和 parse 两个函数右键上传到云函数（不安装依赖）
- 在miniprogram文件夹下打开cmd 执行 `npm install`
- 在云数据库中创建 courses 集合，将权限修改为所有用户可读写
- 测试
  - 导入测试文件 pages/test/XXX.xlsx
  - 刷新页面
### 项目迭代

#### 2020.3.21 todo
- ~~完成openid的缓存和初始化~~
- ~~修复同一个时间不同周次课程显示的问题~~
- 修复用户上传多个文件只能使用一个的问题
- ~~完成课程表信息显示不全的问题~~
- 实现用户对上传课程表文件删除的功能
- ~~增加选择周次功能~~
#### 2021.3.22 todo
- ~~修复上传文件后页面不会自动刷新的bug~~
#### 2021.3.23 done
- ~~实现点击课程显示详情功能~~~
- ~~V1.0.0版本发布~~