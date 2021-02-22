const axios = require('axios')

module.exports = async (region, deviceId, deviceName, otp, otpTransId, phone, agent) => {
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
        'timezone': 'UTC',
        'os_version': '14.4',
        'device_model': 'iPhone',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'device_brand': 'Apple',
        'utm_campaign': 'Organic'
    }

    const options = {
        url: `https://production-account.riviu.co/v1.0/auth/register_token?country_prefix=84&otp=${otp}&otp_trans_id=${otpTransId}&phone=${phone}`
    }

    const response = await axios({
        method: options.method || 'GET', url: options.url, headers, httpsAgent: agent
    })
    
    return response.data
}
