import './sass/main.scss';
import { moviesData, loadMovies } from './API/moviesApi';

// Ladda header
async function loadHeader() {
  const response = await fetch('/partials/header.html');
  const html = await response.text();
  document.querySelector('.header-container').innerHTML = html;
}
loadHeader();


// Ladda filmer
const ourMovies = ['tt0099785', 'tt0107290', 'tt26443597', 'tt0108252', 'tt0118799', 'tt1675434', 'tt0137523', 'tt0114369'];

await loadMovies(ourMovies);
console.log(moviesData);