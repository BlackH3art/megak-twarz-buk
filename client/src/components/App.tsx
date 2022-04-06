import { useUser } from '../contexts/userContext';
import Header from './header/Header';
import Main from './Main';
import LoginView from './views/LoginView';

const App = () => {

  const { authorization } = useUser();

  return (
    <>
      {authorization ? <div className="App">
        <Header />
        <Main />
        {/* <Footer /> */}
      </div> : <LoginView />}
    </>
  )
}

export default App
