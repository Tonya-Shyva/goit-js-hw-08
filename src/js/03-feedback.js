import { throttle } from 'lodash';

const formRef = document.querySelector('.feedback-form');
const inputEmailRef = document.querySelector("input[name='email']");
const messageRef = document.querySelector("textarea[name='message']");
const LOCALSTORAGE_KEY = 'feedback-from-state';

formRef.addEventListener(
  'input',
  throttle(e => {
    const objectToSave = {
      email: inputEmailRef.value,
      message: messageRef.value,
    };
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(objectToSave));
  }, 500)
);

formRef.addEventListener('submit', e => {
  e.preventDefault();
  console.log({
    email: inputEmailRef.value,
    message: messageRef.value,
  });
  formRef.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
});

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const storageData = load(LOCALSTORAGE_KEY);
if (storageData) {
  inputEmailRef.value = storageData.email;
  messageRef.value = storageData.message;
}

//---------Інше рішення----------------------------------

// const formRef = document.querySelector('.feedback-form');
// const inputEmailRef = document.querySelector('.feedback-form input');
// const textareaRef = document.querySelector('.feedback-form textarea');
// const LOCALSTORAGE_KEY = 'feedback-from-state';

// formRef.addEventListener('submit', onFormSubmit);
// textareaRef.addEventListener('input', throttle(onTextareaInput, 500));

// populateTextarea();

// function onFormSubmit(e) {
//   e.preventDefault(); //зупиняємо перезавантаження сторінки
//   e.currentTarget.reset(); // очищаємо введені дані користувача з форми
//   localStorage.removeItem(LOCALSTORAGE_KEY); //очищаємо зі сховища
// }

// function onTextareaInput(e) {
//   const objectToSave = {
//     email: inputEmailRef.value, // отримуємо значення введеного в поле email
//     message: messageRef.value, // отримуємо значення введеного в textarea
//   };
//   localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(objectToSave)); //зберігаємо в сховище
// }

// function populateTextarea() {
//   const savedMessage = localStorage.getItem(LOCALSTORAGE_KEY);

//   if (savedMessage) {
//     textareaRef.value = savedMessage; //оновлюємо DOM
//   }
// }
