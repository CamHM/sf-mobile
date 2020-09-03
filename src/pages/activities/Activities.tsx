import React, {useState} from 'react';
import {
    IonChip,
    IonCol,
    IonContent,
    IonGrid,
    IonIcon,
    IonLabel,
    IonRow,
    IonSearchbar,
    IonSelect,
    IonSelectOption
} from '@ionic/react';
import {chevronDownOutline, chevronUpOutline} from 'ionicons/icons';
import Page from "../Page";
import './Activities.css';
import { stateColor, stateName, formatDate } from "../../config/utils";

interface Activity {
    id: number,
    name: string;
    description: string;
    start_date: Date;
    end_date: Date;
    state: string;
}

const activities: Activity[] = [
    {
        id: 1,
        name: 'Actividad X',
        description: 'Descripción 6',
        start_date: new Date(Date.now()),
        end_date: new Date(Date.now()),
        state: 'DOING',
    },
    {
        id: 2,
        name: 'Actividad Y',
        description: 'Descripción 5 more words and more and more',
        start_date: new Date(Date.now()),
        end_date: new Date(Date.now()),
        state: 'DOING',
    },
    {
        id: 3,
        name: 'Actividad ZZZZ',
        description: 'Descripción 4',
        start_date: new Date(Date.now()),
        end_date: new Date(Date.now()),
        state: 'DOING',
    },
    {
        id: 4,
        name: 'Vamo a construir',
        description: 'Descripción 3',
        start_date: new Date(Date.now()),
        end_date: new Date(Date.now()),
        state: 'CANCELLED',
    },
    {
        id: 5,
        name: 'Levantamiento Muro',
        description: 'Descripción 2',
        start_date: new Date(Date.now()),
        end_date: new Date(Date.now()),
        state: 'PENDING',
    },
    {
        id: 6,
        name: 'Actividad WWWW',
        description: 'Descripción 1',
        start_date: new Date(Date.now()),
        end_date: new Date(Date.now()),
        state: 'PENDING',
    },
];

const Activities: React.FC = () => {
    const initAct = { id: 0, name: '', description: '', start_date: new Date(Date.now()), end_date: new Date(Date.now()), state: ''};
    const [name, setName] = useState<string>('');
    const [currentAct, setCurrentAct] = useState<Activity>(initAct);
    const [currentState, setCurrentState] = useState<string>('ALL');

    const filterActs = activities
        .filter(act => act.name.toLowerCase().includes(name.toLocaleLowerCase()))
        .filter(act => currentState === 'ALL' ? true : act.state === currentState);

    const handleNameChange = (text: string) => setName(text);

    const handleCurrentActivity = (act: Activity) => {
        if (act.id === currentAct.id) setCurrentAct(initAct);
        else setCurrentAct(act);
    };

    const handleCurrentState = (state: string) => setCurrentState(state);

    return (
        <Page
            name="Actividades"
            content={
                <IonContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonSearchbar
                                    value={name}
                                    onIonChange={e => handleNameChange(e.detail.value!)}
                                    animated={true}
                                    placeholder="Buscar actividad"
                                />
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="6">
                                <IonSelect
                                    value={currentState}
                                    placeholder="Estado"
                                    onIonChange={e => handleCurrentState(e.detail.value)}
                                    interface="action-sheet"
                                >
                                    <IonSelectOption value="ALL">Todos</IonSelectOption>
                                    <IonSelectOption value="FINISHED">Finalizada</IonSelectOption>
                                    <IonSelectOption value="CANCELLED">Cancelada</IonSelectOption>
                                    <IonSelectOption value="DOING">Proceso</IonSelectOption>
                                    <IonSelectOption value="PENDING">Pendiente</IonSelectOption>
                                </IonSelect>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                { filterActs.map(act =>
                                        <div key={`activity-${act.id}`}>
                                            <div
                                                className={currentAct.id !== act.id ? "activity-card" : "active_activity"}
                                                onClick={() => handleCurrentActivity(act)}
                                            >
                                                <IonChip color={stateColor(act.state)}>
                                                    <IonLabel>{stateName(act.state)}</IonLabel>
                                                </IonChip>
                                                <div>
                                                    <span className="activity-name">{act.name}</span>
                                                    <IonIcon
                                                        ios={currentAct.id !== act.id ? chevronDownOutline : chevronUpOutline}
                                                        md={currentAct.id !== act.id ? chevronDownOutline : chevronUpOutline}
                                                        color={stateColor(act.state)}
                                                    />
                                                </div>
                                            </div>
                                            { currentAct.id === act.id &&
                                                <div className="activity-desc">
                                                    <p className="label"><b>Inicia: </b><span>{formatDate(act.start_date)}</span></p>
                                                    <p className="label space"><b>Termina: </b><span>{formatDate(act.end_date)}</span></p>
                                                    <span>{act.description}</span>
                                                </div>
                                            }
                                        </div>
                                    )}
                                { filterActs.length === 0
                                    && <p className="activity-name">No se encontraron actividades</p>
                                }
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            }
        />
    )
};

export default Activities;
