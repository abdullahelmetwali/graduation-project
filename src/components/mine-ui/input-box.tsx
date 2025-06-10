import type { InputBoxType } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export default function InputBox<T extends string | number>
    ({ label, placeHolder, content, badge, type, value, onChange, className }: InputBoxType<T>) {

    const convertToNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (type === 'number') {
            onChange(Number(inputValue) as T);
        } else {
            onChange(inputValue as T);
        }
    };

    return (
        <div className="relative">
            <Label htmlFor={label} className="!mx-1 capitalize">{label}</Label>
            <Input
                type={type}
                value={value ?? ''}
                onChange={convertToNumber}
                id={label}
                placeholder={placeHolder}
                className={`${className ? className : 'w-96 max-lg:w-[22rem]'} my-1`}
                required
            />

            <Tooltip>
                <TooltipTrigger asChild className="hidden lg:block">
                    <Button type="button" variant="outline" className="absolute right-0 top-7">
                        <AlertCircle />
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="text-wrap text-center">
                    {content} {badge && <Badge variant="secondary" className="ml-1">{badge}</Badge>}
                </TooltipContent>
            </Tooltip>

            <Popover>
                <PopoverTrigger asChild className="block lg:hidden" type="button">
                    <Button type="button" variant="outline" className="absolute right-0 top-7">
                        <AlertCircle />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="text-wrap max-w-[22rem] text-center text-xs bg-secondary-foreground text-primary-foreground py-2">
                    {content} {badge && <Badge variant="secondary" className="ml-1 mt-2">{badge}</Badge>}
                </PopoverContent>
            </Popover>
        </div>
    );
};