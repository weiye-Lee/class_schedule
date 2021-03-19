Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  parseFile: function () {
    const xlsx = require('node-xlsx')
    // var obj= xlsx.parse('‪E:\迅雷谷歌下载\0-附件1：2020-2021-2通识教育网络课程.xls')
    // console.log(obj)

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.cloud.callFunction({
      name: 'parse',
      data: {
        fileID:"cloud://liweiye-dd1c64.6c69-liweiye-dd1c64-1258735017/excel_storage/学生个人课表_2018214185 (1).xls"
      },
      success: function (res) {
        console.log("succ");
        console.log(res);
      },
      fail: function (res) {
        console.log('err');
        console.log(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.cloud.callFunction({
    //   // 云函数名称
    //   name: 'test',
    //   success: function (res) {
    //     console.log(res.result.test01);
    //   },
    //   fail: console.error
    // })
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