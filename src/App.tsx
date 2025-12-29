import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Navigate, Route, Routes} from "react-router-dom";
import DefaultLayout from "@/layouts/default.tsx";
import {CreateGameStudioPage} from "@/pages/CreateStudioPage.tsx";
import {HeroUIProvider} from "@heroui/system";
import SecurityContextProvider from "@/context/SecurityContextProvider.tsx";
import RouteGuardGameStudio from "@/components/security/RouteGuardGameStudio.tsx";
import PaymentReturnPage from "@/pages/PaymentReturnPage.tsx";
import LibraryPage from "./pages/LibraryPage";
import ShopPage from "@/pages/ShopPage.tsx";
import {CreateGamePage} from "@/pages/CreateGamePage.tsx";
import RouteGuardCreateGame from "@/components/security/RouteGuardCreateGame.tsx";
import {GameStudioPage} from "@/pages/GameStudioPage.tsx";
import FriendsPage from "@/pages/FriendsPage.tsx";
import {ProfileSettingsPage} from "@/pages/ProfileSettingsPage.tsx";
import RouteGuardLoggedIn from "@/components/security/RouteGuardLoggedIn.tsx";
import {GameShopPage} from "@/pages/GameShopPage.tsx";
import LibraryGamePage from "@/pages/LibraryGamePage.tsx";
import ChatPage from "@/pages/ChatPage.tsx";
import {GamePage} from "@/pages/GamePage.tsx";
import PartyPage from "@/pages/PartyPage.tsx";
import PointsPage from "@/pages/PointsPage.tsx";


const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <HeroUIProvider>
                <SecurityContextProvider>
                    <DefaultLayout>
                        <Routes>
                            <Route element={<ShopPage/>} path="/shop"/>
                            <Route element={<RouteGuardLoggedIn><PointsPage/></RouteGuardLoggedIn>} path="/points"/>
                            <Route element={<PaymentReturnPage/>} path="/payment-return"/>
                            <Route path="/" element={<Navigate to={"/shop"}/>}/>
                            <Route element={<GameShopPage/>} path="/shop/game/:id"/>

                            <Route element={<RouteGuardLoggedIn><PartyPage/></RouteGuardLoggedIn>} path={"/party"}/>
                            <Route element={<RouteGuardGameStudio><GameStudioPage/></RouteGuardGameStudio>}
                                   path="/gamestudio"/>
                            <Route element={<RouteGuardLoggedIn><GamePage/></RouteGuardLoggedIn>}
                                   path="/gamestudio/game/:id"/>
                            <Route element={<RouteGuardLoggedIn><LibraryPage/></RouteGuardLoggedIn>} path="/library"/>
                            <Route element={<RouteGuardLoggedIn><LibraryGamePage/></RouteGuardLoggedIn>}
                                   path="/library/:gameId"/>
                            <Route element={<RouteGuardGameStudio><CreateGameStudioPage/></RouteGuardGameStudio>}
                                   path="/create/gamestudio"/>
                            <Route element={<RouteGuardCreateGame><CreateGamePage/></RouteGuardCreateGame>}
                                   path="/create/game"/>
                            <Route element={<RouteGuardLoggedIn><ProfileSettingsPage/></RouteGuardLoggedIn>}
                                   path="/user/settings"/>
                            <Route element={<RouteGuardLoggedIn><FriendsPage/></RouteGuardLoggedIn>} path={"/friends"}/>
                            <Route element={<RouteGuardLoggedIn><ChatPage/></RouteGuardLoggedIn>} path={"/chats"}/>
                        </Routes>
                    </DefaultLayout>
                </SecurityContextProvider>
            </HeroUIProvider>
        </QueryClientProvider>
    );
}

export default App;
