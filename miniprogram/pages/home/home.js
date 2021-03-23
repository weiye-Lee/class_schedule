// pages/home/home.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: ""
  },
  uploadExcel: function () {
    var that = this
    var uuid = this.getuuid()
    console.log(uuid)
    wx.chooseMessageFile({
      count: 1,
      type: "file",
      success: function (res) {
        console.log(res);
        wx.cloud.uploadFile({
          filePath: res.tempFiles[0].path,
          cloudPath: "excel_storage/" + uuid + ".xls",
          success: function (res) {
            wx.cloud.getTempFileURL({
              fileList: [{
                fileID: res.fileID
              }],
              success: function (res) {
                console.log(res.fileList[0].fileID);
                that.parseFile(res.fileList[0].fileID)
              },
              fail: function (res) {
                console.log(res)
              }
            })
          },
          fail: function (res) {
            console.log(res);
          }
        })
      }
    })
  },
  parseFile: function (fileId) {
    console.log("执行云函数解析");
    console.log(fileId)
    var that = this;
    wx.cloud.callFunction({
      name: 'parse',
      data: {
        fileID: fileId
      },
      success: function (res) {
        console.log("succ");
        console.log(res);
        that.navTo();

      },
      fail: function (res) {
        console.log('err');
        console.log(res);
      }
    })

  },
  getuuid: function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    })
  },
  navTo: function() {
    var that = this
    const db = wx.cloud.database();
    db.collection ("courses").where({
      // openId: that.openId
      openId: that.data.openid
    }).get({
      success: function (res) {
        console.log(res.data[0]);
        app.globalData.coursesList = res.data[0].allCourse,
        app.globalData.remark = res.data[0].remark,
        // app.globalData.week = 18,
        app.globalData.openid = res.data[0].openId
        app.globalData.week = parseInt( res.data[0].week + (Date.parse(new Date()) - res.data[0].startTime)/604800000)
        wx.redirectTo({
          url: '../index/index',
        })
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
      wx.cloud.callFunction({
        name: 'login',
        complete: res => {
          console.log('云函数获取到的openid: ', res.result.openid)
          var openid = res.result.openid;
          that.setData({
            openid: openid,
            addIconIsShow: false
          })
          that.navTo()


          // const db = wx.cloud.database();
          // db.collection ("courses").where({
          //   // openId: that.openId
          //   openId: that.data.openid
          // }).get({
          //   success: function (res) {
          //     console.log(res.data[0]);
          //     app.globalData.coursesList = res.data[0].allCourse,
          //     app.globalData.remark = res.data[0].remark,
          //     app.globalData.week = parseInt( res.data[0].week + (Date.parse(new Date()) - res.data[0].startTime)/604800000)
          //     wx.redirectTo({
          //       url: '../index/index',
          //     })
          //   },
          //   fail: function (res) {
          //     console.log(res);
          //   }
          // })


        }
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