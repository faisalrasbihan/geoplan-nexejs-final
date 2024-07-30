"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const defaultChartData = [
  { month: "jan", visitors: 539640, fill: "hsl(var(--chart-2))" },
  { month: "feb", visitors: 572787, fill: "hsl(var(--chart-2))" },
  { month: "mar", visitors: 554537, fill: "hsl(var(--chart-1))" },
  { month: "apr", visitors: 606625, fill: "hsl(var(--chart-1))" },
  { month: "may", visitors: 609787, fill: "hsl(var(--chart-1))" },
  { month: "jun", visitors: 634029, fill: "hsl(var(--chart-1))" },
]

const chartConfig = {
  visitors: {
    label: "Nominal : ",
  },
  jan: {
    label: "2023",
    color: "hsl(var(--chart-1))",
  },
  feb: {
    label: "2024",
    color: "hsl(var(--chart-1))",
  },
  mar: {
    label: "2025",
    color: "hsl(var(--chart-1))",
  },
  apr: {
    label: "2026",
    color: "hsl(var(--chart-1))",
  },
  may: {
    label: "2027",
    color: "hsl(var(--chart-1))",
  },
  jun: {
    label: "2028",
    color: "hsl(var(--chart-1))",
  }
}

export default function GPDotLineChart({ data  = defaultChartData}) {
  const chartData = data.length > 0 ? data : defaultChartData;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Potensi Ekonomi</CardTitle>
        <CardDescription>Total potensi ekonomi dalam IDR - Predicted</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value]?.label
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="visitors"
              strokeWidth={2}
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Forecasted rending up by 3.2% Year-on-Year <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total potential economic growth for the next 4 years.
        </div>
      </CardFooter>
    </Card>
  )
}
