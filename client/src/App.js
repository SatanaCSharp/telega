import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Provider } from 'react-redux';
import store from './Store/store';
import './App.css';
import 'antd/dist/antd.css';
import MainMenu from './Components/Navbar/MainNavigation';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import SignIn from './Components/SignIn/SignIn';
import Dashboard from './Containers/Dashboard/Dashboard';
import AuthAsBot from './Helpers/Bots/AuthAsBot';


const { Header, Footer, Content } = Layout;

function App() {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    // AuthAsBot().then(res => localStorage.setItem('Bot', JSON.stringify(res)));
  }, [])

  return (
    <Provider store={store}>
      <div className="App"> 
        <Router>
          <Layout>
            <Header>
              <MainMenu modal={modal} setModal={setModal}/>
            </Header>  
            <Content style={{margin: '0 auto'}}>
              {
                modal ? 
                  <SignIn modal={modal} setModal={setModal}/>:
                  null
              }
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/sign-in" component={SignIn} />
                <Route exact path="/dashboard" component={Dashboard} /> 
              </Switch> 
            </Content>
            <Footer>
              Footer
            </Footer>
          </Layout>
        </Router>
      </div>
    </Provider>
  )
}

export default App;
