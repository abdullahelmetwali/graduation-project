import { useState, type FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "@/config/firebase";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


import { toast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";
import LoginWithGoogle from "@/components/mine-ui/login-google";

export default function LoginForm() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const submitFnc = useMutation({
    mutationKey: ["login", data.email, data.password],
    mutationFn: async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const user = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: (res) => {
      toast({
        variant: "success",
        title: "🥳 Welcome back!",
        description: "You have access now to do your calculations",
      });

      window.history.back();
      localStorage.setItem('user', res.user.displayName);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Action failed!",
        description: `Check your email or password and try again`,
      });
    },
  });

  return (
    <form className="flex flex-col gap-6" onSubmit={(e) => submitFnc.mutate(e)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
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
            className={`${submitFnc.error ? "ring-destructive ring-1" : ""}`}
            onChange={(e) =>
              setData((prev) => ({ ...prev, email: e.target.value }))
            }
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter password here..."
            value={data.password ?? ""}
            className={`${submitFnc.isError ? "ring-destructive ring-1" : ""}`}
            onChange={(e) =>
              setData((prev) => ({ ...prev, password: e.target.value }))
            }
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full disabled:bg-muted-foreground"
          disabled={submitFnc.isPending}
        >
          {submitFnc.isPending ? (
            <>
              <Loader className="animate-spin" />
              <span>Submitting</span>
            </>
          ) : (
            "Submit"
          )}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <LoginWithGoogle />
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
