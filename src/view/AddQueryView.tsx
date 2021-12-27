import * as React from 'react';
import { useState } from 'react';
import CreateCardModalView from './CreateCardModalView';
import {Navigate, useNavigate, useLocation} from 'react-router-dom';

export interface IAddQueryViewProps {
}

export default function AddQueryView () {

    const search = useLocation().search;
    const [modal, setModal] = useState(true);

    const query = new URLSearchParams(search);

    let nav = useNavigate();
    
    const goToHome = () => {
        nav("/", {replace: true});
    }

    return (
        <CreateCardModalView 
            open={modal} 
            onClose={goToHome}
            onNewCard={goToHome}
            defaultUrl={query.get('url')!}
        />
    );
}