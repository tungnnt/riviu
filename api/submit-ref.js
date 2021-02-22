const axios = require('axios')

module.exports = async (region, deviceId, deviceName, token, refCode, agent) => {
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
        'timezone': 'UTC',
        'os_version': '14.4',
        'device_model': 'iPhone',
        'Accept-Language': 'en-us',
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'device_brand': 'Apple',
        'utm_campaign': 'Organic',
        'If-None-Match': 'W/"185-LqTE/GKLvlY0QhjFJaXdVQLOjSI"'
    }

    const data = {
        'present_id': refCode
    }

    const options = {
        url: 'https://reviewapi.riviu.co/user/presentcode',
        method: 'POST'
    }

    const response = await axios({
        method: options.method || 'GET', url: options.url, headers, data, httpsAgent: agent
    })

    return response.data
}
