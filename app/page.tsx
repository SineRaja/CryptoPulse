"use client"
import Header from './components/Header';
import Homepage from './components/Homepage';
export default function Home() {
  return (
    // <CryptoProvider>
    <div className="App">
      <Header />
      <Homepage />
    </div>
    // </CryptoProvider>
  );
}
