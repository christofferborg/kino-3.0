import './sass/main.scss';


async function loadHeader() {
  const response = await fetch('/partials/header.html');
  const html = await response.text();
  document.querySelector('.header-container').innerHTML = html;
}

loadHeader();