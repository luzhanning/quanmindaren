// pages/choose/choose.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      people:app.globalData.people,
      index: app.globalData.index,
      person1:''
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  bindViewEvent: function (e) {
      getApp().globalData.index= e.detail.value;
      
      this.setData({
        index: app.globalData.index
      })
      if (app.globalData.people[app.globalData.index] == '于航') {


        this.setData({
          person1: '../images/yuhang.png',
         
        })
        

      }
      if (app.globalData.people[app.globalData.index] == 'Jack') {
        this.setData({
          person1: '../images/jack.png',
        })
       
      }
      if (app.globalData.people[app.globalData.index] == '飞飞飞') {
        this.setData({
          person1: '../images/feifeifei.png'
        })
      }
      if (app.globalData.people[app.globalData.index] == 'npc') {
        console.log("1")
        this.setData({
          person1: '../images/npc.png'
        })
      }
      if (app.globalData.people[app.globalData.index] == 'KOA') {
        this.setData({
          person1: ''
        })
      }
      this.setData({
        hit: app.globalData.people[app.globalData.index]
      })
      
    
  
  },
  toast: function () {
    
    wx.navigateTo({
      url: '../love/love'
    })
    
  },
  fei: function () {
    
    wx.navigateTo({
      url: '../fei/fei'
    })
  },
  jack: function () {

    wx.navigateTo({
      url: '../jack/jack'
    })
  },
  onLoad: function (options) {
    
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})