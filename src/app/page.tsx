import { Globe, Zap, Palette, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    amount: "",
    email: "",
    fullName: "",
    phoneNumber: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form submitted:", formData);
    setIsModalOpen(false);
    setCurrentStep(1);
    setFormData({
      username: "",
      amount: "",
      email: "",
      fullName: "",
      phoneNumber: ""
    });
  };
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
          className="absolute bottom-27 left-1/4 w-16 h-16 bg-gray-800 dark:bg-gray-200 rounded-full opacity-65 animate-pulse"
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

            {/* Fund Zora Button */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-block px-6 py-3 border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 font-light hover:border-gray-400 dark:hover:border-gray-600 transition-colors duration-300"
            >
              Fund Zora
            </button>
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
              Creator Economy
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

      {/* Multi-step Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-light text-black dark:text-white">
                Fund Zora Account
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-light ${
                        step <= currentStep
                          ? "bg-gray-800 dark:bg-gray-200 text-white dark:text-black"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {step}
                    </div>
                    {step < 3 && (
                      <div
                        className={`w-8 h-px ${
                          step < currentStep
                            ? "bg-gray-800 dark:bg-gray-200"
                            : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-md font-light text-black dark:text-white mb-4">
                    Account Details
                  </h3>
                  <div>
                    <label className="block text-sm font-light text-gray-600 dark:text-gray-400 mb-2">
                      Zora Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Enter Zora username"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-black dark:text-white font-light focus:outline-none focus:border-gray-500 dark:focus:border-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-light text-gray-600 dark:text-gray-400 mb-2">
                      Amount (NGN)
                    </label>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      placeholder="Enter amount in Naira"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-black dark:text-white font-light focus:outline-none focus:border-gray-500 dark:focus:border-gray-400"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-md font-light text-black dark:text-white mb-4">
                    Contact Information
                  </h3>
                  <div>
                    <label className="block text-sm font-light text-gray-600 dark:text-gray-400 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-black dark:text-white font-light focus:outline-none focus:border-gray-500 dark:focus:border-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-light text-gray-600 dark:text-gray-400 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-black dark:text-white font-light focus:outline-none focus:border-gray-500 dark:focus:border-gray-400"
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-md font-light text-black dark:text-white mb-4">
                    Phone Number
                  </h3>
                  <div>
                    <label className="block text-sm font-light text-gray-600 dark:text-gray-400 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-black dark:text-white font-light focus:outline-none focus:border-gray-500 dark:focus:border-gray-400"
                    />
                  </div>
                  
                  {/* Summary */}
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-sm">
                    <h4 className="text-sm font-light text-black dark:text-white mb-2">Summary</h4>
                    <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      <p>Username: {formData.username}</p>
                      <p>Amount: ₦{formData.amount}</p>
                      <p>Email: {formData.email}</p>
                      <p>Name: {formData.fullName}</p>
                      <p>Phone: {formData.phoneNumber}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-light transition-colors duration-300 ${
                  currentStep === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentStep < 3 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-light text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-300"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 text-sm font-light text-white bg-gray-800 dark:bg-gray-200 text-black dark:text-black hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors duration-300"
                >
                  Fund Account
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
