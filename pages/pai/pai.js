// pages/pai/pai.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    y1:'',
    y2:'',
    y3:'',
    yy1: '',
    yy2: '',
    yy3: '',
    f1: '',
    f2: '',
    f3: '',
    ff1: '',
    ff2: '',
    ff3: '',
    j1: '',
    j2: '',
    j3: '',
    jj1: '',
    jj2: '',
    jj3: '',
    n1: '',
    n2: '',
    n3: '',
    nn1: '',
    nn2: '',
    nn3: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://www.beico.hk/rank?type=1',
      method: 'GET', 
      success: function (res) {
        // success
      
        that.setData({
          y1: res.data[0].score,
          y2: res.data[1].score,
          y3: res.data[2].score,
          yy1: res.data[0].nickname,
          yy2: res.data[1].nickname,
          yy3: res.data[2].nickname
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
      url: 'https://www.beico.hk/rank?type=2',
      method: 'GET',
      success: function (res) {
        // success
    
        that.setData({
          j1: res.data[0].score,
          j2: res.data[1].score,
          j3: res.data[2].score,
          jj1: res.data[0].nickname,
          jj2: res.data[1].nickname,
          jj3: res.data[2].nickname
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
      url: 'https://www.beico.hk/rank?type=3',
      method: 'GET',
      success: function (res) {
        // success

        that.setData({
          f1: res.data[0].score,
          f2: res.data[1].score,
          f3: res.data[2].score,
          ff1: res.data[0].nickname,
          ff2: res.data[1].nickname,
          ff3: res.data[2].nickname
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
      url: 'https://www.beico.hk/rank?type=4',
      method: 'GET',
      success: function (res) {
        // success
      
        that.setData({
          n1: res.data[0].score,
          n2: res.data[1].score,
          n3: res.data[2].score,
          nn1: res.data[0].nickname,
          nn2: res.data[1].nickname,
          nn3: res.data[2].nickname
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
     
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this
    wx.request({
      url: 'https://www.beico.hk/rank?type=1',
      method: 'GET',
      success: function (res) {
        // success
      
        that.setData({
          y1: res.data[0].score,
          y2: res.data[1].score,
          y3: res.data[2].score,
          yy1: res.data[0].nickname,
          yy2: res.data[1].nickname,
          yy3: res.data[2].nickname
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
      url: 'https://www.beico.hk/rank?type=2',
      method: 'GET',
      success: function (res) {
        // success
    
        that.setData({
          j1: res.data[0].score,
          j2: res.data[1].score,
          j3: res.data[2].score,
          jj1: res.data[0].nickname,
          jj2: res.data[1].nickname,
          jj3: res.data[2].nickname
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
      url: 'https://www.beico.hk/rank?type=3',
      method: 'GET',
      success: function (res) {
        // success
   
        that.setData({
          f1: res.data[0].score,
          f2: res.data[1].score,
          f3: res.data[2].score,
          ff1: res.data[0].nickname,
          ff2: res.data[1].nickname,
          ff3: res.data[2].nickname
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
      url: 'https://www.beico.hk/rank?type=4',
      method: 'GET',
      success: function (res) {
        // success
      
        that.setData({
          n1: res.data[0].score,
          n2: res.data[1].score,
          n3: res.data[2].score,
          nn1: res.data[0].nickname,
          nn2: res.data[1].nickname,
          nn3: res.data[2].nickname
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '三亿人都在玩的打人游戏，快来看看',
      path: '/pages/index/index'

    }
  }
})