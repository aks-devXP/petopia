import { AlertCircle, ArrowRight, Heart, Home, PawPrint, Phone, Shield, Users } from 'lucide-react';
import { useRef, useState } from 'react';
import heroImageUrl from "../../../assets/NGO/NGO_hero2.png";

export default function NGO_Home() {
  const [activeService, setActiveService] = useState(null);
  const servicesRef = useRef(null);

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const services = [
    {
      id: 'connect',
      icon: Users,
      title: 'Connect with NGOs',
      description: 'Find and connect with verified animal welfare organizations in your area',
      color: 'from-brand to-brand-hover',
      iconBg: 'bg-brand',
      features: ['Browse verified NGOs', 'Filter by location & services', 'Direct contact options']
    },
    {
      id: 'donate',
      icon: Heart,
      title: 'Make a Donation',
      description: 'Support animal welfare causes through secure donations',
      color: 'from-pink-mid to-rose-rose_mid',
      iconBg: 'bg-pink-mid',
      features: ['One-time donations', 'Monthly sponsorships', 'Transparent impact reports']
    },
    {
      id: 'report',
      icon: Shield,
      title: 'Report Animal Abuse',
      description: 'Help protect animals by reporting cases of abuse or neglect',
      color: 'from-rose-rose_light to-rose-rose_mid',
      iconBg: 'bg-rose-rose_light',
      features: ['Anonymous reporting', '24/7 emergency support', 'Track your report status']
    },
    {
      id: 'adopt',
      icon: Home,
      title: 'Adopt a Pet',
      description: 'Give a loving home to animals waiting for their forever family',
      color: 'from-color-4 to-color-7',
      iconBg: 'bg-color-4',
      features: ['Browse adoptable pets', 'Virtual meet & greet', 'Adoption guidance']
    }
  ];

  const stats = [
    {
      number: '150+',
      label: 'Partner NGOs',
      icon: Users,
      gradient: 'from-color-1/20 to-color-5/20',
      iconColor: 'bg-color-1',
      hoverGradient: 'from-color-1/30 to-color-5/30'
    },
    {
      number: '5,000+',
      label: 'Animals Rescued',
      icon: PawPrint,
      gradient: 'from-color-2/20 to-color-6/20',
      iconColor: 'bg-color-2',
      hoverGradient: 'from-color-2/30 to-color-6/30'
    },
    {
      number: '₹2.5L',
      label: 'Donations Raised',
      icon: Heart,
      gradient: 'from-color-3/20 to-pink-mid/20',
      iconColor: 'bg-color-3',
      hoverGradient: 'from-color-3/30 to-pink-mid/30'
    },
    {
      number: '1,200+',
      label: 'Successful Adoptions',
      icon: Home,
      gradient: 'from-color-4/20 to-color-7/20',
      iconColor: 'bg-color-4',
      hoverGradient: 'from-color-4/30 to-color-7/30'
    }
  ];

  return (
    <div className="min-h-screen bg-app-bg">
      {/* Hero Section */}
      <section
        className="relative  py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 overflow-hidden"
        style={{
  backgroundImage: `url(${heroImageUrl})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed'
}}



      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/50 z-0" />

        {/* Decorative elements */}
        <div className="absolute top-6 left-6 sm:top-10 sm:left-10 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 bg-brand/5 rounded-full blur-3xl z-10" />
        <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 bg-pink-mid/5 rounded-full blur-3xl z-10" />

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-4 sm:mb-6 animate-pulse border border-white/20">
              <PawPrint className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              <span className="text-xs sm:text-sm font-nunitoSemiBold text-white">Join 10,000+ Animal Lovers</span>
            </div>

            <h2 className="font-quicksandBold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-3 sm:mb-4 md:mb-6 leading-tight px-2">
              Every Animal Deserves
              <span className="block text-brand mt-1 sm:mt-2">Love & Care</span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-cream-lightest font-nunito mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-4 leading-relaxed">
              Join our community of compassionate individuals working together to protect and care for animals in need
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-4">
              <button
                onClick={scrollToServices}
                className="w-full sm:w-auto px-6 md:px-8 lg:px-10 py-3 md:py-4 bg-brand hover:bg-brand-hover active:bg-brand-active text-white rounded-full font-nunitoSemiBold text-sm md:text-base transition-all hover:scale-105 active:scale-95 hover:shadow-lg flex items-center justify-center gap-2 group"
              >
                Explore Services
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* <button className="w-full sm:w-auto px-6 md:px-8 lg:px-10 py-3 md:py-4 bg-white/10 hover:bg-white/20 active:bg-white/5 text-white rounded-full font-nunitoSemiBold text-sm md:text-base border-2 border-white/30 hover:border-white/60 transition-all flex items-center justify-center gap-2">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Emergency:</span> 1800-XXX-XXXX
              </button> */}
            </div>

            {/* Trust indicators (single instance) */}
            <div className="mt-8 sm:mt-10 md:mt-12 flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-8 text-xs sm:text-sm text-cream-lightest px-4">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-brand flex-shrink-0" />
                <span className="font-nunito">Verified NGOs</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-brand flex-shrink-0" />
                <span className="font-nunito">Secure Donations</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 text-brand flex-shrink-0" />
                <span className="font-nunito">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* --- END HERO --- */}

      {/* Stats Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-app-elevated relative">
        <div className="absolute top-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-brand to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 md:mb-12 hidden sm:block">
            <h3 className="font-nunitoLight text-xl sm:text-2xl md:text-3xl lg:text-4xl text-ink-heading mb-2">
              Our Impact in Numbers
            </h3>
            <p className="text-sm md:text-base text-ink-secondary font-nunito">Making a real difference together</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={`group relative bg-gradient-to-br ${stat.gradient} hover:${stat.hoverGradient} rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 md:hover:-translate-y-3 border-2 border-cream-mid/50 hover:border-brand overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className={`w-8 h-8 sm:w-12 sm:h-12 md:w-12 md:h-12 lg:w-16 lg:h-16 ${stat.iconColor} group-hover:scale-110 group-hover:rotate-6 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 transition-all duration-300 shadow-lg`}>
                      <Icon className="w-3 h-3 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                    </div>
                    <div className="font-nunitoSemiBold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-ink-heading mb-1 md:mb-2 group-hover:text-brand transition-colors duration-300">
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm md:text-base text-ink-secondary font-nunito leading-tight px-1">
                      {stat.label}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-16 sm:w-20 h-16 sm:h-20 bg-brand/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  {index % 2 === 0 && index < 3 && (
                    <div className="lg:hidden absolute -right-1.5 top-1/2 -translate-y-1/2 w-0.5 h-12 sm:h-16 bg-cream-mid/30" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-6 sm:hidden">
            <p className="text-xs text-ink-secondary font-nunito">Our Impact in Numbers</p>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section
        ref={servicesRef}
        className="ngo-services py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-app-bg scroll-mt-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <h2 className="font-quicksandBold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-ink-heading mb-2 sm:mb-3 md:mb-4 px-4 leading-tight">
              How Can We Help Today?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-ink-secondary font-nunito max-w-2xl mx-auto px-4 leading-relaxed">
              Choose a service below to get started. Each option is designed to make your experience seamless and impactful
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {services.map((service) => {
              const Icon = service.icon;
              const isActive = activeService === service.id;

              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setActiveService(service.id)}
                  onMouseLeave={() => setActiveService(null)}
                  onClick={() => setActiveService(service.id)}
                  className={`bg-app-elevated rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 border-2 transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'border-brand shadow-2xl -translate-y-1 sm:-translate-y-2 md:-translate-y-3'
                      : 'border-cream-mid hover:border-cream-dark active:border-brand'
                  }`}
                >
                  <div className="flex flex-col xs:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 ${service.iconBg} rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${isActive ? 'scale-110 rotate-6' : ''} shadow-lg`}>
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-quicksandBold text-lg sm:text-xl md:text-2xl lg:text-3xl text-ink-heading mb-1.5 sm:mb-2 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-ink-secondary font-nunito leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2 mb-5 sm:mb-6 md:mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 md:gap-3 text-xs sm:text-sm md:text-base">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-brand rounded-full flex-shrink-0 mt-1.5 sm:mt-2" />
                        <span className="text-ink-secondary font-nunito leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className={`w-full py-2.5 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl font-nunitoSemiBold text-xs sm:text-sm md:text-base transition-all flex items-center justify-center gap-2 ${
                      isActive
                        ? 'bg-brand text-white shadow-lg scale-105'
                        : 'bg-cream-light text-ink-primary hover:bg-cream-mid active:bg-brand active:text-white'
                    }`}
                  >
                    Get Started
                    <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${isActive ? 'translate-x-1' : ''}`} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="py-12 bg-gradient-to-r from-rose-rose_light to-rose-rose_mid">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-quicksandBold text-2xl mb-1">Emergency Assistance</h3>
                <p className="font-nunito opacity-90">Available 24/7 for urgent animal welfare cases</p>
              </div>
            </div>
            <button className="px-8 py-3 bg-white text-rose-rose_light rounded-full font-nunitoBold hover:scale-105 transition-all flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Call Emergency Line
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
