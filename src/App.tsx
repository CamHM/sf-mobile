import React from 'react';
import Activities from "./pages/activities/Activities";
import InOut from "./pages/InOut/InOut";
import Login from "./pages/login/Login";
import Menu from './components/Menu';
import Projects from "./pages/projects/Projects";
import User from "./pages/user/User";
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import 'moment/locale/es';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/page/user" component={User} exact />
            <Route path="/page/activities" component={Activities} exact />
            <Route path="/page/qrscan" component={InOut} exact />
            <Route path="/page/projects" component={Projects} exact />
            <Redirect from="/" to="/login" exact />
          </IonRouterOutlet>
        </IonSplitPane>
        <Route path="/login" component={Login} exact />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
