/* ─── Invitation – Clean standalone JS ─── */
(function () {
  'use strict';

  /* ── Inject toast + spinner styles ── */
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .rsvp-toast {
      position: fixed;
      top: 2rem;
      left: 50%;
      transform: translateX(-50%) translateY(-120%);
      z-index: 10000;
      padding: 1.2rem 2rem;
      border-radius: 1rem;
      font-family: var(--font-serif, Georgia, serif);
      font-size: 1rem;
      line-height: 1.5;
      max-width: 90vw;
      text-align: center;
      box-shadow: 0 10px 40px rgba(0,0,0,0.15);
      transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s;
      opacity: 0;
    }
    .rsvp-toast.visible {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
    .rsvp-toast.success {
      background: linear-gradient(135deg, #f5ecd4, #fff8e7);
      color: #5a3e3b;
      border: 1px solid #d4af37;
    }
    .rsvp-toast.error {
      background: linear-gradient(135deg, #fff0f0, #fff5f5);
      color: #8a4f4c;
      border: 1px solid #e2b4b1;
    }
    .rsvp-spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: rsvpSpin 0.6s linear infinite;
      vertical-align: middle;
    }
    @keyframes rsvpSpin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(styleEl);

  /* ── Toast notification helper ── */
  function showToast(message, type) {
    // Remove existing toast
    const existing = document.querySelector('.rsvp-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'rsvp-toast ' + (type || 'success');
    toast.textContent = message;
    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => toast.classList.add('visible'));
    });

    // Auto dismiss
    const duration = type === 'error' ? 4000 : 5000;
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 400);
    }, duration);
  }

  /* ── Language Toggle (EN ↔ HI) ──────────────────────────────────── */
  const i18n = {
    en: {
      theme_to_light: 'Switch to light theme',
      theme_to_dark: 'Switch to dark theme',
      intro_text:
        'With the blessings of Shri Ganesh and our beloved families, we joyfully invite you to celebrate the union of',
      parent_sub:
        'Daughter of Mrs. Sunita & Mr. Mukesh Kumar Gupta & Son of Mrs. Sneh & Mr. Ashok Kumar',
      parent_groom: 'Son of Mrs. Sneh & Mr. Ashok Kumar',
      parent_bride: 'Daughter of Mrs. Sunita & Mr. Mukesh Kumar Gupta',
      scroll_hint: 'Scroll to see magic',
      save_date: 'Save the Date',
      scratch_desc: 'Scratch below to reveal our wedding date',
      the_date: 'The Date',
      our_story: 'Our Story',
      forever_us: 'Forever Us',
      the_venue: 'The Venue',
      where: 'Where',
      venue_quote:
        'Join us as we celebrate amidst open skies and golden sunsets',
      view_maps: 'VIEW ON MAPS',
      festivities: 'Festivities',
      celebrations_unfold: 'The Celebrations Unfold',
      rsvp_join: 'Join the Celebration',
      rsvp_title: 'RSVP',
      rsvp_desc:
        'Kindly let us know if you can make it — your presence will make this celebration whole.',
      your_details: 'Your details',
      your_name: 'Your name',
      phone_number: 'Phone number',
      will_you_join: 'Will you join us?',
      joyfully_accept: 'Joyfully accept 🎉',
      regrettably_decline: 'Regrettably decline',
      party_size: 'Party size',
      events_attend: "Events you'll attend",
      song_request: 'A song for the dance floor',
      marriage_advice: 'Marriage advice for us',
      send_rsvp: 'Send RSVP',
      contacts_sub: 'Reach Out',
      contacts_title: 'Contact Us',
      groom_side: "Groom's Side",
      bride_side: "Bride's Side",
      groom_father: "Groom's Father",
      groom_brother: "Groom's Brother",
      groom_label: 'Groom',
      bride_father: "Bride's Father",
      bride_brother: "Bride's Brother",
      bride_label: 'Bride',
      footer_msg:
        "Your presence will turn this real-life romance into a blockbuster we'll never forget.<br/><br/>Come, dance, laugh, and celebrate with us in true Bollywood style!",
      warm_regards: 'Warm regards,',
      the_lovely: "The Lovely People's",
      haldi: 'Haldi Ceremony',
      sangeet: 'Sangeet Night',
      wedding: 'Sun Downer Wedding',
      countdown_quote: 'A lifetime of togetherness begins with one sacred step',
      the_wedding: 'The Wedding',
      scratch_month: 'MONTH',
      scratch_day: 'DAY',
      scratch_year: 'YEAR',
      cd_days: 'DAYS',
      cd_hours: 'HOURS',
      cd_mins: 'MINS',
      cd_secs: 'SECS',
      story_1: 'Memories together',
      story_2: 'Written in the stars',
      story_3: 'Joy and laughter',
      story_4: 'Forever Us',
      venue_name: 'Sahib Farms & Resorts',
      tagline_haldi: '"A joyful splash of turmeric, blessings, and laughter."',
      tagline_sangeet: '"An evening of music, dance, and endless celebration."',
      tagline_wedding: '"Vows beneath the setting sun to begin our forever."',
      dress_code: 'Dress code',
      colors_haldi: 'Yellow · Pink · Peach',
      dressnote_haldi: 'Bright & festive daywear',
      colors_sangeet: 'Blue · Black · Dark Green',
      dressnote_sangeet: 'Elegant evening wear',
      colors_wedding: 'Maroon · Ivory · Gold',
      dressnote_wedding: 'Traditional Indian — sarees, lehengas, sherwanis',
      get_directions: 'GET DIRECTIONS',
      song_placeholder: 'e.g. Kala Chashma',
      footer_couple: 'Manisha & Gagan',
      couple_manisha: 'Manisha',
      couple_gagan: 'Gagan',
      couple_amp: '&',
      just_married: 'Just Married',
      married_quote: 'And so, the sweetest chapter begins — happily ever after',
      married_badge: 'Mr. & Mrs.',
      married_date_label: 'Married on 20 · 11 · 2026',
      married_since: 'Together forever since',
      married_days_label: 'DAYS OF FOREVER',
      thank_you_title: 'Thank You',
      thank_you_msg:
        'Your love, blessings and presence made our day truly magical. We are forever grateful.',
    },
    hi: {
      theme_to_light: 'हल्की थीम पर जाएँ',
      theme_to_dark: 'गहरी थीम पर जाएँ',
      intro_text:
        'श्री गणेश जी और अपने परिवारजनों के आशीर्वाद से, हम आपको इस पवित्र बंधन में सम्मिलित होने का हर्षपूर्वक निमंत्रण देते हैं',
      parent_sub:
        'श्रीमती सुनीता एवं श्री मुकेश कुमार गुप्ता की सुपुत्री एवं श्रीमती स्नेह एवं श्री अशोक कुमार के सुपुत्र',      parent_groom: 'श्रीमती स्नेह एवं श्री अशोक कुमार के सुपुत्र',
      parent_bride: 'श्रीमती सुनीता एवं श्री मुकेश कुमार गुप्ता की सुपुत्री',      scroll_hint: 'जादू देखने के लिए स्क्रॉल करें',
      save_date: 'तारीख़ याद रखें',
      scratch_desc: 'शादी की तारीख़ जानने के लिए स्क्रैच करें',
      the_date: 'तारीख़',
      our_story: 'हमारी कहानी',
      forever_us: 'हमेशा साथ',
      the_venue: 'स्थान',
      where: 'कहाँ',
      venue_quote: 'खुले आसमान और सुनहरी शाम में हमारे साथ जश्न मनाएँ',
      view_maps: 'नक्शे पर देखें',
      festivities: 'उत्सव',
      celebrations_unfold: 'जश्न की शुरुआत',
      rsvp_join: 'जश्न में शामिल हों',
      rsvp_title: 'उपस्थिति',
      rsvp_desc:
        'कृपया हमें बताएं कि क्या आप आ सकते हैं — आपकी उपस्थिति इस जश्न को पूरा करेगी।',
      your_details: 'आपकी जानकारी',
      your_name: 'आपका नाम',
      phone_number: 'फ़ोन नंबर',
      will_you_join: 'क्या आप आएंगे?',
      joyfully_accept: 'खुशी से स्वीकार 🎉',
      regrettably_decline: 'खेद सहित अस्वीकार',
      party_size: 'कितने लोग आएंगे',
      events_attend: 'किन कार्यक्रमों में शामिल होंगे',
      song_request: 'डांस फ्लोर के लिए एक गाना',
      marriage_advice: 'हमारे लिए शादी की सलाह',
      send_rsvp: 'भेजें',
      contacts_sub: 'संपर्क करें',
      contacts_title: 'फ़ोन नंबर',
      groom_side: 'वर पक्ष',
      bride_side: 'वधू पक्ष',
      groom_father: 'वर के पिता',
      groom_brother: 'वर का भाई',
      groom_mother: 'वर की माँ',
      groom_sister: 'वर की बहन',
      groom_label: 'दूल्हा',
      bride_father: 'वधू के पिता',
      bride_brother: 'वधू का भाई',
      bride_mother: 'वधू की माँ',
      bride_label: 'दुल्हन',
      footer_msg:
        'आपकी उपस्थिति इस प्रेम कहानी को एक यादगार ब्लॉकबस्टर बना देगी।<br/><br/>आइए, नाचें, हँसें और सच्चे बॉलीवुड अंदाज़ में जश्न मनाएँ!',
      warm_regards: 'शुभकामनाओं सहित,',
      the_lovely: 'प्यारे लोग',
      haldi: 'हल्दी समारोह',
      sangeet: 'संगीत की रात',
      wedding: 'सनडाउनर विवाह',
      countdown_quote: 'एक साथ जीवन भर की शुरुआत एक पवित्र कदम से होती है',
      the_wedding: 'विवाह',
      scratch_month: 'महीना',
      scratch_day: 'दिन',
      scratch_year: 'साल',
      cd_days: 'दिन',
      cd_hours: 'घंटे',
      cd_mins: 'मिनट',
      cd_secs: 'सेकंड',
      story_1: 'साथ की यादें',
      story_2: 'सितारों में लिखा',
      story_3: 'खुशियाँ और हँसी',
      story_4: 'हमेशा साथ',
      venue_name: 'साहिब फार्म्स & रिसॉर्ट्स',
      tagline_haldi: '"हल्दी, आशीर्वाद और हँसी का खुशनुमा रंग।"',
      tagline_sangeet: '"संगीत, नृत्य और अनंत उत्सव की एक शाम।"',
      tagline_wedding: '"डूबते सूरज के नीचे हमेशा साथ रहने का वादा।"',
      dress_code: 'ड्रेस कोड',
      colors_haldi: 'पीला · गुलाबी · पीच',
      dressnote_haldi: 'चमकीले और उत्सवी कपड़े',
      colors_sangeet: 'नीला · काला · गहरा हरा',
      dressnote_sangeet: 'शानदार शाम की पोशाक',
      colors_wedding: 'मैरून · आइवरी · गोल्ड',
      dressnote_wedding: 'पारंपरिक भारतीय — साड़ी, लहंगा, शेरवानी',
      get_directions: 'रास्ता देखें',
      song_placeholder: 'जैसे: काला चश्मा',
      footer_couple: 'मनीषा & गगन',
      couple_manisha: 'मनीषा',
      couple_gagan: 'गगन',
      couple_amp: '&',
      just_married: 'विवाह सम्पन्न',
      married_quote: 'और इस तरह शुरू हुआ एक नया अध्याय — हमेशा के लिए',
      married_badge: 'श्री एवं श्रीमती',
      married_date_label: '20 · 11 · 2026 को विवाह सम्पन्न',
      married_since: 'हमेशा साथ, तब से',
      married_days_label: 'दिन साथ',
      thank_you_title: 'धन्यवाद',
      thank_you_msg:
        'आपके प्रेम, आशीर्वाद और उपस्थिति ने इस दिन को यादगार बना दिया। हम हृदय से आभारी हैं।',
    },
  };

  let currentLang = 'en';

  function updateThemeButton() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const isLight = document.body.classList.contains('light-theme');
    const label = i18n[currentLang][isLight ? 'theme_to_dark' : 'theme_to_light'];
    const icon = isLight
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5 8.5 8.5 0 1 0 20.5 15.2Z"></path></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"></path></svg>';
    themeToggle.innerHTML = icon;
    themeToggle.title = label;
    themeToggle.setAttribute('aria-label', label);
  }

  function applyLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (i18n[lang][key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = i18n[lang][key];
        } else {
          el.innerHTML = i18n[lang][key];
        }
      }
    });
    // Update the toggle button text
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
      langBtn.textContent = lang === 'en' ? 'हिंदी' : 'EN';
      langBtn.title = lang === 'en' ? 'Switch to Hindi' : 'Switch to English';
    }
    updateThemeButton();
  }

  // Keep the language and theme controls together as a compact utility bar.
  const utilityControls = document.createElement('div');
  utilityControls.className = 'utility-controls';
  utilityControls.setAttribute('aria-label', 'Invitation display settings');

  const themeToggle = document.createElement('button');
  themeToggle.id = 'theme-toggle';
  themeToggle.type = 'button';
  themeToggle.className = 'utility-button utility-button--icon';
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    updateThemeButton();
  });
  utilityControls.appendChild(themeToggle);

  // Inject language toggle button
  const langToggle = document.createElement('button');
  langToggle.id = 'lang-toggle';
  langToggle.textContent = 'हिंदी';
  langToggle.title = 'Switch to Hindi';
  langToggle.type = 'button';
  langToggle.className = 'utility-button';
  langToggle.addEventListener('click', () => {
    applyLanguage(currentLang === 'en' ? 'hi' : 'en');
  });
  utilityControls.appendChild(langToggle);
  document.body.appendChild(utilityControls);
  updateThemeButton();

  /* ── Wedding date (used by video-intro skip + countdown) ── */
  const WEDDING_DATE = new Date('2026-11-20T15:00:00+05:30');
  const isMarried = WEDDING_DATE - new Date() <= 0;

  /* ── Video Intro ──────────────────────────────────────────────── */
  const main = document.getElementById('main-content');
  const introVideo = document.getElementById('intro-video');
  const videoIntro = document.getElementById('video-intro');
  const videoOverlay = document.getElementById('video-overlay');
  const flash = document.getElementById('bright-flash');
  const audio = document.getElementById('bg-music');
  const btn = document.querySelector('.btn-micro');
  let playing = false;

  // Post-wedding: skip the intro video entirely and reveal main content.
  if (isMarried) {
    if (videoIntro) videoIntro.style.display = 'none';
    if (main) main.classList.add('visible');
    document.body.classList.remove('no-scroll');
  }

  function endVideoIntro() {
    // Bright flash transition
    if (flash) {
      flash.style.transition = 'opacity 0.3s ease-in';
      flash.style.opacity = '1';
      setTimeout(() => {
        // Hide video intro
        if (videoIntro) videoIntro.style.display = 'none';
        // Show main content
        if (main) main.classList.add('visible');
        document.body.classList.remove('no-scroll');
        // Ensure background music is playing
        if (audio && audio.paused) {
          audio.play().catch(() => {});
          playing = true;
        }
        // Fade flash out
        flash.style.transition = 'opacity 0.6s ease-out';
        flash.style.opacity = '0';
        // Show swipe-up hint after a brief pause
        setTimeout(showScrollHint, 1800);
      }, 300);
    } else {
      if (videoIntro) videoIntro.style.display = 'none';
      if (main) main.classList.add('visible');
      document.body.classList.remove('no-scroll');
      // Show swipe-up hint after a brief pause
      setTimeout(showScrollHint, 1800);
    }
  }

  if (introVideo && videoIntro && !isMarried) {
    // Autoplay muted video immediately (no black screen wait)
    introVideo.muted = true;
    introVideo.play().catch(() => {});
    videoOverlay.classList.add('hidden');

    let videoUnmuted = false;

    videoIntro.addEventListener('click', function handler() {
      if (!videoUnmuted) {
        // First tap → unmute video, start bg music, let video keep playing
        videoUnmuted = true;
        introVideo.muted = false;
        introVideo.currentTime = 0; // restart so they hear from beginning
        introVideo.play().catch(() => {
          introVideo.muted = true;
          introVideo.play().catch(() => {});
        });
        if (audio) {
          audio.play().catch(() => {});
          playing = true;
          if (btn) {
            btn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>';
          }
        }
      } else {
        // Second tap → skip to content
        introVideo.pause();
        endVideoIntro();
        videoIntro.removeEventListener('click', handler);
      }
    });

    // When video naturally ends → transition to content
    introVideo.addEventListener('ended', () => {
      endVideoIntro();
    });
  } else {
    // No video element → show content immediately
    if (main) main.classList.add('visible');
    document.body.classList.remove('no-scroll');
  }

  /* ── Scroll hint overlay (swipe-up gesture) ── */
  function showScrollHint() {
    const hint = document.createElement('div');
    hint.id = 'scroll-hint-overlay';
    hint.innerHTML = `
      <div class="scroll-hint-hand">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 11V6a2 2 0 0 0-4 0v5"/>
          <path d="M14 10V4a2 2 0 0 0-4 0v7"/>
          <path d="M10 10.5V6a2 2 0 0 0-4 0v8"/>
          <path d="M18 11a2 2 0 0 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
        </svg>
      </div>
      <span class="scroll-hint-text">Swipe up for more</span>
      <div class="scroll-hint-arrows">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
      </div>
    `;
    document.body.appendChild(hint);

    // Fade in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { hint.style.opacity = '1'; });
    });

    // Remove on first scroll or tap
    function dismiss() {
      hint.style.opacity = '0';
      setTimeout(() => hint.remove(), 500);
      window.removeEventListener('scroll', dismiss);
      window.removeEventListener('touchstart', dismiss);
    }
    window.addEventListener('scroll', dismiss, { once: true, passive: true });
    window.addEventListener('touchstart', dismiss, { once: true, passive: true });

    // Auto-dismiss after 5s if user hasn't scrolled
    setTimeout(() => {
      if (document.body.contains(hint)) dismiss();
    }, 5000);
  }

  /* ── Music toggle ── */
  if (btn && audio) {
    btn.addEventListener('click', () => {
      if (playing) {
        audio.pause();
        btn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>';
      } else {
        audio.play().catch(() => {});
        btn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>';
      }
      playing = !playing;
    });
  }

  /* ── Countdown timer ── */

  function buildMarriedView(card) {
    if (card.querySelector('.cd-married')) return;
    const married = document.createElement('div');
    married.className = 'cd-married';
    married.innerHTML = `
      <div class="cd-married__badge" data-i18n="married_badge">Mr. &amp; Mrs.</div>
      <div class="cd-married__rings" aria-hidden="true">
        <span class="cd-ring cd-ring--l">💍</span>
        <span class="cd-ring cd-ring--r">💍</span>
      </div>
      <div class="cd-married__title" data-i18n="just_married">Just Married</div>
      <div class="cd-married__date" data-i18n="married_date_label">Married on 20 · 11 · 2026</div>
      <div class="cd-married__since">
        <span class="cd-married__since-label" data-i18n="married_since">Together forever since</span>
        <span class="cd-married__count"><span class="cd-married__num">0</span>
          <span class="cd-married__num-lbl" data-i18n="married_days_label">DAYS OF FOREVER</span>
        </span>
      </div>
      <div class="cd-married__thanks">
        <div class="cd-married__thanks-title" data-i18n="thank_you_title">Thank You</div>
        <p class="cd-married__thanks-msg" data-i18n="thank_you_msg">Your love, blessings and presence made our day truly magical. We are forever grateful.</p>
      </div>
      <div class="cd-married__petals" aria-hidden="true">
        <span>🌸</span><span>🌺</span><span>✨</span><span>🌼</span><span>💐</span>
      </div>
    `;
    card.appendChild(married);
    // Localize any new nodes
    married.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (i18n[currentLang] && i18n[currentLang][key]) {
        el.innerHTML = i18n[currentLang][key];
      }
    });
  }

  function updateCountdown() {
    const now = new Date();
    const diff = WEDDING_DATE - now;
    const card = document.querySelector('.wedding-countdown .cd-card');

    if (diff > 0) {
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);

      const nums = document.querySelectorAll('.cd-num');
      if (nums.length >= 4) {
        nums[0].textContent = days;
        nums[1].textContent = hours;
        nums[2].textContent = String(mins).padStart(2, '0');
        nums[3].textContent = String(secs).padStart(2, '0');
      }
      return;
    }

    // Wedding is here / past → switch to "Just Married" celebration
    if (!card) return;
    card.classList.add('cd-card--married');

    // Hide pre-wedding bits (quote, script, date label, countdown grid)
    const grid = card.querySelector('.cd-grid');
    const quote = card.querySelector('.cd-quote');
    const script = card.querySelector('.cd-script');
    const preDate = card.querySelector('.cd-date');
    [grid, quote, script, preDate].forEach((el) => {
      if (el) el.style.display = 'none';
    });

    // Post-wedding: keep only the married card + "Our Story" section; hide everything else.
    const sectionIdsToHide = [
      'hero',
      'venue-section',
      'events-section',
      'rsvp-section',
      'contacts-section',
      'footer-section',
    ];
    sectionIdsToHide.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    // Hide the pre-wedding "Save the Date" scratch section.
    const scratchSection = document.getElementById('countdown-section');
    if (scratchSection) scratchSection.style.display = 'none';

    buildMarriedView(card);

    // Update elapsed-days counter
    const elapsedDays = Math.max(0, Math.floor(-diff / 86400000));
    const numEl = card.querySelector('.cd-married__num');
    if (numEl) numEl.textContent = elapsedDays;

    // Update the day/days label (singular on day 1, English only)
    const lblEl = card.querySelector('.cd-married__num-lbl');
    if (lblEl && elapsedDays === 1 && currentLang === 'en') {
      lblEl.textContent = 'DAY OF FOREVER';
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ── Scratch cards ── */
  const scratchCanvases = document.querySelectorAll('.scratch-canvas');
  const countdownSection = document.querySelector('.wedding-countdown');
  let completedScratches = 0;

  function revealCountdown() {
    if (!countdownSection || !countdownSection.classList.contains('countdown-hidden')) return;
    countdownSection.classList.remove('countdown-hidden');
    countdownSection.setAttribute('aria-hidden', 'false');
  }

  if (isMarried || scratchCanvases.length === 0) revealCountdown();

  scratchCanvases.forEach((canvas) => {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const w = canvas.width;
    const h = canvas.height;
    let completed = false;

    // Draw rose-themed overlay (matches wedding palette)
    ctx.fillStyle = '#8a4f4c';
    ctx.fillRect(0, 0, w, h);
    // Add a subtle gradient shimmer
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, 'rgba(212,175,55,0.3)');
    grad.addColorStop(0.5, 'rgba(138,79,76,0.1)');
    grad.addColorStop(1, 'rgba(212,175,55,0.3)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#f5ecd4';
    ctx.font = `bold ${Math.max(11, Math.round(Math.min(w, h) * 0.1))}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('SCRATCH', w / 2, h / 2 + 5);
    canvas.style.opacity = '1';
    canvas.style.display = 'block';

    let scratching = false;
    let scratchMoves = 0;

    function scratch(x, y) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, Math.min(w, h) * 0.09, 0, Math.PI * 2);
      ctx.fill();
      scratchMoves++;
      if (scratchMoves % 4 === 0) checkProgress();
    }

    function checkProgress() {
      if (completed) return;
      const data = ctx.getImageData(0, 0, w, h).data;
      let clear = 0;
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] === 0) clear++;
      }
      if (clear / (w * h) > 0.45) {
        completed = true;
        const item = canvas.closest('.scratch-item');
        if (item) item.classList.add('is-scratched');
        canvas.style.opacity = '0';
        setTimeout(() => (canvas.style.display = 'none'), 400);
        completedScratches++;
        if (completedScratches === scratchCanvases.length) revealCountdown();
      }
    }

    function getPos(e) {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches ? e.touches[0] : e;
      return {
        x: ((touch.clientX - rect.left) / rect.width) * w,
        y: ((touch.clientY - rect.top) / rect.height) * h,
      };
    }

    canvas.addEventListener('mousedown', (e) => {
      scratching = true;
      const p = getPos(e);
      scratch(p.x, p.y);
    });
    canvas.addEventListener('mousemove', (e) => {
      if (!scratching) return;
      const p = getPos(e);
      scratch(p.x, p.y);
    });
    canvas.addEventListener('mouseup', () => (scratching = false));
    canvas.addEventListener('mouseleave', () => (scratching = false));

    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      scratching = true;
      const p = getPos(e);
      scratch(p.x, p.y);
    });
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!scratching) return;
      const p = getPos(e);
      scratch(p.x, p.y);
    });
    canvas.addEventListener('touchend', () => (scratching = false));
  });

  /* ── Petal canvas animation ── */
  const petalCanvas = document.getElementById('petals-canvas');
  if (petalCanvas) {
    const pctx = petalCanvas.getContext('2d');
    let petals = [];
    const PETAL_COUNT = 25;

    function resizeCanvas() {
      petalCanvas.width = window.innerWidth;
      petalCanvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function createPetal() {
      return {
        x: Math.random() * petalCanvas.width,
        y: -20,
        size: 6 + Math.random() * 8,
        speedY: 0.6 + Math.random() * 1.2,
        speedX: -0.5 + Math.random() * 1,
        rotation: Math.random() * 360,
        rotSpeed: -1 + Math.random() * 2,
        opacity: 0.4 + Math.random() * 0.5,
        color: ['#f7dcda', '#e2b4b1', '#fce4ec', '#f8bbd0', '#ffcdd2'][
          Math.floor(Math.random() * 5)
        ],
      };
    }

    for (let i = 0; i < PETAL_COUNT; i++) {
      const p = createPetal();
      p.y = Math.random() * petalCanvas.height;
      petals.push(p);
    }

    function drawPetal(p) {
      pctx.save();
      pctx.translate(p.x, p.y);
      pctx.rotate((p.rotation * Math.PI) / 180);
      pctx.globalAlpha = p.opacity;
      pctx.fillStyle = p.color;
      pctx.beginPath();
      pctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2);
      pctx.fill();
      pctx.restore();
    }

    function animatePetals() {
      pctx.clearRect(0, 0, petalCanvas.width, petalCanvas.height);
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y > petalCanvas.height + 20) {
          Object.assign(p, createPetal());
        }
        drawPetal(p);
      });
      requestAnimationFrame(animatePetals);
    }
    animatePetals();
  }

  /* ── Vibrant scroll reveal with staggered animations ── */
  const reveals = document.querySelectorAll(
    '.reveal, .event-block, .venue-card, .cd-card, .evt-details, .scratch-section, .footer-msg'
  );

  // Set initial hidden state with varied transform origins
  reveals.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${(i % 3) * 0.1}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${(i % 3) * 0.1}s`;
    // Alternate directions for visual variety
    if (i % 3 === 0) el.style.transform = 'translateY(60px) scale(0.95)';
    else if (i % 3 === 1) el.style.transform = 'translateX(-30px) translateY(40px)';
    else el.style.transform = 'translateX(30px) translateY(40px)';
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translate(0, 0) scale(1)';
            io.unobserve(e.target); // Only animate once
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  }

  const storyTrack = document.getElementById('story-carousel-track');
  if (storyTrack) {
    const storyButtons = document.querySelectorAll('.story-carousel-btn');
    const updateStoryButtons = () => {
      const maxScroll = storyTrack.scrollWidth - storyTrack.clientWidth;
      const edgeTolerance = 12;
      storyButtons.forEach((button) => {
        button.disabled =
          button.dataset.storyDirection === 'prev'
            ? storyTrack.scrollLeft <= edgeTolerance
            : storyTrack.scrollLeft >= maxScroll - edgeTolerance;
      });
    };

    storyButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const direction = button.dataset.storyDirection === 'next' ? 1 : -1;
        storyTrack.scrollBy({
          left: direction * storyTrack.clientWidth * 0.8,
          behavior: 'smooth',
        });
      });
    });
    storyTrack.addEventListener('scroll', updateStoryButtons, { passive: true });
    window.addEventListener('resize', updateStoryButtons);
    updateStoryButtons();

    /* Auto-advance the story photos, looping back to the first one */
    const storyCards = Array.from(storyTrack.children);
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    let storyTimer = null;
    let storyInView = false;

    const cardOffset = (card) =>
      card.getBoundingClientRect().left -
      storyTrack.getBoundingClientRect().left +
      storyTrack.scrollLeft -
      (storyTrack.clientWidth - card.offsetWidth) / 2;

    const advanceStory = () => {
      const current = storyCards.reduce(
        (best, card, i) =>
          Math.abs(cardOffset(card) - storyTrack.scrollLeft) <
          Math.abs(cardOffset(storyCards[best]) - storyTrack.scrollLeft)
            ? i
            : best,
        0
      );
      const next = (current + 1) % storyCards.length;
      storyTrack.scrollTo({
        left: Math.max(0, cardOffset(storyCards[next])),
        behavior: 'smooth',
      });
    };

    const stopStoryAutoplay = () => {
      clearInterval(storyTimer);
      storyTimer = null;
    };
    const startStoryAutoplay = () => {
      if (reduceMotion || !storyInView || storyTimer) return;
      storyTimer = setInterval(advanceStory, 1500);
    };

    ['mouseenter', 'touchstart', 'focusin', 'pointerdown'].forEach((evt) =>
      storyTrack.parentElement.addEventListener(evt, stopStoryAutoplay, {
        passive: true,
      })
    );
    ['mouseleave', 'touchend', 'focusout'].forEach((evt) =>
      storyTrack.parentElement.addEventListener(evt, startStoryAutoplay, {
        passive: true,
      })
    );

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(
        ([entry]) => {
          storyInView = entry.isIntersecting;
          storyInView ? startStoryAutoplay() : stopStoryAutoplay();
        },
        { threshold: 0.4 }
      ).observe(storyTrack);
    }
  }

  /* ── RSVP form → Google Sheet ─────────────────────────────────────────
   *  Responses are POSTed to a Google Apps Script Web App, which appends
   *  each RSVP as a row in your Google Sheet. The Apps Script code and the
   *  step-by-step setup are in `google-apps-script.gs` in this folder.
   *
   *  ONE-TIME SETUP (summary):
   *  1. Open your Google Sheet → Extensions → Apps Script.
   *  2. Paste the contents of `google-apps-script.gs`, then Save.
   *  3. Deploy → New deployment → type "Web app" →
   *       Execute as: Me   |   Who has access: Anyone
   *     Copy the Web app URL (https://script.google.com/macros/s/…/exec).
   *  4. Paste that URL into SHEET_ENDPOINT below.
   *
   *  Until SHEET_ENDPOINT is filled in, the form still shows the thank-you
   *  message but does not send anything (a warning is logged to the console).
   * ---------------------------------------------------------------------- */
  const SHEET_ENDPOINT =
    'https://script.google.com/macros/s/AKfycbz8OfpI0XLpsgPHVh0TJu-xF7Y8TrusWChrPTfoxYQSptjmguZlpb3O9w6447Q_1hCf/exec';

  const form = document.querySelector('.rsvp-form');
  if (form) {
    /* -- Event cards: toggle the visual tick when a card is clicked -- */
    form.querySelectorAll('.rsvp-event').forEach((box) => {
      const label = box.closest('label');
      const tick = label && label.querySelectorAll(':scope > div')[1];
      const svg = tick && tick.querySelector('svg');
      const paint = () => {
        if (!tick) return;
        tick.style.background = box.checked
          ? 'rgb(138, 79, 76)'
          : 'transparent';
        if (svg) svg.style.opacity = box.checked ? '1' : '0';
      };
      box.addEventListener('change', paint);
      paint();
    });

    const attendingInputs = form.querySelectorAll('input[name="attending"]');
    const paintAttending = () => {
      attendingInputs.forEach((input) => {
        const option = input.closest('.attending-option');
        if (!option) return;
        option.classList.toggle('is-selected', input.checked);
        option.style.backgroundColor = input.checked
          ? 'rgb(255, 249, 248)'
          : 'rgb(255, 255, 255)';
        option.style.borderColor = input.checked
          ? 'rgb(138, 79, 76)'
          : 'rgb(234, 201, 199)';
      });
    };
    attendingInputs.forEach((input) =>
      input.addEventListener('change', paintAttending)
    );
    paintAttending();

    const submitBtn = form.querySelector('button');
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const val = (id) => {
          const el = document.getElementById(id);
          return el ? el.value.trim() : '';
        };

        const name = val('rsvp-name');
        const phoneRaw = val('rsvp-phone');
        const phone = phoneRaw ? '+91' + phoneRaw : '';

        /* -- Validation -- */
        if (!name) {
          showToast('Please enter your name before sending the RSVP.', 'error');
          const el = document.getElementById('rsvp-name');
          if (el) el.focus();
          return;
        }
        if (!phoneRaw || phoneRaw.length < 10) {
          showToast('Please enter a valid 10-digit phone number.', 'error');
          const el = document.getElementById('rsvp-phone');
          if (el) el.focus();
          return;
        }

        const attendingEl = form.querySelector(
          'input[name="attending"]:checked'
        );
        const attending = attendingEl
          ? attendingEl.value === 'yes'
            ? 'Joyfully accept'
            : 'Regrettably decline'
          : '';
        const events = Array.from(
          form.querySelectorAll('.rsvp-event:checked')
        ).map((b) => b.value);

        /* -- Build the payload for the Google Sheet -- */
        const payload = {
          name: name,
          phone: phone,
          attending: attending,
          party: val('rsvp-party'),
          song: val('rsvp-song'),
          events: events.join(', '),
          advice: val('rsvp-advice'),
        };

        const finish = () => {
          showToast(
            "Thank you for your RSVP! 🎉 We can't wait to celebrate with you!",
            'success'
          );
          form.reset();
          // repaint toggles to match the reset (default) state
          form
            .querySelectorAll('.rsvp-event')
            .forEach((b) => b.dispatchEvent(new Event('change')));
          paintAttending();
        };

        const configured =
          typeof SHEET_ENDPOINT === 'string' &&
          SHEET_ENDPOINT.indexOf('script.google.com') !== -1;

        if (configured) {
          // Use a hidden iframe + real HTML form submission.
          // This is the most reliable way to send data to Google Apps
          // Script — avoids all CORS/no-cors/opaque-response issues.
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span class="rsvp-spinner"></span> Sending...';
          submitBtn.style.opacity = '0.7';

          const iframeName = 'rsvp_iframe_' + Date.now();
          const iframe = document.createElement('iframe');
          iframe.name = iframeName;
          iframe.style.display = 'none';
          document.body.appendChild(iframe);

          const hiddenForm = document.createElement('form');
          hiddenForm.method = 'POST';
          hiddenForm.action = SHEET_ENDPOINT;
          hiddenForm.target = iframeName;
          hiddenForm.style.display = 'none';

          Object.keys(payload).forEach((key) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = payload[key];
            hiddenForm.appendChild(input);
          });

          document.body.appendChild(hiddenForm);
          hiddenForm.submit();

          // Clean up and show success after a short delay
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send RSVP';
            submitBtn.style.opacity = '1';
            hiddenForm.remove();
            iframe.remove();
            finish();
          }, 2000);
        } else {
          console.warn(
            'RSVP not sent: set SHEET_ENDPOINT to your Apps Script Web App URL in index.js.'
          );
          finish();
        }
      });
    }
  }

  /* ── Scroll progress bar ── */
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    }, { passive: true });
  }

  /* ── Venue button ── */
  const venueBtn = document.querySelector('.venue-btn');
  if (venueBtn) {
    venueBtn.addEventListener('click', () => {
      window.open('https://maps.app.goo.gl/Paa2zZ3nJZ9rDPaq6', '_blank');
    });
  }
})();
