import { useUser } from "../../contexts/userContext";

const Logout = () => {

    const { setAuthorization } = useUser();

    const handleLogout = () => {
        // Strzał do servera o wylogowanie
        setAuthorization(false);
    };

    return (
        <div className="login">
            <p className="login__btn" onClick={handleLogout}>Wyloguj</p>
        </div>
    );
};

export default Logout;