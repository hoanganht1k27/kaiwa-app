import notfound from '~/assets/images/notfound.png'
import style from "~/assets/css/notfound.module.css"
function NotFound() {
    return <div className={style.container} >
            <img className={style.image} src={notfound} alt="text" />
            <h1 className={style.message}>No Data</h1>
        
    </div>
}

export default NotFound;