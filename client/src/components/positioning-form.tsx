import { useState } from "react";
import { FormData } from "@/pages/home";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Form validation schema
const formSchema = z.object({
  audience: z.string().min(3, { message: "Target audience is required" }),
  transformation: z.string().min(3, { message: "Transformation or outcome is required" }),
  service: z.string().min(3, { message: "Service or offer is required" }),
  differentiator: z.string().min(3, { message: "Differentiator is required" }),
  objection: z.string().optional(),
});

interface PositioningFormProps {
  onSubmit: (data: FormData) => void;
  loading: boolean;
}

export default function PositioningForm({ onSubmit, loading }: PositioningFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      audience: "",
      transformation: "",
      service: "",
      differentiator: "",
      objection: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="audience"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-semibold text-gray-700 flex items-center">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold mr-2">1</span>
                  Who is your target audience?
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., Female entrepreneurs in their 30s" 
                    {...field} 
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500">
                  Be as specific as possible about who you serve.
                </FormDescription>
                <FormMessage className="text-red-500 text-xs" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="transformation"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-semibold text-gray-700 flex items-center">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold mr-2">2</span>
                  What transformation do you provide?
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., Increase sales by 30% in 90 days" 
                    {...field} 
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500">
                  What will your clients achieve after working with you?
                </FormDescription>
                <FormMessage className="text-red-500 text-xs" />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-semibold text-gray-700 flex items-center">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold mr-2">3</span>
                  What service or offer do you provide?
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., 1:1 business coaching program" 
                    {...field} 
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500">
                  The specific product, service, or program you offer.
                </FormDescription>
                <FormMessage className="text-red-500 text-xs" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="differentiator"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-semibold text-gray-700 flex items-center">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold mr-2">4</span>
                  What makes your approach different?
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., A proprietary 5-step framework based on neuroscience" 
                    {...field} 
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500">
                  Your unique methodology, approach, or philosophy.
                </FormDescription>
                <FormMessage className="text-red-500 text-xs" />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="objection"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-semibold text-gray-700 flex items-center">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold mr-2">5</span>
                What's a common objection you address? (Optional)
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., Without needing to spend hours on social media" 
                  {...field} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                />
              </FormControl>
              <FormDescription className="text-xs text-gray-500">
                A common concern or obstacle your clients face.
              </FormDescription>
              <FormMessage className="text-red-500 text-xs" />
            </FormItem>
          )}
        />
        
        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-lg"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Your Brand Positioning...
              </div>
            ) : (
              <>
                <span>Generate Positioning Statements</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
