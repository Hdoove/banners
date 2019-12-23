import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import styles from './index.css';

const style = {
    0: 'left',
    1: 'center',
    2: 'right'
}

const ReactBanners = forwardRef((props, ref) => {

    const { imageDatas, dots = true, dotPosition = "outset", getImageInfo, next, prev } = props;

    useImperativeHandle(ref, () => ({
        index: selectItem,
        next: handleTurnRight,
        prev: handleTurnLeft
    }))

    const [loop, setLoop] = useState(0); // 0 1 2 用来判断位置
    const [selectItem, setSelectItem] = useState(0); // 当前选中
    const [len, setLen] = useState(0);
    const [showData, setShowData] = useState([]);
    const [selectDatas, setSelectDatas] = useState([]);
    const [isShowBtn, setIsShowBtn] = useState(false);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        setLen(imageDatas.length);
        // setTimer(setInterval(() => {
        //     handleTurnLeft(selectItem);
        // }, 1000));
        // return function () {
        //     clearTimeout(timer);
        // }
    }, []);

    useEffect(() => {
        setShowData([imageDatas[len - 1]].concat(imageDatas.slice(0, 2)));
        setSelectDatas([imageDatas[len - 1]].concat(imageDatas.slice(0, 2)));
    }, [len])

    function handleTurnRight(num) {
        setLoop(loop - 1 < 0 ? 2 : loop - 1);
        setSelectItem(num + 1 > len - 1 ? 0 : num + 1);
        setShowData(
            [
                imageDatas[num > len - 1 ? num - len : num],
                imageDatas[num + 1 > len - 1 ? num + 1 - len : num + 1],
                imageDatas[num + 2 > len - 1 ? num + 2 - len : num + 2]]
        );
    }

    function handleTurnLeft(num) {
        setLoop(loop + 1 > 2 ? 0 : loop + 1);
        setSelectItem(num - 1 < 0 ? len - 1 : num - 1);
        setShowData(
            [
                imageDatas[num - 2 < 0 ? num - 2 + len : num - 2],
                imageDatas[num <= 0 ? len - 1 : num - 1],
                imageDatas[num < 0 ? len - 1 : num]
            ]
        );
    }

    //鼠标移入事件
    function handleMouseOver() {
        setIsShowBtn(true);
    }

    //鼠标移出事件
    function handleMouseOut() {
        setIsShowBtn(false);
        // setTimer(setInterval(() => handleTurnLeft(selectItem), 2000));
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
    }, [showData]);

    return (
        <div className="App" ref={ref}>
            <div className={styles.imgItems}>
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
            </div>
            {
                dots && <div className={styles.btns} style={{ top: dotPosition === 'inset' ? '15vw' : '21vw' }}>
                    {
                        len > 0 && Array.from({ length: len }).map((item, index) => {
                            return <div onClick={() => { index > selectItem ? handleTurnRight(index - 1) : handleTurnLeft(index + 1) }} key={index} className={`${styles.btn} ${index === selectItem ? styles.activeBtn : ''}`} />
                        })
                    }
                </div>
            }

            <button
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                className={`${styles.turnBtn} ${styles.leftBtn} ${isShowBtn ? styles.showBtn : ''}`}
                onClick={() => handleTurnLeft(selectItem)}
            >{`<`}</button>
            <button
                onMouseOver={handleMouseOver}
                className={`${styles.turnBtn} ${styles.rightBtn} ${isShowBtn ? styles.showBtn : ''}`}
                onClick={() => handleTurnRight(selectItem)}
            >{`>`}</button>
        </div>
    )
});

export default ReactBanners;
