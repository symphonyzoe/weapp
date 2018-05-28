//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '吃啥？',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    w:0,
    h:0,
    animationData: {},
    deliurl: "../index/img/dlvery_ori.png",
    resturl: "../index/img/restrt_ori.png",
  },
  //事件处理函数

  jumpP1: function() {
    
    this.setData({
      deliurl: "../index/img/dlvery_tchd.png",
    });
    wx.navigateTo({
      url: '../p1/p1',
    });
    
  },
  jumpP2:function(){
    this.setData({
      resturl: "../index/img/restrt_tchd.png",
    });
    wx.navigateTo({
      url: '../p2/p2',
    });
  },

  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          w: res.windowWidth,
          h: res.windowHeight,
        });
      },
    });
  },

  onShow: function(){
    this.setData({
      deliurl: "../index/img/dlvery_ori.png",
      resturl: "../index/img/restrt_ori.png",
    });
  },
})
