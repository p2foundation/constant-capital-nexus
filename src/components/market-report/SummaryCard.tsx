
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  items: Array<{
    name: string;
    value: number;
    change: number;
    isPositive: boolean;
    prefix?: string;
    suffix?: string;
  }>;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, items }) => {
  return (
    <Card className="shadow-md dark:bg-cc-navy/80 dark:border-cc-gold/20 print:shadow-none print:break-inside-avoid">
      <CardHeader>
        <CardTitle className="dark:text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center border-b pb-3 border-gray-200 dark:border-gray-700">
              <div>
                <p className="font-medium dark:text-white">{item.name}</p>
                <p className="text-2xl font-bold mt-1 dark:text-white">
                  {item.prefix || ''}{item.value.toFixed(2)}{item.suffix || ''}
                </p>
              </div>
              <div className={`flex items-center ${item.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {item.isPositive ? (
                  <TrendingUp className="h-5 w-5 mr-1" />
                ) : (
                  <TrendingDown className="h-5 w-5 mr-1" />
                )}
                <span className="font-medium text-lg">
                  {item.isPositive ? '+' : ''}{item.change.toFixed(2)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
