// index.js
// 获取应用实例
const app = getApp()
// import {loginRequest} from '../../api/main'
import{getNowWeek} from '../../utils/util'

Page({
  data: {
    navList:[
        {
            title:'课表',
            icon:'/asset/imgs/course.png',
            path:'/pages/course/index'
        },
        {
            title:'成绩',
            icon:'/asset/imgs/score.png',
            path:'/pages/score/index'
        },
        {
            title:'考勤',
            icon:'/asset/imgs/attendance.png',
            path:'/pages/attendance/index'
        },
        {
            title:'校历',
            icon:'/asset/imgs/calendar.png',
            path:'/pages/calendar/index'
        },
    ],
    startDate: '2023/08/28',
    totalWeek:20,
    todayCourseList:[]
  },
  nav(e){
    const index = e.currentTarget.dataset.index
    const path = this.data.navList[index].path
    console.log(path);
    wx.navigateTo({
      url: path,
      fail(){
          wx.switchTab({
            url: path,
          })
      }
    })
  },
  getTodayCourseList(){
    const todayWeek = new Date().getDay()
    const todayWeeks = getNowWeek(this.data.startDate,this.data.totalWeek)
    
    const courseList = wx.getStorageSync('courses')
    if(!courseList) return
    // const todayWeek = 2
    // const todayWeeks = 15
    const todayCourseList = courseList.filter(item => {
        return item.week == todayWeek && item.weeks.indexOf(todayWeeks) > -1
    })
    todayCourseList.sort((a,b) => {
        return a.section - b.section
    })
    this.setData({
        todayWeek,
        todayWeeks,
        todayCourseList
    })
    console.log(todayCourseList);
  },
  // 事件处理函数
  
  onLoad() {
    this.getTodayCourseList()
  },
  
  
})
