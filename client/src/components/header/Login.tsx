import { useState } from "react";

const Login = () => {

    //Kontekst użytkownika
    const [isLogged, setIsLogged] = useState(false);
    //

    const handleLogin = () => {
        console.log('Logowanie...');
        setIsLogged(true);
    };

    const handleLogout = () => {
        console.log('Wylogowywanie...');
        setIsLogged(false);
    };

    const loginButton = isLogged ? <p className="login__btn" onClick={handleLogout}>Wyloguj</p> : <p className="login__btn" onClick={handleLogin}>Zaloguj</p>;

    return (
        <div className="login">
            {loginButton}
        </div>
    );
};

export default Login;