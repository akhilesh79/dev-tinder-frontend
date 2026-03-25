import axios from 'axios';
import { CheckCircle2, Lock, Sparkles } from 'lucide-react';
import { toast } from 'react-toastify';
import { VITE_API_BASE_URL } from '../../constants/common';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/appSlices/userSlice';

// verifyPaymentStatus is only called as a Razorpay success handler — not on mount.
// The parent Premium page handles the single on-mount status check.
const PlanCard = ({ plan }) => {
  const price = plan.monthlyPrice;
  const period = '/mo';
  const dispatch = useDispatch();

  const verifyPaymentStatus = async () => {
    try {
      const response = await axios.get(VITE_API_BASE_URL + '/payments/verify', { withCredentials: true });
      if (!response.data) throw new Error('No response data');
      const { user } = response.data;
      if (user.isPremiumUser) {
        dispatch(updateUser(user));
        toast.success('Payment successful! You are now a premium user.');
      } else {
        toast.error('Something went wrong. Please check dashboard for details.');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      toast.error('An error occurred while verifying payment. Please try again.');
    }
  };

  const handleCTA = async (plan) => {
    // Placeholder for actual CTA action (e.g., redirect to checkout)
    try {
      const reponse = await axios.post(
        VITE_API_BASE_URL + '/payments/order',
        { mememberShipType: plan.id },
        { withCredentials: true },
      );

      if (!reponse.data) {
        throw new Error('No response data');
      }

      const { orderId, keyId, amount, currency, notes } = reponse.data || {};
      const options = {
        key: keyId,
        amount,
        currency,
        name: 'Tinder Dev',
        description: 'Platform for developers to connect and grow together',
        order_id: orderId,
        prefill: {
          name: `${notes.firstName} ${notes.lastName}`,
          email: notes.emailId,
        },
        theme: {
          color: '#F37254',
        },
        handler: verifyPaymentStatus,
      };

      const rzp = window.Razorpay(options);
      rzp.open();
      toast.success(reponse.data?.message || `You selected the ${plan.name} plan!`);
    } catch (e) {
      console.error('CTA action failed:', e);
      toast.error('Something went wrong. Please try again.');
    }
    // alert(`You selected the ${plan.name} plan!`);
  };

  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-3xl border bg-[color:var(--bg-secondary)] transition-all duration-300 hover:-translate-y-1 ${
        plan.popular
          ? 'border-indigo-500/60 shadow-2xl shadow-indigo-500/15 md:scale-[1.03]'
          : `border-[color:var(--border-color)] hover:border-indigo-500/30 hover:shadow-xl hover:${plan.glowColor}`
      }`}
    >
      {/* Top accent line for popular */}
      {plan.popular && (
        <div className='absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-indigo-500 to-purple-500' />
      )}

      {/* Popular badge */}
      {plan.popular && (
        <div className='absolute right-4 top-4 z-10 flex items-center gap-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1 text-[11px] font-bold text-white shadow-lg shadow-indigo-500/30'>
          <Sparkles size={10} /> Most Popular
        </div>
      )}

      {/* ── Gradient header ── */}
      <div className={`bg-gradient-to-br ${plan.gradient} p-6 pb-10`}>
        <div className='text-4xl mb-3'>{plan.icon}</div>
        <h3 className='font-poppins text-2xl font-extrabold text-white'>{plan.name}</h3>
        <p className='mt-1 text-sm text-white/75'>{plan.tagline}</p>

        <div className='mt-5 flex items-end gap-1'>
          <span className='text-white/60 text-lg font-medium'>₹</span>
          <span className='font-poppins text-5xl font-extrabold leading-none text-white'>{price}</span>
          <span className='mb-1 text-white/60 text-sm'>{period}</span>
        </div>
      </div>

      {/* Curved transition piece */}
      <div className={`relative -mt-px bg-gradient-to-br ${plan.gradient}`}>
        <div className='h-6 rounded-t-3xl bg-[color:var(--bg-secondary)]' />
      </div>

      {/* ── Features list ── */}
      <div className='flex flex-1 flex-col gap-3 px-6 pb-6 -mt-1'>
        {plan.features.map((feature, idx) => (
          <div key={idx} className={`flex items-start gap-3 ${!feature.available ? 'opacity-35' : ''}`}>
            {feature.available ? (
              <div className='mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/15'>
                <CheckCircle2 size={13} className='text-emerald-400' />
              </div>
            ) : (
              <div className='mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--bg-primary)]'>
                <Lock size={10} className='text-[color:var(--text-tertiary)]' />
              </div>
            )}
            <div className='flex flex-wrap items-center gap-1.5'>
              <span className='text-sm text-[color:var(--text-secondary)]'>{feature.text}</span>
              {feature.comingSoon && (
                <span className='inline-flex items-center rounded-full border border-indigo-500/25 bg-indigo-500/10 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-indigo-400'>
                  Soon
                </span>
              )}
            </div>
          </div>
        ))}

        {/* CTA button — pushed to bottom */}
        <button
          onClick={() => handleCTA(plan)}
          className={`mt-auto w-full rounded-xl py-3 text-sm font-bold shadow-md transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] ${
            plan.id === 'gold'
              ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 shadow-yellow-500/25 hover:shadow-yellow-500/40'
              : plan.id === 'silver'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-indigo-500/25 hover:shadow-indigo-500/40'
                : 'bg-gradient-to-r from-amber-600 to-orange-500 text-white shadow-amber-500/25 hover:shadow-amber-500/40'
          }`}
        >
          {plan.cta}
        </button>
      </div>
    </div>
  );
};

export default PlanCard;
