// const { createScopedThreejs } = require('threejs-miniprogram')
import { createScopedThreejs } from 'threejs-miniprogram'

// const { renderModel } = require('../test-cases/model')
import { pdpRender } from './pdpRender'

Page({
  data: {},
  onLoad: function () {
    wx.createSelectorQuery()
      .select('#webgl')
      .node()
      .exec((res) => {
        const canvas = res[0].node
        this.canvas = canvas
        const THREE = createScopedThreejs(canvas)
        pdpRender(canvas, THREE)
      })
  },
  touchStart(e) {
    this.canvas.dispatchTouchEvent({...e, type:'touchstart'})
  },
  touchMove(e) {
    this.canvas.dispatchTouchEvent({...e, type:'touchmove'})
  },
  touchEnd(e) {
    this.canvas.dispatchTouchEvent({...e, type:'touchend'})
  }
})
