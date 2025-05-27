import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home(){
    return (
        <div>
            <Button asChild variant="outline" className="m-4">
                <Link to={'/capacity'} className="">
                Capacity
                </Link>
            </Button>
            <Button asChild variant="outline" className="m-4">
                <Link to={'/link-budget'} className="">
                Link Budget
                </Link>
            </Button>
        </div>
    )
}