/**
 * DOM
 */
const body = document.querySelector("body");
const card = document.querySelector(".card");
const cardBlink = document.querySelector(".card__blink");
const cardPic = document.querySelector(".card__pic");
// const cardStereo = document.querySelector(".card__stereo");



/**
 * Controller
 */
const track = (e) => {
    // 滑鼠目前所在位置
    let x = e.clientX;
    let y = e.clientY;
    // 中心點位置
    let centerX;
    let centerY = 459;

    // 中心點位置應螢幕寬度改變
    let padScreen = window.matchMedia("(max-width: 1024px)");
    let phoneScreen = window.matchMedia("(max-width: 640px)");

    switch (true) {
        case phoneScreen.matches:
            centerX = 325;
            break;
        case padScreen.matches:
            centerX = 523;
            break;
        default:
            centerX = 960;
            break;
    }

    // 角度數值
    let rotateX = (centerY - y) / 20;
    let rotateY = (x - centerX) / 20;
    // 反光數值
    let blinkY = (centerY - y) - 100;
    let blinkX = rotateX;
    // 陰影blur-radius、spread-radius的數值遞增
    let radius = 0;
    if (y !== 0 || x !== 0) {
        radius += Math.abs(rotateX * 5);
        radius += Math.abs(rotateY * 5);
    }
    // 圖層位移值
    let layerX = -(rotateX / 5);
    let layerY = rotateY / 5;
    // 最上層半透明圖(錯視閃卡效果)
    let lightX = -(rotateX / 2);
    let lightY = rotateY / 2;

    // 數值顯示Demo
    const demoBlock = document.querySelector(".demoBlock");
    demoBlock.innerHTML = `<li class="demoBlock__item">滑鼠座標 x,y：( ${x} ， ${y} )</li>
                            <li class="demoBlock__item">角度值 rotate x,y：( ${rotateY} ， ${rotateX} )</li>
                            <li class="demoBlock__item">羽化值 radius：( ${radius} )</li>`;

    // 控制transform：rotate/translate、boxShadow、backgroundImage
    card.style.transform = 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
    card.style.boxShadow = '' + -(rotateY) + 'px ' + rotateX + 'px ' + radius + 'px rgba(0, 0, 0, 0.5)';
    cardPic.style.transform = 'translateY(' + layerX + 'px) translateX(' + layerY + 'px)';
    cardBlink.style.backgroundImage = 'linear-gradient(' + blinkX + 'deg, transparent 32%, rgba(255, 255, 255, 0.8) 40%, transparent 72%)';
    cardBlink.style.transform = 'translateY(' + blinkY + 'px) translateX(' + layerY + 'px)';
    // cardStereo.style.transform = 'translateY(' + lightX + 'px) translateX(' + lightY + 'px)';
}

/** 監聽滑鼠移動事件 **/
body.addEventListener('mousemove', track, false);