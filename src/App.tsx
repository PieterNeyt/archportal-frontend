import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Navigate, Route, Routes} from "react-router-dom";
import DefaultLayout from "@/layouts/default.tsx";
import {CreateGameStudioPage} from "@/pages/CreateStudioPage.tsx";
import {ShopPage} from "@/pages/shop.tsx";
import {HeroUIProvider} from "@heroui/system";
import SecurityContextProvider from "@/context/SecurityContextProvider.tsx";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <HeroUIProvider>
                <SecurityContextProvider>
                    <DefaultLayout>
                        <Routes>
                            <Route element={<ShopPage/>} path="/shop"/>
                            <Route path="/" element={<Navigate to={"/shop"}/>}/>
                            <Route element={<CreateGameStudioPage/>} path="/create/gamestudio"/>
                        </Routes>
                    </DefaultLayout>
                </SecurityContextProvider>
            </HeroUIProvider>
        </QueryClientProvider>
    );
}

export default App;
