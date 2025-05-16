
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Stock price data
const stocks = {
  "MTNGH": 3.30,
  "GOIL": 1.77,
  "TOTAL": 25.0,
  "UNIL": 19.54,
  "FML": 4.80, // Example price
  "GCB": 7.60, // 760 pesewas = 7.60 GHS
  "DASPHARM": 0.38,
  "ACCESS": 9.20
};

const EquityCalculator = () => {
  const [selectedStock, setSelectedStock] = useState<string>('MTNGH');
  const [buyPrice, setBuyPrice] = useState<string>('');
  const [currentPrice, setCurrentPrice] = useState<string>('');
  const [shares, setShares] = useState<string>('1000');
  const [dividend, setDividend] = useState<string>('0.12');
  const [capitalGain, setCapitalGain] = useState<number>(0);
  const [dividendIncome, setDividendIncome] = useState<number>(0);
  const [totalReturn, setTotalReturn] = useState<number>(0);
  const [returnPercentage, setReturnPercentage] = useState<number>(0);

  // Set initial price when stock selection changes
  useEffect(() => {
    if (selectedStock) {
      const stockPrice = stocks[selectedStock as keyof typeof stocks];
      setCurrentPrice(stockPrice.toString());
      
      // Set a default buy price slightly lower than current price for demonstration
      const defaultBuyPrice = (stockPrice * 0.9).toFixed(2);
      setBuyPrice(defaultBuyPrice);
    }
  }, [selectedStock]);

  const calculateEquityReturn = () => {
    const buyPriceNum = parseFloat(buyPrice);
    const currentPriceNum = parseFloat(currentPrice);
    const sharesNum = parseInt(shares);
    const dividendNum = parseFloat(dividend);
    
    if (isNaN(buyPriceNum) || isNaN(currentPriceNum) || isNaN(sharesNum) || isNaN(dividendNum)) {
      return;
    }
    
    const calculatedCapitalGain = (currentPriceNum - buyPriceNum) * sharesNum;
    const calculatedDividendIncome = dividendNum * sharesNum;
    const calculatedTotalReturn = calculatedCapitalGain + calculatedDividendIncome;
    const initialInvestment = buyPriceNum * sharesNum;
    const calculatedReturnPercentage = (calculatedTotalReturn / initialInvestment) * 100;
    
    setCapitalGain(parseFloat(calculatedCapitalGain.toFixed(2)));
    setDividendIncome(parseFloat(calculatedDividendIncome.toFixed(2)));
    setTotalReturn(parseFloat(calculatedTotalReturn.toFixed(2)));
    setReturnPercentage(parseFloat(calculatedReturnPercentage.toFixed(2)));
  };

  useEffect(() => {
    if (buyPrice && currentPrice && shares && dividend) {
      calculateEquityReturn();
    }
  }, [selectedStock, buyPrice, currentPrice, shares, dividend]);

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-950">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-cc-navy dark:text-white mb-8">
            Equity Investment Calculator
          </h1>

          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="stocks">Stock Prices</TabsTrigger>
            </TabsList>
            
            <TabsContent value="calculator">
              <Card>
                <CardHeader className="bg-cc-navy dark:bg-cc-navy/80 text-white">
                  <CardTitle className="flex items-center">
                    <Calculator className="mr-2 h-5 w-5" /> 
                    Stock Return Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="stock">Select Stock</Label>
                        <Select 
                          value={selectedStock}
                          onValueChange={setSelectedStock}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select stock" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {Object.keys(stocks).map(stock => (
                                <SelectItem key={stock} value={stock}>{stock}</SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="buyPrice">Buying Price (GHS)</Label>
                        <Input
                          id="buyPrice"
                          type="number"
                          value={buyPrice}
                          onChange={(e) => setBuyPrice(e.target.value)}
                          step="0.01"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="currentPrice">Current Price (GHS)</Label>
                        <Input
                          id="currentPrice"
                          type="number"
                          value={currentPrice}
                          onChange={(e) => setCurrentPrice(e.target.value)}
                          step="0.01"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="shares">Number of Shares</Label>
                        <Input
                          id="shares"
                          type="number"
                          value={shares}
                          onChange={(e) => setShares(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="dividend">Dividend per Share (GHS)</Label>
                        <Input
                          id="dividend"
                          type="number"
                          value={dividend}
                          onChange={(e) => setDividend(e.target.value)}
                          step="0.01"
                        />
                      </div>
                      
                      <Button 
                        onClick={calculateEquityReturn}
                        className="w-full bg-cc-gold text-cc-navy hover:bg-cc-gold/90 dark:bg-cc-gold dark:text-cc-navy dark:hover:bg-cc-gold/90"
                      >
                        Calculate
                      </Button>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-800/50">
                      <h3 className="text-lg font-medium mb-4 text-cc-navy dark:text-white">Results</h3>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Initial Investment</TableCell>
                            <TableCell className="text-right">
                              GHS {(parseFloat(buyPrice || '0') * parseInt(shares || '0')).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Capital Gain</TableCell>
                            <TableCell className={`text-right ${capitalGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              GHS {capitalGain.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Dividend Income</TableCell>
                            <TableCell className="text-right text-green-600">
                              GHS {dividendIncome.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Total Return</TableCell>
                            <TableCell className={`text-right font-bold ${totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              GHS {totalReturn.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Return Percentage</TableCell>
                            <TableCell className={`text-right font-bold ${returnPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {returnPercentage.toFixed(2)}%
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 border-t dark:bg-gray-800/30 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 flex flex-col items-start py-4">
                  <p>Formula: Total Return = (Current Price - Buying Price) × Number of Shares + Total Dividends</p>
                  <p>Note: This is a simplified calculation that doesn't account for factors like transaction fees, taxes, or time value of money.</p>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="stocks">
              <Card>
                <CardHeader>
                  <CardTitle>Current Stock Prices</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Symbol</TableHead>
                        <TableHead className="text-right">Price (GHS)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(stocks).map(([symbol, price]) => (
                        <TableRow key={symbol}>
                          <TableCell className="font-medium">{symbol}</TableCell>
                          <TableCell className="text-right">{price.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="text-sm text-gray-500">
                  Stock prices are for demonstration purposes only.
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EquityCalculator;
