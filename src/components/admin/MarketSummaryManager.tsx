
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { marketSummaryAPI } from "@/services/api";

// Initial data structure
const initialMarketSummary = {
  title: "Ghana Market Summary - April 30, 2025",
  summary: "Ghana's stock market showed strong performance in April, with the GSE Composite Index gaining 3.2% month-to-date. Banking stocks led the rally with significant gains, while the consumer goods sector showed mixed results. Foreign investor participation increased by 15% compared to March.",
  highlights: [
    "Banking sector up 4.5% MTD",
    "T-bill rates stable at 21.5%",
    "Ghana Cedi strengthened against USD by 0.8%"
  ]
};

const MarketSummaryManager = () => {
  const [marketSummary, setMarketSummary] = useState(initialMarketSummary);
  const [newHighlight, setNewHighlight] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Fetch market summary data from API on component mount
  useEffect(() => {
    const fetchMarketSummary = async () => {
      try {
        setIsLoading(true);
        // When API is ready, uncomment this code to fetch real data
        // const data = await marketSummaryAPI.getSummary();
        // setMarketSummary(data);
        
        // For now, simulate a successful API call with mock data
        setTimeout(() => {
          setIsLoading(false);
          toast.info("Using mock data until API is connected");
        }, 500);
      } catch (error) {
        console.error("Error fetching market summary:", error);
        toast.error("Failed to load market summary data");
        setIsLoading(false);
      }
    };
    
    fetchMarketSummary();
  }, []);
  
  const handleSave = async () => {
    try {
      setIsSaving(true);
      // When API is ready, uncomment this code to send real data
      // await marketSummaryAPI.updateSummary(marketSummary);
      
      // For now, simulate a successful API call
      setTimeout(() => {
        setIsSaving(false);
        toast.success("Market summary updated successfully");
      }, 1000);
    } catch (error) {
      console.error("Error saving market summary:", error);
      toast.error("Failed to update market summary");
      setIsSaving(false);
    }
  };
  
  const addHighlight = () => {
    if (newHighlight.trim()) {
      setMarketSummary({
        ...marketSummary,
        highlights: [...marketSummary.highlights, newHighlight.trim()]
      });
      setNewHighlight("");
    }
  };
  
  const removeHighlight = (index: number) => {
    setMarketSummary({
      ...marketSummary,
      highlights: marketSummary.highlights.filter((_, i) => i !== index)
    });
  };
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Market Summary</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-10">
          <div className="flex flex-col items-center space-y-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="text-sm text-muted-foreground">Loading market summary data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <Input 
            value={marketSummary.title}
            onChange={(e) => setMarketSummary({...marketSummary, title: e.target.value})}
            placeholder="Market Summary Title"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Summary</label>
          <Textarea 
            value={marketSummary.summary}
            onChange={(e) => setMarketSummary({...marketSummary, summary: e.target.value})}
            placeholder="Write a comprehensive market summary..."
            rows={5}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Market Highlights</label>
          <ul className="space-y-2 mb-4">
            {marketSummary.highlights.map((highlight, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded">
                <span>{highlight}</span>
                <Button variant="ghost" size="sm" onClick={() => removeHighlight(index)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
          
          <div className="flex space-x-2">
            <Input 
              value={newHighlight}
              onChange={(e) => setNewHighlight(e.target.value)}
              placeholder="Add new highlight..."
            />
            <Button onClick={addHighlight} type="button">Add</Button>
          </div>
        </div>
        
        <div className="pt-4 flex justify-end">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketSummaryManager;
