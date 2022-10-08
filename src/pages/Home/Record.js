import {memo} from 'react';
import style from '~/assets/css/record.module.css';
function Record({records}){
    // console.log( records);
    return <div className={style.container}>
        {
            records.map((record, index) => {
                return <div key={index} className={style.video}>
                    <img alt='text' className={style.image} src={record.url} />
                    <div className='px-3'>
                        <div className={`${style.description1} ${style.border}`}>
                            <p className={style.level}>{record.level}</p>
                            <p className={style.view}>{record.uploaded_at}</p>
                        </div>
                    </div>
                    <div className={style.description1}>
                        <p className={style.topic}>{record.topic}</p>
                        <p className={`${style.topic} ${style.topic2}`}>{record.level}</p>
                    </div>
                    <div className={style.description1}>
                        <p className={style.topic}><i className={`fa-solid fa-user ${style.iconWatching}`}> </i>{record.teacher_name}</p>
                        <p className={`${style.topic} ${style.topic2}`}>{record.level}</p>
                    </div>
                </div>
            })
        }
    </div>
}
export default memo(Record);