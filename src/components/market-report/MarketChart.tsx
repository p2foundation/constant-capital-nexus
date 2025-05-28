
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface MarketChartProps {
  title: string;
  description: string;
  chart: React.ReactNode;
}

const MarketChart: React.FC<MarketChartProps> = ({ title, description, chart }) => {
  return (
    <Card className="shadow-md dark:bg-cc-navy/80 dark:border-cc-gold/20 print:shadow-none print:break-inside-avoid">
      <CardHeader>
        <CardTitle className="dark:text-white">{title}</CardTitle>
        <CardDescription className="dark:text-gray-300">{description}</CardDescription>
      </CardHeader>
      <CardContent>{chart}</CardContent>
    </Card>
  );
};

export default MarketChart;
