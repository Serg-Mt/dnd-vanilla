import './style.css'
// import javascriptLogo from './javascript.svg'
import { setupCounter } from './counter.js'

const
  ALL_EVENTS = 'dragstart dragend dragenter dragleave dragexit drop drag'.split(' '),
  textarea = document.querySelector('textarea'),
  draggables = document.querySelectorAll('[draggable]'),
  dropzones = document.querySelectorAll('.target');

// обязательный слушатель
draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', ev => {
    // e.dataTransfer.setData('text/plain', draggable.id);
    ev.target.classList.add('dragging');
  });
});

// необязательный слушатель
draggables.forEach(draggable => {
  draggable.addEventListener('dragend', ev => {
    ev.target.classList.remove('dragging');
  });
});

// обязательный слушатель
dropzones.forEach(dropzone => {
  dropzone.addEventListener('dragover', ev => {
    if (dropzone.querySelector('.dragging')) return; // проверяем чтоб не бросить туда где пока находится наш draggable
    ev.preventDefault(); // надо вызывать обязательно - иначе скинуть сюда будет нельзя!
    dropzone.classList.add('active') // по уму это надо делать в dragenter, но тут необходим поскольку странный порядок прихода dragenter dragleave при перероде на потомка
  });
});

// необязательный слушатель
dropzones.forEach(dropzone => {
  dropzone.addEventListener('dragleave', ev => {
    dropzone.classList.remove('active');
  });
});

dropzones.forEach(dropzone => {
  dropzone.addEventListener('drop', ev => {
    const 
      draggable = document.querySelector('.dragging'); // document.getElementById(ev.dataTransfer.getData("text/plain"))
    if (draggable) {
      dropzone.append(draggable);
      dropzone.classList.remove('active');
    }
  });
});

// draggables.forEach(draggable => {
//   ALL_EVENTS.forEach(event => {
//     draggable.addEventListener(event, e => {
//       log('draggables', e.type, e.target.tagName, e.target.className);
//     });
//   });
// });

// dropzones.forEach(dropzone => {
//   ALL_EVENTS.forEach(event => {
//     dropzone.addEventListener(event, e => {
//       if (e.target !== e.currentTarget) return;
//       log('dropzones', e.type, e.target.tagName, e.target.className);
//     });
//   });
// });


function log(...args) {
  textarea.value += args.join(' ') + '\n';
}


textarea.addEventListener('dblclick', () => {
  textarea.value = '';
});




