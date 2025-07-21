export class GlobalListeners {
    constructor() {
        this.currentTarget = null;
        this.addListeners();
    }

    addListeners() {
        window.addEventListener("mouseout", (event) => {
            if (event.target.tagName == "VIDEO") {
                event.target.pause();
            }
        });

        window.addEventListener("mouseover", (event) => {
            let target = event.target;
            this.currentTarget = target;
            console.log(target);
            if (target.tagName == "VIDEO") {
                target.play();
            }
        });
    }
}
// new GlobalListeners();



export const items = {
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
};

const cont1 = document.querySelector(".cont1");
const cont2 = document.querySelector(".cont2");

export function addMedia(parent) {
    for (let type in items) {
        items[type].forEach((src) => {
            let elementcont = document.createElement("div");
            elementcont.classList.add("elementCont");
            let element = document.createElement(type);
            element.classList.add("item", type + "item");
            element.src = src;

            if (src)
                if (type == "video") {
                    element.muted = true;
                    element.loop = true;
                }
            elementcont.append(element);
            parent.append(elementcont);
        });
    }
}

// addMedia(cont1);
// addMedia(cont2);

export class CloneContent {
    constructor() {
        this.line_length;

        this.cont1 = {
            element: document.querySelector(".cont1"),
            active: true,
            count: 0,
            css: "--translateX",
        };

        this.cont2 = {
            element: document.querySelector(".cont2"),
            active: false,
            count: 0,
            css: "--translateX2",
        };
    }

    animateconts = (element1, element2) => {
        function logic(el, el2) {
            let rect = el.element.getBoundingClientRect();
            let left = rect.right - window.innerWidth;

            if (el.active) {
                el.count -= 1;

                if (rect.right < 0) {
                    el.element.classList.remove("conton");
                    el.element.classList.add("contoff");
                    el.active = false;
                    el.count = 0;
                }
                if (left < 0 && !el2.active) {
                    el2.active = true;
                    el2.element.classList.add("conton");
                    el2.element.classList.remove("contoff");
                    document.documentElement.style.setProperty(el2.css, el2.count + "px"
                    );
                }
                document.documentElement.style.setProperty(el.css, el.count + "px");
            }
        }

        logic(element1, element2);
        logic(element2, element1);

        requestAnimationFrame(() =>
            this.animateconts.call(this, element1, element2)
        );
    };

    init = () => {
        this.animateconts(this.cont1, this.cont2);
    };
}

export function inti(arg, arg2){
    new GlobalListeners();

    addMedia(arg);
    addMedia(arg2);

    new CloneContent().init()
}
// new CloneContent().init();