/**
 * Pricing Plan Configuration
 *
 * All pricing data is centralized here so it can be updated without editing the UI.
 * To change prices, plans, or features, simply modify the objects below.
 *
 * Usage:
 *   import { PLANS, PRICING_PAGE } from '../../config/pricing';
 */

export const PLANS = [
  {
    id: 'starter',
    title: 'Starter',
    companySize: '1–150 Employees',
    badge: 'Best for Small Businesses',
    badgeVariant: 'neutral',
    monthlyPrice: 4,
    sixMonthPrice: 24,
    highlighted: false,
    cta: { label: 'Start Free Trial', variant: 'outline' },
    features: [
      { text: 'Everything in Starter, plus:', included: true, isSectionHeader: true },
      { text: '1 Month Free Trial', included: true },
      { text: 'Employee Verification', included: true },
      { text: 'Public Work Profiles', included: true },
      { text: 'Skills & Experience Tracking', included: true },
      { text: 'Project History', included: true },
      { text: 'Company Dashboard', included: true },
      { text: 'Basic Analytics', included: true },
      { text: 'Secure Employee Records', included: true },
      { text: 'Email Notifications', included: true },
      { text: 'Standard Support', included: true },
    ],
  },
  {
    id: 'growth',
    title: 'Growth',
    companySize: '151–300 Employees',
    badge: 'Most Popular',
    badgeVariant: 'primary',
    monthlyPrice: 9,
    sixMonthPrice: 54,
    highlighted: true,
    cta: { label: 'Start Free Trial', variant: 'primary' },
    features: [
      { text: 'Everything in Starter, plus:', included: true, isSectionHeader: true },
      { text: 'Advanced Analytics', included: true },
      { text: 'Team Performance Reports', included: true },
      { text: 'Priority Support', included: true },
      { text: 'Advanced Search', included: true },
      { text: 'Bulk Employee Management', included: true },
      { text: 'Monthly Reports', included: true },
      { text: 'Enhanced Verification Tools', included: true },
    ],
  },
  {
    id: 'enterprise',
    title: 'Enterprise',
    companySize: '300+ Employees',
    badge: 'Enterprise',
    badgeVariant: 'accent',
    monthlyPrice: 15,
    sixMonthPrice: 90,
    highlighted: false,
    cta: { label: 'Contact Sales', variant: 'outline' },
    features: [
      { text: 'Everything in Growth, plus:', included: true, isSectionHeader: true },
      { text: 'Unlimited Employees', included: true },
      { text: 'Dedicated Account Support', included: true },
      { text: 'Custom Integrations', included: true },
      { text: 'Enterprise Security', included: true },
      { text: 'Priority Verification', included: true },
      { text: 'Advanced Reporting', included: true },
      { text: 'Future Enterprise Features', included: true },
    ],
  },
];

export const BILLING_STEPS = [
  {
    number: 1,
    title: 'Company registers on WorkProof',
    description: 'Your company creates an account on the platform.',
  },
  {
    number: 2,
    title: 'Admin reviews the company',
    description: 'The WorkProof team reviews your registration details.',
  },
  {
    number: 3,
    title: 'Admin approves registration',
    description: 'Your company is approved to start using WorkProof.',
  },
  {
    number: 4,
    title: 'Company receives 1 Month FREE Trial',
    description: 'Enjoy full access to WorkProof for 30 days at no cost.',
  },
  {
    number: 5,
    title: 'Trial expires',
    description: 'Your free trial period comes to an end.',
  },
  {
    number: 6,
    title: 'Subscription becomes required',
    description: 'A subscription is needed based on your company size to continue.',
  },
  {
    number: 7,
    title: 'Company continues using WorkProof',
    description: 'After successful payment, your company continues accessing all features.',
    isLast: true,
  },
];

export const FAQS = [
  {
    question: 'How long is the free trial?',
    answer: '30 days after admin approval.',
  },
  {
    question: 'Can I change my plan later?',
    answer: 'Yes. You can upgrade or downgrade your plan at any time.',
  },
  {
    question: 'What happens after trial ends?',
    answer: 'A subscription is required to continue using WorkProof.',
  },
  {
    question: 'Do employees pay?',
    answer: 'No. Only companies purchase subscriptions. Employee accounts are always free.',
  },
];

export const PRICING_PAGE = {
  heading: 'Simple, Transparent Pricing',
  subheading:
    'Start with a 1-month free trial. After the trial, choose the plan based on your company size.',
};