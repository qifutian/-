// 代理设置
const proxy = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(proxy('/global/', {target: "https://orion.dev.d2d.ai", changeOrigin: true, "secure": false}))
    app.use(proxy('/nebula-auth-backend/', {target: "https://orion.dev.d2d.ai", changeOrigin: true, "secure": false}))
    app.use(proxy('/aurora-backend/', {target: "https://orion.dev.d2d.ai", changeOrigin: true, "secure": false}))
    app.use(proxy('/stardust-backend/', {target: "https://orion.dev.d2d.ai", changeOrigin: true, "secure": false}))
    app.use(proxy('/nebula-intg-backend/', {target: "https://orion.dev.d2d.ai", changeOrigin: true, "secure": false}))
    app.use(proxy('/nebula-audit-backend/', {target: "https://orion.dev.d2d.ai", changeOrigin: true, "secure": false}))
}