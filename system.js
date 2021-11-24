!function(){
    'use-strict';

    // Hide elements
    let showCol = (ele, box = true) => ele.classList.add(`${box ? 'show-box' : 'show-col'}`),
    query = (ele, all = true) => all ? document.querySelector(ele) : document.querySelectorAll(ele);

    // Selection of elements
    !function selectTool() {
        const toolBtn = document.querySelectorAll('.tool-box li'),
        colBox = document.querySelector('.selected-tool'),
        boxMenu = document.querySelectorAll('.selected-tool ul'),
        col = query('.shop-box', false),
        colTitle = query('.col-title')

        toolBtn.forEach((btn, menu) => {
            btn.classList.remove('tool-selected');
            btn.addEventListener('click', () => {
                for (let x = 0; x < toolBtn.length; x++) {
                    if (menu === x) {
                        btn.classList.add('tool-selected');
                    }else{
                        toolBtn[x].classList.remove('tool-selected');
                    }
                }

                if (menu < 4) {
                    showCol(colBox);
                    showCol(boxMenu[menu], false);
                    for (let z = 0; z < col.length; z++) {
                        if (menu !== z) {
                            col[z].classList.remove('show-col');
                        }
                    }

                    switch (menu) {
                        case 0:
                            colSystem(col, menu);
                            colTitle.innerText = 'Casas';
                        break;
                        case 1:
                            colSystem(col, menu);
                            colTitle.innerText = 'Comércio';
                        break;
                        case 2:
                            colSystem(col, menu);
                            colTitle.innerText = 'Monumentos';
                        break;
                        default:
                            colSystem(col, menu);
                            colTitle.innerText = 'Decoracões'
                        break;
                    }
                }
            });
        });
    }() 

    function colSystem(col, vrb){
        const setaL = query('.setaL'),
        setaR = query('.setaR'),
        pass = 33.333;
        let final  = (col[vrb].childElementCount - 3) * pass,
        move = [0, 0, 0];
        move[vrb] = 0;
        col[vrb].style.transform = `translateX(0%)`;

        // Hide arrow
        function hideArrow(seta, delim){
            let trc = (num) => Math.trunc(num),
            limit = trc(delim) === trc(move[vrb]);
            
            return seta.style.visibility = `${limit ? 'hidden' : 'visible'}`;
        }

        // Move Column
        function moveCol(show, oper = true){
            if (show === 'visible'){
                col[vrb].style.transform = `translateX(-${(oper ? move[vrb] -= pass : move[vrb] += pass)}%)`;
            }
        }

        // Initial hide arrow
        hideArrow(setaL, 0);
        hideArrow(setaR, final)

        // Arrow left
        let visible;
        setaL.addEventListener('click', () => {
            hideArrow(setaR, true);
            visible = hideArrow(setaL, 0);
            moveCol(hideArrow(setaL, 0));
        });

        // Arrow right
        setaR.addEventListener('click', () => {
            hideArrow(setaL, -1);
            visible =  hideArrow(setaR, final);
            moveCol(visible, false);
        });
    }

    !function footerInfo() {
        let userName = localStorage.getItem('user-name');
        query('.welcome').innerHTML = `Seja Bem-vindo ${userName}!`;
    }()
}()