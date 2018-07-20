// pages/love/love.js
var app = getApp();
var util = require('../../utils/util.js')
const innerAudioContext = wx.createInnerAudioContext()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    percent: 0,
    setInter: '',
    setInter1: '',
    setInter2: '',
    person: '',
    person1: '',
    score: 0,
    a: 1,
    chessboardDatas: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 1, 0]
    ],
    seconds: 25,
    hit: app.globalData.people[app.globalData.index]



  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {


    innerAudioContext.obeyMuteSwitch = false;


    this.setData({
      score: 0

    })

    if (app.globalData.people[app.globalData.index] == 'npc') {

      this.setData({
        person: '../images/npc.png'
       
      })


    }

    this.setData({
      hit: app.globalData.people[app.globalData.index]
    })

  },

  onReady: function () {
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
    
    that.data.setInter1 = setInterval(function () {
      if (that.data.score < 20) {
      var array = that.data.chessboardDatas
      that.swtichArray(array);
      that.setData({
        chessboardDatas: array

      });
     
      }
     
    }.bind(this), 500)
    
     
    that.data.setInter2 = setInterval(function () {
      if (that.data.score >= 20) {
        var array = that.data.chessboardDatas
        that.swtichArray1(array);
        that.setData({
          chessboardDatas: array

        });
        }
      }.bind(this), 300)
    

  },
  swtichArray: function(array){
    var loopcount = 0
    for (var i = 0; i < array.length; i++) {
      for (var j = 0; j < array[i].length; j++) {
        if (array[i][j] == 1) {
          array[i][j] =0
          loopcount++
        }
        
      }
    }
    var num = util.getRandomNum(0, 11)
    while (num == loopcount){
      var num = util.getRandomNum(0, 11)
    }
    this.setChessboardCellNum(array, num, 1);
  },
  swtichArray1: function (array) {
    
    var num = util.getRandomNum(0, 11)
    this.setChessboardCellNum(array, num, 1);
    var num = util.getRandomNum(0, 11)
    this.setChessboardCellNum(array, num, 1);
    var num = util.getRandomNum(0, 11)
    this.setChessboardCellNum(array, num, 1);
    var num = util.getRandomNum(0, 11)
    this.setChessboardCellNum(array, num, 0);
    var num = util.getRandomNum(0, 11)
    this.setChessboardCellNum(array, num, 0);
    var num = util.getRandomNum(0, 11)
    this.setChessboardCellNum(array, num, 0);
  },
  choose: function () {
    wx.navigateBack({ changed: true })
  },
  onUnload: function () {
    var that = this;

    clearInterval(that.data.setInter)
    clearInterval(that.data.setInter1)
    clearInterval(that.data.setInter2)
  },
  click: function (e) {
    var array = this.data.chessboardDatas;
    array[e.currentTarget.dataset.x][e.currentTarget.dataset.y] = 0;
    var num3 = util.getRandomNum(0, 11);
    var num2 = util.getRandomNum(0, 11);
    var num1 = util.getRandomNum(0, 11);
    this.setChessboardCellNum(array, num3, 1);
    this.setChessboardCellNum(array, num2, 1);
    this.setChessboardCellNum(array, num1, 1);
    this.setData({
      chessboardDatas: array,
      score: this.data.score + 1
    });
  },
  clickon: function (e) {

    var array = this.data.chessboardDatas;
    array[e.currentTarget.dataset.x][e.currentTarget.dataset.y] = 0;

    var num2 = util.getRandomNum(0, 11);
    
    this.setChessboardCellNum(array, num2, 1);
    this.setData({
      percent: this.data.percent + 100 / 20,
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
      percent: 0
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