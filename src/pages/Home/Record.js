import {memo} from 'react';
import style from '~/asset/css/record.module.css';
function Record({records}){
    console.log( records);
    return <div className={style.container}>
        {
            records.map( (record, index)=>{
                console.log( record);
                return <div className={style.video}>
                    <img alt='text' className={style.image} src='https://cdn.pixabay.com/photo/2014/10/09/13/14/video-481821_960_720.png'/>
                    <div className={style.description1}>
                        <p className={style.level}>{record.name}</p>
                        <p className={style.view}>{record.date} date</p>
                    </div>
                </div>
            })
        }
    </div>
}
export default memo(Record);