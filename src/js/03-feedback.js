import { throttle } from 'lodash';
// Підключаємо бібліотеку lodash.throttle

const formEl = document.querySelector('.feedback-form');
const emailEl = document.querySelector('input[name="email"]');
const messageEl = document.querySelector('textarea[name="message"]');
// Звертаємось до класу feedback-form
// Звертаємось до тегу input - name "email"
// Звертаємось до тегу textarea - name "message"
const LOCALSTORAGE_KEY = 'feedback-form-state';
// Присваємо ключ до сховища - рядок 'feedback-form-state'

formEl.addEventListener(
    'input',
    throttle(e => {
      const objectToSave = { email: emailEl.value, message: messageEl.value };
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(objectToSave));
    }, 500)
  );
// Відстежуємо подію input та записуємо у локальне сховище об'єкт з полями email і message, у яких зберігаємо поточні значення полів форми localStorage з оновленням в пів секунди (500 мс)

formEl.addEventListener('submit', e => {
    e.preventDefault();
    console.log({ email: emailEl.value, message: messageEl.value });
    formEl.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
  })

// Відстежуємо подію submit та видаляємо з хранилища

const load = key => {
    try {
      const serializedState = localStorage.getItem(key);
      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  };
  // Обробка помилок
  
  const storageData = load(LOCALSTORAGE_KEY);
  if (storageData) {
    emailEl.value = storageData.email;
    messageEl.value = storageData.message;
  }
  // Перевірка при загрузці сторінки
