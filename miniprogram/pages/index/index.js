const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coursesList: app.globalData.coursesList,
    openid: app.globalData.openid,
    popupShow:false
    // addIconIsShow: true
  },

  // uploadExcel: function () {
  //   var that = this
  //   var uuid = this.getuuid()
  //   console.log(uuid)
  //   wx.chooseMessageFile({
  //     count: 1,
  //     type: "file",
  //     success: function (res) {
  //       console.log(res);
  //       wx.cloud.uploadFile({
  //         filePath: res.tempFiles[0].path,
  //         cloudPath: "excel_storage/" + uuid + ".xls",
  //         success: function (res) {
  //           wx.cloud.getTempFileURL({
  //             fileList: [{
  //               fileID: res.fileID
  //             }],
  //             success: function (res) {
  //               console.log(res.fileList[0].fileID);
  //               that.parseFile(res.fileList[0].fileID)
  //             },
  //             fail: function (res) {
  //               console.log(res)
  //             }
  //           })
  //         },
  //         fail: function (res) {
  //           console.log(res);
  //         }
  //       })
  //     }
  //   })
  // },
  // parseFile: function (fileId) {
  //   console.log("执行云函数解析");
  //   console.log(fileId)
  //   var that = this;
  //   wx.cloud.callFunction({
  //     name: 'parse',
  //     data: {
  //       fileID: fileId
  //     },
  //     success: function (res) {
  //       console.log("succ");
  //       console.log(res);

  //     },
  //     fail: function (res) {
  //       console.log('err');
  //       console.log(res);
  //     }
  //   })

  // },
  // getuuid: function () {
  //   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
  //     var r = Math.random() * 16 | 0,
  //       v = c == 'x' ? r : (r & 0x3 | 0x8);
  //     return v.toString(16);
  //   })
  // },
  // 用户上传多个课表情况怎么解决？
  
  //
  
  
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  
  // 前提条件 已经获得openid 从数据库中得到课程数据
  onLoad: function () {
    this.setData({
      coursesList:app.globalData.coursesList
    })
    console.log(app.globalData.coursesList);
  },
  onReady: function () {

  },
})