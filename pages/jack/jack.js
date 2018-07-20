// pages/love/love.js
var app = getApp();
var util = require('../../utils/util.js')
const innerAudioContext = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    a:1,
    setInter: '',
    percent: 70,
    person: '',
    person1: '',
    score: 0,
    second:0,
    chessboardDatas: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 1, 0]
    ],
    
    hit: app.globalData.people[app.globalData.index],
    i:0


  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {

    innerAudioContext.obeyMuteSwitch = false;

    this.setData({
      score: 0,
      second:0
    })

    if (app.globalData.people[app.globalData.index] == 'Jack') {
      this.setData({
        person: '../images/jack.png',
        person1: '../images/jack2.jpg',
      
      })
      innerAudioContext.src = 'http://stor.cloudmusics.cn/mp3/2018/07/96f8963c66ce8c4753cf250db5aaa2d4.mp3'

    }
 
    this.setData({
      hit: app.globalData.people[app.globalData.index]
    })

  },

  onReady: function () {
   
    
    
    var interval = setInterval(function () {
      if (this.data.second<3){
        this.setData({
         i: 5
        });
      }
      else if (this.data.second<8){
        this.setData({
          i: 8
        });
      }
      else if (this.data.second < 12 ){
        this.setData({
          i: 13
        });
      }
      else{
        this.setData({
          i: 15
        });
      }
      this.setData({
        percent: this.data.percent - this.data.i,
        second:this.data.second + 1
      });
    }.bind(this), 1000);
    
   
    
    

  },

  choose: function () {
    wx.navigateBack({ changed: true })
  },
  click: function () {
    innerAudioContext.stop();


    innerAudioContext.play();
    this.setData({
      percent: this.data.percent + 0.5,
      score: this.data.score + 1
    });
  },
  clickon: function (e) {


    innerAudioContext.stop();
    innerAudioContext.play();


    var array = this.data.chessboardDatas;
    array[e.currentTarget.dataset.x][e.currentTarget.dataset.y] = 0;


    var num = util.getRandomNum(0, 11);
    this.setChessboardCellNum(array, num, 1);
    this.setData({
      percent: this.data.percent + 100 / 20,
      chessboardDatas: array,
      score: this.data.score + 1
    });


  },
  onShow: function(){
    var that = this;
    that.data.setInter = setInterval(function () {
      that.setData({
        a: that.data.a * (-1)

      });

    }.bind(this), 70)
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
      second: 0,
      percent: 70
    });
  },
  onUnload: function () {
    var that = this;
    
    clearInterval(that.data.setInter)
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