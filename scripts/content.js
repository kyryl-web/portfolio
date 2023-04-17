import {data} from "./data.js";

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
      <div class="big-img-wrapper">
        <img class="big-img" src="${bigImg}"/>
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

    document.querySelector('.big-img').addEventListener('click', (e) => {
      const overlay = document.querySelector('.overlay');
      let img = document.createElement('img');
      img.setAttribute('src', bigImg);
      img.style.cssText = `
        width: 50%;
        display: block;
        margin: 0 auto;
      `;

      overlay.style.display = 'flex';

      overlay.appendChild(img);
    });
  }

  const overlay = document.querySelector('.overlay');

  overlay.addEventListener('click', (e) => {
    overlay.style.display = 'none';
    overlay.querySelector('img').remove();
  });
  
  window.addEventListener('popstate', (e) => {
    checkHash();
  })

  function checkHash() {

    console.log(location.hash)
    main.innerHTML = '';
    
    let lang = localStorage.getItem('lang') || 'en';

    if (location.hash == '' || location.hash == '#/') {
      generateCards(data, lang);
      document.title = 'Portfolio'
    } else {
      const id = location.hash.replace(/\D/g, '');
      generateCard(data, id, lang);
    }
  }
    
    checkHash();
    window.checkHash = checkHash;


}


  export default content;