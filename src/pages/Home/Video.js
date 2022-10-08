import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '~/assets/css/video.module.css';

function Video({ videos }) {
    const navigate = useNavigate();
    return <div className={style.container}>
        {
            videos.map((video, index) => {
                return <div key={index} className={style.video} onClick={ ()=>{ navigate(`/video-detail/${video._id}`) }}>
                    <img alt='text' className={style.image} src={video.thumbnail_url} />
                    <div className='px-3'>
                        <div className={`${style.description1} ${style.border}`}>
                            <p className={style.level}>{video.name}</p>
                            <p className={style.view}>{video.views} views</p>
                        </div>
                    </div>
                    <div className={style.description1}>
                        <p className={style.topic}>{video.topic}</p>
                        <p className={`${style.topic} ${style.topic2}`}>{video.level}</p>
                    </div>
                    <div className={style.description1}>
                        <p className={style.topic}><i className={`fa-solid fa-user ${style.iconWatching}`}> </i>{video.views} watching</p>
                        <p className={`${style.topic} ${style.topic2}`}>{video.level}</p>
                    </div>
                </div>
            })
        }
    </div>
}

export default memo(Video);