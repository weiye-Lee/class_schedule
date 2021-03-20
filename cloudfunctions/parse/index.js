// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const res = await cloud.downloadFile({
    fileID: event.fileID
  })
  var allCourse = Array()
  const buffer = res.fileContent
  const xlsx = require("node-xlsx")
  var sheets = xlsx.parse(buffer)
  const resParse = (res) => {
    if (res == " ") {
      return null;
    }
    const course = Array();
    let i = 0;
    var courseEach = res.split(/\n\n/)
    for (let j = 0; j < courseEach.length; j++) {
      let courseInfo = courseEach[j].split(/\r?\n/)
      courseInfo = filterStr(courseInfo)
      let courseItem = Object()
      console.log(courseInfo)
      courseItem.name = courseInfo[0]
      courseItem.teacher = courseInfo[1]
      courseItem.weeks = courseInfo[2]
      courseItem.area = courseInfo[3]
      course[i++] = courseItem
    }
    console.log(course);
    return course;
  }
  const filterStr = (str) => {
    for (var i = 0; i < str.length; i++) {
      if (str[i] == '') {
        str.splice(i, 1)
        i--;
      }
    }
    return str
  }
  let courseInfo = sheets[0].data
  for (let i = 3; i < courseInfo.length - 1; i++) {
    allCourse[i-3] = Array();
    for (let j = 1; j < courseInfo[i].length; j++) {
      allCourse[i-3][j] = resParse(courseInfo[i][j]);
    }
  }
  allCourse[courseInfo.length - 3] = courseInfo[courseInfo.length - 1][1]
  if (allCourse != null) {
    const db = cloud.database()
    db.collection("courses").add({
      data:{
        courses:[
          {
            courseItem:allCourse,
            isShow:true
          }
        ],
        openId:event.userInfo.openId
      }
    })
  }
  return {
    event,
    courseInfo,
    sheets,
    allCourse,
  }

};