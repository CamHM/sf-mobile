import React, { useState } from 'react';
import { IonContent, IonButton, IonIcon } from "@ionic/react";
import { qrCodeSharp } from 'ionicons/icons';
import Page from "../Page";
import { formatLongDate } from "../../config/utils";
import "./InOut.css";

import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

interface Record {
    id: number,
    date: Date,
    projectName: string,
    workingDay: string,
    type: string,
}

const records: Record[] = [
    {
        id: 1,
        projectName: 'Proyecto x',
        date: new Date(Date.now()),
        workingDay: 'Mañana',
        type: 'Salida',
    },
    {
        id: 2,
        projectName: 'Proyecto x',
        date: new Date(Date.now()),
        workingDay: 'Tarde',
        type: 'Entrada',
    },
    {
        id: 3,
        projectName: 'Proyecto x',
        date: new Date(Date.now()),
        workingDay: 'Noche',
        type: 'Salida',
    },
]

const InOut: React.FC = () => {
    const [currentCode, setCurrentCode] = useState<string>('');

    const scanCode = async () => {
        const options: BarcodeScannerOptions = {
            preferFrontCamera: false,
            showFlipCameraButton: false,
            showTorchButton: true,
            torchOn: false,
            prompt: 'Coloque el código QR en el área de lectura',
            resultDisplayDuration: 500,
            formats: 'QR_CODE,PDF_417 ',
            orientation: 'portrait',
        };

        const data = await BarcodeScanner.scan(options);
        alert(`Código: ${data.text}`);
        setCurrentCode(data.text);
    }

    return (
        <Page
            name="Entrada/Salida"
            content={
                <IonContent>
                    <h2 className="InOut-title">Registrar entrada/salida</h2>
                    <IonButton expand="full" size="small" color="success" onClick={scanCode}>
                        <IonIcon ios={qrCodeSharp} color="light" />
                    </IonButton>
                    <br />
                    <h2 className="InOut-title">Registros</h2>
                    { records.length === 0 && <p className="activity-name">No hay registros de entrada/salida</p> }
                    { records.map(rec =>
                        <div key={`record-${rec.id}`} className="InOut-card">
                            <p>{rec.type}</p>
                            <p>{formatLongDate(rec.date)}</p>
                        </div>
                    ) }
                </IonContent>
            }
        />
    )
};

export default InOut;
