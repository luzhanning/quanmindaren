// pages/love/love.js
var app = getApp();
var util = require('../../utils/util.js')
const innerAudioContext = wx.createInnerAudioContext()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['', '', '', '', '', '', '', '', '', ''],
    i: 0,
    danmu: app.globalData.danmu,
    percent: 0,
    circleColor: '',
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
      score: 0,
      circleColor: app.globalData.circleColor,
      danmu: app.globalData.danmu
    })

    if (app.globalData.people[app.globalData.index] == 'npc') {

      this.setData({
        person: '../images/npc.png'

      })
      innerAudioContext.src = 'https://www.beico.hk/audio/npc.mp3'

    }

    this.setData({
      hit: app.globalData.people[app.globalData.index]
    })

  },

  onReady: function () {
    var that = this;
    that.data.setInter4 = setInterval(function () {
      this.setData({
        seconds: this.data.seconds - 1
      });
      if(this.data.seconds<=0){
      wx.getUserInfo({
        success: function (res) {
          wx.request({
            url: 'https://www.beico.hk/newScore',
            method: 'POST',
            data: util.json2Form({
              nickname: res.userInfo.nickName,
              score: that.data.score,
              type: "4"
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

        }
      })
      
      }
    }.bind(this), 1000);
    
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

    }.bind(this), 400)


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
  onShow: function () {
    
    

  },
  containerTap: function (res) {
   
    var x = res.touches[0].pageX;
    var y = res.touches[0].pageY + 85;

    var array1 = this.data.array;
    array1[this.data.i] = 'top:' + y + 'px;left:' + x + 'px;'
    if (this.data.i != 50) {
      this.setData({
        i: this.data.i + 1
      });
    }
    else {
      this.setData({
        i: 0
      });
    }
    this.setData({
      rippleStyle: ''
    });
    this.setData({
      rippleStyle: 'top:' + y + 'px;left:' + x + 'px;-webkit-animation: ripple 0.3s linear;animation:ripple 0.3s linear;',
      array: array1
    });
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
    
    clearInterval(this.data.setInter)
    clearInterval(this.data.setInter1)
    clearInterval(this.data.setInter2)
    clearInterval(this.data.setInter4)
  },
  click: function (e) {
    innerAudioContext.stop();

    innerAudioContext.play();
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
    innerAudioContext.stop();

    innerAudioContext.play();
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
    clearInterval(this.data.setInter)
    clearInterval(this.data.setInter1)
    clearInterval(this.data.setInter2)
    var that = this;
    var score1 = this.data.score
    wx.getUserInfo({
      success: function (res) {
        wx.request({
          url: 'https://www.beico.hk/newScore',
          method: 'POST',
          data: util.json2Form({
            nickname: res.userInfo.nickName,
            score: score1,
            type: "4"
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

      }
    })
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

    }.bind(this), 400)


    that.data.setInter2 = setInterval(function () {
      if (that.data.score >= 20) {
        var array = that.data.chessboardDatas
        that.swtichArray1(array);
        that.setData({
          chessboardDatas: array

        });
      }
    }.bind(this), 300)
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