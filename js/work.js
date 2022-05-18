const welcome = document.getElementById('conuter-choose')
const timeCount = document.getElementById('time-count')
const marginCount = document.getElementById('margin-count')
const choose = document.getElementById('choose')
const head = document.getElementById('head-box')
const box = document.getElementById('count-box')
const answer = document.getElementById('answer')
const btnBottom = document.getElementById('btn-bottom')

round = (fullNum, n) => (Math.round(fullNum * (10 ** n)) / (10 ** n))

theTime = () => {
    choose.innerHTML = `<span class="text-span">速率个数</span><input id="count-num" placeholder=">=1"><button id="get-ready" class="btn">生成</button>`
    btnBottom.innerHTML = `<button id="time-counting" class="btn" style="display: none">计算</button><button id="reflash" class="btn">重置</button>`
    welcome.style.display = "none"
}

theMargin = () => {
    choose.innerHTML = `<span class="text-span">时间个数</span><input id="count-num" placeholder=">=2"><button id="get-start" class="btn">生成</button>`
    btnBottom.innerHTML = `<button id="margin-counting" class="btn" style="display: none">计算</button><button id="reflash" class="btn">重置</button>`
    welcome.style.display = "none"
}

timeCount.addEventListener('click', () => {
    theTime()
    const counter = document.getElementById('count-num')
    const getReady = document.getElementById('get-ready')
    const timeCounting = document.getElementById('time-counting')
    const reflash = document.getElementById('reflash')

    getReady.addEventListener('click', () => {
        let num = ~~(counter.value)
        if (num < 1) {
            alert('请输入正确的速率个数！')
        } else {
            head.innerHTML = `<div class="textbar"><span class="exp-span">时间采用24h计时法</span></div><div class="timebar"><span class="text-span">初始数值</span><input id="numstart" placeholder=">0"></div><div class="timebar"><span class="text-span">初始时间</span><input id="hourstart" placeholder="0"><span class="text-span">时</span><input id="minstart" placeholder="0"><span class="text-span">分</span></div>`
            for (let i = 0; i < num - 1; i += 1) {
                box.innerHTML += `
	<div class="timebar"><span class="text-span speed">速率${i + 1}</span><input id="speed-${i + 1}" placeholder=">0"><span class="text-span">ml/h</span><span class="text-span speed">用量</span><input id="amount-${i + 1}" placeholder=">0"></div>`
            }
            box.innerHTML += `<div class="timebar"><span class="text-span speed">速率${num}</span><input id="speed-${num}" placeholder=">0"><span class="text-span">ml/h</span></div>`
            choose.style.display = "none"
            timeCounting.style.display = "inline"
	}
    })

    timeCounting.addEventListener('click', () => {
        let num = ~~(counter.value)
        let countValue = document.getElementById('numstart').value
        let hourStart = ~~(document.getElementById('hourstart').value)
        let minStart = ~~(document.getElementById('minstart').value)
        let timePass = 0,
            theHour = 0,
            theMin = 0,
            theDay = 0
        let timeJugment = 0
        if (countValue <= 0) {
            alert('初始数值错误！')
        } else if (hourStart > 24 || hourStart < 0) {
            alert('初始数值小时数错误！')
        } else if (minStart > 60 || minStart < 0) {
            alert('初始数值分钟数错误！')
        } else {
            for (let k = 0; k < num - 1; k += 1) {
                let speed = document.getElementById(`speed-${k + 1}`).value
                let amount = document.getElementById(`amount-${k + 1}`).value
                if (speed <= 0) {
                    alert(`速率${k + 1}异常！`)
                    break
                }
                if (amount <= 0) {
                    alert(`速率${k + 1}的用量异常！`)
                    break
                }
                if (amount > countValue) {
                    timePass += countValue / speed
                    countValue = 0
                    timeJugment += 1
                } else {
                    timePass += amount / speed
                    countValue -= amount
                    timeJugment += 1
                }
            }
            if (timeJugment == num - 1) {
                speed = document.getElementById(`speed-${num}`).value
                if (speed <= 0) {
                    alert('速率异常')
                } else {
                    timePass += countValue / speed
                    theMin += Math.round(minStart + (timePass - ~~(timePass)) * 60)
                    theHour += hourStart + ~~(timePass) + ~~(theMin / 60)
                    theDay = ~~(theHour / 24)
                    theMin %= 60
                    theHour %= 24
                    answer.innerHTML = theDay >= 1 ? `<span class="text-span">第${theDay + 1}天${theHour}时${theMin}分结束</span>` : `<span class="text-span">${theHour}时${theMin}分结束</span>`
                }
            }
        }
    })

    reflash.addEventListener('click', () => {
        window.location.reload()
    })
})

marginCount.addEventListener('click', () => {
    theMargin()
    const counter = document.getElementById('count-num')
    const getStart = document.getElementById('get-start')
    const marginCounting = document.getElementById('margin-counting')
    const reflash = document.getElementById('reflash')

    getStart.addEventListener('click', () => {
        let num = ~~(counter.value)
        if (num <= 1) {
            alert('请输入正确的时间个数！')
        } else {
            head.innerHTML = `<div class="textbar"><span class="exp-span">时间采用24h计时法</span></div><div class="timebar"><span class="text-span">初始数值</span><input id="numstart" placeholder=">0"></div>`
            for (let i = 0; i < num - 1; i += 1) {
                box.innerHTML += `
	<div class="timebar"><span class="text-span">时间${i + 1}</span><input id="hour-${i + 1}" placeholder="0"><span class="text-span">时</span><input id="min-${i + 1}" placeholder="0"><span class="text-span">分</span><div><span class="text-span speed">速率</span><input id="speed-${i + 1}" placeholder=">0"><span class="text-span">ml/h</span></div></div>`
            }
            box.innerHTML += `<div class="timebar"><span class="text-span">时间${num}</span><input id="hour-${num}" placeholder="0"><span class="text-span">时</span><input id="min-${num}" placeholder="0"><span class="text-span">分</span></div>`
            choose.style.display = "none"
            marginCounting.style.display = "inline"
	}
    })

    marginCounting.addEventListener('click', () => {

        let num = ~~(counter.value)
        let countValue = document.getElementById('numstart').value
        let timeJugment = 0
        if (countValue <= 0) {
            alert('初始数值错误！')
        } else {
            for (let k = 0; k < num - 1; k += 1) {
                let startHour = ~~(document.getElementById(`hour-${k + 1}`).value)
                let endHour = ~~(document.getElementById(`hour-${k + 2}`).value)
                let startMin = ~~(document.getElementById(`min-${k + 1}`).value)
                let endMin = ~~(document.getElementById(`min-${k + 2}`).value)
                let speed = document.getElementById(`speed-${k + 1}`).value
                let passHour = endHour - startHour
                let passMin = (endMin - startMin) / 60
                if (startHour > 24 || startHour < 0 || endHour > 24 || endHour < 0) {
                    startHour > 24 || startHour < 0 ? alert(`时间${k + 1}的小时数异常！`) : alert(`时间${k + 2}的小时数异常！`)
                    break
                }
                if (startMin > 60 || startMin < 0 || endMin > 60 || endMin < 0) {
                    startMin > 60 || startMin < 0 ? alert(`时间${k + 1}的分钟数异常！`) : alert(`时间${k + 2}的分钟数异常！`)
                    break
                }
                if (speed <= 0) {
                    alert(`时间${k + 1}的速率异常！`)
                    break
                }
                if (countValue > 0) {
                    if (startHour == endHour) {
                        if (startMin <= endMin) {
                            countValue -= passMin * speed
                            timeJugment += 1
                        } else {
                            alert(`时间${k + 1}或时间${k + 2}的分钟数异常！`)
                        }
                    } else if (startHour > endHour) {
                        countValue -= (24 + passHour + passMin) * speed
                        timeJugment += 1
                    } else {
                        countValue -= (passHour + passMin) * speed
                        timeJugment += 1
                    }
                } else {
                    answer.innerHTML = `<span class="text-span">数值已在时间${k}清零</span>`
                    break
                }
                if (timeJugment == k) {
                    break
                }
            }
            if (timeJugment == num - 1) {
                countValue = round(countValue, 1)
                answer.innerHTML = `<span class="text-span">结果：${countValue}</span>`
            }
        }
    })

    reflash.addEventListener('click', () => {
        window.location.reload()
    })
})
