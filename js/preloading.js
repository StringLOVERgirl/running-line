import { init } from './script.js'
// общий порядок таков

// - сбор медиаресурсов в массив
// создание функция createResourceLoadPromise котоаря возвращает промис - в
// теле промиса создается обработчик загрузки или ошибки который заврешает промис

// - создает массив промисос loadPromises он сражу запуска цикл котоыре 
// проходит по каждому элементу массива элементов вызывая на 
// нем createResourceLoadPromise т е для каждого элемента
//  создает обраотчик загрузки котоырй возвращает промис

// - далее этот промис обрабатывается по завершению в finally где
// увеличивается счетчик и расчитывается процент непонятно 

// и в общем на этом все

// далее у тебя еще стоит трай кетч но я не вижу
// в нем смысла скорее просто сообщить если одини или два элемента не загрузились
// т е я понимаю он нужен для того что бы отложить таймер
// пока не завершатся все промисы
// это все желательно в трай кетч на случай если что то не загрузится
// не блокировать код 
// после тоого как срабаывает промис ол запускается таймер 
window.addEventListener('DOMContentLoaded', onloaading)

async function onloaading() {
    init()
    const mediaContent = []
    const percent = document.querySelector('.percent')
    const preloadcont = document.querySelector('.preloadcont')

    document.querySelectorAll('img,video,audio').forEach(el => mediaContent.push(el))
    console.log(mediaContent)

    const total = mediaContent.length;
    let loadedCount = 0;
    let currentPercentage = 0

    function addPromise(element) {
        return new Promise(resolve => {

            let timeoutId;

            function done() {
                clearTimeout(timeoutId);
                resolve();
            }

            if (element.tagName == 'IMG') {
                if (element.complete && element.naturalWidth != 0) {
                    resolve()
                } else {
                    element.addEventListener('load', resolve, { once: true })
                    element.addEventListener('error', resolve, { once: true })
                    timeoutId = setTimeout(done, 2000)
                }
            } else {
                if (element.readyState >= 4) { // Проверка на загруженное видео/аудио (canplaythrough)
                    resolve();
                } else {
                    element.addEventListener('canplaythrough', resolve, { once: true })
                    element.addEventListener('error', resolve, { once: true })
                    timeoutId = setTimeout(done, 2000)
                }
            }
        })
    }

    let loadPromises = mediaContent.map(element => {
        return addPromise(element)
            .finally(() => {
                loadedCount++
                currentPercentage = Math.floor(loadedCount / total * 100)
                if (currentPercentage < 100){
                percent.textContent = currentPercentage + '%'}
                else {
                    percent.textContent = '99%' 
                }
            })
    })

    await Promise.all(loadPromises)
        setTimeout(() => {
            preloadcont.classList.add('hideLoadScrenn')
        }, 1000)
}