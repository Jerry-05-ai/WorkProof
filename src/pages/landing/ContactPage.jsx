import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  MessageSquare,
  User,
  Type,
  Send,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Lock,
} from 'lucide-react';
import { useApp } from '../../store/context';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Footer } from '../../components/layout/Footer';
import { LandingNav } from '../../components/layout/LandingNav';

const INFO = [
  {
    icon: ShieldCheck,
    title: 'Reaches the admin',
    description: 'Your message is delivered straight to the WorkProof platform administrator.',
  },
  {
    icon: Clock,
    title: 'We read every note',
    description: 'Questions, feedback, and partnership requests are all reviewed.',
  },
  {
    icon: Lock,
    title: 'Handled privately',
    description: 'Your details are only used to respond to your enquiry.',
  },
];

export const ContactPage = () => {
  const { dispatch } = useApp();
  const [form, setForm] = useState({ name: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your name';
    if (!form.subject.trim()) next.subject = 'Please add a subject';
    if (!form.message.trim()) next.message = 'Please write a message';
    else if (form.message.trim().length < 10)
      next.message = 'Your message is a little short';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    // Simulate delivery latency for a polished loading state, then persist to
    // the store so the platform administrator can read it in their dashboard.
    setTimeout(() => {
      dispatch({
        type: 'SUBMIT_CONTACT_MESSAGE',
        payload: {
          id: `msg_${Date.now()}`,
          name: form.name.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
          date: new Date().toISOString(),
          status: 'UNREAD',
        },
      });
      setSubmitting(false);
      setSent(true);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LandingNav />

      {/* Header band */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[44rem] h-[44rem] rounded-full bg-primary/[0.06] blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-24 pb-16 lg:pt-28 lg:pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold text-text-secondary shadow-xs mb-6">
              <Mail className="h-4 w-4 text-primary" />
              We'd love to hear from you
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-text tracking-tight leading-[1.05] mb-5">
              Get in touch
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Have a question about WorkProof, verification, or partnerships? Send
              us a note and it'll reach our team directly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="flex-1 max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Info column */}
          <div className="lg:col-span-2 space-y-4">
            {INFO.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 bg-surface rounded-2xl border border-border shadow-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="w-11 h-11 rounded-xl bg-primary-soft flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-5 w-5 text-primary" strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="font-semibold text-text tracking-tight mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Form column */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-surface rounded-[1.75rem] border border-border shadow-card-premium p-6 lg:p-10"
            >
              {sent ? (
                <div className="text-center py-10 px-4">
                  <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-8 w-8 text-success" strokeWidth={2.2} />
                  </div>
                  <h2 className="text-2xl font-bold text-text tracking-tight mb-2">
                    Message sent
                  </h2>
                  <p className="text-muted max-w-md mx-auto mb-8 leading-relaxed">
                    Thanks, {form.name.split(' ')[0] || 'there'}. Your message has
                    been delivered to the WorkProof administrator. We'll be in touch
                    soon.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setForm({ name: '', subject: '', message: '' });
                      setSent(false);
                    }}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div>
                    <h2 className="text-xl font-bold text-text tracking-tight">
                      Send a message
                    </h2>
                    <p className="text-sm text-muted mt-1">
                      Fill in the form below and we'll get back to you.
                    </p>
                  </div>

                  <Input
                    label="Name"
                    placeholder="Your full name"
                    icon={User}
                    value={form.name}
                    onChange={handleChange('name')}
                    error={errors.name}
                    autoComplete="name"
                  />

                  <Input
                    label="Subject"
                    placeholder="What's this about?"
                    icon={Type}
                    value={form.subject}
                    onChange={handleChange('subject')}
                    error={errors.subject}
                  />

                  <div className="w-full">
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-text-secondary mb-1.5"
                    >
                      Message
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-0 pl-3.5 flex items-start pointer-events-none">
                        <MessageSquare className="h-[18px] w-[18px] text-muted" />
                      </div>
                      <textarea
                        id="contact-message"
                        rows={5}
                        placeholder="Tell us a little more…"
                        value={form.message}
                        onChange={handleChange('message')}
                        aria-invalid={errors.message ? 'true' : undefined}
                        className={`w-full rounded-lg border bg-surface pl-10 pr-3.5 py-2.5 text-sm text-text placeholder-muted shadow-xs transition-all duration-150 ease-out resize-y focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/12 ${
                          errors.message
                            ? 'border-danger focus:border-danger focus:ring-danger/12'
                            : 'border-border-strong hover:border-muted'
                        }`}
                      />
                    </div>
                    {errors.message && (
                      <p className="mt-1.5 text-sm text-danger">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    loading={submitting}
                    className="w-full"
                  >
                    {!submitting && <Send className="h-4 w-4" />}
                    {submitting ? 'Sending…' : 'Send message'}
                  </Button>

                  <p className="text-xs text-muted text-center">
                    Your message is delivered privately to the platform administrator.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
