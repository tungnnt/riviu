const axios = require('axios')

module.exports = async (region, deviceId, deviceName, name, token, agent) => {
    const headers = {
        'Host': 'production-account.riviu.co',
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
        'os_version': '14.4',
        'timezone': 'UTC',
        'device_model': 'iPhone',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'device_brand': 'Apple',
        'utm_campaign': 'Organic'
    }

    const data = {
        'name': name,
        'password': 'Pa55w0rds',
        'token_register': token
    }

    const options = {
        url: 'https://production-account.riviu.co/v2.0/auth/signin_phone',
        method: 'POST'
    }

    const response = await axios({
        method: options.method || 'GET', url: options.url, headers, data, httpsAgent: agent
    })

    return response.data
}
