import React from 'react';
import { IonContent } from "@ionic/react";
import Page from "../Page";
import './Projects.css';
import { stateColorCode, stateName, formatDate } from "../../config/utils";

interface Project {
    id: number,
    name: string,
    direction: string,
    state: string,
    start_date: Date,
    end_date: Date,
}

const projects: Project[] = [
    {
        id: 1,
        name: 'Proyecto X',
        direction: 'Cra 16 42-25, La Rosa',
        state: 'DOING',
        start_date: new Date(Date.now()),
        end_date: new Date(Date.now()),
    },
    {
        id: 2,
        name: 'Proyecto ZZ',
        direction: 'Cra 16 42-25, La Rosa',
        state: 'CANCELLED',
        start_date: new Date(Date.now()),
        end_date: new Date(Date.now()),
    },
];

const Projects: React.FC = () => {
    return (
        <Page
            name="Proyectos asociados"
            content={
                <IonContent>
                    {projects.length === 0 && <p className="activity-name">El usuario no tiene proyectos asociados.</p>}
                    { projects.map(pro =>
                        <div key={`project-${pro.id}`} className="project-card">
                            <p>{pro.name}</p>
                            <p className="project-label"><b>Inicio: </b>{formatDate(pro.start_date)}</p>
                            <p className="project-label"><b>Fin: </b>{formatDate(pro.end_date)}</p>
                            <div style={{ backgroundColor: stateColorCode(pro.state) }} className="project-state">
                                {stateName(pro.state)}
                            </div>
                        </div>
                    )}
                </IonContent>
            }
        />
    )
};

export default Projects;
