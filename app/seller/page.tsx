'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Sell Smarter on KMMARKET</h1>
        <p className="text-lg md:text-xl mb-6">Join thousands of sellers growing their business on our platform.</p>
        
          <Link href={"/seller/signUp"} className="inline-block px-6 py-3 bg-white text-indigo-600 font-semibold rounded-full hover:bg-gray-100 transition">Become a Seller</Link>
        
      </section>

      {/* Why KMMARKET Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Why sell on KMMARKET?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2">Reach More Customers</h3>
            <p>Get your products in front of thousands of active shoppers across the country.</p>
          </div>
          <div>
            <div className="text-4xl mb-4">💼</div>
            <h3 className="text-xl font-semibold mb-2">Simple Seller Tools</h3>
            <p>Manage your inventory, track sales, and respond to buyers with ease.</p>
          </div>
          <div>
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-2">Low Fees, High Profit</h3>
            <p>We keep fees minimal so you can maximize your earnings.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Start selling today</h2>
        <p className="mb-6 text-lg">It's free to create an account. Set up your shop in minutes.</p>
        
          <Link href="/seller/signUp" className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition">
            Join KMMARKET
          </Link>
        
      </section>

    </main>
  );
}
