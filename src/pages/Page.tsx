import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './Page.css';

const Page: React.FC<{ name: string, content?: any }> = ({ name, content }) => {

  // const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton color="light" />
          </IonButtons>
          <IonTitle color="light">{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
          <div className="page">
              {content}
          </div>
      </IonContent>
    </IonPage>
  );
};

export default Page;
