// pages/p3/p3.js
var lati;
var loti;
var result=[''];
var app = getApp();
//var shktime = app.globalData.shktime;
Page({
  /**
   * 页面的初始数据
   */
  data: {
      selections:[''],
      inputTX:'',//添加框的文字
      srcTx:'',//搜索框的文字
      mode:0,  //控制显示模式
      iffocus:false, //输入框聚焦
      w:0,
      h:0,
      tip:0,
      ifinput:false,
  },

  //
  //添加选项的处理
  //
  formSubmit: function (e) {     
    var temp = this.data.selections;
    //console.log('form发生了submit事件，携带数据为：', e.detail.value);
    if((e.detail.value!='')&&(e.detail.value.length<=10)){
      //console.log(e.detail.value.length);
      temp.push(e.detail.value);
      if(!wx.getStorageSync('dType')){
        wx.setStorageSync('choices', temp);
      }
      else{
        wx.setStorageSync('takeaway', temp);
      }
      this.setData({
        selections: temp,
      })
    }
    this.setData({
      inputTx: "",
      ifinput: false,
    })
  },

  //
  //清空列表
  //
  formReset: function () {      
  //waring!!!!
    //console.log('form发生了reset事件')
    var str = [];
    this.setData({
      selections:str
    })
    wx.setStorageSync('choices', str);
  },

  //
  //重置外卖类别选项
  //
  truereset: function(){    
      //warning
      //refill with 外卖类别
      var str = ['简餐便当','小吃炸串','面食粥点','香锅冒菜','汉堡批萨','日韩料理','甜品饮品'];
      wx.setStorageSync('takeaway', str);
      this.setData({
        selections:str,
      })
  },

  //
  //删除列表项
  //
  testrpx: function (e) {    
    var i =0;
    var l = this.data.selections.length;
    var that = this;
    var start;
    var end;
    var listheight;
    var itemheight;
    var obj={};
    wx.createSelectorQuery().select('.form').boundingClientRect(function (rect) {
      //console.log(rect);
      start = rect.top;
      //console.log("ttt  "+start); //用form组件和input组件的差值即可
    }).exec();

    wx.createSelectorQuery().select('.section').boundingClientRect(function (rect) {
      //console.log(rect);
      end = rect.top;
      listheight = end - start;
      itemheight = listheight / l;
      //console.log(start + "****" + itemheight);
      //console.log("touch  " + e.touches[0].clientY);
      i = (e.touches[0].clientY - start) / itemheight;
      //console.log("res:  " + that.data.selections[Math.floor(i)]);
      obj = {
        title: '删除"' + that.data.selections[Math.floor(i)] + '"?',
        content: '该操作不可撤消',
        confirmText: '删除',
        confirmColor: '#ff0000',
        success: function (res) {
          if (res.confirm) {
            var dlItem = that.data.selections;
            dlItem.splice(Math.floor(i), 1);
            that.setData({
              selections: dlItem,
            })
            if (that.data.mode == 0) {
              wx.setStorageSync('choices', dlItem);
            }
            else {
              wx.setStorageSync('takeaway', dlItem);
            }
          }
        }
      }
      wx.showModal(obj);
    }).exec();
    //shktime = 0;
  },

  //
  //搜索框搜索API
  //
  searchMap: function(e){
    var that = this;
    var temp = '';
    //console.log(e.detail.value||e.currentTarget.dataset.txt);
    var str = e.detail.value || e.currentTarget.dataset.txt;
    wx.setStorageSync('crt', str);
    this.setData({
      srcTx: str,
    })
    wx.request({
      url: 'https://restapi.amap.com/v3/place/around?',
      data:{
        key:'a4f07d8dcb1a066935ae74ee5837ada0',
        location:loti+','+lati,
        keywords:str,
        offset:10,
      },
      success: function(res){
        for(var i=0;i<10;i++){
          temp = res.data.pois[i].name;
          if(temp.indexOf('(')>0){   //有括号
            result[i] = temp.slice(0,temp.indexOf("("));
          }
          else{
            result[i] = temp.slice(0,14);
          }
        }
        wx.setStorageSync('choices', result);
        that.setData({
          selections: result,
        })
      }
    });
    this.setData({
      tip: 0,
    });
    app.globalData.shktime = 0;
    //console.log(pois);
  },

  //
  //弹出提示建议
  //
  ontip: function(){    
    this.setData({
      tip: 1,
    });
  },

  //
  //关掉提示建议
  //
  offtip: function(){   
    this.setData({
      tip:0,
    });
  },

  //
  //增加选项
  //
  addfn: function(){   
    this.setData({
      ifinput: true,
      iffocus: true,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          w: res.windowWidth,
          h: res.windowHeight,
        });
      },
    });
    wx.setNavigationBarTitle({
      title: '编辑列表',
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
    if (!wx.getStorageSync('dType')) {
      this.setData({
        mode: 0,
        selections: wx.getStorageSync('choices'),
      });
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          lati = res.latitude;
          loti = res.longitude;
        },
      });
    }
    else {
      this.setData({
        mode: 1,
        selections: wx.getStorageSync('takeaway'),
      });
    }
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