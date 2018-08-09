//index.js
//获取应用实例

const app = getApp()



Page({
  data: {
    motto: '开始打人',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    
    wx.navigateTo({
      url: '../login/login'
    })
  },
  choose: function () {
    app.globalData.index = 0;
    wx.navigateTo({
      url: '../choose/choose'
    })
    
  },
  CustomChoose: function () {
    app.globalData.index = 1;
    wx.navigateTo({
      url: '../choose/choose'
    })
    
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '三亿人都在玩的打人游戏，快来看看',
      path: '/pages/index/index'
      
    }
  },
  containerTap: function (res) {
    console.log(res.touches[0]);
    var x = res.touches[0].pageX;
    var y = res.touches[0].pageY + 85;
    this.setData({
      rippleStyle: ''
    });
    this.setData({
      rippleStyle: 'top:' + y + 'px;left:' + x + 'px;-webkit-animation: ripple 0.3s linear;animation:ripple 0.3s linear;'
    });
  },
  rank: function () {
    wx.navigateTo({
      url: '../rank/rank'
    })
  },
  onLoad: function () {
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
      app.globalData.userInfo = this.data.userInfo
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        lang:"zh_TW",
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
      
    })
  }
})
