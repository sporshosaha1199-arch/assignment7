import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-32 text-center">
      <h1 className="text-9xl font-bold text-[#1a3a32] mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-8">Oops! Page not found</h2>
      <p className="text-gray-600 mb-12 max-w-md mx-auto">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/">
        <Button className="bg-[#1a3a32] hover:bg-[#2a5a4e] px-8 py-6 text-lg">
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
