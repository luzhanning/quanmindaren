// pages/choose/choose.js
var app = getApp();
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      people:app.globalData.people,
      index: app.globalData.index,
      person1:'',
      circle:58,
      circleColor:'',
      source:'',
      image:'',
      npc:0,
      feifeifei:0,
      jack:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  bindViewEvent: function (e) {
      getApp().globalData.index= e.detail.value;
      
      this.setData({
        index: app.globalData.index
      })
      if (app.globalData.index==0) {


        this.setData({
          person1: '',

        })


      }
    if (app.globalData.people[app.globalData.index] =='于航') {


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
  toast: function () {
    
    wx.navigateTo({
      url: '../yuhang/yuhang'
    })
    
  },
  fei: function () {
    
    wx.navigateTo({
      url: '../fei/fei'
    })
  },

  circle1: function (){
    this.setData({
      circle:58
    })
    app.globalData.circleColor = "#EE6363"
    this.setData({
      circleColor: app.globalData.circleColor
    })
  },
  circle2: function () {
    this.setData({
      circle: 137
    })
    app.globalData.circleColor = "black"
    this.setData({
      circleColor: app.globalData.circleColor
    })
    
  },
  circle3: function () {
    this.setData({
      circle: 211
    })
    app.globalData.circleColor = "#5f9ea0"
    this.setData({
      circleColor: app.globalData.circleColor
    })
  },
  circle4: function () {
    this.setData({
      circle: 286
    })
    app.globalData.circleColor = "#8b5a00"
    this.setData({
      circleColor: app.globalData.circleColor
    })
  },
  danmu: function(e){
    app.globalData.danmu = e.detail.value
  },
  mingzi: function (e) {
    app.globalData.mingzi = e.detail.value
  },
  jack: function () {

    wx.navigateTo({
      url: '../jack/jack'
    })
  },
  custom: function () {

    wx.navigateTo({
      url: '../custom/custom'
    })
  },
  npc: function () {

    wx.navigateTo({
      url: '../npc/npc'
    })
  },
  onLoad: function (options) {
    this.setData({
      circleColor:app.globalData.circleColor,
      index: app.globalData.index
    })
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    wx.getUserInfo({
      success: function (res) {
        wx.request({
          url: 'https://www.beico.hk/chuangguan?nickname=' + res.userInfo.nickName,
          method: 'GET',

          success: function (res) {
            // success
            console.log(res.data)
            that.setData({
              feifeifei: res.data.feifeifei,
              jack: res.data.jack,
              npc: res.data.npc
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
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮

    }
    return {
      title: '三亿人都在玩的打人游戏，快来看看',
      path: '/pages/index/index'
     
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.getUserInfo({
      success: function (res) {
        wx.request({
          url: 'https://www.beico.hk/chuangguan?nickname=' + res.userInfo.nickName,
          method: 'GET',

          success: function (res) {
            // success
            console.log(res.data)
            that.setData({
              feifeifei: res.data.feifeifei,
              jack: res.data.jack,
              npc: res.data.npc
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

  listenerButtonChooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      //original原图，compressed压缩图
      sizeType: ['original'],
      //album来源相册 camera相机 
      sourceType: ['album', 'camera'],
      //成功时会回调
      success: function (res) {
        //重绘视图
        that.setData({
          image: res.tempFilePaths

        })
        app.globalData.image = res.tempFilePaths
      }
    })
  }

})