"use client";
import { Globe, Zap, Palette, X, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useState, useEffect } from "react";

interface VirtualAccount {
  accountNumber: string;
  bankName: string;
  amount: number;
}

interface PaymentData {
  orderId: string;
  orderHash: string;
  virtualAccount: VirtualAccount;
  usdcAmount: string;
  expiresAt: string;
  expiresIn: string;
}

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
  const [isValidatingUsername, setIsValidatingUsername] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [zoraAddress, setZoraAddress] = useState<string>("");
  const [showSummary, setShowSummary] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'completed' | 'failed'>('pending');
  const [usdcTxHash, setUsdcTxHash] = useState<string>("");
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [pollingStartTime, setPollingStartTime] = useState<number | null>(null);
  const [timeUntilPolling, setTimeUntilPolling] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateZoraUsername = async (username: string) => {
    if (!username) {
      setIsUsernameValid(false);
      return;
    }

    setIsValidatingUsername(true);
    try {
      const baseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || 'https://zora-onramp-backend-production.up.railway.app').replace(/\/$/, '');
      const apiUrl = `${baseUrl}/api/zora/resolve/${encodeURIComponent(username)}`;
      console.log('Constructed API URL:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        console.error('Username validation failed:', response.status);
        setIsUsernameValid(false);
        return;
      }
      
      const data = await response.json();
      setIsUsernameValid(data.success);
      if (data.success && data.address) {
        setZoraAddress(data.address);
      }
    } catch (error) {
      console.error('Error validating username:', error);
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.error('CORS Error: Backend may not be configured to allow requests from this origin');
        console.error('Current origin:', window.location.origin);
        console.error('Expected origin by backend: https://zora-onramp-frontend.vercel.app');
      }
      setIsUsernameValid(false);
    } finally {
      setIsValidatingUsername(false);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;
    setFormData({
      ...formData,
      username
    });
    
    // Debounce validation
    setTimeout(() => {
      validateZoraUsername(username);
    }, 500);
  };

  const nextStep = () => {
    if (currentStep < 3) {
      // Validate current step before proceeding
      if (currentStep === 1) {
        if (!formData.username || !formData.amount || !isUsernameValid) return;
      } else if (currentStep === 2) {
        if (!formData.email || !formData.fullName) return;
      } else if (currentStep === 3) {
        if (!formData.phoneNumber) return;
        // Show summary when moving from step 3
        setShowSummary(true);
        return;
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setIsCreatingOrder(true);
    try {
      // Call backend to create order
      const baseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || 'https://zora-onramp-backend-production.up.railway.app').replace(/\/$/, '');
      const response = await fetch(`${baseUrl}/api/orders/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username, // Send username instead of address
          amountNGN: parseFloat(formData.amount),
          email: formData.email,
        }),
      });
      
      if (!response.ok) {
        console.error('Order creation failed:', response.status);
        return;
      }
      
      const data = await response.json();
      if (data.success) {
        setPaymentData(data.order);
        setCurrentStep(4); // Move to payment step
        setTimeLeft(900); // Reset countdown
        setPollingStartTime(Date.now() + 10000); // Set when polling will start (10 seconds from now)
      }
    } catch (error) {
      console.error('Error creating order:', error);
    } finally {
      setIsCreatingOrder(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
    setFormData({
      username: "",
      amount: "",
      email: "",
      fullName: "",
      phoneNumber: ""
    });
    setIsUsernameValid(false);
    setIsValidatingUsername(false);
    setZoraAddress("");
    setShowSummary(false);
    setPaymentData(null);
    setTimeLeft(900);
    setPaymentStatus('pending');
    setUsdcTxHash("");
    setIsCreatingOrder(false);
    setPollingStartTime(null);
    setTimeUntilPolling(0);
  };

  // Countdown timer effect
  useEffect(() => {
    if (currentStep === 4 && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, timeLeft]);

  // Polling countdown effect
  useEffect(() => {
    if (pollingStartTime && currentStep === 4 && paymentStatus === 'pending') {
      const updateCountdown = () => {
        const now = Date.now();
        const timeLeft = Math.max(0, Math.ceil((pollingStartTime - now) / 1000));
        setTimeUntilPolling(timeLeft);
      };

      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);

      return () => clearInterval(interval);
    }
  }, [pollingStartTime, currentStep, paymentStatus]);

  // Payment status polling effect
  useEffect(() => {
    if (currentStep === 4 && paymentData && paymentStatus === 'pending') {
      let intervalId: NodeJS.Timeout;
      
      // Wait 10 seconds before starting to poll (give user time to make payment)
      const initialDelay = setTimeout(() => {
        intervalId = setInterval(() => {
          checkPaymentStatus(paymentData.orderId);
        }, 5000); // Check every 5 seconds
      }, 10000);

      return () => {
        clearTimeout(initialDelay);
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    }
  }, [currentStep, paymentData, paymentStatus]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const checkPaymentStatus = async (orderId: string) => {
    try {
      const baseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || 'https://zora-onramp-backend-production.up.railway.app').replace(/\/$/, '');
      const response = await fetch(`${baseUrl}/api/orders/${orderId}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        console.error('API response not ok:', response.status, response.statusText);
        return;
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Response is not JSON:', contentType);
        const text = await response.text();
        console.error('Response text:', text.substring(0, 200));
        return;
      }
      
      const data = await response.json();
      console.log('Payment status response:', data);
      
      if (data.success && data.order) {
        console.log('Order status check:', {
          status: data.order.status,
          fulfilled: data.order.fulfilled,
          txHash: data.order.txHash
        });
        
        if (data.order.status === 'completed') {
          setPaymentStatus('completed');
          setUsdcTxHash(data.order.txHash || '');
        } else if (data.order.status === 'failed') {
          setPaymentStatus('failed');
        } else if (data.order.status === 'confirmed') {
          setPaymentStatus('processing');
        } else if (data.order.status === 'pending') {
          setPaymentStatus('pending');
        } else {
          // Default to processing for any other status
          setPaymentStatus('processing');
        }
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
    }
  };

  const verifyPaymentManually = async (orderId: string) => {
    try {
      const baseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || 'https://zora-onramp-backend-production.up.railway.app').replace(/\/$/, '');
      const response = await fetch(`${baseUrl}/api/orders/${orderId}/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        console.error('Manual verification failed:', response.status);
        return;
      }
      
      const data = await response.json();
      console.log('Manual verification response:', data);
      
      if (data.success && data.order) {
        if (data.order.status === 'completed') {
          setPaymentStatus('completed');
          setUsdcTxHash(data.order.txHash || '');
        } else if (data.order.status === 'failed') {
          setPaymentStatus('failed');
        } else if (data.order.status === 'confirmed') {
          setPaymentStatus('processing');
        }
      }
    } catch (error) {
      console.error('Error with manual verification:', error);
    }
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
              Get USDC to trade tokenized content and support creators on Zora&apos;s decentralized platform
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
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700 max-w-md w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-8">
              <h2 className="text-xl font-light text-black dark:text-white">
                Fund Zora
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center pb-8">
              <div className="flex items-center space-x-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-6 h-6 border-2 flex items-center justify-center text-xs font-light ${
                        step <= currentStep
                          ? "border-black dark:border-white text-black dark:text-white"
                          : "border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      {step}
                    </div>
                    {step < 4 && (
                      <div
                        className={`w-6 h-px ${
                          step < currentStep
                            ? "bg-black dark:bg-white"
                            : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="px-8 pb-8">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-light text-gray-600 dark:text-gray-400 mb-2">
                      Zora Username
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleUsernameChange}
                        placeholder="Enter Zora username"
                        className="w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-600 bg-transparent text-black dark:text-white font-light focus:outline-none focus:border-black dark:focus:border-white transition-colors duration-200"
                      />
                      {isValidatingUsername && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="w-4 h-4 border-2 border-gray-300 border-t-black dark:border-t-white rounded-full animate-spin"></div>
                        </div>
                      )}
                      {!isValidatingUsername && isUsernameValid && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <Check className="w-4 h-4 text-green-500" />
                        </div>
                      )}
                    </div>
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
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-transparent text-black dark:text-white font-light focus:outline-none focus:border-black dark:focus:border-white transition-colors duration-200"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
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
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-transparent text-black dark:text-white font-light focus:outline-none focus:border-black dark:focus:border-white transition-colors duration-200"
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
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-transparent text-black dark:text-white font-light focus:outline-none focus:border-black dark:focus:border-white transition-colors duration-200"
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
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
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-transparent text-black dark:text-white font-light focus:outline-none focus:border-black dark:focus:border-white transition-colors duration-200"
                    />
                  </div>
                  
                  {/* Summary - only show after clicking Next */}
                  {showSummary && (
                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-sm font-light text-black dark:text-white mb-4">Summary</h4>
                      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                        <p>Username: {formData.username}</p>
                        <p>Amount: ₦{formData.amount}</p>
                        <p>Email: {formData.email}</p>
                        <p>Name: {formData.fullName}</p>
                        <p>Phone: {formData.phoneNumber}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {currentStep === 4 && paymentData && (
                <div className="space-y-6">
                  {/* Always show payment details for pending and processing states */}
                  {(paymentStatus === 'pending' || paymentStatus === 'processing') && (
                    <>
                      <div className="text-center">
                        <h3 className="text-lg font-light text-black dark:text-white mb-2">
                          Payment Details
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          Transfer the exact amount to the account below
                        </p>
                      </div>

                      {/* Countdown Timer */}
                      <div className="text-center p-4 border border-gray-300 dark:border-gray-600">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Time remaining</p>
                        <p className="text-lg font-light text-black dark:text-white">
                          {formatTime(timeLeft)}
                        </p>
                      </div>

                      {/* Polling Status */}
                      {timeUntilPolling > 0 && (
                        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
                          <p className="text-sm text-blue-600 dark:text-blue-400">
                            Payment monitoring will start in {timeUntilPolling} seconds
                          </p>
                        </div>
                      )}

                      {/* Payment Details */}
                      <div className="space-y-4">
                        <div className="p-4 border border-gray-300 dark:border-gray-600">
                          <h4 className="text-sm font-light text-black dark:text-white mb-3">Account Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Account Number:</span>
                              <span className="font-light text-black dark:text-white">{paymentData.virtualAccount.accountNumber}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Bank Name:</span>
                              <span className="font-light text-black dark:text-white">{paymentData.virtualAccount.bankName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                              <span className="font-light text-black dark:text-white">₦{formData.amount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">USDC Amount:</span>
                              <span className="font-light text-black dark:text-white">{paymentData.usdcAmount} USDC</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border border-gray-300 dark:border-gray-600">
                          <h4 className="text-sm font-light text-black dark:text-white mb-3">Order Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Order ID:</span>
                              <span className="font-light text-black dark:text-white font-mono text-xs">{paymentData.orderId}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Expires:</span>
                              <span className="font-light text-black dark:text-white text-xs">{paymentData.expiresIn}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Processing indicator below payment details */}
                      {paymentStatus === 'processing' && (
                        <div className="text-center space-y-3 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                          <div className="animate-spin w-6 h-6 border-2 border-gray-300 border-t-black dark:border-t-white mx-auto"></div>
                          <div>
                            <p className="text-sm font-light text-black dark:text-white">
                              Checking for your payment...
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                              We&apos;re monitoring for your transfer
                            </p>
                          </div>
                          <button
                            onClick={() => paymentData && verifyPaymentManually(paymentData.orderId)}
                            className="px-3 py-1 text-xs text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
                          >
                            Check Now
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  {paymentStatus === 'completed' && (
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                        <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-lg font-light text-black dark:text-white">
                        Payment Successful!
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Your USDC has been released to your Zora address
                      </p>
                      {usdcTxHash && (
                        <div className="p-4 border border-gray-300 dark:border-gray-600">
                          <h4 className="text-sm font-light text-black dark:text-white mb-2">Transaction Hash</h4>
                          <p className="text-xs font-mono text-gray-600 dark:text-gray-400 break-all">
                            {usdcTxHash}
                          </p>
                        </div>
                      )}
                      <div className="p-4 border border-gray-300 dark:border-gray-600">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Amount Received:</span>
                            <span className="font-light text-black dark:text-white">{paymentData.usdcAmount} USDC</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Zora Username:</span>
                            <span className="font-light text-black dark:text-white text-xs">{formData.username}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentStatus === 'failed' && (
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto">
                        <X className="w-8 h-8 text-red-600 dark:text-red-400" />
                      </div>
                      <h3 className="text-lg font-light text-black dark:text-white">
                        Payment Failed
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        There was an issue processing your payment. Please try again.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-8 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 text-sm font-light transition-colors duration-200 ${
                  currentStep === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentStep < 3 ? (
                <button
                  onClick={nextStep}
                  disabled={
                    (currentStep === 1 && (!formData.username || !formData.amount || !isUsernameValid)) ||
                    (currentStep === 2 && (!formData.email || !formData.fullName))
                  }
                  className={`flex items-center space-x-2 text-sm font-light transition-colors duration-200 ${
                    (currentStep === 1 && (!formData.username || !formData.amount || !isUsernameValid)) ||
                    (currentStep === 2 && (!formData.email || !formData.fullName))
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : currentStep === 3 ? (
                <button
                  onClick={handleSubmit}
                  disabled={!formData.phoneNumber || isCreatingOrder}
                  className={`px-8 py-3 text-sm font-light transition-colors duration-200 flex items-center space-x-2 ${
                    !formData.phoneNumber || isCreatingOrder
                      ? "text-gray-400 bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
                      : "text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                  }`}
                >
                  {isCreatingOrder && (
                    <div className="animate-spin w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full"></div>
                  )}
                  <span>{isCreatingOrder ? "Creating Order..." : "Proceed to Pay"}</span>
                </button>
              ) : (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {paymentStatus === 'pending' && "Complete payment to receive USDC"}
                  {paymentStatus === 'processing' && "Processing your payment..."}
                  {paymentStatus === 'completed' && "Payment completed successfully!"}
                  {paymentStatus === 'failed' && "Payment failed - please try again"}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
