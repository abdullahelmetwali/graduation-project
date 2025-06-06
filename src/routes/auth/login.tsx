import LoginForm from '@/components/login/login-form';
import LoginImg from "@/assets/TWO.gif";

export default function Login() {
    document.title = 'Login | 5G Planning Tool';
    return (
        <main className="grid min-h-svh lg:grid-cols-2">
            <section className="grid place-items-center h-full p-6 md:p-10">
                <div className="w-full max-w-xs">
                    <LoginForm />
                </div>
            </section>
            <section className="bg-black relative hidden lg:grid lg:place-items-center">
                <img
                    src={LoginImg}
                    alt="Image"
                    className="z-50  h-96 w-96 object-cover dark:brightness-[0.8] dark:grayscale"
                />
            </section>
        </main>
    );
};