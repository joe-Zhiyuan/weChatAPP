// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.globalData.wxCode = res.code;
      }
    })
  },
  globalData: {
    userInfo: null,
    wxCode: '',
    formal: "https://oapi.tticar.com", // 正式地址
    test: "https://tapi.tticar.com", // 测试地址
  }
})
