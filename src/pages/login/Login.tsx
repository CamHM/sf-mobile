import React, { useState } from 'react';
import "./Login.css";
import { IonButton, IonContent, IonInput } from '@ionic/react';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    return (
        <IonContent color="primary">
            <div className="login-page">
                <div>
                    <h1>Inicio de sesión</h1>
                    <IonInput value={email} placeholder="Correo" onIonChange={e => setEmail(e.detail.value!)}> </IonInput>
                    <IonInput value={password} placeholder="Contraseña" onIonChange={e => setPassword(e.detail.value!)}> </IonInput>
                    <IonButton color="light" expand="block" fill="outline">Ingresar</IonButton>
                </div>g
            </div>
        </IonContent>
    )
};

export default Login;
