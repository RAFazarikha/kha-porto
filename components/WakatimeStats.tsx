'use client';

import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"


const chartConfig = {
  percent: {
    label: "Persentase (%): ",
    color: "hsl(var(--chart-1))", // Menggunakan warna primary tema kamu
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig

// Definisikan tipe data sesuai respons dari API Route kita
type WakatimeData = {
  overview: {
    startDate: string;
    endDate: string;
    dailyAverage: string;
    totalThisWeek: string;
    bestDayDate: string;
    bestDayText: string;
    allTimeTotal: string;
  };
  languages: { name: string; text: string; percent: number }[];
};

interface WakaProps {
  dict: Record<string, string>;
}

export default function WakatimeStats({ dict }: WakaProps) {
  const [data, setData] = useState<WakatimeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWakatime = async () => {
      try {
        const res = await fetch('/api/wakatime');
        if (!res.ok) throw new Error('Network response was not ok');
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching Wakatime:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWakatime();
  }, []);

  if (loading) return <div className="animate-pulse bg-primary h-32 rounded-lg"></div>;
  if (!data) return <div>{dict.error}</div>;

  return (
    <div className='grid grid-cols-1 md:grid-cols-6 gap-4'>
        <Card className='md:col-span-3 py-6 rounded-lg hover:shadow transition-all duration-300 transform hover:-translate-y-1 border gap-0!' size='sm'>
            <CardHeader>
                <CardTitle>{dict.startDate}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-base text-primary font-bold">{data.overview.startDate}</p>
            </CardContent>
        </Card>
        <Card className='md:col-span-3 py-6 rounded-lg hover:shadow transition-all duration-300 transform hover:-translate-y-1 border gap-0!' size='sm'>
            <CardHeader>
                <CardTitle>{dict.endDate}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-base text-primary font-bold">{data.overview.endDate}</p>
            </CardContent>
        </Card>
        <Card className='md:col-span-3 py-6 rounded-lg hover:shadow transition-all duration-300 transform hover:-translate-y-1 border gap-0!' size='sm'>
            <CardHeader>
                <CardTitle>{dict.dailyAverage}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-base text-primary font-bold">{data.overview.dailyAverage}</p>
            </CardContent>
        </Card>
        <Card className='md:col-span-3 py-6 rounded-lg hover:shadow transition-all duration-300 transform hover:-translate-y-1 border gap-0!' size='sm'>
            <CardHeader>
                <CardTitle>{dict.totalThisWeek}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-base text-primary font-bold">{data.overview.totalThisWeek}</p>
            </CardContent>
        </Card>
        <Card className='md:col-span-3 py-6 rounded-lg hover:shadow transition-all duration-300 transform hover:-translate-y-1 border gap-0!' size='sm'>
            <CardHeader>
                <CardTitle>{dict.bestDayDate}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-base text-primary font-bold">{data.overview.bestDayDate} ({data.overview.bestDayText})</p>
            </CardContent>
        </Card>
        <Card className='md:col-span-3 py-6 rounded-lg hover:shadow transition-all duration-300 transform hover:-translate-y-1 border gap-0!' size='sm'>
            <CardHeader>
                <CardTitle>{dict.allTimeTotal}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-base text-primary font-bold">{data.overview.allTimeTotal}</p>
            </CardContent>
        </Card>
        <Card className='md:col-span-6 py-6 rounded-lg hover:shadow transition-all duration-300 transform hover:-translate-y-1 border'>
            <CardHeader>
                <CardTitle>{dict.languages}</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="w-full h-80">
                <BarChart
                    accessibilityLayer
                    data={data.languages}
                    layout="vertical"
                    barCategoryGap="20%"
                    margin={{
                        right: 40,
                        left: 20,
                    }}
                >
                    <CartesianGrid horizontal={false} />
                    <YAxis
                        dataKey="name"
                        type="category"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value}
                    />
                    <XAxis dataKey="percent" type="number" />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                    />

                    <Bar dataKey="percent" fill="var(--chart-1)">
                        <LabelList
                            dataKey="percent"
                            position="right"
                            offset={8}
                            className="fill-foreground font-medium"
                            fontSize={12}
                            textAnchor='start'
                            formatter={(value) => `${value}%`}
                        />
                    </Bar>
                </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    </div>
  );
}