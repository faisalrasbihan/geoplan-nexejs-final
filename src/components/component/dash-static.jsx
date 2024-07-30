'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ActivityIcon, ArrowUpIcon, CreditCardIcon, DollarSignIcon, GeoplanAIIcon, MoveHorizontalIcon, IconGemini, SearchIcon, UsersIcon } from "@/components/ui/icons";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import SimpleRechartsComponent from '@/components/ui/SimpleRechartsComponent';
import SimpleBANComponent from '@/components/ui/SimpleBANComponent';
import { SimpleAreaChart } from '@/components/chart/GPAreaChart';
import { SimpleBarChart } from '@/components/chart/GPBarChart';
import { GPPieChart } from '@/components/chart/GPPieChart';
import { GPNegativeChart } from '@/components/chart/GPNegativeChart';
import { generateRandomChartData } from '@/components/utils/generateRandomData';
import Spinner from '@/components/ui/spinner';
import BasicMap from '@/components/ui/BasicMap';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const kalimantanProvinces = ['Kalimantan Barat', 'Kalimantan Tengah', 'Kalimantan Selatan', 'Kalimantan Timur', 'Kalimantan Utara'];
const kalimantanKabupaten = {
  'Kalimantan Barat': ['Kabupaten 1', 'Kabupaten 2'],
  'Kalimantan Tengah': ['Kabupaten 3', 'Kabupaten 4'],
  'Kalimantan Selatan': ['Kabupaten 5', 'Kabupaten 6'],
  'Kalimantan Timur': ['Kabupaten 7', 'Kabupaten 8'],
  'Kalimantan Utara': ['Kabupaten 9', 'Kabupaten 10']
};
const years = [2023, 2022];

const chartTypes = ['line', 'treemap', 'bar', 'pie']; // Add 'area' chart type

const generateRandomCharts = () => {
  const numCharts = Math.floor(Math.random() * 6) + 3; // 3 to 8 charts
  const charts = [];
  for (let i = 0; i < numCharts; i++) {
    const chartData = generateRandomChartData();
    console.log('Chart Data :', chartData);
    const chartType = chartTypes[Math.floor(Math.random() * chartTypes.length)];
    charts.push({ ...chartData, type: chartType });
  }
  return charts;
};

export default function Dash() {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [charts, setCharts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(kalimantanProvinces[0]);
  const [selectedKabupaten, setSelectedKabupaten] = useState(kalimantanKabupaten[kalimantanProvinces[0]][0]);
  const [selectedYear, setSelectedYear] = useState(years[0]);

  const handleChartRequest = async () => {
    if (input.trim() !== '') {
      const newMessages = [...messages, { speaker: 'User', text: input }];
      setMessages(newMessages);
      setInput('');
      setIsTyping(true);

      try {
        const response = await fetch('/api/generate-text', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: input }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong');
        }

        const newCharts = generateRandomCharts();
        setCharts(newCharts);
        setMessages([...newMessages, { speaker: 'AI', text: data.text }]);
      } catch (error) {
        console.error('Error generating text:', error);
        setMessages([...newMessages, { speaker: 'AI', text: 'There was an error generating the response.' }]);
      }

      setIsTyping(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleChartRequest();
    }
  };

  const handleProvinceChange = (province) => {
    setSelectedProvince(province);
    setSelectedKabupaten(kalimantanKabupaten[province][0]);
  };

  const handleKabupatenChange = (kabupaten) => {
    setSelectedKabupaten(kabupaten);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  useEffect(() => {
    const initialCharts = generateRandomCharts(); // Generate initial set of random charts
    setCharts(initialCharts);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6 text-white sticky top-0 z-50" style={{ backgroundColor: '#000033' }}>
        <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
            prefetch={false}>
            <GeoplanAIIcon className="w-6 h-6 text-white" />
            <span className="sr-only">Geoplan AI</span>
          </Link>
          <Link href="#" className="font-bold" prefetch={false}>
            Dashboard
          </Link>
          <Link href="#" className="text-white dark:text-gray-400" prefetch={false}>
            Reports
          </Link>
          <Link href="#" className="text-white dark:text-gray-400" prefetch={false}>
            Settings
          </Link>
        </nav>
        <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="flex-1 ml-auto sm:flex-initial">
            <div className="relative">
              <SearchIcon
                className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-gray-900 text-gray-300 border-gray-700 rounded-md" />
            </div>
          </form>
          <Button variant="ghost" size="icon" className="rounded-full">
            <img
              src="/placeholder-user.jpg"
              width="32"
              height="32"
              className="rounded-full"
              alt="Avatar" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto p-6">
          <div className="flex gap-6 mb-6">
            <div className="w-1/3">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button className="w-full">{selectedProvince}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {kalimantanProvinces.map((province) => (
                    <DropdownMenuItem key={province} onClick={() => handleProvinceChange(province)}>
                      {province}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="w-1/3">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {<Button className="w-full">{selectedKabupaten}</Button>}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {kalimantanKabupaten[selectedProvince].map((kabupaten) => (
                    <DropdownMenuItem key={kabupaten} onClick={() => handleKabupatenChange(kabupaten)}>
                      {kabupaten}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="w-1/3">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button className="w-full">{selectedYear}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {years.map((year) => (
                    <DropdownMenuItem key={year} onClick={() => handleYearChange(year)}>
                      {year}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 mb-6">
            <SimpleBANComponent title="GDP Growth" value="3.5%" improvement="0.2% from last quarter" />
            <SimpleBANComponent title="Unemployment Rate" value="4.8%" improvement="-0.3% from last month" />
            <SimpleBANComponent title="Inflation Rate" value="2.1%" improvement="0.1% from last month" />
          </div>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Indonesia Map</CardTitle>
                <CardDescription>Heatmap peta Kalimantan</CardDescription>
              </CardHeader>
              <CardContent className="p-0 h-full">
                <div className="h-full">
                  <BasicMap />
                </div>
              </CardContent>
            </Card>
            <SimpleAreaChart />
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-2 w-1/3 flex flex-col h-screen sticky top-0">
          <Card className="h-full flex flex-col">
            <CardContent className="p-0 h-full flex flex-col">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6 border">
                    <AvatarImage src="/gemini.png" />
                    <AvatarFallback>Geoplan AI</AvatarFallback>
                  </Avatar>
                  <div className="font-medium text-sm">Geoplan AI</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <SearchIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MoveHorizontalIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <ScrollArea className="flex-1 overflow-auto pb-16">
                <div className="p-4 space-y-4">
                  {messages.map((message, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <Avatar className="w-6 h-6 border">
                        {message.speaker === 'AI' ? (
                          <AvatarImage src="/gemini.png" />
                        ) : (
                          <AvatarImage src="/placeholder-user.jpg" />
                        )}
                        <AvatarFallback>
                          <UsersIcon className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1 items-start text-sm">
                        <div>
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex items-start gap-4">
                      <Avatar className="w-6 h-6 border">
                        <AvatarImage src="/gemini.png" />
                        <AvatarFallback>
                          <UsersIcon className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1 items-start text-sm">
                        <Spinner />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              <div className="sticky bottom-0 left-0 right-0 p-4 bg-transparent">
                <div className="relative">
                  <Textarea
                    placeholder="Ask me anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="h-12 rounded-2xl resize-none p-4 border border-gray-200 shadow-sm pr-16 bg-gray-100 focus:outline-none focus:ring-0" // Removed border-neutral-400 and added focus:outline-none
                  />
                  <Button
                    type="button"
                    size="icon"
                    className="absolute top-3 right-3 w-8 h-8"
                    onClick={handleChartRequest}
                  >
                    <ArrowUpIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
