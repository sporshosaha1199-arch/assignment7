import { Link, useLocation } from 'react-router-dom';
import { Home, Clock, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Timeline', path: '/timeline', icon: Clock },
    { name: 'Stats', path: '/stats', icon: BarChart3 },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-[#1a3a32]">KeenKeeper</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-4">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-[#1a3a32] text-white" 
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
