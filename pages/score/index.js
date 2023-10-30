// pages/score/index.js
import {getScoreListRequest, getRawScoreListRequest} from '../../api/main'
const scoreCacheKey = "scores"
const rawScoreCacheKey = "rawScores"
    
Page({
    
    /**
     * 页面的初始数据
     */
    data: {
        type:1,//1为有效成绩，2为原始成绩
        list:[],//成绩列表
        termIndex:0,//当前学期索引
    },
    getList(){
        const cache = wx.getStorageSync(this.data.type == 1 ? scoreCacheKey : rawScoreCacheKey)
        if(cache){
            this.setData({
                list:cache
            })
            return
        }
        this.update()
    },

    update(){
        const that = this
        let p = null
        if(that.data.type == 1) {
            p = getScoreListRequest()
        } else {
            p = getRawScoreListRequest()
        }
        p.then(res => {
            that.setData({
                list:res.data
            })
            wx.setStorageSync(that.data.type == 1 ? scoreCacheKey : rawScoreCacheKey, res.data)
            console.log(res);
        })
    },
    

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getList()
    },

    //切换成绩类型
    changeScoreType(e) {
        const type = e.currentTarget.dataset.type
        this.setData({
            type
        })
        this.getList()
    },

    changeTerm(e){
        console.log(e);
        const termIndex = e.detail.value
        this.setData({
            termIndex
        })
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