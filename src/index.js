import './index.html';
import './index.scss';
import hum from './img/MaskGroup.png'
import {mult, sum} from './modules/calc'

const img = new Image();
img.src = hum;

const htmlImg = document.querySelector('.img');
htmlImg.append(img)

console.log(mult(2, 4));
console.log(sum(3, 4))