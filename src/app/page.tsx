export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Zora Onramp
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Seamlessly convert Nigerian Naira to USDC/ETH and join the Zora ecosystem
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Coming Soon
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We're building a secure and efficient way for Nigerian users to enter the Zora ecosystem.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="text-3xl mb-4">🇳🇬</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Naira Support
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Convert your Nigerian Naira directly to crypto assets
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Fast & Secure
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Powered by blockchain technology for secure transactions
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="text-3xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Zora Ready
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get USDC/ETH ready for the Zora creator economy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
