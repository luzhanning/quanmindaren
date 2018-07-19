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
    setInter: '',
    person: '',
    a:1,
    score: 0,
    seconds: 20,
    hit: app.globalData.people[app.globalData.index]
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
    innerAudioContext1.src = 'http://mp3.flash127.com/music/43521.mp3'
    
    
      innerAudioContext.src = 'http://mp3.flash127.com/music/43526.mp3'
      
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
    innerAudioContext1.play();
    
    innerAudioContext.obeyMuteSwitch = false;
    this.setData({
      score: 0
    })
    
    this.setData({
      hit: app.globalData.people[app.globalData.index],
      person: '../images/feifeifei.png'
    })

  },
 
  feifeifei:function(){
    innerAudioContext.stop();
    
    innerAudioContext.play();
    
    this.setData({
      score: this.data.score + 1
    })
    
  },
 
  laofei:function(){
    innerAudioContext2.stop();

    innerAudioContext2.play();
    this.setData({
      score: this.data.score + 1
    })

  },
  choose: function () {
    wx.navigateBack({ changed: true })
  },
  onReady: function () {
    
    var interval = setInterval(function () {
      this.setData({
        seconds: this.data.seconds - 1
      });
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