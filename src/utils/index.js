export default {
  // 是否触底
  isBottom: function () {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const clientHeight = document.documentElement.clientHeight
    const scrollHeight = document.documentElement.scrollHeight
    if (scrollTop + clientHeight +2>= scrollHeight) {
      return true;
    } else {
      return false;
    }
  },

  // 是否长按
  isLongpress(el) {
    // 创建变量
    let pressTimer = null;

    // 创建计时器
    let start = (e) => {
      if (e.type === 'click' && e.button !== 0) {
        return
      }
      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          return true;
        }, 2000);
      }
    }

    let cancel = (e) => {
      //  检查 pressTimer 的值是否为 null   
      if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null;
      }
    }

    // el.addEventListener('touchstart',start);
    // el.addEventListener('touchend',cancel)
    console.log(el);
  }



}