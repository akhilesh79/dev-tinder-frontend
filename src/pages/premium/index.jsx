import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Crown, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { highlights, plans, trustItems } from '../../constants/common';
import PlanCard from './PlanCard';
import CellValue from './CellValue';
import axios from 'axios';
import { VITE_API_BASE_URL } from '../../constants/common';
import { updateUser } from '../../store/appSlices/userSlice';

const TIER_META = {
  bronze: {
    gradient: 'from-amber-700 via-orange-600 to-amber-500',
    ring: 'ring-amber-500/40',
    badge: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
    icon: '🥉',
    label: 'Bronze',
  },
  silver: {
    gradient: 'from-slate-500 via-zinc-400 to-slate-300',
    ring: 'ring-indigo-500/40',
    badge: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/25',
    icon: '🥈',
    label: 'Silver',
  },
  gold: {
    gradient: 'from-yellow-400 via-amber-400 to-orange-400',
    ring: 'ring-yellow-500/40',
    badge: 'bg-yellow-400/15 text-yellow-400 border-yellow-500/25',
    icon: '👑',
    label: 'Gold',
  },
};

/* ─── Already‑premium screen ────────────────────────────────────────────────── */
const AlreadyPremium = ({ user }) => {
  const tier = (user.mememberShipType || 'gold').toLowerCase();
  const meta = TIER_META[tier] || TIER_META.gold;
  const planDef = plans.find((p) => p.id === tier) || plans[2];
  // Plans that are an upgrade (higher index)
  const tierOrder = ['bronze', 'silver', 'gold'];
  const tierIndex = tierOrder.indexOf(tier);
  const upgradable = tierOrder.slice(tierIndex + 1);
  const upgradePlans = plans.filter((p) => upgradable.includes(p.id));

  return (
    <div className='min-h-screen bg-[color:var(--bg-primary)]'>
      {/* ── Celebration hero ── */}
      <section className='relative overflow-hidden'>
        <div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-600/8 via-purple-600/5 to-rose-500/8' />
        <div className='pointer-events-none absolute -top-24 left-1/3 h-[28rem] w-[28rem] rounded-full bg-yellow-500/8 blur-3xl' />
        <div className='pointer-events-none absolute top-8 right-1/4  h-60 w-60 rounded-full bg-amber-500/8 blur-3xl' />

        <div className='relative z-10 mx-auto max-w-3xl px-4 pb-12 pt-16 text-center sm:px-6'>
          {/* Animated crown circle */}
          <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 shadow-2xl shadow-yellow-500/30'>
            <Crown size={38} className='fill-white text-white' />
          </div>

          <div className={`mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 ${meta.badge}`}>
            <Sparkles size={12} />
            <span className='text-xs font-semibold uppercase tracking-widest'>
              {meta.icon} {meta.label} Member
            </span>
          </div>

          <h1 className='font-poppins mb-3 text-4xl font-extrabold text-[color:var(--text-primary)] sm:text-5xl'>
            You&apos;re already{' '}
            <span className='bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent'>
              Premium!
            </span>
          </h1>
          <p className='mx-auto max-w-md text-base text-[color:var(--text-secondary)]'>
            Your <strong className='text-[color:var(--text-primary)]'>{meta.label}</strong> membership is active. Enjoy
            all the benefits you unlocked below.
          </p>
        </div>
      </section>

      {/* ── Active benefits card ── */}
      <section className='mx-auto max-w-2xl px-4 sm:px-6'>
        <div className='overflow-hidden rounded-3xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] shadow-xl'>
          {/* Tier header */}
          <div className={`bg-gradient-to-br ${meta.gradient} px-6 py-5`}>
            <p className='text-sm font-semibold text-white/70 uppercase tracking-widest'>Your active plan</p>
            <h2 className='font-poppins mt-1 text-3xl font-extrabold text-white'>
              {meta.icon} {meta.label}
            </h2>
          </div>

          {/* Features */}
          <div className='grid grid-cols-1 gap-3 p-6 sm:grid-cols-2'>
            {planDef.features
              .filter((f) => f.available)
              .map((feature, idx) => (
                <div key={idx} className='flex items-start gap-3'>
                  <div className='mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/15'>
                    <CheckCircle2 size={13} className='text-emerald-400' />
                  </div>
                  <div className='flex flex-wrap items-center gap-1.5'>
                    <span className='text-sm text-[color:var(--text-secondary)]'>{feature.text}</span>
                    {feature.comingSoon && (
                      <span className='rounded-full border border-indigo-500/25 bg-indigo-500/10 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-indigo-400'>
                        Soon
                      </span>
                    )}
                  </div>
                </div>
              ))}
          </div>

          {/* Locked perks teaser (if not gold) */}
          {tier !== 'gold' && (
            <div className='mx-6 mb-6 rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-primary)] p-4'>
              <p className='mb-2 text-xs font-bold uppercase tracking-wider text-[color:var(--text-tertiary)]'>
                <Star size={11} className='mr-1 inline' /> Upgrade to unlock more
              </p>
              {planDef.features
                .filter((f) => !f.available)
                .map((feature, idx) => (
                  <div key={idx} className='mt-2 flex items-center gap-2 opacity-50'>
                    <div className='h-4 w-4 flex-shrink-0 rounded-full border border-[color:var(--border-color)]' />
                    <span className='text-xs text-[color:var(--text-tertiary)] line-through'>{feature.text}</span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Upgrade section (only for bronze / silver) ── */}
      {upgradePlans.length > 0 && (
        <section className='mx-auto mt-14 max-w-4xl px-4 sm:px-6'>
          <div className='mb-6 text-center'>
            <h2 className='font-poppins text-2xl font-bold text-[color:var(--text-primary)]'>Want even more?</h2>
            <p className='mt-1 text-sm text-[color:var(--text-secondary)]'>
              Upgrade your plan anytime and unlock the next level.
            </p>
          </div>
          <div className={`grid grid-cols-1 gap-6 ${upgradePlans.length > 1 ? 'md:grid-cols-2' : 'max-w-sm mx-auto'}`}>
            {upgradePlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </section>
      )}

      {/* Gold users — nothing to upgrade */}
      {tier === 'gold' && (
        <section className='mx-auto mt-12 mb-20 max-w-xl px-4 text-center sm:px-6'>
          <div className='inline-flex items-center gap-2 rounded-2xl border border-yellow-500/25 bg-yellow-400/8 px-6 py-4'>
            <ShieldCheck size={18} className='text-yellow-400' />
            <span className='text-sm text-[color:var(--text-secondary)]'>
              You&apos;re on our <strong className='text-yellow-400'>top-tier Gold plan</strong> — you have everything
              we offer!
            </span>
          </div>
        </section>
      )}

      {/* Trust strip */}
      <section className='mx-auto mt-8 mb-20 max-w-3xl px-4 text-center sm:px-6'>
        <div className='flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-[color:var(--text-tertiary)]'>
          {trustItems.map((item) => (
            <span key={item.label} className='flex items-center gap-1.5'>
              <item.Icon size={14} className='text-emerald-500' /> {item.label}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

const VerifyingLoader = () => (
  <div className='flex min-h-[60vh] items-center justify-center bg-[color:var(--bg-primary)]'>
    <div className='text-center'>
      <div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500/10'>
        <Crown size={26} className='animate-pulse text-indigo-400' />
      </div>
      <p className='text-sm text-[color:var(--text-secondary)]'>Checking membership status…</p>
    </div>
  </div>
);

const Premium = () => {
  const [verifying, setVerifying] = useState(true);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Single membership‑status check on page mount — no need to call this in each PlanCard
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await axios.get(VITE_API_BASE_URL + 'api/payments/verify', { withCredentials: true });
        if (res.data?.user) {
          dispatch(updateUser(res.data.user));
        }
      } catch {
        // Silently ignore — user is simply not premium yet or endpoint unavailable
      } finally {
        setVerifying(false);
      }
    };
    checkStatus();
  }, [dispatch]);

  if (verifying) return <VerifyingLoader />;

  if (user?.isPremiumUser) return <AlreadyPremium user={user} />;

  return (
    <div className='min-h-screen bg-[color:var(--bg-primary)]'>
      {/* ── Hero ── */}
      <section className='relative overflow-hidden'>
        <div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-600/8 via-purple-600/5 to-rose-500/8' />
        <div className='pointer-events-none absolute -top-24 left-1/3 h-[28rem] w-[28rem] rounded-full bg-indigo-500/10 blur-3xl' />
        <div className='pointer-events-none absolute top-8 right-1/4  h-60  w-60  rounded-full bg-purple-500/10 blur-3xl' />
        <div className='pointer-events-none absolute bottom-0 left-1/2 h-40  w-96  rounded-full bg-rose-500/8  blur-3xl' />

        <div className='relative z-10 mx-auto max-w-7xl px-4 pb-14 pt-16 text-center sm:px-6'>
          <div className='mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-500/10 px-4 py-1.5'>
            <Crown size={13} className='text-indigo-400' />
            <span className='text-xs font-semibold uppercase tracking-widest text-indigo-400'>Premium Plans</span>
          </div>

          <h1 className='font-poppins mb-4 text-4xl font-extrabold leading-tight text-[color:var(--text-primary)] sm:text-5xl lg:text-6xl'>
            Level Up Your{' '}
            <span className='bg-gradient-to-r from-rose-500 via-indigo-400 to-purple-500 bg-clip-text text-transparent'>
              Dev Connections
            </span>
          </h1>

          <p className='mx-auto mb-10 max-w-lg text-base leading-relaxed text-[color:var(--text-secondary)]'>
            Supercharge your networking, get verified, and build meaningful relationships in the developer community.
          </p>
        </div>
      </section>

      {/* ── Plan cards ── */}
      <section className='mx-auto max-w-7xl px-4 sm:px-6'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 md:items-start'>
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>

      {/* ── Feature comparison table ── */}
      <section className='mx-auto mt-20 max-w-5xl px-4 sm:px-6'>
        <div className='mb-8 text-center'>
          <h2 className='font-poppins text-2xl font-bold text-[color:var(--text-primary)] sm:text-3xl'>
            Compare all features
          </h2>
          <p className='mt-2 text-sm text-[color:var(--text-secondary)]'>Everything at a glance, side by side.</p>
        </div>

        <div className='overflow-hidden rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--bg-secondary)]'>
          <div className='grid grid-cols-4 border-b border-[color:var(--border-color)] bg-[color:var(--bg-primary)]'>
            <div className='col-span-1 p-4 text-xs font-bold uppercase tracking-wider text-[color:var(--text-tertiary)]'>
              Feature
            </div>
            {['🥉 Bronze', '🥈 Silver', '👑 Gold'].map((h) => (
              <div key={h} className='p-4 text-center text-sm font-bold text-[color:var(--text-primary)]'>
                {h}
              </div>
            ))}
          </div>

          {highlights.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-4 items-center border-b border-[color:var(--border-color)] last:border-0 ${
                i % 2 === 0 ? '' : 'bg-[color:var(--bg-primary)]/40'
              }`}
            >
              <div className='col-span-1 flex items-center gap-2.5 p-4'>
                <row.icon size={15} className='flex-shrink-0 text-indigo-400' />
                <span className='text-sm text-[color:var(--text-secondary)]'>{row.label}</span>
              </div>
              <div className='flex justify-center p-4'>
                <CellValue val={row.bronze} />
              </div>
              <div className='flex justify-center p-4'>
                <CellValue val={row.silver} />
              </div>
              <div className='flex justify-center p-4'>
                <CellValue val={row.gold} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Trust strip ── */}
      <section className='mx-auto mt-16 mb-20 max-w-3xl px-4 text-center sm:px-6'>
        <div className='flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-[color:var(--text-tertiary)]'>
          {trustItems.map((item) => (
            <span key={item.label} className='flex items-center gap-1.5'>
              <item.Icon size={14} className='text-emerald-500' /> {item.label}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Premium;
