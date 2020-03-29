import React, {useState,useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import LogoSvg from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import Api from '../../services/api';

import './styles.css'
import api from '../../services/api';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();
    
    const ongId = localStorage.getItem('idOng');
    const ongName = localStorage.getItem('nomeOng');
    
    useEffect(() => {
        api.get('profile',{
            headers: {
                authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, {
                headers:{
                    authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id != id));
        } catch (error) {
            alert('Erro ao deletar caso, tente novamente');
        }
    }

    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={LogoSvg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link to="/incidents/now" className="button">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={10} color="#e02041"/>
                </button>
            </header>
            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                <li key={incident.id}>
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-Br', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                    <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>
                ))}

            </ul>
        </div>
    );
}