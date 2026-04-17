import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TimelineEntry } from '@/types';

interface StatsProps {
  timeline: TimelineEntry[];
}

export default function Stats({ timeline }: StatsProps) {
  const dataMap = timeline.reduce((acc, entry) => {
    acc[entry.type] = (acc[entry.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(dataMap).map(([name, value]) => ({ name, value }));

  const COLORS = {
    'Call': '#1a3a32',
    'Text': '#8b5cf6',
    'Video': '#22c55e',
    'Meetup': '#f59e0b'
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold mb-8">Friendship Analytics</h1>

      <Card className="border-none shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-700">By Interaction Type</CardTitle>
        </CardHeader>
        <CardContent className="h-[500px] flex flex-col items-center justify-center">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="45%"
                  innerRadius={100}
                  outerRadius={160}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || '#cbd5e1'} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  iconType="circle"
                  formatter={(value) => <span className="text-sm font-medium text-gray-600">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-gray-500">
              No interaction data available yet. Start checking in with friends!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
