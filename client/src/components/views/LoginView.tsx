import { ChangeEvent, FormEvent, useState } from "react";
import { useUser } from "../../contexts/userContext";

const LoginView = () => {

    const { setAuthorization } = useUser();

    const [form, setForm] = useState({
        login: '',
        password: '',
    });

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => setForm(prev => ({
        ...prev,
        [e.target.name]: e.target.value
    }));

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            // if (response.ok) {
            //     setAuthorization(true);
            // } else {
            //     setAuthorization(false);
            // }
        } catch (error) {
            console.warn('O nie! server jeszcze nie działa :(');
        }

        // Ewentualne przeniesienie zapytań do osobnego hooka
        setAuthorization(true);
        //
    };

    return (
        <div className="login">
            <form className="form" onSubmit={handleSubmit}>
                <input type="text" name="login" className="form__inp" value={form.login} onChange={handleFormChange} />
                <input type="password" name="password" className="form__inp" value={form.password} onChange={handleFormChange} />
                <input type="submit" value="Zaloguj" />
            </form>
        </div>
    );
}

export default LoginView;