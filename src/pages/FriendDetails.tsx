import { useParams, useNavigate } from 'react-router-dom';
import { Mail, Clock, Target, Calendar, Phone, MessageSquare, Video, MoreHorizontal, Archive, Trash2, Edit2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'react-hot-toast';
import { Friend, TimelineEntry } from '@/types';
import friendsData from '@/data/friends.json';
import { cn } from '@/lib/utils';

interface FriendDetailsProps {
  addTimelineEntry: (entry: Omit<TimelineEntry, 'id'>) => void;
}

export default function FriendDetails({ addTimelineEntry }: FriendDetailsProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const friend = (friendsData as Friend[]).find(f => f.id === Number(id));

  if (!friend) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Friend not found</h2>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }

  const handleCheckIn = (type: 'Call' | 'Text' | 'Video') => {
    const date = new Date().toISOString().split('T')[0];
    addTimelineEntry({
      friendId: friend.id,
      friendName: friend.name,
      type,
      date,
      title: `${type} with ${friend.name}`
    });
    toast.success(`${type} logged with ${friend.name}!`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-none shadow-sm bg-white overflow-hidden rounded-2xl">
            <CardContent className="p-10 text-center flex flex-col items-center">
              <div className="mb-8">
                <img
                  src={friend.picture}
                  alt={friend.name}
                  className="h-40 w-40 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h2 className="text-4xl font-bold text-[#1a2b3c] mb-2">{friend.name}</h2>
              
              <div className="flex flex-col items-center gap-3 mb-8">
                <Badge 
                  className={cn(
                    "px-8 py-2 text-sm font-semibold border-none rounded-full shadow-sm",
                    friend.status === 'overdue' && "bg-[#f87171] text-white",
                    friend.status === 'almost due' && "bg-[#f0ad4e] text-white",
                    friend.status === 'on-track' && "bg-[#1a3a32] text-white"
                  )}
                >
                  {friend.status.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </Badge>
                <div className="flex gap-2">
                  {friend.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-[#d1fae5] text-[#065f46] text-[10px] font-bold px-4 py-1 rounded-full border-none uppercase tracking-wider">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <p className="text-gray-600 italic text-lg mb-6">"{friend.bio}"</p>
              
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-10">
                <Mail className="h-4 w-4" />
                <span>Preferred: {friend.email}</span>
              </div>

              <div className="w-full space-y-3">
                <Button variant="outline" className="w-full justify-start gap-3 py-6 border-gray-100 rounded-xl">
                  <Clock className="h-4 w-4" /> Snooze 2 Weeks
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 py-6 border-gray-100 rounded-xl">
                  <Archive className="h-4 w-4" /> Archive
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 py-6 border-gray-100 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl">
                  <Trash2 className="h-4 w-4" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-none shadow-sm bg-white">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold mb-1">{friend.days_since_contact}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Days Since Contact</div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-white">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold mb-1">{friend.goal}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Goal (Days)</div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-white">
              <CardContent className="p-6 text-center">
                <div className="text-xl font-bold mb-1">{new Date(friend.next_due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Next Due</div>
              </CardContent>
            </Card>
          </div>

          {/* Relationship Goal Card */}
          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-bold">Relationship Goal</CardTitle>
              <Button variant="secondary" size="sm" className="h-8 px-3 text-xs bg-gray-100">
                Edit
              </Button>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-600">Connect every <span className="font-bold text-gray-900">{friend.goal} days</span></p>
            </CardContent>
          </Card>

          {/* Quick Check-In Card */}
          <Card className="border-none shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Quick Check-In</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="flex flex-col h-32 gap-3 border-gray-100 hover:bg-gray-50"
                  onClick={() => handleCheckIn('Call')}
                >
                  <Phone className="h-8 w-8 text-gray-700" />
                  <span className="font-medium">Call</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex flex-col h-32 gap-3 border-gray-100 hover:bg-gray-50"
                  onClick={() => handleCheckIn('Text')}
                >
                  <MessageSquare className="h-8 w-8 text-gray-700" />
                  <span className="font-medium">Text</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex flex-col h-32 gap-3 border-gray-100 hover:bg-gray-50"
                  onClick={() => handleCheckIn('Video')}
                >
                  <Video className="h-8 w-8 text-gray-700" />
                  <span className="font-medium">Video</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
