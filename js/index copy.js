// import { createApp } from 'https://unpkg.com/petite-vue?module'
import { WIDTH, HEIGHT, POINT_SIZE } from './constant.js'

// createApp({
//     width: WIDTH,
//     height: HEIGHT,
//     mounted() {
//         console.log('111')
//     }
// }).mount('#app')

// var latticeRowNumber = Math.floor(WINDOW_HEIGHT/latticePointSize);
// var latticeColNumber = Math.floor(WINDOW_WIDTH/latticePointSize);

const ROW_NUMBER = Math.floor(HEIGHT / POINT_SIZE)
const COL_NUMBER = Math.floor(WIDTH / POINT_SIZE)