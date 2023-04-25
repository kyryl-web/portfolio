import {projectsData} from "./data.js";

const data = JSON.parse(JSON.stringify(projectsData));

const titles = {
  'marvel': 1,
  'emp': 2,
  'pictures': 3,
  'window': 4,
  'food': 5
}


for (let key in data) {
  data[key].sort((a, b) => {
    return titles[a.code] > titles[b.code] ? 1 : -1;
  })
}

const content = () => {
  const main = document.querySelector('.main .container .projects');

  function generateCards(data, lang) {

    data[lang].forEach(({img, title, description, features, url}, i) => {
      features = features.slice(0, 3);
      let hash = `#/project-${i+1}`;
      const wrapper = document.createElement('div');
      wrapper.classList.add('project');
  
      const list = document.createElement('ul');
      list.classList.add('project-features-list');
  
      features.forEach(text => {
        const listItem = document.createElement('li');
        listItem.classList.add('project-features-item');
        listItem.innerHTML = `${text}`;
        list.appendChild(listItem);
      })
  
      let text = description.length > 150 ? description.slice(0, 150) + '...' : null;
      wrapper.innerHTML = `
          <img class="project-img" src=${img} alt="project-${i+1}">
          <div class="project-content">
            <div class="project-title title">${title}</div>
            <div class="project-descr">${text ? text + `<a href=${hash} project=${i+1}>${lang == 'en' ? 'more' : 'більше'}</a>`: description}</div>
            <div class="title">${lang == 'en' ? 'Features' : 'Технології'}</div>
            <ul class="project-features">
              ${list.innerHTML + `<li><a href=${hash}>...</a></li>`}
            </ul>        
          </div>
          <a class="visit" href=${url} target="_blank">${lang == 'en' ? 'Visit site' : 'Відвідати сторінку'}</a>
      `;

      main.appendChild(wrapper);

      let elems = [wrapper.children[0], ...wrapper.querySelectorAll('.project-content a')];
      elems.forEach(item => {
        
        item.addEventListener('click', (e) => {
          e.preventDefault();
          history.pushState(null, null, path+hash);
          document.title = `Project ${i+1}`
          checkHash();
        })
      })
    })
  }

  function generateCard(data, id, lang) {

    const {bigImg, title, description, features, url} = data[lang].filter(item => item.id == id)[0];

    let div = document.createElement('div');
    div.classList.add('card');

    const list = document.createElement('ul');
    list.classList.add('project-features-list');

    features.forEach(text => {
      const listItem = document.createElement('li');
      listItem.classList.add('project-features-item');
      listItem.innerHTML = `${text}`;
      list.appendChild(listItem);
    })

    div.innerHTML = `
      <div class="big-img-wrapper" style="background-image: url(${bigImg})">
        <i class="fa-solid fa-magnifying-glass-plus" style="color: #000000;"></i>
      </div>
      <div class="visit-content">
        <div class="project-title">${title}</div>
        <div class="project-descr">${description}</div>
        <div class="title">${lang == 'en' ? 'Features' : 'Технології'}</div>
        <div class="card-items">
          <ul class="project-features">
            ${list.innerHTML}
          </ul>
          <a class="visit" href="${url}" target="_blank">${lang == 'en' ? 'Visit site' : 'Відвідати сторінку'}</a>
        </div>
      </div>
    `;

    main.appendChild(div);

    document.querySelector('.big-img-wrapper').addEventListener('click', (e) => {
      const overlay = document.querySelector('.overlay');
      let div = document.createElement('div');

      let img = document.createElement('img');
      img.setAttribute('src', bigImg);

      overlay.style.display = 'flex';

      div.append(img);
      overlay.appendChild(div);
      
      if (img.offsetHeight < 700) {
        div.style.height = img.offsetHeight + 'px';
        div.style.overflowY = 'initial'
      }
    });
  }

  const overlay = document.querySelector('.overlay');

  overlay.addEventListener('click', (e) => {
    overlay.style.display = 'none';
    overlay.querySelector('div').remove();
  });
  
  window.addEventListener('popstate', (e) => {
    checkHash();
  })

  function checkHash() {
    main.innerHTML = '';
    
    let lang = localStorage.getItem('lang') || 'en';

    if (location.hash == '' || location.hash == '#/') {
      generateCards(data, lang);
      document.title = 'Portfolio'
    } else {
      const id = location.hash.replace(/\D/g, '');
      for (let key in titles) {
        if (titles[key] == id) {
          for (let obj in data) {
            if (lang == obj) {
              let cardId = data[obj].filter(item => item.code == key)[0].id;
              generateCard(data, cardId, lang);
              break;
            }
          }
          break;
        }     
      }
    }
  }
    
    checkHash();
    window.checkHash = checkHash;
}


  export default content;