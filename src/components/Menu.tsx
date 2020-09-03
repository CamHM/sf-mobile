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
import { useLocation, useHistory } from 'react-router-dom';
import { calendarOutline, calendarSharp, copyOutline, copySharp, logOutOutline, personCircleOutline, qrCodeOutline, qrCodeSharp } from 'ionicons/icons';
import './Menu.css';
import { removeItem } from "../config/utils";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Mi Perfil',
    url: '/page/user',
    iosIcon: personCircleOutline,
    mdIcon: personCircleOutline
  },
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

const Menu: React.FC = () => {
  const location = useLocation();
  let history = useHistory();

  const logOut = () => {
    removeItem('token');
    history.push('/login');
  };

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list" lines="none">
          <IonListHeader>Usuario A</IonListHeader>
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
          <IonItem button onClick={logOut} lines="none" detail={false}>
            <IonIcon slot="start" ios={logOutOutline} md={logOutOutline} />
            <IonLabel>Cerrar sesión</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
