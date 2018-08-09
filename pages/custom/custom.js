// pages/love/love.js
var app = getApp();
var util = require('../../utils/util.js')
const innerAudioContext = wx.createInnerAudioContext()
var context = wx.createCanvasContext('share')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    danmu: app.globalData.danmu,
    array: ['', '', '', '', '', '', '', '', '', ''],
    j: 0,
    a: 1,
    setInter: '',
    setInter2: '',
    setInter3: '',
    circleColor: '',
    percent: 100,
    person: '',
    person1: '',
    score: 0,
    second: 0,
    chessboardDatas: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 1, 0]
    ],
    big: 0,
    hit: app.globalData.mingzi,
    i: 0,
    image: app.globalData.image,


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    
    }
    return {
      title: '我打死了'+this.data.score+'个'+this.data.hit+',快来看看',
      path: '/pages/index/index',
      imageUrl: this.data.image
          }
  },
    

  onLoad: function (options) {

    innerAudioContext.obeyMuteSwitch = false;
    
    this.setData({
      score: 0,
      second: 0,
      circleColor: app.globalData.circleColor,
      danmu: app.globalData.danmu,
      image: app.globalData.image,
      hit: app.globalData.mingzi
    })
    
    if (app.globalData.image==''){
      this.setData({
       
        image: app.globalData.userInfo.avatarUrl
        
      })
    }

    
  
    innerAudioContext.src = 'https://www.beico.hk/audio/fei8.mp3' 
          
    
   
  },

  onReady: function () {
    
  
    context.rect(0, 0, 375, 275)
    context.stroke()
    context.draw(false, this.getTempFilePath)
    var that = this;
    that.data.setInter = setInterval(function () {
      that.setData({
        a: that.data.a * (-1)

      });

    }.bind(this), 70)
    that.data.setInter2 = setInterval(function () {
      if (that.data.big % 3 == 1) {
        var chessDefaultDatas = [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ];

        var num = util.getRandomNum(0, 11);
        this.setChessboardCellNum(chessDefaultDatas, num, 1);
        that.setData({

          chessboardDatas: chessDefaultDatas
        });
      }
      that.setData({
        big: that.data.big + 1,
      });

    }.bind(this), 1500)

    that.data.setInter3= setInterval(function () {
      if (this.data.second < 3) {
        this.setData({
          i: 7
        });
      }
      else if (this.data.second < 8) {
        this.setData({
          i: 10
        });
      }
      else if (this.data.second < 12) {
        this.setData({
          i: 13
        });
      }
      else if (this.data.second < 15) {
        this.setData({
          i: 15
        });
      }
      else if (this.data.second < 16) {
        this.setData({
          i: 17
        });
      }
      else if (this.data.second < 19) {
        this.setData({
          i: 19
        });
      }
      else if (this.data.second < 22) {
        this.setData({
          i: 21
        });
      }
      else if (this.data.second < 30) {
        this.setData({
          i: 23
        });
      }

      this.setData({
        percent: this.data.percent - this.data.i,
        second: this.data.second + 1
      });
      if (this.data.percent==0){
        var that = this
        var score1 = this.data.score
        wx.getUserInfo({
          success: function (res) {
            wx.request({
              url: 'https://www.beico.hk/newCustom',
              method: 'POST',
              data: util.json2Form({
                nickname: res.userInfo.nickName,
                score: score1,
                name: that.data.hit
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
  },
  containerTap: function (res) {

   
  },
  choose: function () {
    wx.navigateBack({ changed: true })
  },
  click: function (res) {
    innerAudioContext.stop();
    innerAudioContext.play();
    if (this.data.percent < 100) {
      this.setData({
        percent: this.data.percent + 2.5,
      });
    }
    this.setData({
      score: this.data.score + 1
    });
    var x = res.touches[0].pageX;
    var y = res.touches[0].pageY + 85;

    var array1 = this.data.array;
    array1[this.data.j] = 'top:' + y + 'px;left:' + x + 'px;'
    if (this.data.j != 50) {
      this.setData({
        j: this.data.j + 1
      });
    }
    else {
      this.setData({
        j: 0
      });
    }
    this.setData({
      array: array1
    });
  },
  clickon: function (e) {


    innerAudioContext.stop();
    innerAudioContext.play();


    var array = this.data.chessboardDatas;
    array[e.currentTarget.dataset.x][e.currentTarget.dataset.y] = 0;


    var num = util.getRandomNum(0, 11);
    this.setChessboardCellNum(array, num, 1);
    if (this.data.percent < 100) {
      this.setData({
        percent: this.data.percent + 100 / 20,
      });
    }
    this.setData({
      percent: this.data.percent + 100 / 20,
      chessboardDatas: array,
      score: this.data.score + 1
    });
    var x = e.touches[0].pageX;
    var y = e.touches[0].pageY + 85;

    var array1 = this.data.array;
    array1[this.data.j] = 'top:' + y + 'px;left:' + x + 'px;'
    if (this.data.j != 50) {
      this.setData({
        j: this.data.j + 1
      });
    }
    else {
      this.setData({
        j: 0
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
  onShow: function () {
    

  },
  onHide: function(){
   
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
    var that = this
    var score1 = this.data.score
    

    this.setData({
      chessboardDatas: chessDefaultDatas,
      score: 0,
      second: 0,
      percent: 100
    });
   
  },
  onUnload: function () {
    var that = this;

    clearInterval(that.data.setInter)
    clearInterval(that.data.setInter2)
    clearInterval(that.data.setInter3)
   
   
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
  },
  getTempFilePath: function () {
    wx.canvasToTempFilePath({
      canvasId: 'share',
      success: (res) => {
        this.setData({
          shareTempFilePath: res.tempFilePath
        })
      }
    })
  },
  saveImageToPhotosAlbum: function () {
    if (!this.data.shareTempFilePath) {
      wx.showModal({
        title: '提示',
        content: '图片绘制中，请稍后重试',
        showCancel: false
      })
    }
    context.drawImage('../images/dead.png', 100, 0, 170, 145)
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareTempFilePath,
      success: (res) => {
        console.log(res)
      },
      fail: (err) => {
        console.log(err)
      }
    })
  }

})