import { useState, useEffect } from 'react';
import '../styles/navbar.css';



const Navbar = (props) => {

    const [timeLeft, setTimeLeft] = useState(40 * 60);
    const minutes = Math.floor(timeLeft / 60);
    const minute1 = Math.floor(minutes / 10);
    const minute2 = minutes % 10;
    const seconds1 = Math.floor((timeLeft - minutes * 60) / 10);
    const seconds2 = (timeLeft - minutes * 60) % 10;

    useEffect(() => {//запуск и остановка таймера, обновление состояния поражения
        if (props.restart) {
            setTimeLeft(40 * 60);
            return;
        }
        if (timeLeft === 0) {
            props.setIsLoss(true);
            return
        }
        const interval = setInterval(() => {
            if (props.onMouseClick && !props.isWin && !props.isLoss) {
                setTimeLeft((timeLeft) => (timeLeft >= 1 ? timeLeft - 1 : 0))
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, [props.isLoss, props.restart, props.isWin, props.onMouseClick, props.setIsLoss, timeLeft])

    useEffect(() => {//обновление стилей смайла при победе, поражении и нажатии
        if (props.isWin) {
            document.getElementsByClassName('smile-bottom')[0].setAttribute('style',
                'background-position-x: -81px');
        } else if (props.isLoss) {
            document.getElementsByClassName('smile-bottom')[0].setAttribute('style',
                'background-position-x: -108px');
        } else {
            if (props.onMousePush) {
                document.getElementsByClassName('smile-bottom')[0].setAttribute('style', 'background-position-x: -54px');
            } else {
                document.getElementsByClassName('smile-bottom')[0].setAttribute('style', 'background-position-x: 0px');
            }
        }
    }, [props.onMousePush, props.isWin, props.isLoss])


    return (
        <div className='navbar__conteiner'>
            <div className='timer'>
                <div className='timer__item'
                    style={{ backgroundPositionX: -126 + `px` }}
                ></div>
                <div className='timer__item'
                    style={{
                        backgroundPositionX: minute1 !== 0 ?
                            (minute1 - 1) * (-14) + `px`
                            : -126 + `px`
                    }}
                ></div>
                <div className='timer__item'
                    style={{
                        backgroundPositionX: minute2 !== 0 ?
                            (minute2 - 1) * (-14) + `px`
                            : -126 + `px`
                    }}
                ></div>
            </div>
            <div className='smile-bottom'
                onMouseDown={() => {
                    document.getElementsByClassName('smile-bottom')[0].setAttribute('style',
                        'background-position-x: -27px');
                }}
                onClick={() => {
                    document.getElementsByClassName('smile-bottom')[0].setAttribute('style',
                        'background-position-x: 0px');
                    props.setRestart(true);
                    props.setIsLoss(false);
                    props.setIsWin(false);
                    props.setOnMouseClick(false);
                }}
            ></div>
            <div className='timer'>
                <div className='timer__item'
                    style={{ backgroundPositionX: -126 + `px` }}
                ></div>
                <div className='timer__item'
                    style={{
                        backgroundPositionX: seconds1 !== 0 ?
                            (seconds1 - 1) * (-14) + `px`
                            : -126 + `px`
                    }}
                ></div>
                <div className='timer__item'
                    style={{
                        backgroundPositionX: seconds2 !== 0 ?
                            (seconds2 - 1) * (-14) + `px`
                            : -126 + `px`
                    }}
                ></div>
            </div>
        </div >
    )
}

export default Navbar 