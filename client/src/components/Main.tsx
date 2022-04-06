import { Route, Routes } from 'react-router-dom';
import HomeView from './views/HomeView';
import NotFoundView from './views/NotFoundView';
import ProfileView from './views/ProfileView';

const Main = () => {
    return (
        <Routes>
            <Route path="/" element={<HomeView />} />
            {/* <Route path="/users" element={<UsersView />} /> */}
            <Route path="/users/:id" element={<ProfileView />} />
            <Route path="*" element={<NotFoundView />} />
        </Routes>
    );
}

export default Main;