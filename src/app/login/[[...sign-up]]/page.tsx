
import { SignIn } from "@clerk/nextjs";

export default function Login() {
    return (
        <div className="flex items-center justify-center flex-col pt-10">
            <h1 className="mb-4 text-xl">Create an Account or Sign in</h1>
            <SignIn />
        </div>
    );
}
