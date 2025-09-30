'use client';

import { useState, useEffect } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const generateData = () => {
  const data = [];
  const now = new Date();
  for (let i = 10; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 1000);
    data.push({
      time: time.toLocaleTimeString([], { second: '2-digit' }),
      threats: Math.floor(Math.random() * (80 - 20 + 1) + 20),
      anomalies: Math.floor(Math.random() * (50 - 10 + 1) + 10),
    });
  }
  return data;
};

export function DashboardChart() {
  const [data, setData] = useState(generateData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(currentData => {
        const newDataPoint = {
          time: new Date().toLocaleTimeString([], { second: '2-digit' }),
          threats: Math.floor(Math.random() * (80 - 20 + 1) + 20),
          anomalies: Math.floor(Math.random() * (50 - 10 + 1) + 10),
        };
        return [...currentData.slice(1), newDataPoint];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-secondary/50 border-border/50">
      <CardHeader>
        <CardTitle>Live Threat Feed</CardTitle>
        <CardDescription>Real-time analysis of network activity.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorAnomalies" x1="0" y1="0" x2="0" y2="1">
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
                dataKey="threats"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorThreats)"
                strokeWidth={2}
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="anomalies"
                stroke="hsl(var(--chart-2))"
                fillOpacity={1}
                fill="url(#colorAnomalies)"
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
