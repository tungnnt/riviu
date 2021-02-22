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

setImmediate(async () => {
    const refCode = 'IO8SED'

    const phone = '0982155810'

    while (true) {
        try {
            let response

            response = await getNewProxy()

            const [host, port] = response.proxy.split(':')

            console.log({ host, port })

            response = await getCurrentIP(host, port)

            console.log({ ip: response })

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

                const otp = await getUserInput()

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