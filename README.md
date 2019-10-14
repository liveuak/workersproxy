# Workers-Proxy

[![LICENSE](https://img.shields.io/github/license/Siujoeng-Lau/Workers-Proxy.svg?style=for-the-badge)](https://github.com/Siujoeng-Lau/Workers-Proxy/blob/master/LICENSE)
[![Pull requests](https://img.shields.io/github/issues-pr-closed/Siujoeng-Lau/Workers-Proxy?style=for-the-badge)](https://github.com/Siujoeng-Lau/Workers-Proxy/pulls)
[![GitHub stars](https://img.shields.io/github/stars/Siujoeng-Lau/Workers-Proxy?style=for-the-badge)](https://github.com/Siujoeng-Lau/Workers-Proxy/stargazers)

## Introduction
Workers-Proxy is a lightweight Javascript application that retrieves resource as a client from other servers.

Deploying on [Cloudflare Workers](https://www.cloudflare.com/products/cloudflare-workers/), which is an influential platform for building serverless applications, you could build customized reverse proxy without purchasing computing engines and configuring web servers such as Nginx.

Moreover, crucial performance, such as latency and availability, will be optimized, since your application will be distributed through Cloudflare's global network of data centers in more than 90 countries.

By configuring Geolocation and IP address filters, you might directly suspend your reverse proxy service in specific countries or regions according to their regulations. Taking advantage of the mobile redirector, you could distribute various webpages based on users' devices.

## Demo
[Reverse-Proxy Project](https://cdn.reverse-proxy.live) (This demo may not available in specific regions.)

## Getting Started

### Build and Deploy

#### Deploy with Wrangler

1. [Installing Wrangler.](https://github.com/cloudflare/wrangler#installation)

2. Generate a new project.

```
wrangler generate my-workers-proxy https://github.com/Siujoeng-Lau/Workers-Proxy
```

3. [Configure](https://developers.cloudflare.com/workers/quickstart/#configure) your project's `wrangler.toml` file to prepare your project for deployment.

```
wrangler config
```

4. Build and deploy on Cloudflare Workers.

```
wrangler build
wrangler publish
```

#### Deploy manually

1. Navigate to [Cloudflare Workers](https://workers.cloudflare.com), register or sign in your Cloudflare account, and set custom subdomain for workers, and create a new Worker.

2. Customize 'index.js', paste the code into Cloudflare online editor to replace the default one.

3. Change name of your Worker, save and deploy it, and check whether its performance fulfills your demand.

### Bind to Custom Domain

1. Check whether your domain is currently under Cloudflare's protection.

2. Navigate to the dashboard of your domain, select 'Workers' page, and click on 'Add Route'.

3. Type `https://<domain-name>/*` in `Route` and select the Worker you created previously.

4. Add a CNAME DNS record for your custom domain. Concretely, enter the subdomain (or '@' for root) in the 'Name' field, enter the **second level domain** of your workers in the 'Target' field, and set 'Proxy status' to 'Proxied'.

### Customize index.js

Basically, there are a few constants on the top of the 'index.js' file.

To customize your own Workers-Proxy Service, you should edit these constants according to your expectations.

```
// Website you intended to retrieve for users.
const upstream = 'www.google.com'

// Website you intended to retrieve for users using mobile devices.
const upstream_mobile = 'www.google.com'

// Countries and regions where you wish to suspend your service.
const blocked_region = ['CN', 'KP', 'SY', 'PK', 'CU']

// IP addresses which you wish to block from using your service.
const blocked_ip_address = ['0.0.0.0', '127.0.0.1']

// Replace texts.
const replace_dict = {
    '$upstream': '$custom_domain',
    '//google.com': ''
}
```
