window.addEventListener('DOMContentLoaded', () => {
  let path = 'https://kyryl-web.github.io/portfolio/'; // http://127.0.0.1:5500/ //https://kyryl-web.github.io/portfolio/
  window.path = path;
  const header = document.querySelector('header h1');
  const langsWrapper = document.querySelector('.langs-wrapper');
  const div = document.createElement('div');
  div.classList.add('langs');

  header.addEventListener('click', () => {
    if (location.hash !== '') {
      let hash = location.hash;
      console.log(hash)
      if (hash != '#/') {
        history.pushState(null, null, path+'#/');
      
        checkHash();
      }
    }
  });

  const langs = document.querySelector('.langs'),
          arrow = langs.querySelector('.arrow'),
          code = langs.querySelector('.code'),
          codeList = langs.querySelector('.langs-list'),
          codeListItem = document.querySelectorAll('.lang');

  code.textContent = localStorage.getItem('lang')?.toUpperCase() || 'EN';

  codeListItem.forEach(item => {
    item.addEventListener('click', (e) => {
      const target = e.target;
      const codeText = target.textContent;
      if (target && code.textContent != codeText) {
        code.textContent = codeText;
        localStorage.setItem('lang', codeText.toLowerCase());
        location.reload();
      } else {
          codeList.style.display = 'none';
      }
    })
  })

  langsWrapper.addEventListener('mouseenter', () => {
    arrow.classList.remove('down');
    arrow.classList.add('up');
    codeList.style.display = 'block';
  })

  langsWrapper.addEventListener('mouseleave', () => {
    arrow.classList.add('down');
    arrow.classList.remove('up');
    codeList.style.display = 'none';
  })
})