'use client';

import { useState, useEffect } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const generateInitialData = () => {
  const data = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 2000);
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      attacks: Math.floor(Math.random() * 20),
      defenses: Math.floor(Math.random() * 5),
    });
  }
  return data;
};

const chartConfig = {
  attacks: {
    label: 'Simulated Attacks',
    color: 'hsl(var(--destructive))',
  },
  defenses: {
    label: 'Threats Neutralized',
    color: 'hsl(var(--primary))',
  },
};

export function DashboardChart() {
  const [data, setData] = useState(generateInitialData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(currentData => {
        const now = new Date();
        const attackSpike = Math.random() > 0.9; // 10% chance of a spike
        const newAttacks = attackSpike 
          ? Math.floor(Math.random() * 30 + 70) // 70-100
          : Math.floor(Math.random() * 30); // 0-30

        const defenseResponse = newAttacks > 40
          ? Math.floor(Math.random() * 20 + newAttacks * 0.8) // Respond to high attacks
          : Math.floor(Math.random() * 20); // Normal defense

        const newDataPoint = {
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          attacks: newAttacks,
          defenses: Math.min(newAttacks, defenseResponse), // Can't neutralize more than what attacked
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
                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorDefenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tick={{ fill: 'hsl(var(--muted-foreground))' }} domain={[0, 'dataMax + 20']} />
              <Tooltip
                cursor={{ fill: 'hsl(var(--background) / 0.5)' }}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                type="monotone"
                dataKey="attacks"
                stroke="hsl(var(--destructive))"
                fillOpacity={1}
                fill="url(#colorAttacks)"
                strokeWidth={2}
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="defenses"
                stroke="hsl(var(--primary))"
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
