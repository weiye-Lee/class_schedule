const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coursesList: app.globalData.coursesList,
    openid: app.globalData.openid,
    popupShow: false,
    x: 0,
    y: 0,
    z: 0,
    course: Object(),
    show: false,
    weekShow: false,
    columns: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
    week:1
  },

  showWeekPopup() {
    this.setData({
      weekShow: true
    });
  },
  WeekonClose() {
    var that = this
    console.log(app.globalData.openid);
    this.setData({
      weekShow: false
    });
    const db = wx.cloud.database()
    db.collection("courses").where({
      openId: app.globalData.openid,

    }).update({
      data: {
        week: that.data.week
      },
      success: function(res) {
        console.log(res);
      }
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  onChange(event) {
    console.log(event);
    this.setData({
      week: event.detail.value
    })
  },
  showPopup(event) {
    console.log(event.target);
    var list = app.globalData.coursesList
    console.log(list[event.target.dataset.replyX][event.target.dataset.replyY][event.target.dataset.replyZ]);

    this.setData({
      course: list[event.target.dataset.replyX][event.target.dataset.replyY][event.target.dataset.replyZ]
    })
    this.setData({
      show: true
    });
  },

  // 前提条件 已经获得openid 从数据库中得到课程数据
  onLoad: function () {
    this.setData({
      coursesList: app.globalData.coursesList,
      week: app.globalData.week
    })
    console.log(app.globalData.coursesList);
    console.log(app.globalData.week);
  },
  onReady: function () {

  },
})