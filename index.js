const checkAvailablePhone = require("./api/check-available-phone")
const getAccountInfo = require("./api/get-account-info")
const openApp = require("./api/open-app")
const registerToken = require("./api/register-token")
const sendOtp = require("./api/send-otp")
const signinPhone = require("./api/signin-phone")
const submitRef = require("./api/submit-ref")
const createProxyAgent = require("./helper/create-proxy-agent")
const getUserInput = require("./helper/get-user-input")
const loading = require("./helper/loading")
const { randomFirstName, randomName, randomDeviceId, normalizeName } = require("./helper/random")
const { getNewProxy, getCurrentIP } = require("./helper/tinsoft-proxy")
const {_createOrder, _getServiceMessage} = require('./otpsim/otpsim')

function parseToken(result) {

    result = result.match(/\d+/g)
    result = result[0]
    return result
}

const getOTP = (phone, orderID) => {
    return new Promise((resolve, reject) => {
        const start = new Date()

        let handleFn = async () => {
            let end = new Date() - start
            if (end > 60000) reject("time out")
            else {
                let response = await _getServiceMessage(orderID)
                console.log('Đang lấy mã số điện thoại', phone)
                if (response.data.messages) {
                    const otp = parseToken(response.data.messages[0].sms_content)
                    resolve(otp)
                } else {
                    setTimeout(handleFn, 3000)
                }
            }
        }
        setTimeout(handleFn, 0)
    })
}

setImmediate(async () => {
    const refCode = 'JD1JFR'

    while (true) {
        try {
            let isLoadingPhone = true
            let phone = ''
            let orderID = ''
            while (isLoadingPhone) {
                const getOTPSIMPhone = await _createOrder()
                if (!getOTPSIMPhone.success) throw new Error(getOTPSIMPhone.message)
                phone = getOTPSIMPhone.data.phone_number
                orderID = getOTPSIMPhone.data.session
                let status = getOTPSIMPhone.message
                console.log({ statusString: status })
                if (phone && phone.length > 0)
                    isLoadingPhone = false
                await new Promise(resolve => setTimeout(resolve, 2000))
            }
            console.log({ phone })

            let response

            response = await getNewProxy()
            console.log({response})

            const [host, port] = response.proxy.split(':')

            console.log({ host, port })

            require('./helper/create-folder')('data')

            const agent = createProxyAgent(host, port)

            const fullName = `${randomFirstName()} ${randomName()}`

            const deviceName = `${normalizeName(fullName)}'s iPhone`

            const deviceId = randomDeviceId()

            const region = '112f7e2e9da240be937daa66b1c4d1ce'

            response = await checkAvailablePhone(deviceId, deviceName, region, phone, agent)

            const { data: { is_phone_verified: isPhoneVerified } } = response

            if (!isPhoneVerified) {
                console.log({ fullName, deviceId })

                response = await sendOtp(region, deviceId, deviceName, phone, agent)

                const { data: { otp_trans_id: otpTransId } } = response

                console.log({ otpTransId })

                response = await openApp(region, deviceId, deviceName, agent)

                console.log(response)

                const otp = await getOTP(phone, orderID)
                console.log({ otp })

                response = await registerToken(region, deviceId, deviceName, otp, otpTransId, phone, agent)

                const { data: { token } } = response

                const name = normalizeName(fullName, ' ', false)

                console.log({ token, name })

                response = await signinPhone(region, deviceId, deviceName, name, token, agent)

                const { data: { token: verifiedToken, account_core_uuid: accountCoreUuid, account_uuid: accountUuid } } = response

                console.log({ verifiedToken, accountCoreUuid, accountUuid })

                require('fs').appendFileSync('./data/accounts.txt', `${phone}|${verifiedToken}\n`, () => { })

                response = await getAccountInfo(region, deviceId, deviceName, verifiedToken, agent)

                response = await submitRef(region, deviceId, deviceName, verifiedToken, refCode, agent)

                console.log(response)

                await loading(120, 1000)
            }
        } catch (error) {
            console.log(error)

            await loading(120, 1000)
        }
    }
})
