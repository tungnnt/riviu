const axios = require('axios')

module.exports = async (region, deviceId, deviceName, token, agent) => {
    const headers = {
        'Host': 'reviewapi.riviu.co',
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
        'token': token,
        'Connection': 'close',
        'device_category': 'mobile',
        'Accept-Language': 'en-us',
        'os_version': '14.4',
        'timezone': 'UTC',
        'device_model': 'iPhone',
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'device_brand': 'Apple',
        'utm_campaign': 'Organic',
        'If-None-Match': 'W/"476-GZnbf0kW5uDtp8kc4hJxchGPbsk"'
    }

    const options = {
        url: 'https://reviewapi.riviu.co/user/account'
    }

    const response = await axios({
        method: options.method || 'GET', url: options.url, headers, httpsAgent: agent
    })

    return response.data
}
