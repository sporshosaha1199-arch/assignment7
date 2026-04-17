import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FriendDetails from './pages/FriendDetails';
import Timeline from './pages/Timeline';
import Stats from './pages/Stats';
import NotFound from './pages/NotFound';
import { TimelineEntry } from './types';

export default function App() {
  const [timeline, setTimeline] = useState<TimelineEntry[]>(() => {
    const saved = localStorage.getItem('keenkeeper_timeline');
    return saved ? JSON.parse(saved) : [
      { id: '1', friendId: 1, friendName: 'Emma Wilson', type: 'Meetup', date: '2026-03-29', title: 'Meetup with Tom Baker' },
      { id: '2', friendId: 5, friendName: 'Sarah Chen', type: 'Text', date: '2026-03-28', title: 'Text with Sarah Chen' },
      { id: '3', friendId: 7, friendName: 'Olivia Martinez', type: 'Meetup', date: '2026-03-26', title: 'Meetup with Olivia Martinez' },
      { id: '4', friendId: 3, friendName: 'Lisa Nakamura', type: 'Video', date: '2026-03-23', title: 'Video with Aisha Patel' },
      { id: '5', friendId: 5, friendName: 'Sarah Chen', type: 'Meetup', date: '2026-03-21', title: 'Meetup with Sarah Chen' },
      { id: '6', friendId: 6, friendName: 'Marcus Johnson', type: 'Call', date: '2026-03-19', title: 'Call with Marcus Johnson' },
      { id: '7', friendId: 3, friendName: 'Lisa Nakamura', type: 'Meetup', date: '2026-03-17', title: 'Meetup with Aisha Patel' },
      { id: '8', friendId: 7, friendName: 'Olivia Martinez', type: 'Text', date: '2026-03-13', title: 'Text with Olivia Martinez' },
      { id: '9', friendId: 3, friendName: 'Lisa Nakamura', type: 'Call', date: '2026-03-11', title: 'Call with Lisa Nakamura' },
      { id: '10', friendId: 5, friendName: 'Sarah Chen', type: 'Call', date: '2026-03-11', title: 'Call with Sarah Chen' },
      { id: '11', friendId: 6, friendName: 'Marcus Johnson', type: 'Video', date: '2026-03-06', title: 'Video with Marcus Johnson' },
      { id: '12', friendId: 8, friendName: 'Ryan O\'Brien', type: 'Video', date: '2026-02-24', title: 'Video with Ryan O\'Brien' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('keenkeeper_timeline', JSON.stringify(timeline));
  }, [timeline]);

  const addTimelineEntry = (entry: Omit<TimelineEntry, 'id'>) => {
    const newEntry = { ...entry, id: crypto.randomUUID() };
    setTimeline(prev => [newEntry, ...prev]);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home timeline={timeline} />} />
            <Route path="/friend/:id" element={<FriendDetails addTimelineEntry={addTimelineEntry} />} />
            <Route path="/timeline" element={<Timeline timeline={timeline} />} />
            <Route path="/stats" element={<Stats timeline={timeline} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
}
