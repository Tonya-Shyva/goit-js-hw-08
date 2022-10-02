import { throttle } from 'lodash';

// const formRef = document.querySelector('.feedback-form');
// const inputEmailRef = document.querySelector("input[name='email']");
// const messageRef = document.querySelector("textarea[name='message']");
// const LOCALSTORAGE_KEY = 'feedback-from-state';

// const load = key => {
//   try {
//     const serializedState = localStorage.getItem(key);
//     return serializedState === null ? undefined : JSON.parse(serializedState);
//   } catch (error) {
//     console.error('Get state error: ', error.message);
//   }
// };

// const storageData = load(LOCALSTORAGE_KEY);
// if (storageData) {
//   inputEmailRef.value = storageData.email;
//   messageRef.value = storageData.message;
// }

// formRef.addEventListener('input', throttle(onInputHandler, 500));

// function onInputHandler() {
//   const objectToSave = {
//     email: inputEmailRef.value,
//     message: messageRef.value,
//   };
//   localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(objectToSave));
// }

// formRef.addEventListener('submit', onSubmit);

// function onSubmit(e) {
//   e.preventDefault();
//   console.log({
//     email: inputEmailRef.value,
//     message: messageRef.value,
//   });
//   formRef.reset();
//   localStorage.removeItem(LOCALSTORAGE_KEY);
// }

//---------Інше рішення----------------------------------

const formRef = document.querySelector('.feedback-form');
const inputEmailRef = document.querySelector('.feedback-form input');
const textareaRef = document.querySelector('.feedback-form textarea');
const LOCALSTORAGE_KEY = 'feedback-from-state';

formRef.addEventListener('submit', onFormSubmit);
formRef.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();

function onFormSubmit(e) {
  e.preventDefault(); //зупиняємо перезавантаження сторінки
  console.log({
    email: inputEmailRef.value,
    message: textareaRef.value,
  });
  e.currentTarget.reset(); // очищаємо введені дані користувача з форми
  localStorage.removeItem(LOCALSTORAGE_KEY); //очищаємо зі сховища за даним ключем
}

function onTextareaInput(e) {
  const objectToSave = {
    email: inputEmailRef.value, // отримуємо значення введеного в поле email
    message: textareaRef.value, // отримуємо значення введеного в textarea
  };
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(objectToSave)); //зберігаємо в сховище
}

// ----функція для збереження записаних даних користувача у форму до сабміта(щоб не втрачався введений текст, якщо користувач до сабміту покинув цю сторінку)-------------
function populateTextarea() {
  const savedMessage = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

  if (savedMessage) {
    inputEmailRef.value = savedMessage.email;
    textareaRef.value = savedMessage.message;
  }
}
