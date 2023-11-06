let answer = ""; // сгенерированное слово
let answerState = ""; // состояние разгадываемого слова
let mistakesCount = 0; // количество допущенных ошибок
let lettersState; // состояние клавиатуры

startGame();

function startGame() {
  /* 
  1. сбросьте количество допущенных ошибок до нуля.
  2. сбросьте состояние клавиатуры в начальное состояние
  3. отрисуйте начальное состояние игрового персонажа
  4. отрисуйте состояние клавиатуры
  5. сгенерируйте новое слово (с помощью generateWord)
  */
  mistakesCount = 0;
  lettersState = getDefaultKeyboard();
  drawPerson(mistakesCount);
  drawBoard(lettersState);
  answer = generateWord();

  let startWordArray = [];
  for (let i = 0; i < answer.length; i++) {
    startWordArray.push("*");
  }
  answerState = startWordArray.join("");
  // answerState = new Array(answer.length).fill('*').join('');
  drawAnswerState(answerState);
}

function generateWord() {
  /*
  1. Сгенерируйте целое число от 0 до длины массива dictionary
  2. По сгенерированному числу получите элемент из массива dictionary. Этот элемент запишите в переменную answer
  3. Сгенерируйте строку с символами "*" длины сгенерированного слова. Полученная строка должна быть записана в answerState
  4. Отрисовывайте начальное состояние состояние отгаданного слова
  */
  let randomWordIndex = Math.trunc(Math.random() * dictionary.length);
  return dictionary[randomWordIndex];
}

function onKeyClick(letter) {
  /*
  1. Проверьте проигрыш игры.
  1.1. Если количество ошибок равно 7, то выводите конец игры. Дополнительно можно выводить неотгаданное слово.
  1.2. Начинайте новую игру.
  1.3. Остальные действия выполняйте, если игра не закончена

  2. В состоянии клавиатуры (lettersState) найдите кликнутый символ 
(letter). Найденый символ сохраняйте в отдельную переменную (например letterFromState)

  3. Проверьте: отсутствует ли кликнутый символ в ответе игры И не отмечен ли символ уже отмеченным как ошибочный (error)
  3.1. Увеличьте количество ошибок на 1
  3.2. Отметьте символ свойством `error`

  4. Проверьте: присутсвует ли кликнутый символ в ответе игры И не отмечен ли символ уже отмеченным как успешный (success)
  4.1. Отметьте символ свойством success
  4.2. Измените необходимые символы "*" на кликнутый символ. Изменения необходимо выполнять только символов, у которых позиция в ответе совпадает с позицией состояния.
  Пример: 
  - Состояние игры: '**********'
  - Загаданное слово: "фотография"
  - Пользователь кликает на "о"
  - Состояние должно измениться на: '*о*о******'
  - Пользователь кликает на "ф"
  - Состояние должно измениться на: 'фо*о***ф**'
  - Пользователь кликает на "т"
  - Состояние должно измениться на: 'фото***ф**'

  5. Перерисовывайте состояние игрока с текущим количеством жизней

  6. Перерисовывайте состояние клавиатуры

  7. Перерисовывайте состояние отгаданного слова

  8. Проверьте, совпадает ли состояние отгаданного слова с ответом игры
  8.1. Отображайте победу игрока, если пользователь угадал слово
  */

  if (mistakesCount === 7) {
    alert(
      `Вы проиграли!\nПравильное слово: ${answer}.\nНажмите ENTER, чтобы продолжить.`
    );
    startGame();
    return;
  }

  let letterFromState;
  for (let i = 0; i < lettersState.length; i++) {
    if (lettersState[i].char === letter) {
      letterFromState = lettersState[i];
      break;
    }
  }

  if (!answer.includes(letter) && !letterFromState.error) {
    mistakesCount++;
    letterFromState.error = true;
  }

  if (answer.includes(letter) && !letterFromState.success) {
    letterFromState.success = true;
    let tempWordArray = [];
    for (let i = 0; i < answer.length; i++) {
      tempWordArray.push(answer[i] === letter ? letter : answerState[i]);
    }
    answerState = tempWordArray.join("");
  }

  drawPerson(mistakesCount);
  drawBoard(lettersState);
  drawAnswerState(answerState);

  if (answer === answerState) {
    winGame();
  }
}
