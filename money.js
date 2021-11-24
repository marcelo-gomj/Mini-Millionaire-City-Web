const query = (element) => document.querySelector(element),
queryAll = (element) => document.querySelectorAll(element);

function buildProduct(name, id, price){
    return {name, id, price}
}

const nodeItems = [...queryAll('.shop-box')];
const commerces = nodeItems.map((commerce, index) => {
    return [...commerce.children].map(product => {
        return buildProduct(product.children[2].innerText, index);
    })
})

const valueAdded = addCurrencyAll(commerces);

function addCurrencyAll(commerces) {
    return commerces.map((commerce, type) => {
        return getCurrency(type, commerce);
    });
}

function getCurrency(type, commerce){
    let levelDecimal = 1,
        areaStep = 2;
    const HOUSE = [3, 6, 7, 1, 1.6, 2.2, 2.5, 3, 4, 6, 1, 1.5, 2, 3, 4, 5, 6, 8, 1, 1.2, 1.5],
        MONUMENTS = [1, 2, 5, 7.5, 1, 1.6, 2, 3, 4, 5, 7, 8, 1, 1.2],
        SHOP = [6, 1, 2, 5, 1, 2.5, 3, 5, 1, 1.5],
        DECORATION = [0.2, 0.5, 0.8, 0.1, 5];

    return commerce.map((product, index) => {
        let price = 0;
        switch (type) {
            case 0:
                price = decodeCurrency(HOUSE[index]);
                break;
            case 1:
                price = decodeCurrency(SHOP[index]);
                break;
            case 2:
                price = decodeCurrency(MONUMENTS[index]);
                break;
            default:
                price = decodeCurrency(DECORATION[index]);
                break;
        }

        function decodeCurrency(val){
            const addDecimal = () => levelDecimal *= 10;
            if(val === 1){
                addDecimal();
            }else if(val > 1 && val < 2){
                if(levelDecimal === 1){
                    addDecimal();
                }
            }
            if(val === 0.1) val *= 10;
            return (val * 10000) * levelDecimal;
        }

        product.price = Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'USD'}).format(price);
        product.level = (price / 5).toFixed(0);
        
        areaStep = getBuildArea(index, type, areaStep);
        product.area += areaStep;
        return product;
    })
}

function getBuildArea(index, type, accum) {
    const houses = [[3, 6, 8, 16, 18], [6, 8 , 16], [4, 8, 12, 18], [1, 2, 4]];
    const step = 4;

    houses[0].map(house => {
        if(house === (index + 1)){
            accum += step;
        }
    })

    return accum;
}

valueAdded[0].map(val => console.log(val.area));

