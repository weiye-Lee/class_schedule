const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coursesList: Object(),
    openid: "",
    addIconIsShow: true
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
  // todo 完成openid 从缓存中调用
  getOpenid: function () {
    let that = this; //获取openid不需要授权
    wx.login({
      success: function (res) { //请求自己后台获取用户openid
        let appId = 'wx58ad2e0fc33b0c76'
        let secret = '31960df8722617a591e1c5f9254f3110'
        let code = res.code
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'json'
          },
          success: function (res) {
            var openid = res.data.openid //返回openid
            console.log('openid为' + openid);
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
  // 用户上传多个课表情况怎么解决？
  onLoad: function () {
    let that = this
    // this.getOpenid()
    const db = wx.cloud.database();
    db.collection("courses").where({
      // openId: that.openId
      openId: "oG2Bd5asm4C6RkFresCev9RMjy34"
    }).get({
      success: function (res) {
        console.log(res.data[0].allCourse);
        that.setData({
          coursesList: res.data[0].allCourse,
          addIconIsShow:false
        })
      },
      fail: function (res) {
        console.log(res);
      }
    })
  }
})
