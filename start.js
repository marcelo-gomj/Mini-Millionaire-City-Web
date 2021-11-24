const btnStart = document.querySelector('.start-game'),
boxCreate = document.querySelector('.create-user'),
boxBtn = document.querySelector('.btn-users'),
saveGame = localStorage;

btnStart.addEventListener('click', () => {
    boxCreate.classList.add('c-user--active');
})

// cBtn[1].addEventListener('click', (e) => {
//     console.log(e.target);
//     boxCreate.classList.remove('c-user--active');
// })

// cBtn[0].addEventListener('click', () => {
//     saveGame.setItem('user-name', `${userName.value}`);
// })