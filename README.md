<h1 align="center">MINSWEEPER GAME</h1>

---

Игра "Сапер", выполненная на react.js

# [Демоверсия](https://bogdantsevivan.github.io/minesweeper/)

# Установка

`gh repo clone BogdantsevIvan/minesweeper`

## Использование

В проекте используется 5 состояний:

```js
//App.js

const [onMouseClick, setOnMouseClick] = useState(false);//Отслеживает первый клик в текущей игре
const [onMousePush, setOnMousePush] = useState(false);//Отслеживает удержание кнопки мышки
const [isWin, setIsWin] = useState(false);
const [isLoss, setIsLoss] = useState(false);
const [restart, setRestart] = useState(false);

  ```
  
  # Компоненты

  Приложение содержит 2 компонента:

  ```js
  <Navbar/>
  <Table/>
  ```

  В компоненте Navbar содержится кнопка перезапуска игры и таймер обратного отсчета, где слева указываются минуты, а справа - секунды

  Компонент Table содержит в себе игровое поле и основную часть логики программы.


  # Основные функции

| Названи              | Параметры00000000   | Описание                           | 
| -------------------- | ------------------- | --------------------------------------- ------------------------------------------- | 
| `generateField`      | Field, xcord, ycord | Генерирует расположение мин на поле после клика по ячейке с координатми (xcord, ycord)|
|`updateBGAndCondition`| x, y | Обновляет стиль ячейки с координатами (x, y) и смежных ячеек, если исходная ячейка содержит 0      |
| `setFlagOrQuestion`  | x, y | Обновляет стиль ячейки с координатами (x, y) при клике правой кнопкой мышки                        |