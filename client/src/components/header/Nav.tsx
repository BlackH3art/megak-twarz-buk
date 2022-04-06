import { NavLink } from 'react-router-dom';

const Nav = () => {

    // Jakiś kontekst użytkownika
    const isLogged = true;

    return (
        <nav className="menu">
            <ul className="menu__list">
                <li className="menu__item">
                    <NavLink to="/" end className="menu__link">Home</NavLink>
                </li>
                {isLogged && <li className="menu__item">
                    <NavLink to={`/users/${'jakies-id'}`} className="menu__link">Profil</NavLink>
                </li>}
            </ul>
        </nav>
    );
};

export default Nav;