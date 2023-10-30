// pages/course-detail/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        infoRef:[
            {
                key:'rawWeeks',
                title:'周数'
            },
            {
                key:'rawSection',
                title:'节数'
            },
            {
                key:'address',
                title:'地址'
            },
            {
                key:'teacher',
                title:'老师'
            },
            {
                key:'credit',
                title:'学分'
            },
            {
                key:'category',
                title:'类型'
            },
            {
                key:'method',
                title:'考察'
            },
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let info = options.info || ''
        if(info == ''){
            wx.showToast({
              title: '页面不存在',
              icon:'none'
            })
            setTimeout(() => {
                wx.navigateBack({
                    delta:1
                })
            },1500);
            return
        }
        info = JSON.parse(info)
        info.rawSection = '周' + info.rawSection
        this.setData({
            info
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