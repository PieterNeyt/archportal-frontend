import {Route, Routes} from "react-router-dom";

import IndexPage from "@/pages";
import DefaultLayout from "@/layouts/default.tsx";
import {CreateGameStudioPage} from "@/pages/CreateStudioPage.tsx";

function App() {
    return (
        <DefaultLayout>
            <Routes>
                <Route element={<IndexPage/>} path="/"/>
                <Route element={<CreateGameStudioPage/>} path="/create/gamestudio"/>
            </Routes>
        </DefaultLayout>
    );
}

export default App;
