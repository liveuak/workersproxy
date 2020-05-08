![](https://repository-images.githubusercontent.com/102965805/c78b5880-7f54-11ea-9e8c-5ec65c48633c)

<p align="center">

# Workers-Proxy

[![LICENSE](https://img.shields.io/github/license/Berkeley-Reject/Workers-Proxy.svg?style=for-the-badge)](https://github.com/Berkeley-Reject/Workers-Proxy/blob/master/LICENSE)
[![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/Berkeley-Reject/Workers-Proxy?style=for-the-badge)](https://github.com/Berkeley-Reject/Workers-Proxy/issues)
[![GitHub stars](https://img.shields.io/github/stars/Berkeley-Reject/Workers-Proxy?style=for-the-badge)](https://github.com/Berkeley-Reject/Workers-Proxy/stargazers)

[Issues](https://github.com/Berkeley-Reject/Workers-Proxy/issues) |
[Pull requests](https://github.com/Berkeley-Reject/Workers-Proxy/pulls) |
[贡献者](https://github.com/Berkeley-Reject/Workers-Proxy/graphs/contributors)

</p>

## 介绍

Workers-Proxy 是基于 [Cloudflare Workers](https://workers.cloudflare.com/) 的轻量级 Javascript [反向代理](https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/).

用户无需购买主机并配置 Web 服务器 (例如 Nginx 或 Apache) 即可在 Cloudflare 的全球网络上部署反向代理.

### 功能

* 搭建网站镜像
* 通过 Cloudflare 的全球网络加速前端资源访问
* 增加安全性, 隐藏网站的真实 IP 地址
* 屏蔽特定地区或 IP 地址
* 将移动设备用户转发到不同网站

## 示例

[GitHub](https://cdn.reverse-proxy.live) (该示例在部分地区无法使用)

[University of California, Los Angeles (UCLA)](https://ucla.reverse-proxy.live)

[Python 文档](https://python.reverse-proxy.live)

## 配置教程

### 安装和部署

#### 使用 Wrangler 部署

1. [安装 Wrangler.](https://github.com/cloudflare/wrangler#installation)

2. 创建一个新的项目.

```
wrangler generate my-workers-proxy https://github.com/Berkeley-Reject/Workers-Proxy
```

3. [配置](https://developers.cloudflare.com/workers/quickstart/#configure)该项目的 `wrangler.toml` 文件来准备部署你的项目.

```
wrangler config
```

4. 构建并部署于 Cloudflare Workers.

```
wrangler build
wrangler publish
```

#### 手动部署

1. 转到 [Cloudflare Workers](https://workers.cloudflare.com), 注册或登录 Cloudflare 账号, 为 Workers 设置子域名, 创建新的 Worker.

2. 自定义 '[src/index.js](https://github.com/Berkeley-Reject/Workers-Proxy/blob/master/src/index.js)', 将代码复制到在线编辑器中, 替换默认代码.

3. 更改 Worker 名称, 保存代码并部署, 测试反向代理是否符合需求.

### 绑定自定义域名

1. 检查域名是否接入 Cloudflare.

2. 跳转到域名的控制面板, 选择 'Workers' 页面, 点击 'Add Route'.

3. 在 `Route` 中输入 `https://<自定义域名>/*` 并且选择刚创建的 Worker.

4. 为自定义域名添加 CNAME DNS 记录. 在 DNS 页面中, 在 'Name' 区域输入自定义域名的子域名 (或者 @), 在 'Target' 区域输入 Worker 的**二级域名** (例如 test.workers.dev), 将代理状态选择为 '代理'.

### 自定义 index.js

在 'index.js' 文件顶部有一些常量.

为了自定义 Workers-Proxy 反向代理, 请根据需求编辑这些常量.

```
// 代理网站
const upstream = 'www.google.com'

// 代理网站的目录
const upstream_path = '/'

// 手机用户代理网站
const upstream_mobile = 'www.google.com'

// 屏蔽国家和地区
const blocked_region = ['CN', 'KP', 'SY', 'PK', 'CU']

// 屏蔽 IP 地址
const blocked_ip_address = ['0.0.0.0', '127.0.0.1']

// 源站是否开启 HTTPS
const https = true

// 是否允许浏览器缓存
const disable_cache = false

// 文本替换
const replace_dict = {
    '$upstream': '$custom_domain',
    '//google.com': ''
}
```

### 配置模板

* [Google](https://github.com/Berkeley-Reject/Workers-Proxy/blob/master/examples/google)
* [Google Scholars](https://github.com/Berkeley-Reject/Workers-Proxy/blob/master/examples/google-scholar)
* [GitHub](https://github.com/Berkeley-Reject/Workers-Proxy/blob/master/examples/github)
* [Wikipedia](https://github.com/Berkeley-Reject/Workers-Proxy/blob/master/examples/wikipedia)
* [Wikipedia (Chinese)](https://github.com/Berkeley-Reject/Workers-Proxy/blob/master/examples/wikipedia-zh)
* [The New York Times](https://github.com/Berkeley-Reject/Workers-Proxy/blob/master/examples/nytimes)
* [Pornhub](https://github.com/Berkeley-Reject/Workers-Proxy/blob/master/examples/pornhub)

### 部署多个域名

如果被反代的网站使用其他域名的静态资源时, 可以部署多个 Workers-Proxy 并配置文本替换.

1. www.google.com 使用位于 www.gstatic.com 的静态资源
2. 部署 Workers-Proxy A, 用于代理 www.gstatic.com
3. 部署 Workers-Proxy B, 用于代理 www.google.com
4. 配置 Workers-Proxy B 的文本替换:
```
const replace_dict = {
    '$upstream': '$custom_domain',
    'www.gstatic.com': '<Workers-Proxy A 的域名>'
}
```