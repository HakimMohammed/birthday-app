import './App.css'
import {BrowserRouter, Navigate, Routes, Route} from "react-router-dom";
import {AuthProvider} from "@/features/authentication/context/auth-context.tsx";
import {LoginPage} from "@/features/authentication/pages/login.tsx";
import {ProtectedRoute} from "@/components/protected-route.tsx";
import Home from "@/features/home/pages/home.tsx";
import {RegisterPage} from "@/features/authentication/pages/register.tsx";

function App() {

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route element={<ProtectedRoute/>}>
                        <Route path="/" element={<Home/>}/>
                    </Route>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
