import React, { useState } from 'react';
import { useHistory } from 'react-router';
import "./Login.css";
import { IonButton, IonContent, IonInput, IonLoading } from '@ionic/react';
import logo from '../../assets/logo.png';
import { postRequest } from "../../service/service.provider";
import { setItem } from "../../config/utils";

const Login: React.FC = () => {
    let history = useHistory();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = () => {
        if (validateFields()) {
            console.log('ah')
            setLoading(true);
            postRequest({
                userMail: email,
                userPassword: password,
            }, '/user/login')
                .then(res => res.json())
                .then(data => {
                    if (data?.token) {
                        console.log(data)
                        setItem('token', data?.token);
                        setItem('userId', data?.userId);
                        history.push('/page/activities');
                    }
                    console.log(data?.token);
                    setLoading(false);
                });
        }
    }

    const validateFields = () => {
        if (email === '') {
            setErrors({...errors, email: 'El correo es obligatorio'});
            return false;
        } else {
            setErrors({...errors, email: ''});
        }
        if (password === '') {
            setErrors({...errors, password: 'La contraseña es obligatoria'});
            return false;
        } else setErrors({...errors, password: ''});
        return true;
    }

    return (
        <IonContent>
            <div className="login-page">
                <div className="login-container">
                    <img src={logo} width='30%' alt="logo-s&f" />
                    <h1 className="title">Inicio de sesión</h1>
                    <div className="input">
                        <IonInput type="email" color="dark" value={email} placeholder="Correo" onIonChange={e => setEmail(e.detail.value!)}> </IonInput>
                    </div>
                    { errors['email'] !== '' && <p className="errors">{errors['email']}</p> }
                    <div className="input">
                        <IonInput type="password" color="dark" value={password} placeholder="Contraseña" onIonChange={e => setPassword(e.detail.value!)}> </IonInput>
                    </div>
                    { errors['password'] !== '' && <p className="errors">{errors['password']}</p> }
                    <br/>
                    <IonButton color="primary" expand="block" fill="outline" onClick={onSubmit}>Ingresar</IonButton>
                </div>
            </div>
            <IonLoading
                cssClass='my-custom-class'
                isOpen={loading}
                onDidDismiss={() => setLoading(false)}
                message={'Cargando...'}
                duration={5000}
            />
        </IonContent>
    )
};

export default Login;
