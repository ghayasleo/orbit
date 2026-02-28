import { motion } from 'framer-motion';

export function AppPreviewSection() {
  const features = [
    'Widgets show live data from every module — always current',
    'Budget status colour-coded so there\'s no math required',
    'Tap any widget to go straight into that module',
    'Fully functional offline — your data is always on your device'
  ];

  return (
    <section className="bg-bg-subtle py-16 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1160px] px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Column — Text Content */}
          <motion.div 
            className="flex-1 w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Eyebrow Label */}
            <div className="inline-flex items-center tracking-[0.06em] text-[12px] font-semibold uppercase text-brand mb-4">
              SEE IT IN ACTION
            </div>

            {/* Headline */}
            <h2 className="font-display text-[38px] md:text-[52px] font-bold text-text-primary leading-tight max-w-[500px] mb-6 tracking-tight">
              A dashboard that actually tells you something.
            </h2>

            {/* Body Copy */}
            <p className="text-lg text-text-secondary leading-[1.6] max-w-[460px] font-normal mb-6">
              Most dashboards are just menus with extra steps. Orbit's Dashboard is different — it's a daily briefing. It knows what's due, what's at risk, what needs your attention, and what you're on track with.
              <br/><br/>
              Open the app and in five seconds you know exactly where things stand. That's the whole point.
            </p>

            {/* Feature Bullets */}
            <ul className="flex flex-col gap-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-brand" />
                  <span className="text-base text-text-secondary font-normal leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Column — Device Mockup */}
          <motion.div 
            className="flex-1 w-full relative"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            {/* Light glow behind device */}
            <div className="absolute inset-0 bg-brand/10 dark:bg-brand/20 blur-[80px] rounded-full scale-75" />
            
            {/* Simulated Desktop Device Frame */}
            <div className="relative mx-auto max-w-[540px] bg-bg-base border border-border-medium rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col">
              
              {/* Browser/Device Header */}
              <div className="h-10 bg-bg-subtle border-b border-border-subtle flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                {/* Search Bar Placeholder */}
                <div className="hidden sm:block mx-auto h-6 w-1/2 bg-bg-base border border-border-subtle rounded text-center text-[10px] text-text-muted leading-6">
                  orbit-app.com/dashboard
                </div>
              </div>

              {/* Mockup Content Body */}
              <div className="p-4 sm:p-6 bg-bg-base flex-1 overflow-hidden relative">
                
                {/* Dashboard Header */}
                <div className="flex justify-between items-center mb-6">
                   <div className="flex items-center gap-3">
                     <div className="bg-brand text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-sm">Z</div>
                     <div>
                       <h3 className="text-xl font-bold text-text-primary tracking-tight">Good afternoon, Zara ☀️</h3>
                       <p className="text-xs text-text-secondary">Tuesday, October 24</p>
                     </div>
                   </div>
                </div>

                {/* Main Dashboard Layout (Mockup) */}
                <div className="flex flex-col gap-4">
                  {/* Summary Bar */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                     {['4 tasks due', '3 habits today', 'Budget: 61%', 'Goal tracking'].map((label, i) => (
                       <div key={i} className="bg-bg-subtle p-3 rounded-xl border border-border-subtle flex flex-col justify-center shadow-sm">
                         <span className="text-xs text-text-muted font-medium mb-1 line-clamp-1">{['Tasks', 'Habits', 'Budget', 'Goals'][i]}</span>
                         <span className="text-sm text-text-primary font-bold">{label}</span>
                       </div>
                     ))}
                  </div>

                  {/* Split Layout */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    
                    {/* Left Panel */}
                    <div className="flex-1 flex flex-col gap-4">
                      {/* Tasks Card */}
                      <div className="bg-bg-card rounded-xl border border-border-subtle p-4 shadow-sm flex flex-col">
                        <div className="flex justify-between items-center mb-3">
                           <h4 className="text-sm font-bold text-text-primary">Today's Tasks</h4>
                           <span className="text-xs text-brand font-medium">View all</span>
                        </div>
                        <div className="flex flex-col gap-2">
                          {['Review quarterly goals', 'Call doctor for appointment', 'Grocery run', 'Pay electricity bill'].map((task, i) => (
                            <div key={i} className="flex items-center gap-3 p-2 hover:bg-bg-subtle rounded-lg cursor-pointer">
                               {/* Custom Checkbox */}
                               <div className={`h-[18px] w-[18px] rounded-[4px] border border-border-medium flex items-center justify-center ${i === 2 ? 'bg-brand border-brand' : 'bg-transparent'}`}>
                                  {i === 2 && <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                               </div>
                               <span className={`text-[13px] text-text-primary line-clamp-1 ${i === 2 ? 'line-through text-text-muted' : ''}`}>{task}</span>
                               {/* Optional Priority/Badge */}
                               {i === 3 && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Panel */}
                    <div className="flex-1 flex flex-col gap-4">
                       {/* Habits Card */}
                       <div className="bg-bg-card rounded-xl border border-border-subtle p-4 shadow-sm flex flex-col">
                        <div className="flex justify-between items-center mb-3">
                           <h4 className="text-sm font-bold text-text-primary">Habits</h4>
                           <span className="text-xs text-brand font-medium">5/7 Target</span>
                        </div>
                        <div className="flex gap-2.5 justify-between">
                          {/* Habit Rings */}
                          {[1,2,3,4,5].map((ring) => (
                              <div key={ring} className={`relative flex items-center justify-center w-8 h-8 rounded-full border-[2.5px] border-solid 
                                ${ring <= 3 ? (ring === 1 ? 'border-emerald-500 text-emerald-500 bg-emerald-500/10' : ring === 2 ? 'border-blue-500 text-blue-500 bg-blue-500/10' : 'border-violet-500 text-violet-500 bg-violet-500/10') : 'border-border-subtle text-text-muted'}`
                              }>
                                {ring <= 3 ? (
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                                ) : (
                                  <div className="w-[12px] h-[12px]" />
                                )}
                              </div>
                          ))}
                        </div>
                      </div>

                      {/* Budget Mini Card */}
                      <div className="bg-bg-card rounded-xl border border-border-subtle p-4 shadow-sm flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                           <h4 className="text-sm font-bold text-text-primary">Budget Status</h4>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                           <span className="text-[13px] text-text-secondary">PKR 42,000 / 60,000</span>
                           <span className="text-[13px] font-bold text-emerald-500">Good</span>
                        </div>
                        {/* Progress Bar Mock */}
                        <div className="h-1.5 w-full bg-border-subtle rounded-full overflow-hidden">
                           <div className="h-full bg-emerald-500 rounded-full" style={{width: '70%'}} />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Fade Out Edge for mockup */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-bg-base to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
