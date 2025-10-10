export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Falling Circles */}
        <div className="absolute -top-10 left-1/4 w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full opacity-40" style={{
          animation: 'fall 4s linear infinite',
          animationDelay: '0s'
        }}></div>
        
        <div className="absolute -top-10 left-1/2 w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full opacity-45" style={{
          animation: 'fall 5s linear infinite',
          animationDelay: '1s'
        }}></div>
        
        <div className="absolute -top-10 right-1/3 w-20 h-20 bg-gray-100 dark:bg-gray-900 rounded-full opacity-35" style={{
          animation: 'fall 6s linear infinite',
          animationDelay: '2s'
        }}></div>
        
        <div className="absolute -top-10 left-1/6 w-14 h-14 bg-gray-400 dark:bg-gray-600 rounded-full opacity-50" style={{
          animation: 'fall 4.5s linear infinite',
          animationDelay: '0.5s'
        }}></div>
        
        <div className="absolute -top-10 right-1/4 w-18 h-18 bg-gray-200 dark:bg-gray-800 rounded-full opacity-40" style={{
          animation: 'fall 5.5s linear infinite',
          animationDelay: '1.5s'
        }}></div>
        
        <div className="absolute -top-10 left-2/3 w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full opacity-45" style={{
          animation: 'fall 3.5s linear infinite',
          animationDelay: '2.5s'
        }}></div>
        
        {/* Additional falling elements */}
        <div className="absolute -top-10 right-1/6 w-22 h-22 bg-gray-100 dark:bg-gray-900 rounded-full opacity-30" style={{
          animation: 'fall 7s linear infinite',
          animationDelay: '3s'
        }}></div>
        
        <div className="absolute -top-10 left-1/5 w-8 h-8 bg-gray-400 dark:bg-gray-600 rounded-full opacity-55" style={{
          animation: 'fall 3s linear infinite',
          animationDelay: '1.8s'
        }}></div>
        
        <div className="absolute -top-10 right-1/2 w-13 h-13 bg-gray-200 dark:bg-gray-800 rounded-full opacity-40" style={{
          animation: 'fall 4.8s linear infinite',
          animationDelay: '3.5s'
        }}></div>
        
        <div className="absolute -top-10 left-3/4 w-15 h-15 bg-gray-300 dark:bg-gray-700 rounded-full opacity-35" style={{
          animation: 'fall 5.2s linear infinite',
          animationDelay: '4s'
        }}></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)',
            backgroundSize: '20px 20px'
          }}></div>
        </div>
      </div>
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-24 sm:py-32">
        <div className="text-center">
          {/* Simple Logo */}
          <div className="mb-12">
            <div className="inline-block w-12 h-12 border-2 border-black dark:border-white rounded-sm flex items-center justify-center hover:scale-110 hover:rotate-3 transition-all duration-500 animate-pulse" style={{animationDuration: '3s'}}>
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
          <div className="text-center border-2 border-gray-300 dark:border-gray-700 py-8 px-6 hover:border-gray-500 dark:hover:border-gray-500 hover:shadow-lg hover:-translate-y-2 transition-all duration-500 group animate-pulse" style={{animationDuration: '4s', animationDelay: '0.5s'}}>
            <div className="text-2xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 animate-bounce" style={{animationDuration: '2s'}}>🇳🇬</div>
            <h3 className="text-lg font-light text-black dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
              Naira Support
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed">
              Direct conversion from Nigerian Naira to USDC
            </p>
          </div>
          
          <div className="text-center border-2 border-gray-300 dark:border-gray-700 py-8 px-6 hover:border-gray-500 dark:hover:border-gray-500 hover:shadow-lg hover:-translate-y-2 transition-all duration-500 group animate-pulse" style={{animationDuration: '4s', animationDelay: '1s'}}>
            <div className="text-2xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 animate-bounce" style={{animationDuration: '2.5s'}}>⚡</div>
            <h3 className="text-lg font-light text-black dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
              Fast & Secure
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed">
              Blockchain-powered secure transactions
            </p>
          </div>
          
          <div className="text-center border-2 border-gray-300 dark:border-gray-700 py-8 px-6 hover:border-gray-500 dark:hover:border-gray-500 hover:shadow-lg hover:-translate-y-2 transition-all duration-500 group animate-pulse" style={{animationDuration: '4s', animationDelay: '1.5s'}}>
            <div className="text-2xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 animate-bounce" style={{animationDuration: '3s'}}>🎨</div>
            <h3 className="text-lg font-light text-black dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
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
