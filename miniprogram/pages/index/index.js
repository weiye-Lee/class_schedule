const app = getApp();
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
  // 将字符串解析成对象
  resMapping: function (res) {
    const course = Array();
    let i = 0;
    var courseEach = res.split(/\n\n/)
    for (var j = 0 ; j < courseEach.length; j ++ ) {
      var courseInfo = courseEach[j].split(/\r?\n/)
      courseInfo = this.filterStr(courseInfo)
      var courseItem = Object()
      console.log(courseInfo)
      courseItem.name = courseInfo[0]
      courseItem.teacher = courseInfo[1]
      courseItem.weeks = courseInfo[2]
      courseItem.area = courseInfo[3]
      course[i++] = courseItem
    }
    console.log(course);
    return course;
  },
  filterStr: function(str) {
    for (var i = 0; i < str.length; i++) {
      if (str[i] == '') {
          str.splice(i,1)
          i--;
      }
    }
    // console.log("str" + str);
    return str
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.cloud.callFunction({
      name: 'parse',
      data: {
        fileID: "cloud://liweiye-dd1c64.6c69-liweiye-dd1c64-1258735017/excel_storage/学生个人课表_2018214185 (1).xls"
      },
      success: function (res) {
        console.log("succ");
        console.log(res);
        // console.log(res.result.sheets[0].data[3][5]);
        // that.resMapping(res.result.sheets[0].data[3][5])

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