import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Route, Routes} from "react-router-dom";

import IndexPage from "@/pages";
import DefaultLayout from "@/layouts/default.tsx";
import {ShopPage} from "@/pages/shop.tsx";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <DefaultLayout>
                <Routes>
                    <Route element={<IndexPage/>} path="/"/>
                    <Route element={<ShopPage/>} path="/shop"/>
                </Routes>
            </DefaultLayout>
        </QueryClientProvider>
    );
}

export default App;
