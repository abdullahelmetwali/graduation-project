import LoginForm from '@/components/login/login-form';

export default function Login() {
    document.title = 'Login | 5G Planning Tool';
    return (
        <main className="grid min-h-svh lg:grid-cols-2">
            <section className="grid place-items-center h-full p-6 md:p-10">
                <div className="w-full max-w-xs">
                    <LoginForm />
                </div>
            </section>
            <section className="bg-background relative z-0 hidden lg:block">
                <img
                    src="/src/assets/TWO.gif"
                    alt="Image"
                    className="absolute z-50 inset-0 h-full w-full object-cover dark:brightness-[0.8] dark:grayscale"
                />
            </section>
        </main>
    );
};