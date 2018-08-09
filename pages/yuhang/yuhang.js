// pages/love/love.js
var app = getApp();
var util = require('../../utils/util.js')
const innerAudioContext = wx.createInnerAudioContext()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    danmu:'',
    percent:0,
    circleColor: '',
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
      hit: app.globalData.people[app.globalData.index],
      array:['','','','','','','','','',''],
      i:0,
      name:''
    

      
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
 
  onLoad: function (options) {
    
    wx.getUserInfo({
      success: function (res) {
        name: res.userInfo.nickName
      }
    })
    console.log(this.data.name)
    innerAudioContext.obeyMuteSwitch=false;
   
    
    this.setData({
      score:0,
      circleColor: app.globalData.circleColor,
      danmu: app.globalData.danmu
    })
    
    if (app.globalData.people[app.globalData.index] == '于航'){
      
      
      this.setData({
        person: '../images/yuhang.png',
        person1: '../images/yuhang2.png',
     
        
      })
   

     innerAudioContext.src = 'https://www.beico.hk/audio/yuhang3.mp3'

    }
   
    this.setData({
      hit: app.globalData.people[app.globalData.index]
    })
    
  },

  onReady: function(){
    var that = this
    that.data.setInter1 = setInterval(function () {
      this.setData({
        seconds: this.data.seconds - 1
      });
      if(this.data.seconds==0){
      wx.getUserInfo({
        success: function (res) {
          wx.request({
            url: 'https://www.beico.hk/newScore',
            method: 'POST',
            data: util.json2Form({
              nickname: res.userInfo.nickName,
              score: that.data.score,
              type: "1"
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
          if (that.data.score >= 60) {
            wx.request({
              url: 'https://www.beico.hk/chuang',
              method: 'POST',
              data: util.json2Form({
                nickname: res.userInfo.nickName,
                jack: "1"

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
        }
      })
      
      }
    }.bind(this), 1000);
    var that = this;
    that.data.setInter = setInterval(function () {
      that.setData({
        a: that.data.a * (-1)

      });

    }.bind(this), 70)
    
  },
  onShow: function () {
  
  },
  choose: function () {
    wx.navigateBack({ changed: true })
  },
  onUnload: function () {
    
    var that = this;
    clearInterval(that.data.setInter)
    clearInterval(that.data.setInter1)
    
    
    
  },
  containerTap: function (res) {
    
   
  },
  
  click: function(res){
    innerAudioContext.stop();

    innerAudioContext.play();
    this.setData({
     
      score: this.data.score + 1
    });
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
   
      array: array1
    });
  },
  onShareAppMessage: function (res) {
    wx.getUserInfo({
      success: function (res) {
        wx.request({
          url: 'https://www.beico.hk/chuang',
          method: 'POST',
          data: util.json2Form({
            nickname: res.userInfo.nickName,
            jack: "1"

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
    if (res.from === 'button') {
      // 来自页面内转发按钮

    }
    return {
      title: '我打死了' + this.data.score + '个' + this.data.hit + ',快来看看',
      path: '/pages/index/index',
      imageUrl: this.data.image
    }
    
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
    var x = e.touches[0].pageX;
    var y = e.touches[0].pageY + 85;

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