import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import styles from './index.css';

const style = {
    0: 'left',
    1: 'center',
    2: 'right'
}

let timer = null;

const ReactBanners = forwardRef((props, ref) => {

    const { imageDatas, dots = true, dotPosition = "outset", getImageInfo, goTo, autoPlay = false, delay = 2000 } = props;

    useImperativeHandle(ref, () => ({
        index: selectItem,
        next: handleTurnRight,
        prev: handleTurnLeft,
        goTo: handleTurn
    }))

    const [loop, setLoop] = useState(0); // 0 1 2 用来判断位置
    const [selectItem, setSelectItem] = useState(0); // 当前选中
    const [len, setLen] = useState(0);// 当前数据长度
    const [showData, setShowData] = useState([]); //  当前展示data
    const [selectDatas, setSelectDatas] = useState([]); // 当前展示data以自定义排列
    const [isShowBtn, setIsShowBtn] = useState(false); // 是否显示左右箭头
    const [isClick, setIsClick] = useState(false); // 是否点击 防止重复点击

    useEffect(() => {
        setLen(imageDatas.length);
        return function () {
            clearInterval(timer);
        }
    }, []);

    useEffect(() => {
        setShowData([imageDatas[len - 1]].concat(imageDatas.slice(0, 2)));
        setSelectDatas([imageDatas[len - 1]].concat(imageDatas.slice(0, 2)));
    }, [len]);

    function handleTurnRight(num) {
        setIsClick(true);
        clearInterval(timer);
        setLoop(loop - 1 < 0 ? 2 : loop - 1);
        setSelectItem(num + 1 > len - 1 ? 0 : num + 1);
        setShowData(
            [
                imageDatas[num > len - 1 ? num - len : num],
                imageDatas[num + 1 > len - 1 ? num + 1 - len : num + 1],
                imageDatas[num + 2 > len - 1 ? num + 2 - len : num + 2]]
        );
        setTimeout(() => {
            setIsClick(false)
        }, 500);
    }

    function handleTurnLeft(num) {
        setIsClick(true);
        clearInterval(timer);
        setLoop(loop + 1 > 2 ? 0 : loop + 1);
        setSelectItem(num - 1 < 0 ? len - 1 : num - 1);
        setShowData(
            [
                imageDatas[num - 2 < 0 ? num - 2 + len : num - 2],
                imageDatas[num <= 0 ? len - 1 : num - 1],
                imageDatas[num < 0 ? len - 1 : num]
            ]
        );
        setTimeout(() => {
            setIsClick(false)
        }, 500);
    }

    //鼠标移入事件
    function handleMouseOver() {
        setIsShowBtn(true);
    }

    //鼠标移出事件
    function handleMouseOut() {
        setIsShowBtn(false);
    }

    //指示灯点击
    function handleTurn(index) {
        const chooseIndex = index < 0 ? 0 : index > len - 1 ? len - 1 : index;
        chooseIndex > selectItem ? handleTurnRight(chooseIndex - 1) : handleTurnLeft(chooseIndex + 1);
    }

    useEffect(() => {
        let setData = [];
        switch (loop) {
            case 0:
                setData = [showData[0], showData[1], showData[2]];
                break;
            case 1:
                setData = [showData[1], showData[2], showData[0]];
                break;
            case 2:
                setData = [showData[2], showData[0], showData[1]];
                break;
            default:
                break;
        }
        setSelectDatas(setData);
        clearInterval(timer);
        if (autoPlay) {
            timer = setInterval(() => {
                handleTurnRight(selectItem);
            }, delay);
        }
    }, [showData]);

    return (
        <div ref={ref} className={styles.imgItems}>
            {
                selectDatas && selectDatas[0] !== undefined && selectDatas.map((item, index) => {
                    const thisIndex = style[(loop + index) % 3];
                    return <div
                        key={index}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                        className={`${styles.run} ${styles[thisIndex]}`}
                        style={{ backgroundImage: `url(${item.imgUrl})` }}
                        onClick={() => { getImageInfo && getImageInfo(item) }}
                    />
                })
            }
            <div className={`${styles.leftCover} ${styles.left}`} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
            <div className={`${styles.rightCover} ${styles.right}`} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
            {
                dots && <div className={styles.btns} style={{ top: dotPosition === 'inset' ? '15.5vw' : '20vw' }}>
                    {
                        len > 0 && Array.from({ length: len }).map((item, index) => {
                            return <div onClick={() => { handleTurn(index) }} key={index} className={`${styles.btn} ${index === selectItem ? styles.activeBtn : ''}`} />
                        })
                    }
                </div>
            }

            <button
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                className={`${styles.turnBtn} ${styles.leftBtn} ${(isShowBtn && !isClick) ? styles.showBtn : ''}`}
                onClick={() => handleTurnLeft(selectItem)}
            >{`<`}</button>
            <button
                onMouseOver={handleMouseOver}
                className={`${styles.turnBtn} ${styles.rightBtn} ${(isShowBtn && !isClick) ? styles.showBtn : ''}`}
                onClick={() => handleTurnRight(selectItem)}
            >{`>`}</button>
        </div>
    )
});

export default ReactBanners;
