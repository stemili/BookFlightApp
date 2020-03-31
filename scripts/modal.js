const cards = document.querySelectorAll('.slider-card');
const modalWindow = document.getElementById('modal-win');

const closeBtn = document.getElementById('close-modal-btn')

cards.forEach(element => {
    element.addEventListener('click', handleModalIn);
})

closeBtn.addEventListener('click', handleCloseBtn);

function handleModalIn(e){
    modalWindow.classList.add('modal-active');
}

function handleCloseBtn(e){
    modalWindow.classList.remove('modal-active');
}