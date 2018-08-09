const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    a1:'',
    a2: '',
    a3: '',
    a4: ''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../login/login'
    })
  },
  onLoad: function () {
    var that = this
    wx.getUserInfo({
      success: function (res) {
    wx.request({
      url: 'https://www.beico.hk/highScore?type=1&nickname='+res.userInfo.nickName,
      method: 'GET',
      success: function (res) {
        // success
      
        that.setData({
          a1:res.data
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
        wx.request({
          url: 'https://www.beico.hk/highScore?type=2&nickname=' + res.userInfo.nickName,
          method: 'GET',
          success: function (res) {
            // success
          
            that.setData({
              a2: res.data
            })
          },
          fail: function () {
            // fail
          },
          complete: function () {
            // complete
          }
        })
        wx.request({
          url: 'https://www.beico.hk/highScore?type=3&nickname=' + res.userInfo.nickName,
          method: 'GET',
          success: function (res) {
            // success
          
            that.setData({
              a3: res.data
            })
          },
          fail: function () {
            // fail
          },
          complete: function () {
            // complete
          }
        })
        wx.request({
          url: 'https://www.beico.hk/highScore?type=4&nickname=' + res.userInfo.nickName,
          method: 'GET',
          success: function (res) {
            // success
           
            that.setData({
              a4: res.data
            })
          },
          fail: function () {
            // fail
          },
          complete: function () {
            // complete
          }
        })
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        lang:"zh_CN",
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})