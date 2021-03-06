// 获取应用实例
const app = getApp()
const util = require('../../utils/util')

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: true,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    signature: '',
    rawData: '',
    encryptedData: '',
    iv: ''
  },
  // 事件处理函数
  // 微信快捷登录
  bindGetUserInfo(res) {
    console.log(res)
    wx.getUserProfile({
      desc: '获取用户信息登录', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          signature: res.detail.signature,
          rawData: res.detail.rawData,
          encryptedData: res.detail.encryptedData,
          iv: res.detail.iv
        })
        util.Request({
          method: 'POST',
          url: app.globalData.test + "/wxApp/oneKeyLogin/1.0",
          data: {
            code: app.globalData.wxCode,
            signature: res.detail.signature,
            rawData: res.detail.rawData,
            encryptedData: res.detail.encryptedData,
            iv: res.detail.iv
          },
        }).then(res => {
          console.log(res)
        }).catch((error) => {
          console.log(error);
        })    
      }
    })
  },
  // 获取用户手机号码
  getPhoneNumber: (res) => {
    console.log(res)
    util.Request({
      method: 'POST',
      url: app.globalData.test + "/wxApp/oneKeyLogin/1.0",
      data: {
        code: app.globalData.wxCode,
        // signature: this.data.signature,
        // rawData: this.data.rawData,
        encryptedData: res.detail.encryptedData,
        iv: res.detail.iv
      },
    }).then(res => {
      console.log(res)
    }).catch((error) => {
      console.log(error);
    })
  },
  wxLogin() {
    // 判断是否可用 getUserProfile
    if (wx.canIUse('getUserProfile')) {
      wx.getUserProfile({
        desc: '用于微信快捷登录',
        success(res) {
          console.log(res)
          util.Request({
            method: 'POST',
            url: app.globalData.test + "/wxApp/oneKeyLogin/1.0",
            data: {
              code:  app.globalData.wxCode,
              signature: res.signature,
              rawData: res.rawData,
              encryptedData: res.encryptedData,
              iv: res.iv
            },
          }).then(res => {
            console.log(res)
          }).catch((error) => {
            console.log(error);
          })

        }
      })
    }
  },
  onLoad() {
    // 修改头部导航
    wx.setNavigationBarTitle({
      title: '登录'
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 底部自定义导航 index设置
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },
  // 手机号登录
  phoneLogin() {
    wx.navigateTo({
      url: '../login/phoneLogin'
    })
  },
})