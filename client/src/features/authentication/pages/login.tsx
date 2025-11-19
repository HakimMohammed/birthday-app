import {Button} from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import {Input} from "@/components/ui/input"
import AuthenticationLayout from "@/features/authentication/layouts/authentication-layout.tsx";
import {cn} from "@/lib/utils.ts";
import {useState} from "react";
import {useAuth} from "@/features/authentication/context/auth-context.tsx";
import {useNavigate} from "react-router-dom";

export function LoginPage({
                              className,
                              ...props
                          }: React.ComponentProps<"form">) {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const {login} = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await login({email, password});
            navigate('/'); // Redirect to Home on success
        } catch (err) {
            setError('Invalid email or password');
        }
    }

    return (
        <AuthenticationLayout>
            <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleLogin}>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h1 className="text-2xl font-bold">Login to your account</h1>
                        <p className="text-muted-foreground text-sm text-balance">
                            Enter your email below to login to your account
                        </p>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </div>
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input id="email" type="email" placeholder="m@example.com" required value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                    </Field>
                    <Field>
                        <div className="flex items-center">
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            {/*<a*/}
                            {/*    href="#"*/}
                            {/*    className="ml-auto text-sm underline-offset-4 hover:underline"*/}
                            {/*>*/}
                            {/*    Forgot your password?*/}
                            {/*</a>*/}
                        </div>
                        <Input id="password" type="password" placeholder="********" required value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                    </Field>
                    <Field>
                        <Button type="submit">Login</Button>
                    </Field>
                    <Field>
                        <FieldDescription className="text-center">
                            Don&apos;t have an account?{" "}
                            <Button variant="link" onClick={() => navigate('/register')} className="underline p-0">
                               Register
                            </Button>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </form>
        </AuthenticationLayout>
    )
}
