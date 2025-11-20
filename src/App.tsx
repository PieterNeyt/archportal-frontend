import {Route, Routes} from "react-router-dom";

import IndexPage from "@/pages/index";
import DefaultLayout from "@/layouts/default.tsx";

function App() {
    return (
        <DefaultLayout>
            <Routes>
                <Route element={<IndexPage/>} path="/"/>
            </Routes>
        </DefaultLayout>
    );
}

export default App;
