import Link from 'next/link';
// import { useRouter } from 'next/router';
import { CryptoState } from '../contexts/CryptoContext'; // Adjust the import path as necessary

export default function Header() {
  const { currency, setCurrency } = CryptoState();

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex items-center justify-between p-2">
        <Link href="/">
          <p className="text-2xl font-bold text-yellow-400 hover:text-yellow-300 transition-colors duration-200">
            CryptoPulse
          </p>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/components/Password">
            <p className="hover:text-gray-300 transition-colors duration-200">Password</p>
          </Link>
          <div className="relative">
            <select
              className="appearance-none bg-white border-2 border-gray-400 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-8 py-2 cursor-pointer"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.516 7.548c-0.436-0.446-0.436-1.197 0-1.644 0.436-0.447 1.197-0.447 1.634 0l3.35 3.433 3.35-3.433c0.436-0.447 1.197-0.447 1.634 0 0.436 0.447 0.436 1.198 0 1.644l-4.684 4.802c-0.436 0.446-1.198 0.446-1.634 0l-4.684-4.802z"/></svg>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}