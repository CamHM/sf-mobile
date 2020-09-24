import React, {useState, useEffect} from 'react';
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
import { getItem } from "../../config/utils";
import { getRequest } from "../../service/service.provider";

interface Activity {
    id: number,
    state: string,
    createdAt: Date,
    ouvreId: number,
    taskDescription: string,
    taskEndDate: Date,
    taskName: string,
    taskStartDate: Date,
    taskState: string,
    updatedAt: Date,
}

const Activities: React.FC = () => {
    const initAct = {
        id: 0,
        state: '',
        createdAt: new Date(Date.now()),
        ouvreId: 0,
        taskDescription: '',
        taskEndDate: new Date(Date.now()),
        taskName: '',
        taskStartDate: new Date(Date.now()),
        taskState: '',
        updatedAt: new Date(Date.now()),
    };
    const [name, setName] = useState<string>('');
    const [currentAct, setCurrentAct] = useState<Activity>(initAct);
    const [currentState, setCurrentState] = useState<string>('ALL');
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        getItem('token').then(t => {
            getItem('userId').then(id => {
                getRequest(`/ouvre/getWorkerActivities?userId=${id}`, t || '')
                    .then(res => res.json())
                    .then(data => setActivities(data))
            })
        })
    }, [])

    const filterActs = activities
        .filter(act => act.taskName.toLowerCase().includes(name.toLocaleLowerCase()))
        .filter(act => currentState === 'ALL' ? true : act.taskState === currentState);

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
                                                    <span className="activity-name">{act.taskName}</span>
                                                    <IonIcon
                                                        ios={currentAct.id !== act.id ? chevronDownOutline : chevronUpOutline}
                                                        md={currentAct.id !== act.id ? chevronDownOutline : chevronUpOutline}
                                                        color={stateColor(act.state)}
                                                    />
                                                </div>
                                            </div>
                                            { currentAct.id === act.id &&
                                                <div className="activity-desc">
                                                    <p className="label"><b>Inicia: </b><span>{formatDate(act.taskStartDate)}</span></p>
                                                    <p className="label space"><b>Termina: </b><span>{formatDate(act.taskEndDate)}</span></p>
                                                    <span>{act.taskDescription}</span>
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
