import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import { DollarSignIcon } from '@/components/ui/icons';

const SimpleTreemapComponent = ({ title, value, improvement, data }) => (
  <Card className="h-[300px]">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <DollarSignIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{improvement}</p>
      <ResponsiveContainer width="100%" height={200}>
        <Treemap data={data} dataKey="value" stroke="#8884d8" fill="#8884d8">
          <Tooltip />
        </Treemap>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default SimpleTreemapComponent;
