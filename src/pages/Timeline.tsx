import { useState } from 'react';
import { Phone, MessageSquare, Video, Handshake, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TimelineEntry, InteractionType } from '@/types';
import { cn } from '@/lib/utils';

interface TimelineProps {
  timeline: TimelineEntry[];
}

export default function Timeline({ timeline }: TimelineProps) {
  const [filter, setFilter] = useState<InteractionType | 'All'>('All');

  const filteredTimeline = timeline.filter(entry => 
    filter === 'All' || entry.type === filter
  );

  const getIcon = (type: InteractionType) => {
    switch (type) {
      case 'Call': return <Phone className="h-5 w-5" />;
      case 'Text': return <MessageSquare className="h-5 w-5" />;
      case 'Video': return <Video className="h-5 w-5" />;
      case 'Meetup': return <Handshake className="h-5 w-5" />;
      default: return <MessageSquare className="h-5 w-5" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Timeline</h1>

      <div className="mb-8 w-full max-w-xs">
        <Select value={filter} onValueChange={(v) => setFilter(v as any)}>
          <SelectTrigger className="bg-white border-gray-200">
            <SelectValue placeholder="Filter timeline" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Interactions</SelectItem>
            <SelectItem value="Call">Calls</SelectItem>
            <SelectItem value="Text">Texts</SelectItem>
            <SelectItem value="Video">Videos</SelectItem>
            <SelectItem value="Meetup">Meetups</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredTimeline.length > 0 ? (
          filteredTimeline.map((entry) => (
            <Card key={entry.id} className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-center gap-6">
                <div className="bg-gray-100 p-3 rounded-lg text-gray-600">
                  {getIcon(entry.type)}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    <span className="font-bold">{entry.type}</span> with {entry.friendName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(entry.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500">No interactions found for this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
