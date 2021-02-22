const prompts = require('prompts')

module.exports = async () => {
    const response = await prompts(
        {
            type: 'text',
            name: 'value',
            message: 'Enter OTP'
        }
    )

    const { value } = response

    return value
}