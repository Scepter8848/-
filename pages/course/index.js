// pages/course/index.js
import {getCourseListRequest} from '../../api/main'
import{getNowWeek} from '../../utils/util'
const courseCacheKey = "courses"
const courseColorCacheKey = "courseColor"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        nowWeek:1,//当前周
        // totalWeek:[0,1,2],//总周数
        totalWeek:20,//总周数//vue框架做了处理
        weekDayCount:7,
        weekIndexText:['一','二','三','四','五','六','日',],
        startDate: '2023/08/28',
        nowMonth:1,//当前周的月份
        showSwithWeek:false,//显示选择周数弹窗
        courseList:[
            
            // {
            //     name:'网络工程',
            //     week:2,
            //     section:1,
            //     sectionCount:1,
            //     address:'某一个楼',
            //     color:'#D06969'
            // },
            // {
            //     name:'网络工程',
            //     week:3,
            //     section:4,
            //     sectionCount:2,
            //     address:'某一个楼',
            //     color:'#D06969'
            // },
        ],
        colorList:[
            "#116A7B",
            "#DD58D6",
            "#30A2FF",
            "#0079FF",
            "#F79327",
            "#47A992",
            "#7A3E3E",
            "#FF55BB",
            "#A0D8B3",
            "#539165",
            "#3A98B9",
            "#609966",
        ],
        courseColor:{},
        weekCalendars:[1,2,3,4,5,6,7],
        firstEntry:true
        
    },
    selectWeek(){
        this.setData({
            showSwithWeek:true
        })
    },
    switchWeek(e){
        const week = e.currentTarget.dataset.week
        this.setData({
            showSwithWeek:false
        })
        this.switchWeekFn(week)
    },
    hideSwitchWeek(){
        this.setData({
            showSwithWeek:false
        })
    },
    //切换周数
    switchWeekFn(week){
        this.setData({
            nowWeek:week,
        })
        this.getWeekDates()
    },
    
    getWeekDates(){
        const startDate = new Date(this.data.startDate)
        const addTime = (this.data.nowWeek - 1) * 7 * 24 * 60 * 60 * 1000
        const firstDate = startDate.getTime() + addTime
        const {month:nowMonth} = this.getDateObject(new Date(firstDate))
        const weekCalendars = []
        for(let i = 0; i < this.data.weekDayCount;i++) {
            const date = new Date(firstDate + i * 24 * 60 * 60 * 1000)
            const {day} = this.getDateObject(date)
            weekCalendars.push(day)
        }
        this.setData({
            weekCalendars,nowMonth
        })
    },
    getDateObject(date = new Date()){
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        return {
            year,month,day
        }
    },
    getNowWeek(){
        const nowWeek = getNowWeek(this.data.startDate,this.data.totalWeek)
        
        this.setData({
            nowWeek
        })
        this.getWeekDates()
    },
    getDate(){
        const cache = wx.getStorageSync(courseCacheKey)
        const courseColorCache = wx.getStorageSync(courseColorCacheKey)
        if(cache) {
            this.setData({
                courseList:cache,
            })
            if(!courseColorCache){
                this.buildCourseColor()
            } else {
                this.setData({
                    courseColor:courseColorCache
                })
            }
            return
        }
        this.updateFn(true)
        
    },
    update(){
        this.updateFn()
    },
    updateFn(firstEntry = false){
        const that = this
        getCourseListRequest().then(res => { 
            that.setData({
                courseList:res.data,
            })
            that.buildCourseColor()
            if(!firstEntry) {
                wx.showToast({
              title: '更新成功',
              icon:'success'
            })
            }
            wx.setStorageSync(courseCacheKey, res.data)

        })
    },
    swiperSwitchWeek(e){
        if(e.detail.source == ''){
            this.setData({
                firstEntry:false
            })
            return
        }
        const index = e.detail.current
        this.switchWeekFn(index + 1)
    },
    buildCourseColor(){
        const courseColor = {}
            let colorIndex = 0  
            this.data.courseList.map(item => {
                if(courseColor[item.name] === undefined){
                    courseColor[item.name] = this.data.colorList[colorIndex]
                    colorIndex++
                }   
            })
            this.setData({
                courseColor
            })
            wx.setStorageSync(courseColorCacheKey, courseColor)

    },
    getTodayDate(){
        const {
            month:todayMonth,   
            day:todayDay
        } =  this.getDateObject()
        this.setData({
            todayMonth,
            todayDay
        })
    },
    navCourseDetail(e){
        const index = e.currentTarget.dataset.index
        wx.navigateTo({
          url: `/pages/course-detail/index?info=${JSON.stringify(this.data.courseList[index])}`,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const {windowWidth} = wx.getSystemInfoSync()//获取课表的宽度，单位是px，通过这个除于7，计算每节课距离左边的位置
        this.setData({
            windowWidth
        })
        this.getWeekDates()
        this.getNowWeek()
        this.getDate()
        this.getTodayDate()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})