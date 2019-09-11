const main_domain = 'https://cdn.reverse-proxy.live/'
const workers_domain = 'https://google.xasiimov.workers.dev'
const upstream = 'https://www.google.com/'
const blocked_region = ['CN', 'KP', 'SY', 'PK', 'CU']

addEventListener('fetch', event => {
    event.respondWith(fetchAndApply(event.request))
})

async function fetchAndApply(request) {

    const region = request.headers.get('Cf-Ipcountry').toUpperCase()
    let url = request.url
    if (blocked_region.includes(region)) {
        let response = new Response('Access denied: WorkersProxy is not available in your region yet.', {
            status: 403
        })
        return response
    } else {
        url = url.replace(main_domain, upstream)
        url = url.replace(workers_domain, upstream)
        let method = request.method
        let headers = request.headers

        let response = fetch(url, {
            method: method,
            headers: headers
        })
        return response
    }
}
