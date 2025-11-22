import {Route, Routes} from "react-router-dom";

import IndexPage from "@/pages";
import DefaultLayout from "@/layouts/default.tsx";
import {CreateGameStudioPage} from "@/pages/CreateStudioPage.tsx";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <DefaultLayout>
                <Routes>
                    <Route element={<IndexPage/>} path="/"/>
                    <Route element={<CreateGameStudioPage/>} path="/create/gamestudio"/>
                </Routes>
            </DefaultLayout>
        </QueryClientProvider>
    );
}

export default App;
