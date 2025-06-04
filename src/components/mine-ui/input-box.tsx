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
                // required
            />
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" className="absolute right-0 top-7">
                        🤔
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    {content} {badge && <Badge variant="secondary" className="ml-1">{badge}</Badge>}
                </TooltipContent>
            </Tooltip>
        </div>
    );
};