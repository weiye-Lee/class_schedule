// pages/index/index.js
import excel from 'xlsx'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileID: null
  },
  choosefile: function () {
    var that = this;
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        let path = res.tempFiles[0].path;
        console.log(res);
        that.uploadFile(res)
      // that.parseFile(path)
      }
    })
  },
  uploadFile: function (path) {
    var that = this;
    wx.cloud.uploadFile({
      filePath: path.tempFiles[0].path,
      cloudPath: "excel_storage/" + path.tempFiles[0].name,
      success(res) {
        console.log(res)
        that.downloadFile(res)
      },
      fail(res) {
        console.log(res);
      }
    })
  },
  downloadFile: function (path) {
    var that = this;
    wx.cloud.downloadFile({
      fileID: path.fileID,
      success(res) {
        console.log(res);
        that.parseFile(res.tempFilePath)
      }
    })
  },
  parseFile: function (path) {
    console.log(path);
    var workbook = excel.readFile(path)
    console.log(workbook);
    var first = workbook.SheetNames[0]
    console.log(first);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.downloadFile({

    })
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