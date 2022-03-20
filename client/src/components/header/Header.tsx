import Login from './Login';
import Logo from './Logo';
import Nav from './Nav';

const Header = () => {
    return (
        <header className="header">
            <Logo />
            <Nav />
            <Login />
        </header>
    );
};

export default Header;