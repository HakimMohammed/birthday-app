import {Button} from "@/components/ui/button.tsx";
import {useAuth} from "@/features/authentication/context/auth-context.tsx";

export default function Home() {

    const {logout} = useAuth();

    return (
        <>
            <h1>Welcome Home !</h1>
            <Button onClick={logout}>
                Logout
            </Button>
        </>
    )
}