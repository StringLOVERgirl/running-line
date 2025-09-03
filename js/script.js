
 class GlobalListeners {
    constructor() {
        this.addListeners();
    }

    addListeners() {

        function isMobile() {
            return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
          }

          if (isMobile()) {
        const items = Array.from(document.querySelectorAll('.elementCont'))
        console.log(items)
        
        items.forEach(e=>{

        e.addEventListener('touchstart', (_) => {

            items.forEach(el=>{
                el.classList.remove('contBgHover')
                if(el.children[0].tagName == 'VIDEO'){el.children[0].pause()}
            })

            console.log('clicl')
            console.log(e.children)
            if (e.children[0].classList.contains('itemHover') && e.children[0].tagName=='VIDEO'){e.children[0].pause()} 
            else if (!e.children[0].classList.contains('itemHover') && e.children[0].tagName=='VIDEO'){e.children[0].play()}
            e.classList.toggle('contBgHover')
            e.children[0].classList.toggle('itemHover')
        })
        })
    }
    

    

    if (window.innerHeight > 550 && window.innerWidth > 700) {

        window.addEventListener("mouseout", (event) => {
            if (event.target.tagName == "VIDEO") {
                event.target.pause();
            }
        });

        window.addEventListener("mousemove", (event) => {
            let target = event.target;
            console.log(target);
            if (target.tagName == "VIDEO") {
                target.play();
            }
        });
    }


    }
}


 const mediaContent = [] // для прелоадера
const items = {
            video: [
                "./assets/bag.webm",
                "./assets/beer.webm",
                "./assets/Front(2).mp4",
                "./assets/clock.webm",
                "./assets/Front(4).mp4",
                "./assets/dice.webm",
                "./assets/drink.webm",
                "./assets/Front(3).mp4",
                "./assets/gold.webm",
                "./assets/lock.webm",
                "./assets/Front.mp4",
                "./assets/phone.webm",
                "./assets/tape.webm",

                "./assets/Front(1).mp4",
            ],

            img: [
                "./assets/06_3D_BTCFlower.png",
                "./assets/08_3D_Receipt.png",
                "./assets/11_3D_Column.png",
                "./assets/Lifestyle_04.png",
            ],
        }


function domLink(arg, type='.'){
        let link = document.querySelector(type+arg)
        return link
}



 function addMedia(parent) {

    for (let type in items) {
        console.log(type)
        items[type].forEach((src) => {
            let elementcont = document.createElement("div");
            elementcont.classList.add("elementCont");
            let element = document.createElement(type);
            element.classList.add("item", type + "item");
            element.src = src;

                if (type == "video") {
                    element.muted = true;
                    element.loop = true;
                }
            elementcont.append(element);
            if (!mediaContent.includes(element)){
            mediaContent.push(element)} // для прелоадера
            parent.append(elementcont);
        });
    }
    
}



export function init(){
    

    addMedia(domLink('cont1'));
    addMedia(domLink('cont1'));

    new GlobalListeners();
}
