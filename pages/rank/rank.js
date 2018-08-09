// pages/rank/rank.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      a1:'',
      a2:'',
      a3:'',
      a4:'',
      a5:'',
    b1: '',
    b2: '',
    b3: '',
    b4: '',
    b5: '',
    aa1: '',
    aa2: '',
    aa3: '',
    aa4: '',
    aa5: '',
    bb1: '',
    bb2: '',
    bb3: '',
    bb4: '',
    bb5: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://www.beico.hk/custom',
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
  
        that.setData({
          a1: res.data[0].name,
          a2: res.data[1].name,
          a3: res.data[2].name,
          a4: res.data[3].name,
          a5: res.data[4].name,
          b1: res.data[0].score,
          b2: res.data[1].score,
          b3: res.data[2].score,
          b4: res.data[3].score, 
          b5: res.data[4].score,
          aa1: res.data[5].name,
          aa2: res.data[6].name,
          aa3: res.data[7].name,
          aa4: res.data[8].name,
          aa5: res.data[9].name,
          bb1: res.data[5].score,
          bb2: res.data[6].score,
          bb3: res.data[7].score,
          bb4: res.data[8].score,
          bb5: res.data[9].score
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
      url: 'https://www.beico.hk/custom',
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {

        that.setData({
          a1: res.data[0].name,
          a2: res.data[1].name,
          a3: res.data[2].name,
          a4: res.data[3].name,
          a5: res.data[4].name,
          b1: res.data[0].score,
          b2: res.data[1].score,
          b3: res.data[2].score,
          b4: res.data[3].score,
          b5: res.data[4].score,
          aa1: res.data[5].name,
          aa2: res.data[6].name,
          aa3: res.data[7].name,
          aa4: res.data[8].name,
          aa5: res.data[9].name,
          bb1: res.data[5].score,
          bb2: res.data[6].score,
          bb3: res.data[7].score,
          bb4: res.data[8].score,
          bb5: res.data[9].score
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