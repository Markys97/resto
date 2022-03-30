let ingredients= document.querySelectorAll('.body-order__item')
let commandeFinal;

ingredients.forEach((ingredient, index, arr)=>{

    ingredient.addEventListener('click',e=>{
        let listIngredientSelected=[];
        ingredient.classList.toggle('body-order__item--active')
        
        arr.forEach(item=>{
            if(item.classList.contains('body-order__item--active')){
                let ingredientData={
                    nameIngredient: item.querySelector('.body-order__name').textContent,
                    price:item.querySelector('.body-order__price-number').textContent,
                   
                }
                listIngredientSelected.push(ingredientData)
            }
        })
        
        

        let commande={};
        //console.log(listIngredientSelected)
        commande.namePizza= document.querySelector('.order__pizzaSelected').innerText
        commande.ingredient=listIngredientSelected,
     
        commande.pricePizza=document.querySelector('.order__pricePizzaSelected').textContent;
         commandeFinal=commande;
       
    })
})


document.querySelector('.order__btn').addEventListener('click',e=>{
    console.log(commandeFinal)

    let reqConfig={
        headers:{'content-type':'application/json'},
        method:'POST',
        body: JSON.stringify(commandeFinal)
    }
    fetch('/saveOrder',reqConfig)
    .then(res=>{
        if(res.ok){
            document.querySelector('.modal').classList.add('modal--active');

            let idShow= setInterval(()=>{
                document.querySelector('.modal').classList.remove('modal--active');
            },4000)
        }
    })
    
})