import React, { useState } from 'react';
import './Login.css'

import api from '../services/api'

function Login({history}){
    const [username, setUsername] = useState('')

    async function handleSubmit(e){
        e.preventDefault();

        const response = await api.post('/devs', {username})
        const { _id } = response.data
        
        history.push(`/dev/${_id}`);

    }

    return(
        <div className="login-container">
        <form onSubmit={handleSubmit}>
            <h1>Twinder</h1>
            <input
                placeholder="Digite seu usuário"
                value= {username}
                onChange={e => setUsername(e.target.value)}

            />
            <button type='submit'>Enviar</button>
        </form>
        
        
        
        
        </div>
    )
}

export default Login