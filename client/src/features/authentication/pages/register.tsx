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

export function RegisterPage({
                                 className,
                                 ...props
                             }: React.ComponentProps<"form">) {

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const {register} = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            if( password == confirmPassword ) {
                await register({email, password, name});
                navigate('/');
            }
            setError("Password do not match")
        } catch (err) {
            setError('Invalid email or password');
        }
    }

    return (
        <AuthenticationLayout>
            <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleLogin}>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h1 className="text-2xl font-bold">Create an account</h1>
                        <p className="text-muted-foreground text-sm text-balance">
                            Enter your information to create an account
                        </p>
                        {error && <p style={{color: 'red'}}>{error}</p>}
                    </div>
                    <Field>
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <Input id="name" type="name" placeholder="John" required value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input id="email" type="email" placeholder="m@example.com" required value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input id="password" type="password" placeholder="********" required value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                        <Input id="confirmPassword" type="password" placeholder="********" required
                               value={confirmPassword}
                               onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </Field>
                    <Field>
                        <Button type="submit">Register</Button>
                    </Field>
                    <Field>
                        <FieldDescription className="text-center">
                            Already have an account?{" "}
                            <Button variant="link" onClick={() => navigate('/login')} className="underline p-0">
                                Login
                            </Button>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </form>
        </AuthenticationLayout>
    )
}
