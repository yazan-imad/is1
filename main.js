let explorwBtn = document.querySelector('.title .btn'),
HadithSection = document.querySelector('.qurn');
explorwBtn.addEventListener('click', ()=>{
    HadithSection.scrollIntoView({
        behavior : "smooth"
    })
})


let fixedNav = document.querySelector('.header');
window.addEventListener("scroll",()=>{
    window.scrollY > 100 ? fixedNav.classList.add('active'): fixedNav.classList.remove('active');
})

//hadith Changer
let hadithContainer = document.querySelector('.hadithContainer'),
next = document.querySelector('.buttons .next'),
prev = document.querySelector('.buttons .prev'),
number = document.querySelector('.buttons .number');

let hadithIndex = 0;
HadithChanger();
function HadithChanger(){
    fetch("https://api.hadith.gading.dev/books/muslim?range=1-300")
    .then(response =>response.json())
    .then(data =>{
        console.log(data);
        let Hadiths = data.data.hadiths;
        //console.log(Hadiths[hadithIndex].arab);
        changeHadith();
        next.addEventListener('click', ()=>{
            hadithIndex == 299 ? hadithIndex = 0 :hadithIndex++;
            console.log(hadithIndex);
            changeHadith()
        })


        prev.addEventListener('click', ()=>{
            hadithIndex == 0 ? hadithIndex = 299:hadithIndex--;
            console.log(hadithIndex);
            changeHadith()
        })


        function changeHadith(){

        hadithContainer.innerText = Hadiths[hadithIndex].arab;
        number.innerText = `300 - ${hadithIndex + 1}`
        }
    })
}


//Surah Api
let SurahsContainer =  document.querySelector('.surhasContainer')
getSurahs();
function getSurahs(){
    fetch("http://api.alquran.cloud/v1/meta")
    .then(response => response.json())
    .then(data=>{
       
       let surahs = data.data.surahs.references;
       // console.log(surahs);
       let numberOfSurahs = 114;
       SurahsContainer.innerHTML ="";
       for (let i= 0; i < numberOfSurahs; i++) {
        SurahsContainer.innerHTML +=
        ` <div class="surah">
        <p>${ surahs[i].name}</p>
        <p> ${surahs[i].englishName}</p>
    </div>`
       }
       let SurahsTitels = document.querySelectorAll('.surah');
       let popup = document.querySelector('.surah-popup'),
       AyatContainer = document.querySelector('.ayat');
       SurahsTitels.forEach((title, index)=> {       
          title.addEventListener('click', ()=>{
               fetch(`https://api.alquran.cloud/v1/surah/${index + 1 }`)
                   .then(response => response.json())
                   .then(data =>{
                       AyatContainer.innerHTML = "";
                       let Ayat = data.data.ayahs;
                       Ayat.forEach(aya =>{
                           popup.classList.add('active');
                           AyatContainer.innerHTML +=
                               `<p>(${aya.numberInSurah}) - ${aya.text} </p>`;
                       })
                   })

           })
       })
       let closepopup = document.querySelector('.close-popup');
       closepopup.addEventListener('click',()=>{
        popup.classList.remove('active');
       })
    })




}


let cards = document.querySelector('.cards');
getPrayTimes();
function getPrayTimes(){
    fetch(" http://api.aladhan.com/v1/timingsByCity?city=amman&country=jordan&method=8")
    .then(response => response.json())
    .then(data =>{
        let times = data.data.timings;
        cards.innerHTML = "";
        for(let time in times){
           // console.log(time);
           // console.log(times[time]);
            cards.innerHTML +=`
            <div class="circle">
                    <svg>
                        <Circle cx="100" cy="100" r="100"></Circle>
                    </svg>
                    <div class="praytime">${times[time]}</div>
                </div>
                <p>${time}</p>
            </div>
            `
        }
    })
}

let bars = document.querySelector('.bars'),
    sidebar = document.querySelector('.header ul');
    bars.addEventListener('click',()=>{
        sidebar.classList.toggle("active")
    }) 




let secitons = document.querySelectorAll("section"),
links = document.querySelectorAll('.header ul li');
links.forEach(link =>{
    link.addEventListener('click',()=>{
        document.querySelector('.header ul li.active').classList.remove('active');
        link.classList.add('active');
        let target = link.dataset.filter;
        //console.log(target);
        secitons.forEach(seciton=>{
            if(seciton.classList.contains(target)){
                seciton.scrollIntoView({
                    behavior: "smooth"
                })
            }
        })
    })
})

