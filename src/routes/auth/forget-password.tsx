import ForgetPasswordImg from "@/assets/forget.gif";
import ForgetPasswordForm from "@/components/forget-password/forget-password-form";

export default function ForgetPassword() {
    document.title = "Forget Password | 5G Planning Tool";
    return (
        <main className="grid min-h-dvh lg:grid-cols-2">
            <section className="grid place-items-center h-full p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <ForgetPasswordForm />
                </div>
            </section>
            <section className="bg-black relative hidden lg:grid lg:place-items-center">
                <img
                    src={ForgetPasswordImg}
                    alt="sign-up-image"
                    className="z-50  h-96 w-96 object-cover dark:brightness-[0.8] dark:grayscale"
                />
            </section>
        </main>
    );
}