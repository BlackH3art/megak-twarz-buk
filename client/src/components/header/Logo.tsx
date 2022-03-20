import logoImg from '../../media/images/logo.png';

const Logo = () => {
    return (
        <div className="logo">
            <div className="img-wrapper logo__img-wrapper">
                <img src={logoImg} alt="logo" className="img" />
            </div>
            <h1 className="logo__title">TwarzBook</h1>
        </div>
    );
};

export default Logo;