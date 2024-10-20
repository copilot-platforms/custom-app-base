"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ArrowUpIcon, ArrowDownIcon, AlertCircle } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Function to generate dummy data
const generateDummyData = (days: number) => {
  const data = []
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)

    data.push({
      date: date.toISOString().split('T')[0],
      openRate: (Math.random() * 0.4 + 0.2).toFixed(2),
      ctr: (Math.random() * 0.15 + 0.05).toFixed(2),
      conversionRate: (Math.random() * 0.1 + 0.01).toFixed(2),
      roi: (Math.random() * 5 + 1).toFixed(2),
    })
  }

  return data
}

// Define a type for the metrics
type Metric = 'openRate' | 'ctr' | 'conversionRate' | 'roi';


// Suggested actions for each metric with detailed processes
const suggestedActions: Record<Metric, Array<{ title: string; process: string[] }>> = {
  openRate: [
    {
      title: "Improve email subject lines",
      process: [
        "Analyze top-performing subject lines",
        "Use action-oriented language",
        "Keep subject lines concise (30-50 characters)",
        "Incorporate personalization",
        "A/B test different subject line styles"
      ]
    },
    {
      title: "Segment your email list for better targeting",
      process: [
        "Identify key customer segments",
        "Create buyer personas for each segment",
        "Tailor content to each segment's interests",
        "Use dynamic content based on subscriber data",
        "Regularly update and refine segments"
      ]
    },
    {
      title: "Test different send times",
      process: [
        "Analyze current open rates by time and day",
        "Segment audience by time zone",
        "Experiment with different send times",
        "Use A/B testing to compare send times",
        "Implement automated send time optimization"
      ]
    },
    {
      title: "Personalize email content",
      process: [
        "Collect relevant subscriber data",
        "Use merge tags for basic personalization",
        "Implement dynamic content blocks",
        "Create personalized product recommendations",
        "Develop triggered emails based on user behavior"
      ]
    },
  ],
  ctr: [
    {
      title: "Improve email design and layout",
      process: [
        "Use a responsive, mobile-friendly design",
        "Implement a clear visual hierarchy",
        "Use whitespace effectively",
        "Ensure consistent branding",
        "Optimize images for quick loading"
      ]
    },
    {
      title: "Use more compelling call-to-action buttons",
      process: [
        "Use action-oriented, specific language",
        "Make CTAs visually prominent",
        "Use contrasting colors for CTA buttons",
        "Experiment with button placement",
        "A/B test different CTA designs and copy"
      ]
    },
    {
      title: "A/B test different email content",
      process: [
        "Identify elements to test (e.g., subject lines, content, images)",
        "Create multiple versions of the email",
        "Split your audience for testing",
        "Analyze results and identify winning elements",
        "Implement findings in future campaigns"
      ]
    },
    {
      title: "Ensure mobile responsiveness",
      process: [
        "Use a mobile-responsive email template",
        "Test emails on various devices and email clients",
        "Optimize images and text for mobile viewing",
        "Use larger fonts and buttons for easy tapping",
        "Keep the design simple and scrollable"
      ]
    },
  ],
  conversionRate: [
    {
      title: "Optimize landing pages",
      process: [
        "Ensure message match between email and landing page",
        "Use clear and compelling headlines",
        "Implement trust signals (testimonials, security badges)",
        "Optimize page load speed",
        "A/B test different landing page elements"
      ]
    },
    {
      title: "Improve offer relevance",
      process: [
        "Analyze customer data to understand preferences",
        "Segment audience based on behavior and interests",
        "Create targeted offers for each segment",
        "Use dynamic content to personalize offers",
        "Continuously test and refine offer strategies"
      ]
    },
    {
      title: "Implement retargeting campaigns",
      process: [
        "Set up tracking pixels on your website",
        "Create segmented retargeting lists",
        "Design tailored ads for each segment",
        "Set frequency caps to avoid ad fatigue",
        "Analyze and optimize retargeting performance"
      ]
    },
    {
      title: "Streamline the conversion process",
      process: [
        "Minimize form fields to reduce friction",
        "Implement progress indicators for multi-step processes",
        "Offer guest checkout options",
        "Use clear error messages and validation",
        "Provide multiple payment options"
      ]
    },
  ],
  roi: [
    {
      title: "Review and optimize campaign costs",
      process: [
        "Analyze cost breakdown of current campaigns",
        "Identify areas of high spend with low return",
        "Reallocate budget to high-performing channels",
        "Negotiate better rates with vendors or platforms",
        "Implement cost-tracking tools for real-time monitoring"
      ]
    },
    {
      title: "Focus on high-value customer segments",
      process: [
        "Analyze customer lifetime value (CLV) data",
        "Identify characteristics of high-value customers",
        "Create targeted campaigns for high-value segments",
        "Develop loyalty programs to increase CLV",
        "Use predictive modeling to identify potential high-value customers"
      ]
    },
    {
      title: "Improve product offerings",
      process: [
        "Gather customer feedback on current products",
        "Analyze market trends and competitor offerings",
        "Develop new products or enhance existing ones",
        "Test new offerings with a small audience",
        "Optimize pricing strategies for maximum ROI"
      ]
    },
    {
      title: "Enhance customer retention strategies",
      process: [
        "Implement a customer feedback loop",
        "Develop personalized retention campaigns",
        "Create a customer onboarding program",
        "Offer exclusive benefits or early access to loyal customers",
        "Use predictive analytics to identify at-risk customers"
      ]
    },
  ],
}


// Update the KPICard component props type
type KPICardProps = {
  title: string;
  value: string;
  description: string;
  trend: number;
  color: string;
  metric: Metric;
}
// KPI Card component
const KPICard = ({ title, value, description, trend, color, metric }: KPICardProps) => (
  <Card className="relative">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
      <div className={`flex items-center mt-2 ${trend >= 0 ? "text-green-600" : "text-red-600"}`}>
        {trend >= 0 ? (
          <ArrowUpIcon className="w-4 h-4 mr-1" />
        ) : (
          <ArrowDownIcon className="w-4 h-4 mr-1" />
        )}
        <span className="text-sm font-medium">{Math.abs(trend).toFixed(2)}%</span>
      </div>
    </CardContent>
    {trend < 0 && (
      <Popover>
        <PopoverTrigger asChild>
          <button className="absolute top-2 right-2 text-yellow-500 hover:text-yellow-600">
            <AlertCircle className="w-5 h-5" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <h3 className="font-semibold mb-2">Suggested Actions:</h3>
          <ul className="list-disc pl-5">
            {suggestedActions[metric].map((action, index) => (
              <li key={index} className="text-sm">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-left hover:underline">{action.title}</button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>{action.title}</DialogTitle>
                      <DialogDescription>
                        Follow these steps to implement this action:
                      </DialogDescription>
                    </DialogHeader>
                    <ol className="list-decimal pl-5 mt-4">
                      {action.process.map((step, stepIndex) => (
                        <li key={stepIndex} className="mt-2">{step}</li>
                      ))}
                    </ol>
                  </DialogContent>
                </Dialog>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    )}
  </Card>
)

// Chart component
const ChartComponent = ({ data, dataKey, color }: { data: any[]; dataKey: string; color: string }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} activeDot={{ r: 8 }} />
    </LineChart>
  </ResponsiveContainer>
)

export function MarketingKpiDashboard() {
  const [timeRange, setTimeRange] = useState("30")
  const data = generateDummyData(parseInt(timeRange))
  const latestData = data[data.length - 1]
  const previousData = data[data.length - 2] || data[data.length - 1]

  // Calculate trends
  const calculateTrend = (current: string, previous: string) => {
    const currentValue = parseFloat(current)
    const previousValue = parseFloat(previous)
    return ((currentValue - previousValue) / previousValue) * 100
  }

  const trends = {
    openRate: calculateTrend(latestData.openRate, previousData.openRate),
    ctr: calculateTrend(latestData.ctr, previousData.ctr),
    conversionRate: calculateTrend(latestData.conversionRate, previousData.conversionRate),
    roi: calculateTrend(latestData.roi, previousData.roi),
  }

  // Define more contrasting colors
  const colors = {
    openRate: "#2E7D32", // Dark Green
    ctr: "#1565C0", // Dark Blue
    conversionRate: "#C62828", // Dark Red
    roi: "#6A1B9A", // Dark Purple
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Marketing Campaign KPI Dashboard</h1>
      
      <Tabs defaultValue="30" className="mb-4">
        <TabsList>
          <TabsTrigger value="7" onClick={() => setTimeRange("7")}>7 Days</TabsTrigger>
          <TabsTrigger value="30" onClick={() => setTimeRange("30")}>30 Days</TabsTrigger>
          <TabsTrigger value="90" onClick={() => setTimeRange("90")}>90 Days</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KPICard 
          title="Open Rate" 
          value={`${(parseFloat(latestData.openRate) * 100).toFixed(2)}%`} 
          description="Percentage of opened emails" 
          trend={trends.openRate}
          color={colors.openRate}
          metric="openRate"
        />
        <KPICard 
          title="Click-Through Rate" 
          value={`${(parseFloat(latestData.ctr) * 100).toFixed(2)}%`} 
          description="Percentage of clicks per open" 
          trend={trends.ctr}
          color={colors.ctr}
          metric="ctr"
        />
        <KPICard 
          title="Conversion Rate" 
          value={`${(parseFloat(latestData.conversionRate) * 100).toFixed(2)}%`} 
          description="Percentage of conversions per click" 
          trend={trends.conversionRate}
          color={colors.conversionRate}
          metric="conversionRate"
        />
        <KPICard 
          title="ROI" 
          value={`${parseFloat(latestData.roi).toFixed(2)}x`} 
          description="Return on Investment" 
          trend={trends.roi}
          color={colors.roi}
          metric="roi"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Open Rate Over Time</CardTitle>
            <CardDescription>Percentage of emails opened</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartComponent data={data} dataKey="openRate" color={colors.openRate} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Click-Through Rate Over Time</CardTitle>
            <CardDescription>Percentage of clicks per open</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartComponent data={data} dataKey="ctr" color={colors.ctr} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate Over Time</CardTitle>
            <CardDescription>Percentage of conversions per click</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartComponent data={data} dataKey="conversionRate" color={colors.conversionRate} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>ROI Over Time</CardTitle>
            <CardDescription>Return on Investment</CardDescription>
          
          </CardHeader>
          <CardContent>
            <ChartComponent data={data} dataKey="roi" color={colors.roi} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}