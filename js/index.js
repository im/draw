import { WIDTH, HEIGHT, POINT_SIZE } from './constant.js'
import smiley from './data/smiley.js'
import { createApp } from 'https://unpkg.com/petite-vue?module'

const ROW_NUMBER = Math.floor(HEIGHT / POINT_SIZE)
const COL_NUMBER = Math.floor(WIDTH / POINT_SIZE)

createApp({
    width: WIDTH,
    height: HEIGHT,
    $canvas: null,
    $context: null,
    digit: [],
    digitColor: '#000',
    lineColor: '#cccccc',
    // lineColor: 'transparent',
    drawBgColor: 'transparent',
    pointSize: POINT_SIZE,
    isMouse: false,
    get rowNumber() {
        return Math.floor(this.height / this.pointSize)
    },
    get colNumber() {
        return Math.floor(this.width / this.pointSize)
    },
    initDigit() {

        this.digit = smiley
        // for (let i = 0; i < this.rowNumber; i++) {
        //     this.digit[i] = []
        //     for (let j = 0; j < this.colNumber; j++) {
        //         this.digit[i][j] = 0
        //     }
        // }

        // console.log(JSON.stringify(this.digit))
    },
    downloadImg() {
        var a = document.createElement('a')
        a.href = this.$canvas.toDataURL('image/png') //下载图片
        a.download = '未命名.png'; console.log(a)
        a.click()
    },
    init() {
        const canvas = document.getElementById('canvas')
        canvas.style.borderColor = this.lineColor
        canvas.width = WIDTH
        canvas.height = HEIGHT
        this.$context = canvas.getContext('2d')
        this.$canvas = canvas

        this.initDigit()

        setInterval(() => {
            this.renderDraw()
        }, 10)
        this.bindEvent()
    },

    handleBorder() {
        this.lineColor = this.lineColor === 'transparent' ? '#cccccc' : 'transparent'
        this.$canvas.style.borderColor = this.lineColor
    },

    renderDraw() {
        this.$context.clearRect(0, 0, this.width, this.height)
        this.renderLine()
        this.renderDigit()
    },
    renderLine() {
        const ctx = this.$context
        ctx.lineWidth = 1
        ctx.strokeStyle = this.lineColor
        for (var i = 1; i < this.digit.length; i++) {
            ctx.moveTo(0 + 0.5, (i * this.pointSize) + 0.5)
            ctx.lineTo(this.width + 0.5, (i * this.pointSize) + 0.5)
            ctx.moveTo((i * this.pointSize) + 0.5, 0 + 0.5)
            ctx.lineTo((i * this.pointSize) + 0.5, this.height + 0.5)
        }
        ctx.stroke()
    },

    bindEvent() {
        this.$canvas.onmousedown = () => {
            this.isMouse = true
        }
        this.$canvas.onmouseup = () => {
            this.isMouse = false
        }
        this.$canvas.onmouseleave = () => {
            this.isMouse = false
        }

        this.$canvas.onmousemove = (event) => {
            if (this.isMouse) {
                // this.updateDigit(event)
            }
        }

        this.$canvas.onclick = (event) => {
            if (!this.isMouse) {
                this.updateDigit(event, 'click')
            }
        }

        window.onkeyup = (event) => {
            console.log('event: ', event)

        }
    },
    updateDigit(event, eventType = '') {
        const rect = this.$canvas.getBoundingClientRect()

        var e = event || window.event
        const x = e.clientX - rect.x
        const y = e.clientY - rect.y
        var row = Math.floor((y - POINT_SIZE) / POINT_SIZE) + 1
        var col = Math.floor((x - POINT_SIZE) / POINT_SIZE) + 1
        if (eventType === 'click') {
            this.digit[row][col] = this.digit[row][col] ? 0 : 1
        } else {
            this.digit[row][col] = 1
        }
    },
    renderDigit() {
        const ctx = this.$context
        for (var i = 0; i < this.digit.length; i++) {
            for (var j = 0; j < this.digit[i].length; j++) {
                ctx.fillStyle = this.digit[i][j] === 1 ? this.digitColor : this.drawBgColor
                ctx.beginPath()
                ctx.fillRect(this.pointSize * (j), (i) * this.pointSize, this.pointSize, this.pointSize)
                ctx.closePath()
                ctx.fill()
            }
        }
    },
    mounted() {
        this.init()
    }
}).mount('#app')

// const canvas = document.getElementById('canvas')
// const context = canvas.getContext('2d')

// canvas.width = WIDTH
// canvas.height = HEIGHT

// var mouseIsDown = false

// const digit = []

// //初始化二维点阵
// for (let i = 0; i < ROW_NUMBER; i++) {
//     digit[i] = []
//     for (let j = 0; j < COL_NUMBER; j++) {
//         digit[i][j] = 0
//     }
// }

// function render(ctx) {
//     ctx.clearRect(0, 0, WIDTH, HEIGHT)
//     renderLine(ctx)
//     renderDigit(ctx)
// }

// function renderLine(ctx) {
//     ctx.lineWidth = 1
//     ctx.strokeStyle = '#ccc'

//     for (var i = 1; i < digit.length; i++) {
//         ctx.moveTo(0 + 0.5, (i * POINT_SIZE) + 0.5)
//         ctx.lineTo(WIDTH + 0.5, (i * POINT_SIZE) + 0.5)

//         ctx.moveTo((i * POINT_SIZE) + 0.5, 0 + 0.5)
//         ctx.lineTo((i * POINT_SIZE) + 0.5, HEIGHT + 0.5)
//     }
//     ctx.stroke()
// }

// //填充点阵
// function renderDigit(ctx) {
//     for (var i = 0; i < digit.length; i++) {
//         for (var j = 0; j < digit[i].length; j++) {
//             //颜色修改
//             ctx.fillStyle = digit[i][j] === 1 ? '#000' : 'transparent'
//             ctx.beginPath()
//             ctx.fillRect(POINT_SIZE * (j), (i) * POINT_SIZE, POINT_SIZE, POINT_SIZE)
//             ctx.closePath()
//             ctx.fill()
//         }
//     }
// }

// canvas.onmousedown = function () {
//     mouseIsDown = true
// }
// //鼠标松开停止写入
// canvas.onmouseup = function () {
//     mouseIsDown = false
// }

// canvas.onmouseleave = function () {
//     mouseIsDown = false
// }

// canvas.onclick = function (event) {

//     if (!mouseIsDown) {
//         const rect = canvas.getBoundingClientRect()
//         var e = event || window.event
//         const x = e.clientX - rect.x
//         const y = e.clientY - rect.y

//         var row = Math.floor((y - POINT_SIZE / 2) / POINT_SIZE)
//         var col = Math.floor((x - POINT_SIZE / 2) / POINT_SIZE)

//         digit[row][col] = digit[row][col] ? 0 : 1
//     }

// }

// canvas.onmousemove = function (event) {
//     if (mouseIsDown) {
//         const rect = canvas.getBoundingClientRect()

//         var e = event || window.event
//         const x = e.clientX - rect.x
//         const y = e.clientY - rect.y

//         var row = Math.floor((y - POINT_SIZE / 2) / POINT_SIZE)
//         var col = Math.floor((x - POINT_SIZE / 2) / POINT_SIZE)
//         digit[row][col] = 1
//     }
// }

// setInterval(
//     function () {
//         render(context)
//     }, 10)