
import { useState, useEffect } from 'react';
import { toast } from "sonner";

/**
 * A custom hook for handling API data fetching, updating and state management
 * 
 * @param fetchFn - Function to fetch data from API
 * @param updateFn - Function to update data via API
 * @param initialData - Initial data to use before API response
 * @param errorMessage - Custom error message for failed fetches
 */
export function useApiData<T>(
  fetchFn: () => Promise<T>,
  updateFn: (data: T) => Promise<any>,
  initialData: T,
  errorMessage: string = "Failed to load data"
) {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from API
  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetchFn();
      setData(response);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Save data to API
  const saveData = async (updatedData: T) => {
    try {
      setIsSaving(true);
      setError(null);
      
      await updateFn(updatedData);
      const persistedData = await fetchFn();
      setData(persistedData);
      toast.success("Data saved successfully");
    } catch (err) {
      console.error("Error saving data:", err);
      setError("Failed to save data");
      toast.error("Failed to save changes");
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return { data, setData, isLoading, isSaving, error, fetchData, saveData };
}
