const { transformVue } = require('transform-to-unocss')
exports.handler = async (event) => {
  const { body } = event
  const result = await transformVue(body)
  return {
    statusCode: 200,
    body: result,
  }
}
