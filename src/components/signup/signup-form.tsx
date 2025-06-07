import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, type FormEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import LoginWithGoogle from "@/components/mine-ui/login-google";

export default function SignUpForm() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    firstName: "",
    secName: ""
  });

  const submitFnc = useMutation({
    mutationKey: ["sign-up", data.email, data.password],
    mutationFn: async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast({
        variant: "success",
        title: `🥳 Hello ${data.firstName}`,
        description: "Operational integrity confirmed, system under your control.",
      });

      localStorage.setItem('user', data.firstName + data.secName);
      // window.history.back();
      setTimeout(() => {
        navigate('/profile');
      }, 300);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Action failed!",
        description: `Check your data please and try again`,
      });
    },
  });

  return (
    <form className="flex flex-col gap-6" onSubmit={(e) => submitFnc.mutate(e)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <p className="text-sm text-muted-foreground">
          Let's get started! Fill in the form to create your account.
        </p>

      </div>
      <div className="grid gap-4">
        <div className="flex items-center gap-4 w-full max-lg:flex-col">
          <div className="space-y-1 w-full">
            <Label htmlFor="first-name">First name</Label>
            <Input
              id="first-name"
              type="text"
              placeholder="Enter first name here..."
              value={data.firstName ?? ""}
              className={`${submitFnc.isError ? "ring-destructive ring-1" : ""} w-full`}
              onChange={(e) =>
                setData((prev) => ({ ...prev, firstName: e.target.value }))
              }
              required
            />
          </div>
          <div className="space-y-1 w-full">
            <Label htmlFor="sec-name">Second name</Label>
            <Input
              id="sec-name"
              type="text"
              placeholder="Enter second name here..."
              value={data.secName ?? ""}
              className={`${submitFnc.isError ? "ring-destructive ring-1" : ""} w-full`}
              onChange={(e) =>
                setData((prev) => ({ ...prev, secName: e.target.value }))
              }
              required
            />
          </div>
        </div>
        <div className="space-y-1">
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
        <div className="space-y-1">
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
        Have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  );
}
