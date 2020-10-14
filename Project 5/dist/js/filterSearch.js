 const list = document.querySelector('.gallery a');
 const searchBar = document.forms ['search'].querySelector('input');
 searchBar.addEventListener('keyup', function(e) {
    const term = e.target.value.toLowerCase();
    const captions = list.getElementsByTagName('img');
 });