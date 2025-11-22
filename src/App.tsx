import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Navigate, Route, Routes} from "react-router-dom";
import DefaultLayout from "@/layouts/default.tsx";
import {ShopPage} from "@/pages/shop.tsx";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <DefaultLayout>
                <Routes>
                    {/*<Route element={<IndexPage/>} path="/"/>*/}
                    <Route element={<ShopPage/>} path="/shop"/>
                    <Route path="/" element={<Navigate to={"/shop"}/>}/>
                </Routes>
            </DefaultLayout>
        </QueryClientProvider>
    );
}

export default App;
