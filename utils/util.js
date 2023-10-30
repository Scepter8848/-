function getNowWeek(startDate,totalWeek){
    const nowDate = new Date()
    startDate  = new Date(startDate)
    const time = nowDate - startDate
    let nowWeek = Math.ceil(time / 1000 / 60 / 60 / 24 / 7)
    if(startDate > totalWeek){
        nowWeek = 1
    }
    return nowWeek
    // this.getWeekDates()
}
module.exports = {
    getNowWeek
}
