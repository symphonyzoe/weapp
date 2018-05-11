// pages/p1/p1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selections:[''],    //选项集
    animationData: {},  //动画1
    animationData2: {}, //动画2
    animationData3:{},  //动画3
    i: 0,               //随机数
    inx: 0,             //选项列表长度
    //current: '',        //当前类目
  },

  //
  //进入编辑选项
  //
  editOptions:function(){
    wx.setStorageSync('dType', 1);
    wx.navigateTo({
      url: '../p3/p3',
    });
  },
  //
  //设置随机数
  //
  randomC: function(){
    var y = Math.floor(Math.random() * this.data.inx);
    console.log(y);
    this.setData({
      i: y,
    });
    //动画
    var animation = wx.createAnimation({
      duration: 80,
      timingFunction: 'ease-in-out',
      transformOrigin: '50% 50% 0',
      opacity: 0.8
    });
    var animation2 = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease-out',
      transformOrigin: '50% 50% 0',
      opacity: 0.8,
    });
    var animation3 = wx.createAnimation({
      duration: 50,
      timingFunction: 'ease',
      transformOrigin: '50% 50% 0',
    });
    this.animation = animation;
    animation3.translateY(0).scale(0.5,0.5).step();
    animation.rotate(-10).step();
    animation.rotate(0).translateY(-20).step();
    animation2.translateX(-40).translateY(-10).step();
    animation3.translateY(-150).scale(2,2).step();
    animation.rotate(10).translateY(20).step();
    animation2.translateX(-100).translateY(60).step();
    animation.rotate(0).step();
    this.setData({
      animationData:this.animation.export(),
    });
    this.animation = animation2;
    this.setData({
      animationData2:this.animation.export(),
    });
    this.animation = animation3;
    this.setData({
      animationData3:this.animation.export(),
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //设置页标题
    wx.setNavigationBarTitle({
      title: '叫外卖',
    });
    //首次使用的初始化
    var slctions=[''];
    slctions = (wx.getStorageSync('takeaway')|| ['简餐便当', '小吃炸串', '面食粥点', '香锅冒菜', '汉堡批萨', '日韩料理', '甜品饮品']);
    wx.setStorageSync('takeaway', slctions);
    this.setData({
      selections:slctions,
      inx:slctions.length,
    });

    
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
      selections: wx.getStorageSync('takeaway'),
      inx:wx.getStorageSync('takeaway').length,
    });
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