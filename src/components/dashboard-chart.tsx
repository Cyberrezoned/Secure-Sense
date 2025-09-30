'use client';

import { useState, useEffect } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const generateData = () => {
  const data = [];
  const now = new Date();
  for (let i = 10; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 1000);
    data.push({
      time: time.toLocaleTimeString([], { second: '2-digit' }),
      attacks: Math.floor(Math.random() * (40 - 10 + 1) + 10),
      defenses: Math.floor(Math.random() * (80 - 20 + 1) + 20),
    });
  }
  return data;
};

const chartConfig = {
  attacks: {
    label: 'Simulated Attacks',
    color: 'hsl(var(--chart-1))',
  },
  defenses: {
    label: 'Threats Neutralized',
    color: 'hsl(var(--chart-2))',
  },
};

export function DashboardChart() {
  const [data, setData] = useState(generateData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(currentData => {
        const newDataPoint = {
          time: new Date().toLocaleTimeString([], { second: '2-digit' }),
          attacks: Math.floor(Math.random() * (40 - 5 + 1) + 5),
          defenses: Math.floor(Math.random() * (80 - 20 + 1) + 20),
        };
        return [...currentData.slice(1), newDataPoint];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-secondary/50 border-border/50">
      <CardHeader>
        <CardTitle>Live Operations Feed</CardTitle>
        <CardDescription>Real-time Red Team vs. Blue Team activity.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <AreaChart
              data={data}
              margin={{ top: 5, right: 20, left: -10, bottom: 0 }}
              accessibilityLayer
            >
              <defs>
                <linearGradient id="colorAttacks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorDefenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                cursor={{ fill: 'hsl(var(--background) / 0.5)' }}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                type="monotone"
                dataKey="attacks"
                stroke="hsl(var(--chart-1))"
                fillOpacity={1}
                fill="url(#colorAttacks)"
                strokeWidth={2}
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="defenses"
                stroke="hsl(var(--chart-2))"
                fillOpacity={1}
                fill="url(#colorDefenses)"
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
