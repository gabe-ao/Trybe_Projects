const btnLogin = document.querySelector('.btn-login');
const btnSubmit = document.querySelector('#submit-btn');
const checkVerification = document.querySelector('#agreement');
let checkMark = checkVerification.checked;
const textArea = document.getElementById('textarea');
const counterText = document.getElementById('counter');
const form = document.getElementById('evaluation-form');
const submitReport = document.createElement('p');

function emailPassVerification(event) {
  const pass = document.querySelector('.input-pass-login');
  const passValue = pass.value;
  const email = document.querySelector('.input-email-login');
  const emailValue = email.value;

  event.preventDefault();

  if (emailValue === 'tryber@teste.com' && passValue === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
}

btnLogin.addEventListener('click', emailPassVerification);

function submitBtnAvaliable() {
  if (checkMark === false) {
    checkMark = true;
  } else {
    checkMark = false;
  }

  if (checkMark === true) {
    btnSubmit.removeAttribute('disabled');
  } else {
    btnSubmit.setAttribute('disabled', true);
  }
}
checkVerification.addEventListener('click', submitBtnAvaliable);

function tradeBtnSubmit() {
  btnSubmit.setAttribute('disabled', true);
}

/* Função para contar caracteres da caixa de texto dos comentários */
function countingText() {
  const charCounter = 500 - textArea.value.length;
  counterText.innerText = `${charCounter}`;
}
textArea.addEventListener('keyup', countingText);

/* Função para apagar o formulário (requesito 21) */
function eraseForm() {
  const { children } = form;
  while (children.length !== 0) {
    children[0].remove();
  }
}

/* Funções para armazenar as respostas do usuario */
function reportRating() {
  const rate = document.querySelectorAll('.radio-rate');
  for (let cont = 0; cont < rate.length; cont += 1) {
    if (rate[cont].checked) {
      submitReport.innerHTML += `<br>Avaliação: ${rate[cont].value}`;
    }
  }
  submitReport.innerHTML += `<br>Observações: ${textArea.value}`;
  eraseForm();
  form.appendChild(submitReport);
}

function reportSubjects() {
  const subjects = document.querySelectorAll('.subject');
  submitReport.innerHTML += '<br>Matérias: ';
  for (let cont = 0; cont < subjects.length; cont += 1) {
    if (subjects[cont].checked) {
      submitReport.innerHTML += `${subjects[cont].value}, `;
    }
  }
  reportRating();
}

function reportFamily() {
  const family = document.querySelectorAll('#form-family input');
  for (let cont = 0; cont < family.length; cont += 1) {
    if (family[cont].checked) {
      submitReport.innerHTML += `<br>Família: ${family[cont].value}`;
    }
  }
  reportSubjects();
}

function reportID(event) {
  event.preventDefault();
  const firstName = document.getElementById('input-name');
  const lastName = document.getElementById('input-lastname');
  const formEmail = document.getElementById('input-email');
  const house = document.getElementById('house');

  submitReport.innerHTML = `Nome: ${firstName.value} ${lastName.value}`;
  submitReport.innerHTML += `<br>Email: ${formEmail.value}`;
  submitReport.innerHTML += `<br>Casa: ${house.value}`;
  reportFamily();
}
btnSubmit.addEventListener('click', reportID);

window.onload = tradeBtnSubmit;
