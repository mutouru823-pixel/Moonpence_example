import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';

export default function SetupPage({ onEnter }: { onEnter: () => void }) {
  const { setApiKey, setBaseUrl, setModelName } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLocalCaching, setIsLocalCaching] = useState(true);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [formValues, setFormValues] = useState({
    apiKey: '',
    baseUrl: '',
    modelName: ''
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.005;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.005;
      setParallax({ x: moveX, y: moveY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save values to context
    setApiKey(formValues.apiKey);
    setBaseUrl(formValues.baseUrl);
    setModelName(formValues.modelName);

    // Simulate transition
    setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        onEnter();
      }, 800);
    }, 1200);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen relative overflow-x-hidden selection:bg-primary-fixed transition-opacity duration-700 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
    >
      <div 
        className="fixed inset-0 paper-texture z-0" 
        style={{ transform: `translate(${parallax.x}px, ${parallax.y}px)` }}
      />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-container-margin py-stack-lg max-w-[1200px] mx-auto">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-stack-lg"
        >
          <div className="mb-unit flex justify-center">
            <span className="material-symbols-outlined text-[40px] text-primary">ink_pen</span>
          </div>
          <h1 className="text-headline-lg-mobile md:text-display-lg text-primary tracking-tight mb-stack-sm font-display-lg">
            Moonpence
          </h1>
          <p className="text-title-md text-secondary tracking-wide italic font-title-md">
            开启您的文学实验室
          </p>
        </motion.header>

        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="w-full max-w-[440px] bg-white border border-outline-variant/30 rounded-xl p-stack-md md:p-stack-lg ink-wash-shadow"
        >
          <form onSubmit={handleSubmit} className="space-y-stack-md">
            
            <div className="space-y-unit">
              <label htmlFor="api_key" className="text-label-md text-secondary uppercase block">
                API Key
              </label>
              <div className="relative group">
                <input
                  id="api_key"
                  type={showPassword ? "text" : "password"}
                  name="apiKey"
                  placeholder="sk-••••••••••••••••"
                  value={formValues.apiKey}
                  onChange={handleInputChange}
                  className="w-full py-stack-sm text-body-md input-underline placeholder:text-outline-variant/60 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
            </div>

            <div className="space-y-unit">
              <label htmlFor="base_url" className="text-label-md text-secondary uppercase block">
                Base URL
              </label>
              <div className="relative">
                <input
                  id="base_url"
                  type="url"
                  name="baseUrl"
                  placeholder="https://api.openai.com/v1"
                  value={formValues.baseUrl}
                  onChange={handleInputChange}
                  className="w-full py-stack-sm text-body-md input-underline placeholder:text-outline-variant/60"
                />
              </div>
            </div>

            <div className="space-y-unit">
              <label htmlFor="model_name" className="text-label-md text-secondary uppercase block">
                Model Name
              </label>
              <div className="relative">
                <input
                  id="model_name"
                  type="text"
                  name="modelName"
                  placeholder="gpt-3.5-turbo"
                  value={formValues.modelName}
                  onChange={handleInputChange}
                  className="w-full py-stack-sm text-body-md input-underline placeholder:text-outline-variant/60"
                />
              </div>
            </div>

            <div className="flex items-center justify-between py-stack-sm border-b border-outline-variant/10">
              <div>
                <h3 className="text-label-md text-on-surface">本地缓存 (Local Caching)</h3>
                <p className="text-[12px] text-secondary leading-tight opacity-70 mt-1">加快后续访问速度，保护您的创作隐私</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={isLocalCaching}
                  onChange={(e) => setIsLocalCaching(e.target.checked)}
                />
                <div className={`w-11 h-6 rounded-full transition-colors ${isLocalCaching ? 'bg-primary' : 'bg-surface-container-high'}`}></div>
                <div className={`absolute left-[2px] top-[2px] bg-white w-5 h-5 rounded-full shadow-sm transition-transform ${isLocalCaching ? 'translate-x-full' : ''}`}></div>
              </label>
            </div>

            <div className="flex items-center justify-center py-stack-sm opacity-20">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              <span className="material-symbols-outlined text-sm mx-unit">auto_stories</span>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-primary to-transparent"></div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white text-label-md py-stack-sm rounded-lg hover:bg-inverse-surface transition-all duration-300 transform active:scale-[0.98] ink-wash-shadow flex items-center justify-center gap-unit group disabled:opacity-80 rounded-[0.5rem]"
            >
              {isSubmitting ? (
                <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
              ) : (
                <>
                  <span>进入文学世界</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
                </>
              )}
            </button>
          </form>
        </motion.section>

        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-stack-lg text-center max-w-[600px]"
        >
          <div className="grid grid-cols-3 gap-stack-md opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="flex flex-col items-center">
              <div className="w-12 h-16 bg-surface-container-low border border-outline-variant/20 rounded-[0.25rem] mb-unit overflow-hidden">
                <img 
                  className="w-full h-full object-cover" 
                  alt="A vintage, minimalist book cover lying flat on a textured ivory surface." 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0pZO4OqjuLmmIH_eA8NkqPyJVH2PkUr309PXeKBzjsH-Mzeg4Motlwbj34WXcCbk-puLQ2iC2Gu-FEvYQ5LOeu4-1S2dkL3k1Ab1a9QN-w7DV0ZxAdtgxbNSfx1XGfTm8ipngcMteaTqrbuhfQbzQC63ytAGhpwqJiaW8qM0YW33dmwQt38x4ititF-GXvHK-clrYW-Bk9fcPn1kcsYCm_d6y8M_6MwXo52-Dz-AeUTKYRXBxa9BVve17kOjYE-wLAt0XLebEirt_G-Xrk"
                />
              </div>
            </div>
            
            <div className="flex flex-col items-center translate-y-unit">
              <div className="w-12 h-16 bg-surface-container-low border border-outline-variant/20 rounded-[0.25rem] mb-unit overflow-hidden">
                <img 
                  className="w-full h-full object-cover" 
                  alt="A macro shot of a fountain pen nib resting against high-quality cotton paper." 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdWvtSV-6nBHey0lGSwm04EiHYBaoAJxIRbIhA5tAXNWDoM8gNgmNwVbnspCa8j7vqH9gVtap9WrYNW4ODhUOsfY_5WMvfmO68V29JyfYOQZ6FylNm7TRSyufhoch1JSQi9CTlFNlDLmizopTIEZTKFV7PTejjzd9e8whJtnXYNGIXivDNOmWmuDj5iBUhGUyqMt4QCcp2F0g75x1-KBlSP6XGeZRGIQ9t-2BrRDpN3smcrA_b5t5YW0DoJS_1yTy55bSLPSAz3ZI"
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-16 bg-surface-container-low border border-outline-variant/20 rounded-[0.25rem] mb-unit overflow-hidden">
                <img 
                  className="w-full h-full object-cover" 
                  alt="A sparse, clean study desk featuring a single small plant." 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7U9zvV5Sv4vWeAzwK7UA-KiDw-vvU-b0VEruLX_nS3VaXf752jBsPTSwAmfRq8RsvcmrmcdsfZwWAGI6Z5Qu8AOzPY9ukK_dKa9PNE0OgJSbOVCxUvlmTjqT9jUQuXAcct3CUleTQGn4keI5wkmk-JJcD6PvfewWGfigNM3NQB8I6dptR1yuE8nZoUmYSYD_bYBZEC41YTbksqQLH8kiGx5sm3l7W8N9cABXmuky6VPzl1Q2GAkRDpGkqSuO6BMP9Vz-hLGIGbus"
                />
              </div>
            </div>
          </div>
          
          <p className="text-body-md text-[14px] text-secondary mt-stack-md opacity-60">
            "文学是灯，照亮通往实验室的小径。"
          </p>
        </motion.footer>
      </main>
    </motion.div>
  );
}
