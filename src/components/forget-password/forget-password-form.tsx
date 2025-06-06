import { useState, type FormEvent } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "@/config/firebase";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


import { toast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";

export default function ForgetPasswordForm() {
    const [data, setData] = useState({
        email: "",
    });

    const sendPassword = useMutation({
        mutationKey: ["forget", data.email],
        mutationFn: async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            try {
                const userForgetten = await sendPasswordResetEmail(auth, data.email)
                return userForgetten;
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: () => {
            toast({
                variant: "success",
                title: "Operation done",
                description: "One time OTP code sent to your email",
            });

            // window.history.back();
            // localStorage.setItem('user', res.user.displayName);
        },
        onError: () => {
            toast({
                variant: "destructive",
                title: "Action failed!",
                description: `Check your email and try again`,
            });
        },
    });

    return (
        <form className="flex flex-col gap-6" onSubmit={(e) => sendPassword.mutate(e)}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Forget Password</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your email below to get your password
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="abdullah@example.com"
                        value={data.email ?? ""}
                        className={`${sendPassword.error ? "ring-destructive ring-1" : ""}`}
                        onChange={(e) =>
                            setData((prev) => ({ ...prev, email: e.target.value }))
                        }
                        required
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full disabled:bg-muted-foreground"
                    disabled={sendPassword.isPending}
                >
                    {sendPassword.isPending ? (
                        <>
                            <Loader className="animate-spin" />
                            <span>Submitting</span>
                        </>
                    ) : (
                        "Submit"
                    )}
                </Button>
                {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
                <LoginWithGoogle /> */}
            </div>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="underline underline-offset-4">
                    Sign up
                </Link>
            </div>
        </form>
    );
}
