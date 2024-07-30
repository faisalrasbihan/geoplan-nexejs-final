import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ActivityIcon, ArrowUpIcon, CreditCardIcon, DollarSignIcon, MoveHorizontalIcon, Package2Icon, SearchIcon, UsersIcon} from "@/components/ui/icons"

const SimpleRechartsComponent = ({ title, value, improvement, data }) => (
  <Card className="h-[300px]">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <DollarSignIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{improvement}</p>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#999' }} />
          <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default SimpleRechartsComponent;
