// pages/love/love.js
var app = getApp();
var util = require('../../utils/util.js')
const innerAudioContext = wx.createInnerAudioContext()
const innerAudioContext1 = wx.createInnerAudioContext()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    danmu: app.globalData.danmu,
    array: ['', '', '', '', '', '', '', '', '', ''],
    i: 0,
    setInter: '',
    person: '',
    a:1,
    score: 0,
    seconds: 20,
    hit: app.globalData.people[app.globalData.index],
    circleColor:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(){
    var that = this;
    that.data.setInter = setInterval(function () {
      that.setData({
          a:that.data.a*-1
      });
     
    }.bind(this), 70)
  },
  onLoad: function (options) {
    innerAudioContext1.src = 'https://www.beico.hk/audio/fei.mp3'
    innerAudioContext.src = 'https://www.beico.hk/audio/f3.mp3'
    innerAudioContext1.play();
    innerAudioContext.obeyMuteSwitch = false;
    this.setData({
      score: 0,
      circleColor:app.globalData.circleColor,
      danmu: app.globalData.danmu
    })
    
    this.setData({
      hit: app.globalData.people[app.globalData.index],
      person: '../images/feifeifei.png'
    })

  },
  containerTap: function (res) {
    
  },
  feifeifei:function(res){
    innerAudioContext.stop();
    innerAudioContext.play();
    if(this.data.seconds>0){
    this.setData({
      score: this.data.score + 1
    })
    } 
    
  },
 
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮

    }
    return {
      title: '我打死了' + this.data.score + '个' + this.data.hit + ',快来看看',
      path: '/pages/index/index',
      imageUrl: this.data.image
    }
  },
  choose: function () {
    wx.navigateBack({ changed: true })
  },
  onReady: function () {
    var that = this
    that.data.setInter = setInterval(function () {
      this.setData({
        seconds: this.data.seconds - 1
      });
      if (this.data.seconds == 0) {
        var that = this
        var score1 = this.data.score
        wx.getUserInfo({
          success: function (res) {
            wx.request({
              url: 'https://www.beico.hk/newScore',
              method: 'POST',
              data: util.json2Form({
                nickname: res.userInfo.nickName,
                score: score1,
                type: "3"
              }),
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success: function (res) {
                // success


              },
              fail: function () {
                // fail
              },
              complete: function () {
                // complete
              }
            })
            if (score1 >= 140) {
              wx.request({
                url: 'https://www.beico.hk/chuang',
                method: 'POST',
                data: util.json2Form({
                  nickname: res.userInfo.nickName,
                  npc: "1"

                }),
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                success: function (res) {
                  // success
                  console.log(res)

                },
                fail: function () {
                  // fail
                },
                complete: function () {
                  // complete
                }
              })
            }
          }
        })

      }
    }.bind(this), 1000);

  },
  onUnload: function () {
    var that = this;
    
    clearInterval(that.data.setInter)
  innerAudioContext1.stop();
  },
  
  reset: function () {
    
    this.setData({
      score: 0,
      seconds: 20
    });
  },
 

})