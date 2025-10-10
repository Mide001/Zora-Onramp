export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-24 sm:py-32">
        <div className="text-center">
          {/* Simple Logo */}
          <div className="mb-12">
            <div className="inline-block w-12 h-12 border-2 border-black dark:border-white rounded-sm flex items-center justify-center">
              <span className="text-xl font-light">Z</span>
            </div>
          </div>
          
          {/* Main Content */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide text-black dark:text-white mb-6">
            Zora Onramp
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Convert Nigerian Naira to USDC for the Zora ecosystem
          </p>
          
          {/* Coming Soon */}
          <div className="inline-block px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-500 font-light">
            Coming Soon
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <div className="text-center border-2 border-gray-300 dark:border-gray-700 py-8 px-6">
            <div className="text-2xl mb-4">🇳🇬</div>
            <h3 className="text-lg font-light text-black dark:text-white mb-2">
              Naira Support
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed">
              Direct conversion from Nigerian Naira to USDC
            </p>
          </div>
          
          <div className="text-center border-2 border-gray-300 dark:border-gray-700 py-8 px-6">
            <div className="text-2xl mb-4">⚡</div>
            <h3 className="text-lg font-light text-black dark:text-white mb-2">
              Fast & Secure
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed">
              Blockchain-powered secure transactions
            </p>
          </div>
          
          <div className="text-center border-2 border-gray-300 dark:border-gray-700 py-8 px-6">
            <div className="text-2xl mb-4">🎨</div>
            <h3 className="text-lg font-light text-black dark:text-white mb-2">
              Zora Ready
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed">
              USDC ready for Zora marketplace
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-500 font-light">
            Empowering Nigerian creators in the global creator economy
          </p>
        </div>
      </div>
    </div>
  );
}
