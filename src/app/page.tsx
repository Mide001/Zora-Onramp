import { Globe, Zap, Palette } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Circles with More Pronounced Motion */}
        <div
          className="absolute top-20 left-10 w-32 h-32 bg-gray-600 dark:bg-gray-400 rounded-full opacity-60 animate-pulse"
          style={{ animationDuration: "2s" }}
        ></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-gray-700 dark:bg-gray-300 rounded-full opacity-70 animate-bounce"
          style={{ animationDuration: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-16 h-16 bg-gray-800 dark:bg-gray-200 rounded-full opacity-65 animate-bounce"
          style={{ animationDelay: "0.5s", animationDuration: "1.5s" }}
        ></div>
        <div
          className="absolute bottom-20 right-1/3 w-20 h-20 bg-gray-600 dark:bg-gray-400 rounded-full opacity-60 animate-bounce"
          style={{ animationDuration: "2.5s", animationDelay: "1s" }}
        ></div>

        {/* Additional Moving Elements */}
        <div
          className="absolute top-1/2 left-1/3 w-12 h-12 bg-gray-700 dark:bg-gray-300 rounded-full opacity-55 animate-pulse"
          style={{ animationDuration: "3s", animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-28 h-28 bg-gray-500 dark:bg-gray-500 rounded-full opacity-50 animate-bounce"
          style={{ animationDuration: "4s", animationDelay: "0.8s" }}
        ></div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20">
          <div
            className="absolute inset-0 animate-pulse"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.3) 1px, transparent 0)",
              backgroundSize: "25px 25px",
              animationDuration: "4s",
            }}
          ></div>
        </div>

        {/* Floating Lines */}
        <div
          className="absolute bottom-1/3 right-0 w-px h-32 bg-gray-600 dark:bg-gray-400 opacity-50 animate-pulse"
          style={{ animationDuration: "2.5s", animationDelay: "1.2s" }}
        ></div>
      </div>
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-24 sm:py-32">
        <div className="text-center">
          {/* Simple Logo */}
          <div className="mb-12">
            <div
              className="inline-block w-12 h-12 border-2 border-black dark:border-white rounded-sm flex items-center justify-center hover:scale-110 hover:rotate-3 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-500 animate-pulse"
              style={{ animationDuration: "3s" }}
            >
              <span className="text-xl font-light hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300">
                Z
              </span>
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
          <div className="text-center border-2 border-gray-300 dark:border-gray-700 py-8 px-6 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-lg transition-all duration-500 group">
            <div className="mb-4 flex justify-center">
              <Globe className="w-8 h-8 text-gray-600 dark:text-gray-400" />
            </div>
            <h3 className="text-lg font-light text-black dark:text-white mb-2">
              Naira Support
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed">
              Direct conversion from Nigerian Naira to USDC
            </p>
          </div>

          <div className="text-center border-2 border-gray-300 dark:border-gray-700 py-8 px-6 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-lg transition-all duration-500 group">
            <div className="mb-4 flex justify-center">
              <Zap className="w-8 h-8 text-gray-600 dark:text-gray-400" />
            </div>
            <h3 className="text-lg font-light text-black dark:text-white mb-2">
              Fast & Secure
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed">
              Blockchain-powered secure transactions
            </p>
          </div>

          <div className="text-center border-2 border-gray-300 dark:border-gray-700 py-8 px-6 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-lg transition-all duration-500 group">
            <div className="mb-4 flex justify-center">
              <Palette className="w-8 h-8 text-gray-600 dark:text-gray-400" />
            </div>
            <h3 className="text-lg font-light text-black dark:text-white mb-2">
              Zora Ready
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed">
              Get USDC to trade tokenized content and support creators on Zora's decentralized platform
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
