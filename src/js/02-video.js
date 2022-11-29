import Player from '@vimeo/player';
import { throttle } from 'lodash';
// Підключаємо бібліотекі vimeo player та lodash.throttle

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
// Звертаємось до селектору iframe (ініціалізуєм плєер)

player.on('timeupdate',  throttle( e => {
    localStorage.setItem('videoplayer-current-time', e.seconds);
    }, 1000)
    );
// Починаэмо відстежувати подію timeupdate та зберігаємо данні в localStorage з оновленням в одну секунду (1000 мс)
player
.setCurrentTime(localStorage.getItem('videoplayer-current-time'))
.catch(function (error) {
    console.error(error)
});
// Під час перезавантаження сторінки відновлення відтворення відбувається зі збереженої позиції.