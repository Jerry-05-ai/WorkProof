import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  CreditCard,
  Building2,
  CalendarCheck,
  BadgeCheck,
  Users,
  Star,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Footer } from '../../components/layout/Footer';
import { LandingNav } from '../../components/layout/LandingNav';
import { PLANS, BILLING_STEPS, PRICING_PAGE } from '../../config/pricing';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const BADGE_STYLES = {
  neutral: 'bg-surface-2 text-muted border-border',
  primary: 'bg-primary-soft text-primary border-primary/20',
  accent: 'bg-accent-soft text-accent border-accent/20',
};

const PricingCard = ({ plan, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: plan.highlighted ? -8 : -6 }}
      className={`relative flex flex-col rounded-2xl border transition-all duration-300 ${
        plan.highlighted
          ? 'bg-surface border-primary/30 shadow-card-premium scale-[1.02] lg:scale-105 z-10'
          : 'bg-surface border-border shadow-sm hover:shadow-card-hover hover:border-border-strong'
      }`}
    >
      {/* Highlighted badge */}
      {plan.highlighted && (
        <div className="absolute -top-px left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-gradient px-4 py-1.5 text-xs font-bold text-white shadow-primary-glow">
            <Star className="h-3.5 w-3.5 fill-white/40" strokeWidth={2.5} />
            Recommended
          </div>
        </div>
      )}

      {/* Card header */}
      <div className="p-6 lg:p-8 pb-0">
        {/* Badge */}
        <div
          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
            BADGE_STYLES[plan.badgeVariant]
          }`}
        >
          {plan.badge}
        </div>

        {/* Title */}
        <h3 className="mt-4 text-xl font-bold text-text tracking-tight">{plan.title}</h3>

        {/* Company size */}
        <div className="mt-2 flex items-center gap-1.5 text-sm text-muted">
          <Building2 className="h-4 w-4" strokeWidth={2} />
          <span>{plan.companySize}</span>
        </div>

        {/* Price */}
        <div className="mt-5">
          <div className="flex items-baseline gap-0.5">
            <span className="text-sm text-muted font-medium">$</span>
            <span className="text-3xl font-bold text-text tracking-tight">{plan.monthlyPrice}</span>
            <span className="text-muted text-sm font-medium">/month</span>
          </div>
          <p className="mt-1 text-sm text-muted">
            or ${plan.sixMonthPrice} billed every 6 months
          </p>
          <p className="mt-0.5 text-xs text-success font-medium">
            Save with 6-month billing.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="flex-1 px-6 lg:px-8 py-6">
        <ul className="space-y-3">
          {plan.features.map((feature, idx) => (
            <li
              key={idx}
              className={`flex items-start gap-2.5 text-sm ${
                feature.isSectionHeader
                  ? 'text-text font-semibold pt-2 border-t border-border mt-2'
                  : 'text-text-secondary'
              }`}
            >
              {feature.isSectionHeader ? (
                <span className="text-muted text-xs font-medium uppercase tracking-wider">
                  {feature.text}
                </span>
              ) : (
                <>
                  <CheckCircle2
                    className="h-4 w-4 mt-0.5 flex-shrink-0 text-success"
                    strokeWidth={2.5}
                  />
                  <span>{feature.text}</span>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="p-6 lg:p-8 pt-0">
        <Button
          variant={plan.cta.variant}
          size="lg"
          className="w-full"
          onClick={() => {
            if (plan.id === 'enterprise') {
              navigate('/contact');
            } else {
              navigate('/register');
            }
          }}
        >
          {plan.cta.label}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

const BillingTimeline = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 lg:px-8 py-16 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="bg-surface rounded-2xl border border-border shadow-md p-8 lg:p-12"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-primary mb-4">
            <CreditCard className="h-3.5 w-3.5" />
            How Billing Works
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-text tracking-tight">
            How Billing Works
          </h2>
          <p className="text-muted mt-2 max-w-xl mx-auto leading-relaxed">
            Understand the journey from registration to subscription. The subscription
            is only required after admin approval <strong>and</strong> trial completion.
          </p>
        </div>

        <div className="space-y-0 max-w-2xl mx-auto">
          {BILLING_STEPS.map((step) => (
            <div key={step.number} className="flex items-start gap-5">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-brand-gradient rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-primary-glow transition-transform duration-300 hover:scale-110">
                  {step.number}
                </div>
                {!step.isLast && (
                  <div className="w-px flex-1 min-h-[2.5rem] bg-gradient-to-b from-primary/30 to-primary/5 mt-2" />
                )}
              </div>
              <div className={`${!step.isLast ? 'pb-8' : ''}`}>
                <h4 className="font-semibold text-text mb-1 tracking-tight">{step.title}</h4>
                <p className="text-sm text-muted leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export const PricingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LandingNav />

      {/* Hero / Header Section */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[52rem] h-[52rem] rounded-full bg-primary/[0.06] blur-3xl" />
          <div className="absolute top-40 right-0 w-[28rem] h-[28rem] rounded-full bg-secondary/[0.05] blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-24 pb-16 lg:pt-28 lg:pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold text-text-secondary shadow-xs mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              Pricing
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-text tracking-tight leading-[1.05] mb-5 max-w-3xl mx-auto">
              {PRICING_PAGE.heading}
            </h1>
            <p className="text-lg lg:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
              {PRICING_PAGE.subheading}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 lg:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {PLANS.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} />
          ))}
        </motion.div>
      </section>

      {/* Trust / Assurance */}
      <section className="bg-surface/70 border-y border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-14 lg:py-16">
          <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-primary-soft flex items-center justify-center flex-shrink-0">
                <CalendarCheck className="h-5 w-5 text-primary" strokeWidth={2.2} />
              </div>
              <div>
                <h3 className="font-semibold text-text tracking-tight mb-1">30-Day Free Trial</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Full access to all features. No credit card required.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-primary-soft flex items-center justify-center flex-shrink-0">
                <BadgeCheck className="h-5 w-5 text-primary" strokeWidth={2.2} />
              </div>
              <div>
                <h3 className="font-semibold text-text tracking-tight mb-1">No Lock-In</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Cancel anytime. Your data is always yours.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-primary-soft flex items-center justify-center flex-shrink-0">
                <Users className="h-5 w-5 text-primary" strokeWidth={2.2} />
              </div>
              <div>
                <h3 className="font-semibold text-text tracking-tight mb-1">Employees Free</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Employee accounts are always free. Only companies subscribe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Billing Works Timeline */}
      <BillingTimeline />

      <Footer />
    </div>
  );
};