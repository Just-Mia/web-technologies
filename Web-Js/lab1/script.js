
const Elements = document.getElementsByClassName('span');
const element1 = Elements[0];

element1.innerText = "Hello world!";

function printName(name) {
    console.log(name);
}

const btns = document.getElementsByClassName('button');
const btn1 = btns[0];
btn1.onclick = function () {
    printName("mr Name");

};
