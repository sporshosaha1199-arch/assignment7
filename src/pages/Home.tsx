import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Users, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Friend, TimelineEntry } from '@/types';
import friendsData from '@/data/friends.json';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface HomeProps {
  timeline: TimelineEntry[];
}

export default function Home({ timeline }: HomeProps) {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setFriends(friendsData as Friend[]);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: 'Total Friends', value: friends.length, icon: Users, color: 'text-blue-600' },
    { label: 'On Track', value: friends.filter(f => f.status === 'on-track').length, icon: CheckCircle2, color: 'text-green-600' },
    { label: 'Need Attention', value: friends.filter(f => f.status !== 'on-track').length, icon: AlertCircle, color: 'text-orange-600' },
    { label: 'Interactions This Month', value: timeline.length, icon: MessageSquare, color: 'text-purple-600' },
  ];

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#1a3a32] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Banner */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Friends to keep close in your life
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        <Button className="bg-[#1a3a32] hover:bg-[#2a5a4e] text-white px-8 py-6 rounded-md text-lg gap-2">
          <Plus className="h-5 w-5" />
          Add a Friend
        </Button>
      </section>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, idx) => (
          <Card key={idx} className="border-none shadow-sm bg-white">
            <CardContent className="p-8 text-center">
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-gray-500 text-sm uppercase tracking-wider">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Friends Grid */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Your Friends</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {friends.map((friend) => (
            <Link key={friend.id} to={`/friend/${friend.id}`}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="overflow-hidden hover:shadow-md transition-shadow border-none bg-white rounded-2xl">
                  <CardContent className="p-8 text-center flex flex-col items-center">
                    <div className="mb-6">
                      <img
                        src={friend.picture}
                        alt={friend.name}
                        className="h-28 w-28 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-[#1a2b3c] mb-1">{friend.name}</h3>
                    <p className="text-sm text-[#718096] mb-4">{friend.days_since_contact}d ago</p>
                    
                    <div className="flex flex-wrap justify-center gap-2 mb-3">
                      {friend.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="bg-[#d1fae5] text-[#065f46] text-[10px] font-bold px-3 py-0.5 rounded-full border-none uppercase tracking-wider">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Badge 
                      className={cn(
                        "px-6 py-1.5 text-sm font-semibold border-none rounded-full shadow-sm",
                        friend.status === 'overdue' && "bg-[#f87171] text-white",
                        friend.status === 'almost due' && "bg-[#f0ad4e] text-white",
                        friend.status === 'on-track' && "bg-[#1a3a32] text-white"
                      )}
                    >
                      {friend.status.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
