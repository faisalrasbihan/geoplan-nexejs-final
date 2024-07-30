import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DollarSignIcon, PercentIcon } from '@/components/ui/icons';

const getRandomValue = () => {
  return `$${(Math.random() * 100000).toFixed(2)}`;
};

const getRandomImprovement = () => {
  return `${(Math.random() * 100).toFixed(1)}% from last month`;
};

const SimpleBANComponent = ({ title = "Total Revenue", value = getRandomValue(), improvement = getRandomImprovement() }) => (
  <Card className="h-[130px]">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <PercentIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold">{value}</div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{improvement}</p>
    </CardContent>
  </Card>
);

export default SimpleBANComponent;
