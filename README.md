# Zora Onramp Frontend

A modern Next.js frontend application that enables Nigerian users to seamlessly convert Naira to USDC/ETH and join the Zora creator economy.

## 🎯 Project Goal

**Bridge the gap between traditional Nigerian banking and the decentralized Zora ecosystem.**

Zora Onramp solves a critical problem for Nigerian creators and collectors who want to participate in the Zora marketplace but face barriers in acquiring USDC/ETH. Our platform provides:

- **Direct Naira to Crypto Conversion**: Convert Nigerian Naira directly to USDC/ETH
- **Zora Ecosystem Integration**: Get crypto assets ready for Zora marketplace participation
- **Secure & Transparent**: Blockchain-powered transactions with smart contract escrow
- **User-Friendly Experience**: Modern, responsive interface designed for Nigerian users

## 🚀 Features

### Current Implementation
- **Modern Landing Page**: Clean, responsive design with Zora branding
- **Dark Mode Support**: Automatic theme switching for better user experience
- **Mobile-First Design**: Optimized for Nigerian mobile users
- **Coming Soon Page**: Professional placeholder while backend integration is completed

### Planned Features
- **Conversion Interface**: Simple form to convert Naira to USDC/ETH
- **Payment Integration**: Flutterwave integration for Naira payments
- **Wallet Connection**: Connect Zora wallets and addresses
- **Transaction Tracking**: Real-time status updates for conversions
- **Multi-language Support**: English and local Nigerian languages

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for responsive design
- **Fonts**: Geist font family for modern typography
- **Deployment**: Vercel-ready configuration

## 🏗 Project Structure

```
frontend/
├── src/
│   └── app/
│       ├── globals.css          # Global styles with Tailwind
│       ├── layout.tsx           # Root layout with metadata
│       ├── page.tsx             # Landing page
│       └── favicon.ico          # App icon
├── public/                      # Static assets
├── package.json                 # Dependencies and scripts
├── tailwind.config.js           # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── next.config.ts              # Next.js configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mide001/Zora-Onramp.git
   cd Zora-Onramp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design Philosophy

### User Experience
- **Simplicity First**: Clean, intuitive interface
- **Mobile-Optimized**: Designed for Nigerian mobile users
- **Accessibility**: WCAG compliant design
- **Performance**: Fast loading times on slow connections

### Visual Identity
- **Zora Branding**: Consistent with Zora ecosystem
- **Nigerian Context**: Culturally appropriate design elements
- **Modern Aesthetics**: Clean, professional appearance
- **Dark Mode**: Automatic theme switching

## 🔗 Integration Points

### Backend API
- **Order Creation**: Create conversion orders
- **Payment Processing**: Handle Flutterwave payments
- **Transaction Status**: Real-time updates
- **Wallet Integration**: Zora address resolution

### External Services
- **Flutterwave**: Naira payment processing
- **Zora SDK**: Address resolution and profile data
- **Blockchain**: USDC/ETH transaction handling

## 🌍 Target Audience

### Primary Users
- **Nigerian Creators**: Artists, musicians, content creators
- **Nigerian Collectors**: NFT enthusiasts and investors
- **Crypto Beginners**: Users new to cryptocurrency
- **Zora Community**: Existing Zora users in Nigeria

### User Personas
1. **Lagos Artist**: Wants to sell digital art on Zora
2. **Abuja Collector**: Interested in buying NFTs
3. **Port Harcourt Creator**: Music producer exploring Web3
4. **Kano Entrepreneur**: Business owner entering crypto

## 📈 Success Metrics

### User Engagement
- **Conversion Rate**: Naira to USDC/ETH success rate
- **User Retention**: Repeat usage patterns
- **Transaction Volume**: Total value converted
- **User Satisfaction**: Feedback and ratings

### Technical Performance
- **Page Load Speed**: < 3 seconds on mobile
- **Uptime**: 99.9% availability
- **Error Rate**: < 1% transaction failures
- **Security**: Zero security incidents

## 🔒 Security Considerations

### Frontend Security
- **Input Validation**: Client-side form validation
- **XSS Protection**: Content Security Policy
- **HTTPS Only**: Secure communication
- **Error Handling**: Secure error messages

### User Privacy
- **Data Minimization**: Collect only necessary data
- **Local Storage**: Secure client-side storage
- **Cookie Policy**: Transparent cookie usage
- **GDPR Compliance**: European data protection

## 🚧 Development Status

### ✅ Completed
- [x] Next.js project setup
- [x] TypeScript configuration
- [x] Tailwind CSS styling
- [x] Landing page design
- [x] Responsive layout
- [x] Dark mode support
- [x] Zora branding

### 🚧 In Progress
- [ ] Backend API integration
- [ ] Payment form implementation
- [ ] Wallet connection
- [ ] Transaction tracking
- [ ] Error handling

### 📋 Planned
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] User authentication
- [ ] Transaction history
- [ ] Mobile app version

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

### Code Standards
- **TypeScript**: Strict type checking
- **ESLint**: Code quality enforcement
- **Prettier**: Code formatting
- **Conventional Commits**: Standardized commit messages

## 📞 Support

### Contact Information
- **GitHub Issues**: Bug reports and feature requests
- **Email**: Support inquiries
- **Discord**: Community discussions
- **Twitter**: Updates and announcements

### Documentation
- **API Documentation**: Backend integration guide
- **User Guide**: End-user instructions
- **Developer Guide**: Technical documentation
- **Deployment Guide**: Production setup

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Zora Team**: For building the amazing creator economy platform
- **Flutterwave**: For reliable payment processing in Nigeria
- **Next.js Team**: For the excellent React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Nigerian Crypto Community**: For feedback and support

---

*Empowering Nigerian creators to participate in the global creator economy through seamless crypto conversion.*
