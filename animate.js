/**
 @description 页面垂直平滑滚动到指定滚动高度
 */
var scrollSmoothTo = function (position) {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            return setTimeout(callback, 17);
        };
    }
    // 当前滚动高度
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // 滚动step方法
    var step = function () {
        // 距离目标滚动距离
        var distance = position - scrollTop;
        // 目标滚动位置
        scrollTop = scrollTop + distance / 5;
        if (Math.abs(distance) < 1) {
            window.scrollTo(0, position);
        } else {
            window.scrollTo(0, scrollTop);
            requestAnimationFrame(step);
        }
    };
    step();
};
/**
 * 即插即用的缓动动画小算法变身
 * A是起始位置；
 * B是目标位置；
 * rate是缓动速率；
 * callback是变化的位置回调，支持两个参数，value和isEnding，表示当前的位置值（数值）以及是否动画结束了（布尔值）；
 * example:
 * var doc = document.body.scrollTop? document.body : document.documentElement;Math.easeout(doc.scrollTop, 0, 4, function (value) {doc.scrollTop = value;});
 */
Math.easeout = function (A, B, rate, callback) {
    // requestAnimationFrame的兼容处理
    if (!window.requestAnimationFrame) {
        requestAnimationFrame = function(fn) {
            setTimeout(fn, 17);
        };
    }
    if (A == B || typeof A != 'number') {
        return;
    }
    B = B || 0;
    rate = rate || 2;

    var step = function () {
        A = A + (B - A) / rate;

        if (A < 1) {
            callback(B, true);
            return;
        }
        callback(A, false);
        requestAnimationFrame(step);
    };
    step();
};
