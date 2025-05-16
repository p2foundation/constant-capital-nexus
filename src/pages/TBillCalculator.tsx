
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const TBillCalculator = () => {
  const [faceValue, setFaceValue] = useState<string>('10000');
  const [interestRate, setInterestRate] = useState<string>('15');
  const [term, setTerm] = useState<string>('91');
  const [purchasePrice, setPurchasePrice] = useState<number>(0);
  const [profit, setProfit] = useState<number>(0);
  const [annualizedReturn, setAnnualizedReturn] = useState<number>(0);

  const calculateTBill = () => {
    const faceValueNum = parseFloat(faceValue);
    const interestRateNum = parseFloat(interestRate);
    const termDays = parseInt(term);
    
    if (isNaN(faceValueNum) || isNaN(interestRateNum) || isNaN(termDays)) {
      return;
    }
    
    // Calculate purchase price using the formula: Face Value × (1 - (Interest Rate × Term) / 36500)
    const calculatedPurchasePrice = faceValueNum * (1 - (interestRateNum * termDays) / 36500);
    const calculatedProfit = faceValueNum - calculatedPurchasePrice;
    const calculatedAnnualReturn = (calculatedProfit / calculatedPurchasePrice) * (365 / termDays) * 100;
    
    setPurchasePrice(parseFloat(calculatedPurchasePrice.toFixed(2)));
    setProfit(parseFloat(calculatedProfit.toFixed(2)));
    setAnnualizedReturn(parseFloat(calculatedAnnualReturn.toFixed(2)));
  };

  useEffect(() => {
    calculateTBill();
  }, []);

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-950">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-cc-navy dark:text-white mb-8">
            Treasury Bill Calculator
          </h1>
          
          <div className="grid gap-6 md:grid-cols-1">
            <Card>
              <CardHeader className="bg-cc-navy dark:bg-cc-navy/80 text-white">
                <CardTitle className="flex items-center">
                  <Calculator className="mr-2 h-5 w-5" /> 
                  T-Bill Investment Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="faceValue">Face Value (GHS)</Label>
                      <Input
                        id="faceValue"
                        type="number"
                        value={faceValue}
                        onChange={(e) => setFaceValue(e.target.value)}
                        placeholder="10,000"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="interestRate">Interest Rate (% p.a.)</Label>
                      <Input
                        id="interestRate"
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        placeholder="15"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="term">Term</Label>
                      <Select 
                        defaultValue={term}
                        onValueChange={(value) => setTerm(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select term" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="91">91 days</SelectItem>
                            <SelectItem value="182">182 days</SelectItem>
                            <SelectItem value="364">364 days</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button 
                      onClick={calculateTBill}
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
                          <TableCell className="font-medium">Purchase Price</TableCell>
                          <TableCell className="text-right">GHS {purchasePrice.toLocaleString()}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Profit at Maturity</TableCell>
                          <TableCell className="text-right">GHS {profit.toLocaleString()}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Annualized Return</TableCell>
                          <TableCell className="text-right">{annualizedReturn}%</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 border-t dark:bg-gray-800/30 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 flex flex-col items-start py-4">
                <p>Note: T-Bills are short-term government securities sold at a discount and redeemed at face value.</p>
                <p>Formula: Purchase Price = Face Value × (1 - (Interest Rate × Term (days)) / 36500)</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TBillCalculator;
