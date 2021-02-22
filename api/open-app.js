const axios = require('axios')

module.exports = async (region, deviceId, deviceName, agent) => {
    const headers = {
        'Host': 'production-tracking.riviu.co',
        'User-Agent': 'Riviu/5 CFNetwork/1220.1 Darwin/20.3.0',
        'language': 'vi-vn',
        'location_permission': 'decline',
        'app_version': '3.7.4',
        'region': region,
        'device_id': deviceId,
        'device_name': deviceName,
        'utm_source': 'Organic',
        'utm_medium': 'Organic',
        'platform': 'ios',
        'Connection': 'close',
        'device_category': 'mobile',
        'Accept-Language': 'en-us',
        'timezone': 'UTC',
        'os_version': '14.4',
        'device_model': 'iPhone',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'device_brand': 'Apple',
        'utm_campaign': 'Organic',
        'If-None-Match': 'W/"79-F6F9TmMWvuzwVax86VsG7AOLj2Y"'
    }

    const data = {
        'source_open': 'Organic',
        'first_open': '1'
    }

    const options = {
        url: 'https://production-tracking.riviu.co/root/open-app',
        method: 'POST'
    }

    const response = await axios({
        method: options.method || 'GET', url: options.url, headers, data, httpsAgent: agent
    })

    return response.data
}
