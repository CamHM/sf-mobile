import React, { useEffect, useState } from 'react';
import { IonContent, IonButton, IonIcon } from "@ionic/react";
import { qrCodeSharp } from 'ionicons/icons';
import Page from "../Page";
import "./InOut.css";
import { getRequest, postRequest } from "../../service/service.provider";
import { getItem, dayTimeName, formatLongDate } from "../../config/utils";

import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

interface Record {
    id: number,
    ouvreId: number,
    ouvreName?: string,
    scheduleDate: Date,
    dayTime?: string,
    userId: number,
    createdAt: Date,
    updatedAt: Date,
}

const InOut: React.FC = () => {
    const [records, setRecords] = useState<Record[]>([]);

    useEffect(() => {
        getRecords();
    }, [])

    const getRecords = () => {
        getItem('token').then(t => {
            getItem('userId').then(id => {
                getRequest(`/schedule/getUserSchedule?userId=${id}`, t || '')
                    .then(res => res.json())
                    .then(data => {
                        setRecords(data)
                    })
            })
        });
    }

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
        save(data.text);
    }

    const save = (ouvreToken: string) => {
        getItem('userId').then(value => {
            const payload = { ouvreToken, userId: value  };
            getItem('token').then(t => {
                postRequest(payload, '/schedule/addSchedule', t || '')
                    .then(res => res.json())
                    .then(data => getRecords())
            })
        });
    };

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
                            <p>{dayTimeName(rec.dayTime || 'MORNING')}</p>
                            <p>{formatLongDate(rec.scheduleDate)}</p>
                        </div>
                    ) }
                </IonContent>
            }
        />
    )
};

export default InOut;
