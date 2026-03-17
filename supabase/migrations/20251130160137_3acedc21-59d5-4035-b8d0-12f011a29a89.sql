-- Clean up existing duplicate records, keeping only the most recent
DELETE FROM market_data a
USING market_data b
WHERE a.id < b.id
  AND a.data_type = b.data_type
  AND a.date = b.date
  AND COALESCE(a.ticker_symbol, '') = COALESCE(b.ticker_symbol, '');

-- Add unique constraint to prevent duplicate market data entries
ALTER TABLE market_data 
ADD CONSTRAINT market_data_type_symbol_date_unique 
UNIQUE (data_type, ticker_symbol, date);