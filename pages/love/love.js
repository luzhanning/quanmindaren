// pages/love/love.js
var app = getApp();
var util = require('../../utils/util.js')
const innerAudioContext = wx.createInnerAudioContext()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    percent:0,
    setInter: '',
      person:'',
      person1:'',
      score:0,
      a:1,
      chessboardDatas: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 1, 0]
      ],
      seconds: 20,
      hit: app.globalData.people[app.globalData.index]

      
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
 
  onLoad: function (options) {
    
    
    innerAudioContext.obeyMuteSwitch=false;
   
    
    this.setData({
      score:0
    
    })
    
    if (app.globalData.people[app.globalData.index] == '于航'){
      
      
      this.setData({
        person: '../images/yuhang.png',
        person1: '../images/yuhang2.png',
     
        
      })
      innerAudioContext.src = 'http://stor.cloudmusics.cn/mp3/2018/07/76018340f748e7cd330f015a0104b397.mp3'
      
      
    }
   
    this.setData({
      hit: app.globalData.people[app.globalData.index]
    })
    
  },

  onReady: function(){
    
      

    var interval = setInterval(function () {
      this.setData({
        seconds: this.data.seconds - 1
      });
    }.bind(this), 1000);
    
    
  },
  onShow: function () {
    var that = this;
    that.data.setInter = setInterval(function () {
      that.setData({
        a: that.data.a * (-1)

      });

    }.bind(this), 70)
  },
  choose: function () {
    wx.navigateBack({ changed: true })
  },
  onUnload: function () {
    var that = this;
   
    clearInterval(that.data.setInter)
  },
  click: function(){
    innerAudioContext.stop();

    innerAudioContext.play();
    this.setData({
     
      score: this.data.score + 1
    });
  },
  clickon: function (e) {
   
    innerAudioContext.stop();
    innerAudioContext.play();
   
    
    var array = this.data.chessboardDatas;
    array[e.currentTarget.dataset.x][e.currentTarget.dataset.y]=0;
    
    var num = util.getRandomNum(0, 11);
    this.setChessboardCellNum(array, num, 1);
    this.setData({
      percent: this.data.percent+100/20,
      chessboardDatas: array,
      score: this.data.score + 1
    });
    
    
    
    
    
    
  
  },
  reset: function () {
    var chessDefaultDatas = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];

      var num = util.getRandomNum(0, 11);
      this.setChessboardCellNum(chessDefaultDatas, num, 1);
     
    this.setData({
      chessboardDatas: chessDefaultDatas,
      score: 0,
      seconds: 20,
      percent:0
    });
  },

  setChessboardCellNum: function (array, index, num) {
    var loopCount = 0;
    for (var i = 0; i < array.length; i++) {
      for (var j = 0; j < array[i].length; j++) {
        if (index == loopCount++) {
          array[i][j] = num;
        }
      }
    }
  }
  
})