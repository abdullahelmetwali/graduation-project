import { auth, provider } from "@/config/firebase";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { signInWithPopup } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function LoginWithGoogle() {
    const navigate = useNavigate();

    const signByGoogle = useMutation({
        mutationKey: ['login-by-google'],
        mutationFn: async () => {
            try {
                const res = await signInWithPopup(auth, provider);
                return res;
            } catch (err) {
                throw new Error(err)
            }
        },
        onSuccess: (response) => {
            toast({
                variant: "success",
                title: `👋 Hello ${response?.user?.displayName}`,
                description: "Every thing works smoothly!"
            });
            navigate('/profile');
        },
        onError: () => {
            toast({
                variant: "destructive",
                title: "Operation failed",
                description: "Something went wrong , please try again later"
            })
        }
    });
    return (
        <Button type="button" variant="outline" className="w-full" onClick={() => signByGoogle.mutate()}>
            <img src="/src/assets/google.svg" alt="google-logo" className="w-4" />
            Login with Google
        </Button>
    )
}