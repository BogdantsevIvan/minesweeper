import { useEffect, useState } from 'react';
import '../styles/table.css';



const Table = (props) => {
    const Mine = -1;
    const Size = 16;
    const dim = new Array(Size).fill(null);
    var [countOpen, setCountOpen] = useState(0);//количество верных открытых ячеек
    var [Bomb, setBomb] = useState(10000);

    let [field, setFieald] = useState(() => createField(Size, 0));
    let [itemsCondition, setItemsCondition] = useState(() => createField(Size));//состояние элемента таблицы
    //ячейка закрыта-0, открыта-1, поставлен флаг-2, поставлен вопрос-3

    function isStarted() {//функция проверки начала игры
        let start = true;
        if (props.isWin === false && props.isLoss === false && props.onMouseClick === false) {
            start = false;
            props.setRestart(false);
        }
        return start;
    }

    useEffect(() => {
        if (props.restart) {//обнуление стилей и значения при перезапуске игры
            setCountOpen(countOpen => 0);
            for (let i = 0; i < 16; i++) {
                for (let j = 0; j < 16; j++) {
                    document.getElementById(j + i * Size).removeAttribute('style');
                    field[i * Size + j] = 0;
                    itemsCondition[i * Size + j] = 0;
                }
            }
            return;
        }
    }, [props.restart, field, itemsCondition, Size])

    useEffect(() => {//обновление стилей при победе или поражении
        if (props.isWin || props.isLoss) {
            for (let i = 0; i < 16; i++) {
                for (let j = 0; j < 16; j++) {
                    if (props.isWin) {
                        if (field[i * Size + j] === Mine) {
                            document.getElementById(j + i * Size).setAttribute('style',
                                'background-position: -34px -50px');
                            itemsCondition[i * Size + j] = 2;
                        }
                    } else {
                        if (field[i * Size + j] === Mine && itemsCondition[i * Size + j] !== 2 && Bomb !== i * Size + j) {
                            document.getElementById(i * Size + j).setAttribute('style',
                                'background-position: -85px -50px');
                        }
                        if (((itemsCondition[i * Size + j]) === 2 || itemsCondition[i * Size + j] === 3) && field[i * Size + j] !== Mine) {
                            document.getElementById(i * Size + j).setAttribute('style',
                                'background-position: -119px -50px');
                        }
                    }
                }
            }
        }
    }, [props.isWin, props.isLoss, Bomb, Mine, itemsCondition, field])

    function createField(Size) {//создание массива со значениями элементов таблицы
        //значение мина:-1, число-количество мин в соседней клетке
        const Field = new Array(Size ** 2).fill(0);
        return Field;
    }

    function generateField(Field, xcord, ycord) {//заполнение таблицы значений

        function updateCountMines(x, y) {
            if ((x >= 0) && (x < Size) && (y >= 0) && (y < Size)) {
                if (Field[y * Size + x] === Mine) return;
                Field[y * Size + x] += 1;
            }
        }

        for (let i = 0; i < 40;) {
            const x = Math.floor(Math.random() * Size);
            const y = Math.floor(Math.random() * Size);
            if ((Field[y * Size + x] === Mine) || (x === xcord && y === ycord)) continue;
            Field[y * Size + x] = Mine;
            i += 1;
            updateCountMines(x - 1, y - 1);
            updateCountMines(x - 1, y);
            updateCountMines(x - 1, y + 1);
            updateCountMines(x, y - 1);
            updateCountMines(x, y + 1);
            updateCountMines(x + 1, y - 1);
            updateCountMines(x + 1, y);
            updateCountMines(x + 1, y + 1);
        }
        return Field;
    }

    function openItemBg(zeroItems, x, y) {//добавление элементов в массив для открытия
        if ((x >= 0) && (x < Size) && (y >= 0) && (y < Size)) {
            zeroItems.push(x);
            zeroItems.push(y);
        }
        return;
    }

    function isOpen(x, y) {//проверка на допустимость открытия ячейки
        let buf = false;
        if (itemsCondition[y * Size + x] === 1 || itemsCondition[y * Size + x] === 2
            || itemsCondition[y * Size + x] === 3 || props.isWin || props.isLoss) {
            buf = true;
        }
        return buf;
    }

    function updateBGAndCondition(x, y) {//обновлениие стилей ячеек при их открытии

        if (field[y * Size + x] === Mine) {
            if (!props.isLoss) {
                setBomb(prev => y * Size + x);
                document.getElementById(y * Size + x).setAttribute('style',
                    'background-position: -102px -50px');
            }
            props.setIsLoss(true);
            return;
        }
        let zeroItems = [];
        openItemBg(zeroItems, x, y);

        while (zeroItems.length) {
            const y = zeroItems.pop();
            const x = zeroItems.pop();
            if (isOpen(x, y)) continue;
            if (field[y * Size + x] === 0) {
                document.getElementById(x + y * Size).setAttribute('style',
                    'background-position: -17px -50px');
                openItemBg(zeroItems, x - 1, y);
                openItemBg(zeroItems, x, y - 1);
                openItemBg(zeroItems, x + 1, y);
                openItemBg(zeroItems, x, y + 1);
            } else {
                document.getElementById(x + y * Size).setAttribute('style',
                    'background-position:' + (-17) * (field[y * Size + x] - 1) + 'px -67px');
            }
            itemsCondition[y * Size + x] = 1
            setCountOpen(countOpen => countOpen + 1);
        }
        if (countOpen >= Size ** 2 - 41) {
            props.setIsWin(true);
        }
        return;
    }

    function setFlagOrQuestion(x, y) {//обновление стилей ячеек при постановке знака вопроса и флага
        if (itemsCondition[y * Size + x] === 1 || props.isWin || props.isLoss) return;
        if (itemsCondition[y * Size + x] === 0) {
            document.getElementById(x + y * Size).setAttribute('style',
                'background-position: -34px -50px');
            itemsCondition[y * Size + x] = 2;
        } else if (itemsCondition[y * Size + x] === 2) {
            document.getElementById(x + y * Size).setAttribute('style',
                'background-position: -51px -50px');
            itemsCondition[y * Size + x] = 3;
        } else if (itemsCondition[y * Size + x] === 3) {
            document.getElementById(x + y * Size).setAttribute('style',
                'background-position: 0px -50px');
            itemsCondition[y * Size + x] = 0;
        }
    }

    return (
        <div className='table__conteiner'>
            {dim.map((_, y) => {
                return (<div key={y}>
                    {dim.map((_, x) => {
                        return (<div key={x} id={x + y * Size} className="table__item"
                            onMouseDown={(e) => {
                                if (e.button === 0) {//левая кнопка мыши
                                    props.setOnMousePush(true)
                                } else if (e.button === 2 && itemsCondition[y * Size + x] === 3) {
                                    //правая кнопка
                                    document.getElementById(x + y * Size).setAttribute('style',
                                        'background-position: -68px -50px');
                                }

                            }}
                            onClick={() => {
                                props.setOnMousePush(false);
                                if (isStarted() === false) {
                                    field = generateField(field, x, y);
                                    props.setOnMouseClick(true);
                                }
                                updateBGAndCondition(x, y)
                            }}
                            onContextMenu={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setFlagOrQuestion(x, y)
                            }}>
                            {field[y * Size + x]}
                        </div>)
                    })}
                </div>)
            }
            )}
        </div >
    )
}

export default Table
