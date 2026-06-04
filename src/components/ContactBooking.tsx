import React, { useState, useEffect } from 'react';
import { Send, Calendar, Check, Mail, Linkedin, Github } from 'lucide-react';

interface BookedSlot {
  date: string;
  time: string;
  name: string;
  email: string;
  company: string;
}

export default function ContactBooking() {
  // Contact Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'AI Strategy & Advisory',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [formSuccess, setFormSuccess] = useState(false);

  // Calendar States
  const [selectedDateIdx, setSelectedDateIdx] = useState<number>(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [schedulerBooked, setSchedulerBooked] = useState<BookedSlot | null>(null);
  
  // States of target bookings
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingCompany, setBookingCompany] = useState('');
  const [bookingErrors, setBookingErrors] = useState<{ [key: string]: string }>({});

  // Generate next 7 days for the weekly scheduler selector (excluding Sundays)
  const [availableDates, setAvailableDates] = useState<{ dateString: string; formattedDay: string; dayName: string }[]>([]);

  useEffect(() => {
    const dates = [];
    let d = new Date();
    // Start showing from tomorrow to allow advance schedules
    d.setDate(d.getDate() + 1);

    while (dates.length < 7) {
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      // Skip Sundays for business calls
      if (dayName !== 'Sun') {
        const formattedDay = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
        const dateString = d.toISOString().split('T')[0];
        dates.push({
          dateString,
          formattedDay,
          dayName
        });
      }
      d.setDate(d.getDate() + 1);
    }
    setAvailableDates(dates);
  }, []);

  const timeSlots = ['09:00 AM', '10:30 AM', '11:00 AM', '01:30 PM', '03:00 PM', '04:30 PM'];

  // Contact Form Submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!formData.name.trim()) errors.name = 'Full name is required.';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please provide a valid corporate email address.';
    }
    if (!formData.company.trim()) errors.company = 'Company name is required.';
    if (!formData.message.trim()) errors.message = 'Please details your project goals.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setFormSuccess(true);
    // Persist local message indicator
    const submissions = JSON.parse(localStorage.getItem('portfolio_contacts') || '[]');
    submissions.push({ ...formData, timestamp: new Date().toISOString() });
    localStorage.setItem('portfolio_contacts', JSON.stringify(submissions));

    // Clear form state
    setFormData({
      name: '',
      email: '',
      company: '',
      projectType: 'AI Strategy & Advisory',
      message: ''
    });

    setTimeout(() => {
      setFormSuccess(false);
    }, 5000);
  };

  // Calendar Booking Submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!bookingName.trim()) errors.name = 'Full name is required.';
    if (!bookingCompany.trim()) errors.company = 'Company name is required.';
    if (!bookingEmail.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(bookingEmail)) {
      errors.email = 'Provide a valid contact email.';
    }
    if (!selectedTimeSlot) {
      errors.slot = 'Please select a meeting slot.';
    }

    if (Object.keys(errors).length > 0) {
      setBookingErrors(errors);
      return;
    }

    setBookingErrors({});
    const dateSelected = availableDates[selectedDateIdx];
    const newBooking: BookedSlot = {
      date: `${dateSelected.dayName}, ${dateSelected.formattedDay}`,
      time: selectedTimeSlot!,
      name: bookingName,
      email: bookingEmail,
      company: bookingCompany
    };

    setSchedulerBooked(newBooking);
    
    // Save to local storage mock records
    const bookings = JSON.parse(localStorage.getItem('portfolio_bookings') || '[]');
    bookings.push({ ...newBooking, timestamp: new Date().toISOString() });
    localStorage.setItem('portfolio_bookings', JSON.stringify(bookings));

    // Clear calendar setup
    setBookingName('');
    setBookingEmail('');
    setBookingCompany('');
    setSelectedTimeSlot(null);
  };

  return (
    <section id="booking" className="py-20 sm:py-24 border-b border-zinc-200 dark:border-zinc-800 relative">
      
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Narrative contact copy */}
          <div className="lg:col-span-4 flex flex-col gap-6 text-left">
            <div>
              <span className="text-xs font-mono tracking-widest text-teal-600 dark:text-teal-400 font-bold uppercase block mb-1">CONNECT</span>
              <h2 className="text-2xl sm:text-3xl font-sans font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
                Let's work together
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                Have an active system bottleneck, or a design document you'd like audited? Book an exploratory strategy video session or send directly over the secure intake.
              </p>
            </div>

            {/* Direct statement of terms */}
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 bg-white dark:bg-zinc-900/20 space-y-3 shadow-sm">
              <h4 className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-800 pb-2">Guidelines</h4>
              <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400 leading-normal font-normal">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                  <span>I accept contract system architectural reviews & strategic advisory consulting.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                  <span>Typical MVP builds target concrete delivery schedules in fixed 4-week blocks.</span>
                </li>
              </ul>
            </div>

            {/* Direct Digital Coordinates */}
            <div className="border-t border-zinc-200 dark:border-zinc-800/80 pt-5 space-y-3.5">
              <span className="text-[10px] font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase block font-bold">DIGITAL CHANNELS</span>
              <div className="flex flex-col gap-2.5 text-xs text-zinc-600 dark:text-zinc-450">
                <a href="mailto:alex.mercer.solutions@gmail.com" className="flex items-center gap-2 hover:text-teal-600 transition-colors">
                  <Mail className="w-4 h-4 text-zinc-400" />
                  <span>alex.mercer.solutions@gmail.com</span>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-teal-600 transition-colors">
                  <Linkedin className="w-4 h-4 text-zinc-400" />
                  <span>linkedin.com/in/alex-mercer-ai</span>
                </a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-teal-600 transition-colors">
                  <Github className="w-4 h-4 text-zinc-400" />
                  <span>github.com/alex-mercer-systems</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column Grid: Booking Calendar & Contact intake split */}
          <div className="lg:col-span-8 grid md:grid-cols-2 gap-8 items-start pt-4 lg:pt-0">
            
            {/* Sector A: Visual Scheduler Calendar */}
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/15 p-5 shadow-sm flex flex-col gap-5">
              <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 font-mono border-b border-zinc-150 dark:border-zinc-800 pb-2.5 flex items-center gap-2 uppercase tracking-wide">
                <Calendar className="w-4 h-4 text-teal-605" />
                <span>Video Call Scheduler</span>
              </h3>

              {schedulerBooked ? (
                /* Success receipt state */
                <div className="rounded-lg p-5 bg-teal-500/5 dark:bg-teal-950/10 border border-teal-500/25 text-center flex flex-col items-center gap-4 py-8">
                  <div className="w-9 h-9 rounded-full bg-teal-100 dark:bg-teal-900/60 flex items-center justify-center">
                    <Check className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-905 dark:text-zinc-50">Call slots booked</h4>
                    <span className="text-[11px] text-zinc-550 dark:text-zinc-400 leading-snug block mt-1">Check your corporate inbox for coordinates and Google calendar invitations.</span>
                  </div>
                  {/* Summary receipt */}
                  <div className="bg-zinc-50 dark:bg-zinc-950 p-3 rounded-lg border border-zinc-200 dark:border-zinc-850 text-xs font-mono w-full text-left space-y-1 block">
                    <div><span className="text-teal-600 dark:text-teal-400 font-bold">DATE:</span> {schedulerBooked.date.toUpperCase()}</div>
                    <div><span className="text-teal-600 dark:text-teal-400 font-bold">TIME:</span> {schedulerBooked.time}</div>
                    <div><span className="text-teal-600 dark:text-teal-400 font-bold">HOST:</span> ALEX MERCER</div>
                    <div><span className="text-teal-600 dark:text-teal-400 font-bold">MEET:</span> Google Meet link attached</div>
                  </div>
                  
                  <button
                    onClick={() => setSchedulerBooked(null)}
                    className="text-xs text-teal-600 hover:underline cursor-pointer uppercase font-mono font-bold"
                  >
                    Reschedule or change slot
                  </button>
                </div>
              ) : (
                /* Live Booking Interactive Process Form */
                <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
                  
                  {/* Quick-select horizontal calendar scroll */}
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block mb-2 font-bold">Select Date</span>
                    <div className="grid grid-cols-4 gap-1.5 pb-0.5 overflow-x-auto scrollbar-none">
                      {availableDates.slice(0, 4).map((dateObj, idx) => (
                        <button
                          type="button"
                          key={dateObj.dateString}
                          onClick={() => {
                            setSelectedDateIdx(idx);
                            setSelectedTimeSlot(null);
                          }}
                          className={`p-2 rounded-md border flex flex-col items-center text-center transition-colors cursor-pointer text-xs ${
                            selectedDateIdx === idx
                              ? 'bg-teal-600 border-teal-600 text-white dark:bg-teal-500 dark:border-teal-400 dark:text-zinc-950 font-bold'
                              : 'bg-zinc-50 dark:bg-zinc-90 w-auto border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-450 hover:bg-teal-50 dark:hover:bg-teal-950/20'
                          }`}
                        >
                          <span className="text-[10px] uppercase font-mono font-medium block">{dateObj.dayName}</span>
                          <span className="text-[11px] mt-0.5 block">{dateObj.formattedDay}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time slots list */}
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block mb-2 font-bold">Select Time (Pacific/UTC)</span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {timeSlots.slice(0, 6).map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-2 px-1 rounded-md border text-[10px] font-mono text-center transition-colors cursor-pointer ${
                            selectedTimeSlot === slot
                              ? 'bg-teal-600 border-teal-600 text-white dark:bg-teal-500 dark:border-teal-400 dark:text-zinc-950 font-bold'
                              : 'bg-zinc-50 dark:bg-zinc-90 w-auto border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400 hover:bg-teal-5o'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                    {bookingErrors.slot && (
                      <span className="text-[10px] font-mono text-red-500 block mt-1 px-1 font-bold">{bookingErrors.slot}</span>
                    )}
                  </div>

                  {/* Booking metadata fields */}
                  <div className="space-y-3.5 pt-3.5 border-t border-zinc-150 dark:border-zinc-800">
                    <div>
                      <input
                        type="text"
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                        placeholder="Full name"
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 rounded-lg p-2 px-3 text-xs text-zinc-900 dark:text-white placeholder-zinc-400"
                      />
                      {bookingErrors.name && (
                        <span className="text-[10px] font-mono text-red-500 block mt-0.5 px-1 font-bold">{bookingErrors.name}</span>
                      )}
                    </div>
                    <div>
                      <input
                        type="email"
                        value={bookingEmail}
                        onChange={(e) => setBookingEmail(e.target.value)}
                        placeholder="Corporate email"
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 rounded-lg p-2 px-3 text-xs text-zinc-900 dark:text-white placeholder-zinc-400"
                      />
                      {bookingErrors.email && (
                        <span className="text-[10px] font-mono text-red-500 block mt-0.5 px-1 font-bold">{bookingErrors.email}</span>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        value={bookingCompany}
                        onChange={(e) => setBookingCompany(e.target.value)}
                        placeholder="Company & team name"
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 rounded-lg p-2 px-3 text-xs text-zinc-900 dark:text-white placeholder-zinc-400"
                      />
                      {bookingErrors.company && (
                        <span className="text-[10px] font-mono text-red-500 block mt-0.5 px-1 font-bold">{bookingErrors.company}</span>
                      )}
                    </div>
                  </div>

                  {/* Booking submit button */}
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 dark:bg-teal-555 dark:hover:bg-teal-600 text-white dark:text-zinc-950 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                  >
                    Schedule call
                  </button>
                </form>
              )}
            </div>

            {/* Sector B: Feasibility Intake Contact Form */}
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/15 p-5 shadow-sm flex flex-col gap-4">
              <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 font-mono border-b border-zinc-150 dark:border-zinc-800 pb-2.5 flex items-center gap-2 uppercase tracking-wide">
                <Send className="w-4 h-4 text-teal-605" />
                <span>Project Intake Form</span>
              </h3>

              {formSuccess ? (
                <div className="rounded-lg p-5 bg-teal-500/5 dark:bg-teal-950/10 border border-teal-500/20 text-center flex flex-col items-center gap-3 py-10">
                  <Check className="w-8 h-8 text-teal-600 dark:text-teal-400 font-bold bg-teal-50 dark:bg-teal-900 p-1 rounded-full shrink-0" />
                  <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Intake Complete</span>
                  <p className="text-xs text-zinc-505 dark:text-zinc-400 leading-relaxed font-normal">Alex Mercer has received your objectives. Feasibility outlines and scoping notes will be sent to your email inside 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-3.5 text-left">
                  {/* Name field */}
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-550 mb-1 block font-bold">1. Full Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 rounded-lg p-2 px-3 text-xs text-zinc-900 dark:text-white placeholder-zinc-400"
                    />
                    {formErrors.name && (
                      <span className="text-[10px] font-mono text-red-500 mt-1 block font-bold">{formErrors.name}</span>
                    )}
                  </div>

                  {/* Email & company grid */}
                  <div className="grid gap-3.5">
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-550 mb-1 block font-bold">2. Corporate Email</label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@company.com"
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 rounded-lg p-2 px-3 text-xs text-zinc-900 dark:text-white placeholder-zinc-400"
                      />
                      {formErrors.email && (
                        <span className="text-[10px] font-mono text-red-500 mt-1 block font-bold">{formErrors.email}</span>
                      )}
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-550 mb-1 block font-bold">3. Company / Organization</label>
                      <input
                        id="contact-company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Chevron Global / Product Ltd"
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 rounded-lg p-2 px-3 text-xs text-zinc-900 dark:text-white placeholder-zinc-400"
                      />
                      {formErrors.company && (
                        <span className="text-[10px] font-mono text-red-500 mt-1 block font-bold">{formErrors.company}</span>
                      )}
                    </div>
                  </div>

                  {/* Project selection */}
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-550 mb-1 block font-bold">4. Scope Category</label>
                    <select
                      id="contact-project-type"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-840 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 rounded-lg p-2.5 text-xs text-zinc-700 dark:text-zinc-300 font-medium"
                    >
                      <option>AI Strategy & Feasibility Advisory</option>
                      <option>Intelligent Workflow Automation</option>
                      <option>Custom Full-Stack AI Software</option>
                      <option>AI Prototyping & MVPs (4 weeks)</option>
                      <option>System Architecture Engineering</option>
                    </select>
                  </div>

                  {/* Message details */}
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-550 mb-1 block font-bold">5. Objectives & Obstacles</label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify your timelines, systems, API counts..."
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 rounded-lg p-2 px-3 text-xs text-zinc-900 dark:text-white placeholder-zinc-400"
                    />
                    {formErrors.message && (
                      <span className="text-[10px] font-mono text-red-500 mt-1 block font-bold">{formErrors.message}</span>
                    )}
                  </div>

                  {/* Submit button */}
                  <button
                    id="contact-submit"
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 dark:bg-teal-555 dark:hover:bg-teal-600 text-white dark:text-zinc-950 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                  >
                    Submit Intake
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
