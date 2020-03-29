import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';

import Api from '../../services/api';

import './styles.css';

import logoSvg from '../../assets/logo.svg'
import heroesIMG from '../../assets/heroes.png'

export default function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try {
            const response = await Api.post('sessions', { id})
            
            localStorage.setItem('idOng', id);
            localStorage.setItem('nomeOng', response.data.name);

            history.push('/profile');
        } catch (error) {
            alert('Falha no login, tente novamente');
        }
    }

    return(
        <div className="logon-container">
            <session className="form">
                <img src={logoSvg} alt="Be The Hero"/>
                <form onSubmit = {handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input placeholder="sua ID" value={id} onChange={e => setId(e.target.value)}/>
                    <button className= "button" type="submit">Entrar</button>
                    <Link className="backLink" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </session>
            <img src={heroesIMG} alt="Heroes"/>
        </div>
    );
}