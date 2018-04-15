// pages/p3/p3.js
var lati
var loti
var result=['']
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
  },
  formSubmit: function (e) {     //添加选项的处理
    var temp = this.data.selections
    this.setData({
      iffocus:true,
    })
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if((e.detail.value.input!='')&&(e.detail.value.input.length<=10)){
      console.log(e.detail.value.input.length)
      temp.push(e.detail.value.input)
      if(!wx.getStorageSync('dType')){
        wx.setStorageSync('choices', temp)
      }
      else{
        wx.setStorageSync('takeaway', temp)
      }
      this.setData({
        selections: temp
      })
    }
    this.setData({
      inputTx:''
    })
    
  },
  formReset: function () {      //清空列表
  //waring!!!!
    console.log('form发生了reset事件')
    var str = []
    this.setData({
      selections:str
    })
    wx.setStorageSync('choices', str)
  },

  truereset: function(){    //重置外卖类别选项
      //warning
      //refill with 外卖类别
      var str = ['简餐便当','小吃炸串','面食粥点','香锅冒菜','汉堡批萨','日韩料理','甜品饮品']
      wx.setStorageSync('takeaway', str)
      this.setData({
        selections:str
      })
  },

  testrpx: function (e) {    //删除列表项
    var i =0;
    var l = this.data.selections.length;
    var that = this;
    var start;
    var end;
    var listheight;
    var itemheight;
    wx.createSelectorQuery().select('.form').boundingClientRect(function (rect) {
      start = rect.top
      //console.log("ttt  "+start) //用form组件和input组件的差值即可
    }).exec()
    wx.createSelectorQuery().select('.form>.section').boundingClientRect(function (rect) {
      end = rect.top
      listheight = end - start;
      itemheight = listheight / l;
      console.log(start + "****" + itemheight)
      console.log("touch  " + e.touches[0].clientY)
      i = (e.touches[0].clientY - start) / itemheight;
      console.log("res:  " + that.data.selections[Math.floor(i)]) 
    }).exec()
    wx.showModal({
      title: '确认删除？',
      content: '该操作不可撤消',
      confirmText:'删除',
      confirmColor:'#ff0000',
      success:function(res){
        if(res.confirm)
          {                    

              var dlItem = that.data.selections
              dlItem.splice(Math.floor(i), 1)
              that.setData({
                selections: dlItem
              })
              if(that.data.mode==0){
                wx.setStorageSync('choices', dlItem)
              }
              else{
                wx.setStorageSync('takeaway', dlItem)
              }
              


          }
      }
    })
    
  },

  searchMap: function(e){
    var that = this
    var temp=''
    //console.log(e.detail.value||e.currentTarget.dataset.txt)
    var str = e.detail.value || e.currentTarget.dataset.txt
    wx.setStorageSync('crt', str)
    this.setData({
      srcTx: str
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
          temp = res.data.pois[i].name
          if(temp.indexOf('(')>0){   //有括号
            result[i] = temp.slice(0,temp.indexOf("("))
          }
          else{
            result[i] = temp
          }
        }
        wx.setStorageSync('choices', result)
        that.setData({
          selections: result
        })
      }
    })

    
    //console.log(pois)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '编辑列表',
    })
    var temp=['']

    if(!wx.getStorageSync('dType'))
    {
      this.setData({
        mode:0,
        selections: wx.getStorageSync('choices'),
      })
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          lati = res.latitude
          loti = res.longitude
        },
      })
    }
    else{
      this.setData({
        mode:1,
        selections:wx.getStorageSync('takeaway'),
      })
    }
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        lati = res.latitude
        loti = res.longitude
      },
    })
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