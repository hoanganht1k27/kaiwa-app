import {memo} from 'react';
import style from '~/assets/css/video.module.css';

function Video({videos}){
    console.log( videos);
    return <div className={style.container}>
        {
            videos.map( (video, index)=>{
                return <div className={style.video}>
                    <img alt='text' className={style.image} src='https://cdn.pixabay.com/photo/2014/10/09/13/14/video-481821_960_720.png'/>
                    <div className={`${style.description1} ${style.border}`}>
                        <p className={style.level}>{video.name}</p>
                        <p className={style.view}>{video.views} views</p>
                    </div>
                    {/* <div className={style.line}></div> */}
                    <div className={style.description1}>
                        <p className={style.topic}>{video.topic}</p>
                        <p className={`${style.topic} ${style.topic2}`}>{video.level}</p>
                    </div>
                    <div className={style.description1}>
                        <p className={style.topic}><i class="fa-solid fa-user"></i>{video.views} watching</p>
                        <p className={`${style.topic} ${style.topic2}`}>{video.level}</p>
                    </div>
                </div>
            })
        }
    </div>
}

export default memo(Video);