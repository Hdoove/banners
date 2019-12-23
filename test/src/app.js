import React from 'react'
import {
    render
} from 'react-dom'
// import ReactDemo from 'react-banners-third';
// import 'react-banners-third/lib/main.min.css'; // ！需要引入样式！
import ReactDemo from '../../src'

const data = [{
        index: 0,
        imgUrl: 'http://p1.music.126.net/50-IECuAUbyVR_Jtq2DqWw==/109951164572416908.jpg'
    },
    {
        index: 1,
        imgUrl: 'http://p1.music.126.net/WW9cuR1ar7WEXfQcI5suWg==/109951164572427760.jpg'
    },
    {
        index: 2,
        imgUrl: "http://p1.music.126.net/mIgY5H5LWZ1MpuAsbfxjDA==/109951164573593575.jpg"
    },
    {
        index: 3,
        imgUrl: "http://p1.music.126.net/2hkUOZrE2XE8KVRupE5NBA==/109951164572899296.jpg"
    },
    {
        index: 4,
        imgUrl: "http://p1.music.126.net/eJ0EUCrOEg87DOC6wo8Tfw==/109951164572457204.jpg"
    },
    {
        index: 5,
        imgUrl: "http://p1.music.126.net/bsASX1aEufx117e1prHEEA==/109951164572463570.jpg"
    },
    {
        index: 6,
        imgUrl: "http://p1.music.126.net/y2MWDVhBvmtbsewsofKNbg==/109951164572915877.jpg"
    },
    {
        index: 7,
        imgUrl: "http://p1.music.126.net/7l1pUXXqQSKdG-PTPzJ_1w==/109951164572486175.jpg"
    },
    {
        index: 8,
        imgUrl: "http://p1.music.126.net/SbqGfnHj1Fgm-9c-PMalcQ==/109951164572487342.jpg"
    }
];

const App = () => < ReactDemo imageDatas = {
    data
}
/>
render( < App / > , document.getElementById('root'));