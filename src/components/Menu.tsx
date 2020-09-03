import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import React from 'react';
import { useLocation } from 'react-router-dom';
import { bookmarkOutline, calendarOutline, calendarSharp, copyOutline, copySharp, logOutOutline, qrCodeOutline, qrCodeSharp } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Actividades',
    url: '/page/activities',
    iosIcon: calendarOutline,
    mdIcon: calendarSharp
  },
  {
    title: 'Proyectos asociados',
    url: '/page/projects',
    iosIcon: copyOutline,
    mdIcon: copySharp
  },
  {
    title: 'Registro de entrada/salida',
    url: '/page/qrscan',
    iosIcon: qrCodeOutline,
    mdIcon: qrCodeSharp
  },
];

const labels = ['Notes', 'Reminders'];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Mi perfil</IonListHeader>
          <IonNote>usuario-log-in@gmail.com</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
          <IonItem button onClick={() => console.log('Holaa')} lines="none" detail={false}>
            <IonIcon slot="start" ios={logOutOutline} md={logOutOutline} />
            <IonLabel>Cerrar sesión</IonLabel>
          </IonItem>
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
