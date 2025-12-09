import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Navigate, Route, Routes} from "react-router-dom";
import DefaultLayout from "@/layouts/default.tsx";
import {CreateGameStudioPage} from "@/pages/CreateStudioPage.tsx";
import {HeroUIProvider} from "@heroui/system";
import SecurityContextProvider from "@/context/SecurityContextProvider.tsx";
import RouteGuardGameStudio from "@/components/security/RouteGuardGameStudio.tsx";
import PaymentReturnPage from "@/pages/PaymentReturnPage.tsx";
import LibraryPage from "./pages/LibraryPage";
import ShopPage from "@/pages/shop.tsx";
import {CreateGamePage} from "@/pages/CreateGamePage.tsx";
import RouteGuardCreateGame from "@/components/security/RouteGuardCreateGame.tsx";
import {GameStudioPage} from "@/pages/GameStudioPage.tsx";
import FriendsPage from "@/pages/FriendsPage.tsx";
import {ProfileSettingsPage} from "@/pages/ProfileSettings.tsx";
import RouteGuardLoggedIn from "@/components/security/RouteGuardLoggedIn.tsx";
import LibraryGamePage from "@/pages/LibraryGamePage.tsx";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <HeroUIProvider>
                <SecurityContextProvider>
                    <DefaultLayout>
                        <Routes>
                            <Route element={<ShopPage/>} path="/shop"/>
                            <Route element={<PaymentReturnPage/>} path="/payment-return"/>
                            <Route path="/" element={<Navigate to={"/shop"}/>}/>
                            <Route element={<GameStudioPage/>} path="/gamestudio/:id"/>
                            <Route element={<RouteGuardLoggedIn><LibraryPage/></RouteGuardLoggedIn>} path="/library"/>
                            <Route element={<RouteGuardLoggedIn><LibraryGamePage/></RouteGuardLoggedIn>} path="/library/:gameId"/>
                            <Route element={<RouteGuardGameStudio><CreateGameStudioPage/></RouteGuardGameStudio>}
                                   path="/create/gamestudio"/>
                            <Route element={<RouteGuardCreateGame><CreateGamePage/></RouteGuardCreateGame>}
                                   path="/create/game"/>
                            <Route element={<RouteGuardLoggedIn><ProfileSettingsPage/></RouteGuardLoggedIn>}
                                   path="/user/settings"/>
                            <Route element={<RouteGuardLoggedIn><FriendsPage/></RouteGuardLoggedIn>} path={"/friends"}/>
                        </Routes>
                    </DefaultLayout>
                </SecurityContextProvider>
            </HeroUIProvider>
        </QueryClientProvider>
    );
}

export default App;
