import '../css/Settings.css'
import { useUser } from '../UserContext'
import RequireLoginInfo from './RequireLoginInfo'
const Settings = ()=>{
    const {user} = useUser()
    if(!user) return <RequireLoginInfo/>
    else
    return(


        <div className='page'>
            SETTINGS PAGE !
            <div id = 'user-info-container' className='row'>
                Profile:
                <img id='user-background' src=' '/>
                    
               
            </div>

        </div>
    )
}

export default Settings