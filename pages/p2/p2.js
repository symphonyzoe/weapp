// pages/p2/p2.js
//QQMap API
var QQMapWX = require('../qqmap-wx-jssdk1.0/qqmap-wx-jssdk.js');
var qqmapsdk;
var slctions=['']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selections: [''],   //选项集
    animationData: {},  //动画1
    animationData2: {}, //动画2
    i:0,                //随机数
    inx:0,              //选项列表长度
    current:'',         //当前类目
  },

  deleteData: function(){
    wx:wx.removeStorageSync("choices")
  },
  tap: function(){
    console.log('tap')
  },
  reReqMapData: function(){
    var that = this
    qqmapsdk = new QQMapWX({
      key: 'ZNFBZ-RKXKK-ZDWJV-A566C-XKGVE-OBFCG'
    })
    qqmapsdk.search({
      keyword:'美食',
      page_size: 10,
      success: function (res) {
        console.log('新数据')
        for (var i = 0; i < 10; i++) {
          var t = res.data[i].title.indexOf('(')
          //console.log(res.data[i].title)
          if(t>0)
          {
            slctions[i] = res.data[i].title.slice(0,t)///截取出来不带括号的部分
          }
          else{
            slctions[i] = res.data[i].title
          }
          //console.log(slctions[i])
        }
        //console.log(slctions)
        wx.setStorage({
          key: 'choices',
          data: slctions
        })
        wx.setStorageSync("dType", 0)//0表示为饭馆页面进入
        console.log("数据已写入")  
        wx.setStorageSync('crt', '附近的美食')
        that.setData({
          selections: wx.getStorageSync('choices'),
          current:'附近的美食',
        })
      }
    })
    
  },
  //摇动抽签
  shake2Toll: function(){
    var y = Math.floor(Math.random()*this.data.inx)
    this.setData({
      i:y
    })
    //console.log(y)
    var animation = wx.createAnimation({
      duration: 80,
      timingFunction: 'ease-in-out',
      transformOrigin: '50% 50% 0',
      opacity: 0.8
    })
    var animation2 = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease-out',
      transformOrigin: '50% 50% 0',
      opacity: 0.8,
      delay:640
    })
    this.animation = animation
    animation.translateX(40).rotate(30).translateY(15).step()
    animation.translateX(0).rotate(0).translateY(0).step()
    animation.translateX(-40).rotate(-30).translateY(15).step()
    animation.translateX(0).rotate(0).translateY(0).step()
    animation.translateX(40).rotate(30).translateY(15).step()
    animation.translateX(0).rotate(0).translateY(0).step()
    animation.translateX(-40).rotate(-30).translateY(15).step()
    animation.translateX(0).rotate(0).translateY(0).step()
    /*
    wx.onAccelerometerChange(function (res) {
      if (res.x > 2 || res.y > 2) {
        console.log('shake')
        wx.stopAccelerometer({
          success: function () {
            console.log('stopped.')

          }
        })
      }
    })
    */
    this.setData({
      animationData: this.animation.export()
    })
    this.animation = animation2
    animation2.translateY(-180).scale(2,2).step()
    this.setData({
      animationData2: this.animation.export()
    })
    
  },

  removeTicket: function(){
    var animation = wx.createAnimation({
      duration: 70,
      timingFunction: 'ease-in-out',
      transformOrigin: '50% 50% 0',
      opacity: 0.8
    })
    animation.scale(0.5, 0.5).step()
    //animation.translateX(500).step()
    //animation.translateX(-500).step()
    
    this.animation = animation
    this.setData({
      animationData2:this.animation.export()
    })
  },

  editOptions: function(){
    wx.setStorageSync('dType', 0)//从美食进入
    wx.navigateTo({
      url: '../p3/p3',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    //设置页标题
    wx.setNavigationBarTitle({
      title: '吃饭馆',
    })
    
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'ZNFBZ-RKXKK-ZDWJV-A566C-XKGVE-OBFCG'
    })
    var that = this
    slctions = wx.getStorageSync('choices') || []//empty or saved value
    this.setData({
      current:(wx.getStorageSync('crt')||'附近的美食')
    })
    if (slctions.length == 0)    //添加基于地理位置的选项
    {
      qqmapsdk.search({
        keyword: '美食',
        page_size: 10,
        success: function (res) {
          console.log('新数据')
          for(var i=0;i<10;i++){
            slctions[i] = res.data[i].title
          }
          //console.log(slctions)
          wx.setStorage({
            key: 'choices',
            data: slctions
          })
          //console.log("数据已写入")
          that.setData({
            selections: wx.getStorageSync('choices'),
            inx: slctions.length
          })
        }
      })
    }

    
    console.log('赋值')
    

    
    
    const ctx = wx.createCanvasContext('myC1')


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      selections: wx.getStorageSync('choices'),
      inx: wx.getStorageSync('choices').length,
      current: (wx.getStorageSync('crt') || '附近的美食')
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
  onShareAppMessage: function () {
  
  }
})