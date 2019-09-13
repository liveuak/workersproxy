// Custom domain of your WorkersProxy.
const main_domain = 'https://cdn.reverse-proxy.live/'

// Subdomain of your Cloudflare Worker.
const workers_domain = 'https://google.xasiimov.workers.dev'

// Website you intended to retrieve for users.
const upstream = 'https://www.google.com/'

// Website you intended to retrieve for users using mobile devices.
const upstream_mobile = 'https://www.google.com/'

// Countries and regions where you wish to suspend your service.
const blocked_region = ['CN', 'KP', 'SY', 'PK', 'CU']

// IP addresses which you wish to block from using your service.
const blocked_ip_address = ['0.0.0.0', '10.0.0.0']

addEventListener('fetch', event => {
    event.respondWith(fetchAndApply(event.request));
})

async function fetchAndApply(request) {

    const region = request.headers.get('cf-ipcountry').toUpperCase();
    const ip_address = request.headers.get('cf-connecting-ip');
    const user_agent = request.headers.get('user-agent');
    let response = null;
    let url = request.url;

    if (device_status(user_agent)){
        url = url.replace(main_domain, upstream);
        url = url.replace(workers_domain, upstream);
    } else {
        url = url.replace(main_domain, upstream_mobile);
        url = url.replace(workers_domain, upstream_mobile);
    }

    if (blocked_region.includes(region)) {
        response = new Response('Access denied: WorkersProxy is not available in your region yet.', {
            status: 403
        });
    } else if(blocked_ip_address.includes(ip_address)){
        response = new Response('Access denied: Your IP address is blocked by WorkersProxy.', {
            status: 403
        });
    } else{
        let method = request.method;
        let headers = request.headers;
        response = fetch(url, {
            method: method,
            headers: headers
        })
    }
    return response;
}

function device_status (userAgentInfo) {
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
