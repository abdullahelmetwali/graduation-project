import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    Users,
    Wifi,
    Smartphone,
    Radio,
    DollarSign,
    Lightbulb,
    Briefcase,
    ChartLine
} from 'lucide-react';

const DonutChart = ({ percentage, label, color = "text-secondary-foreground" }) => {
    const strokeDasharray = `${percentage}, 100`;

    return (
        <div className="relative w-28 h-28">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                    className="text-gray-200"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.8"
                />
                <path
                    className={"text-gray-600"}
                    strokeDasharray={strokeDasharray}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-2xl font-bold ${color}`}>{percentage}%</span>
                <p className="text-xs text-gray-500">{label}</p>
            </div>
        </div>
    );
};

const StatCard = ({ icon: Icon, title, subtitle, children, className = "" }) => (
    <Card className={`p-6 ${className}`}>
        <CardHeader className="p-0 mb-4">
            <div className="flex items-start">
                <div className="p-3 bg-secondary rounded-lg mr-4">
                    <Icon className="w-7 h-7 text-secondary-foreground" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-secondary-foreground">{title}</h2>
                    <p className="text-sm text-gray-500">{subtitle}</p>
                </div>
            </div>
        </CardHeader>
        <CardContent className="p-0">
            {children}
        </CardContent>
    </Card>
);

const GrowthIndicator = ({ current, future, currentYear = "2024", futureYear = "2030" }) => (
    <div className="flex justify-around items-end text-center">
        <div>
            <p className="text-3xl font-bold text-secondary-foreground">{current}</p>
            <p className="text-sm font-semibold text-gray-500">{currentYear}</p>
        </div>
        <div className="text-2xl text-gray-400 font-light mb-2">→</div>
        <div>
            <p className="text-3xl font-bold text-secondary-foreground">{future}</p>
            <p className="text-sm font-semibold text-gray-500">{futureYear}</p>
        </div>
    </div>
);

export default function MobileEconomy() {
    document.title = 'Statistics | 5G Planning Tool';

    return (
        <div className="container mx-auto px-4 py-24 max-lg:py-20">
            <header className="text-center mb-12">
                <div className="flex justify-center items-center mb-4">
                    <ChartLine className="w-12 h-12 text-secondary-foreground" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-secondary-foreground">
                    The Mobile Economy
                </h1>
                <p className="mt-4 text-lg text-gray-500">
                    Key statistics and forecasts for the global mobile ecosystem
                </p>
            </header>

            {/* cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                <StatCard
                    icon={Users}
                    title="Unique Mobile Subscribers"
                    subtitle="71% → 78% penetration rate"
                >
                    <GrowthIndicator current="5.8bn" future="6.5bn" />
                </StatCard>

                <StatCard
                    icon={Wifi}
                    title="Mobile Internet Subscribers"
                    subtitle="58% → 64% penetration rate"
                >
                    <GrowthIndicator current="4.7bn" future="5.5bn" />
                </StatCard>

                <StatCard
                    icon={Smartphone}
                    title="Smartphones"
                    subtitle="(percentage of connections)"
                >
                    <div className="flex justify-around items-center text-center">
                        <DonutChart percentage={80} label="2024" />
                        <DonutChart percentage={91} label="2030" />
                    </div>
                </StatCard>

                <StatCard
                    icon={Radio}
                    title="4G vs 5G Connections"
                    subtitle="(percentage of connections)"
                    className="md:col-span-2 lg:col-span-3"
                >
                    <div className="flex flex-col md:flex-row justify-around items-center text-center space-y-4 md:space-y-0">
                        {/* 4G */}
                        <div className="flex items-center space-x-4">
                            <DonutChart percentage={58} label="4G 2024" color="text-gray-600" />
                            <DonutChart percentage={35} label="4G 2030" color="text-gray-600" />
                        </div>
                        {/* 5G */}
                        <div className="flex items-center space-x-4">
                            <DonutChart percentage={25} label="5G 2024" />
                            <DonutChart percentage={57} label="5G 2030" />
                        </div>
                    </div>
                </StatCard>

                <StatCard
                    icon={DollarSign}
                    title="Operator Revenues & Investment"
                    subtitle="Capex of $1.3T for 2024-2030"
                >
                    <GrowthIndicator current="$1.08tn" future="$1.25tn" />
                </StatCard>

                <StatCard
                    icon={Lightbulb}
                    title="Mobile's Contribution to GDP"
                    subtitle="5.8% → 8.4% of GDP"
                >
                    <GrowthIndicator current="$6.5tn" future="$11tn" />
                </StatCard>

                <StatCard
                    icon={Briefcase}
                    title="Employment & Funding"
                    subtitle=""
                >
                    <div className="space-y-4">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-secondary-foreground ">40m</p>
                            <p className="text-sm font-semibold text-gray-500">
                                Jobs Supported (24m Direct, 16m Indirect)
                            </p>
                        </div>
                        <div className="text-center pt-2 border-t border-gray-200">
                            <p className="text-3xl font-bold text-secondary-foreground">$600bn</p>
                            <p className="text-sm font-semibold text-gray-500">
                                Mobile Ecosystem Public Funding
                            </p>
                        </div>
                    </div>
                </StatCard>
            </div>
        </div>
    );
}