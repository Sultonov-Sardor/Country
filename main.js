let elList = document.querySelector('.js-list');
let elMode = document.querySelector('.js-mode');
let elInput = document.querySelector('.js-input');
let elSelect = document.querySelector('.js-select');
let elTemplate = document.querySelector('.js-template').content;
let elFragment = document.createDocumentFragment();

let region;

async function davlatlar(){
  const response = await fetch('https://restcountries.com/v3.1/all');
  const data = await response.json();
  renderDavlatlar(data,elList);
  

  const newRegion = new Set(data.map((el) => el.region));

  for(region of newRegion){
    const elOption = document.createElement('option');
    elOption.textContent = region;
    elSelect.appendChild(elOption);
  }

  elSelect.addEventListener('change', (e) =>{
    region = elSelect.value;
    
    async function filterRegion(){
      const response = await fetch(`https://restcountries.com/v3.1/region/${region}`);
      const data  = await response.json();
      renderDavlatlar(data,elList);
    }

    filterRegion();
  });

}
davlatlar();

function renderDavlatlar(array,node){
  node.innerHTML = '';
  array.forEach(element => {
    let elLi = elTemplate.cloneNode(true);
    let elImg = elLi.querySelector('.js-img');
    let elTitle = elLi.querySelector('.js-title');
    let elPopulation = elLi.querySelector('.population');
    let elCapital = elLi.querySelector('.capital');
    let elRegion = elLi.querySelector('.region');

    elImg.src = element.flags.svg;
    elTitle.textContent = element.name.common;
    elPopulation.textContent = `Population: ${element.population}`;
    elCapital.textContent = `Capital: ${element.capital}`;
    elRegion.textContent = `Region: ${element.region}`;

    elFragment.appendChild(elLi);
    // console.log(elLi)
  });

  node.appendChild(elFragment);
}

// search country 

let countryName;

elInput.addEventListener('input',() =>{
  if(elInput.value !== ''){
    countryName = elInput.value;
    search()
  }
})

async function search(){
  const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
  const data = await response.json();
  renderDavlatlar(data,elList);
}



let theme = false;

elMode.addEventListener('click',() => {
  theme =! theme;
  const bg = theme ? 'dark' : 'light';
  window.localStorage.setItem('theme',bg);
  ChangeTheme();
});

function ChangeTheme(){
  if(window.localStorage.getItem('theme') == 'dark'){
    document.querySelector('body').classList.add('dark');
    elList.classList.add('item-textColor');
  }else{
    document.querySelector('body').classList.remove('dark');
    elList.classList.remove('item-textColor');
  }
}

ChangeTheme();
