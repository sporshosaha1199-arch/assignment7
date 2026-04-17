import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1a3a32] py-12 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold mb-4">KeenKeeper</h2>
        <p className="max-w-2xl mx-auto text-gray-300 mb-8">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        
        <div className="mb-12">
          <h3 className="text-lg font-semibold mb-4">Social Links</h3>
          <div className="flex justify-center gap-4">
            <a href="#" className="bg-white p-2 rounded-full text-[#1a3a32] hover:bg-gray-200 transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="bg-white p-2 rounded-full text-[#1a3a32] hover:bg-gray-200 transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="bg-white p-2 rounded-full text-[#1a3a32] hover:bg-gray-200 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2026 KeenKeeper. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
