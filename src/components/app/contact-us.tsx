import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactUs() {
    const [data, setData] = useState({
        email: '',
        name: '',
        msg: ''
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">
                    <Mail />
                </Button>
            </DialogTrigger>
            <DialogContent className="rounded-md">
                <DialogHeader>
                    <DialogTitle className="text-xl">Contact us</DialogTitle>
                    <DialogDescription>Enter here your data to contact to you.</DialogDescription>
                </DialogHeader>
                <form action="" className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="email">
                            Email address
                        </Label>
                        <Input
                            id="email"
                            placeholder="Enter email address here"
                            value={data.email ?? ''}
                            onChange={(e) => setData(prev => ({ ...prev, email: e.target.value }))}
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="email">
                            Name
                        </Label>
                        <Input
                            id="name"
                            placeholder="Enter your name here"
                            value={data.name ?? ''}
                            onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))}
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="msg">
                            Message
                        </Label>
                        <Textarea
                            id="msg"
                            placeholder="Enter message here"
                            value={data.msg ?? ''}
                            onChange={(e) => setData(prev => ({ ...prev, msg: e.target.value }))}
                            required
                        />
                    </div>
                    <Button className="w-full !my-4" type="submit" variant="default">
                        Submit
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};