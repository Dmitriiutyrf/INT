import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, useMotionValue } from 'motion/react';
import { 
  ShieldCheck, 
  Zap, 
  Activity, 
  ArrowUpRight, 
  ChevronDown, 
  Play, 
  Check, 
  Plus, 
  Minus,
  Globe,
  Layers,
  Cpu,
  Fingerprint,
  Mail,
  Twitter,
  Github,
  Linkedin,
  Menu,
  X
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Data ---

const REQUISITES = {
  name: "ООО «ИНТЕКС-СБ»",
  fullName: "ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ \"ИНТЕКС-СБ\"",
  inn: "2466303170",
  kpp: "246601001",
  ogrn: "1252400014657",
  bank: "ООО «Точка Банк»",
  account: "40702810420000220210",
  bik: "044525104",
  corrAccount: "30101810745374525104",
  address: "660020, КРАСНОЯРСКИЙ КРАЙ, Г.О. ГОРОД КРАСНОЯРСК, Г КРАСНОЯРСК, УЛ ПЕТРА ПОДЗОЛКОВА, Д. 3И, КВ. 324",
  workAddress: "Красноярский край, г.Красноярск, ул.Весны, д.17, пом.302",
  email: "Ohrana.krs@mail.ru",
  license: "Л014-00101-24/02712520",
  licenseDate: "22.07.2025",
  licensingAuthority: "ГУ МЧС России по Красноярскому краю",
  licenseOrder: "№1510 от 22.07.2025"
};

const LICENSE_ACTIVITIES = [
  "Монтаж, техническое обслуживание и ремонт систем пожаротушения и их элементов, включая диспетчеризацию и проведение пусконаладочных работ",
  "Монтаж, техническое обслуживание и ремонт систем пожарной и охранно-пожарной сигнализации и их элементов, включая диспетчеризацию и проведение пусконаладочных работ",
  "Монтаж, техническое обслуживание и ремонт систем противопожарного водоснабжения и их элементов, включая диспетчеризацию и проведение пусконаладочных работ",
  "Монтаж, техническое обслуживание и ремонт автоматических систем (элементов автоматических систем) противодымной вентиляции, включая диспетчеризацию и проведение пусконаладочных работ",
  "Монтаж, техническое обслуживание и ремонт противопожарных занавесов и завес, включая диспетчеризацию и проведение пусконаладочных работ",
  "Монтаж, техническое обслуживание и ремонт заполнений проемов в противопожарных преградах",
  "Выполнение работ по огнезащите материалов, изделий и конструкций",
  "Монтаж, техническое обслуживание и ремонт систем оповещения и эвакуации при пожаре и их элементов, включая диспетчеризацию и проведение пусконаладочных работ, в том числе фотолюминесцентных эвакуационных систем и их элементов",
  "Монтаж, техническое обслуживание и ремонт автоматических систем (элементов автоматических систем) передачи извещений о пожаре, включая диспетчеризацию и проведение пусконаладочных работ"
];

const LOGOS = [
  { name: "MyAlarm", icon: <ShieldCheck className="w-5 h-5" /> },
  { name: "Стрелец", icon: <Zap className="w-5 h-5" /> },
  { name: "Bolid", icon: <Cpu className="w-5 h-5" /> },
  { name: "Rubezh", icon: <Layers className="w-5 h-5" /> },
  { name: "C.N.ORD", icon: <Fingerprint className="w-5 h-5" /> },
  { name: "Hikvision", icon: <Globe className="w-5 h-5" /> },
  { name: "Dahua", icon: <Globe className="w-5 h-5" /> },
  { name: "Ajax", icon: <Zap className="w-5 h-5" /> },
  { name: "Smartec", icon: <Cpu className="w-5 h-5" /> },
];

const FAQS = [
  {
    question: "Какие системы безопасности вы проектируете?",
    answer: "Мы специализируемся на комплексных решениях: автоматическая пожарная сигнализация (АПС), системы оповещения (СОУЭ), автоматическое пожаротушение, видеонаблюдение с аналитикой и системы контроля доступа (СКУД)."
  },
  {
    question: "Есть ли у вас лицензия МЧС?",
    answer: `Да, ООО «ИНТЕКС-СБ» работает на основании действующей лицензии МЧС № ${REQUISITES.license}. Мы имеем право на проектирование, монтаж и обслуживание всех систем противопожарной защиты.`
  },
  {
    question: "Работаете ли вы с объектами в других регионах?",
    answer: "Наш основной офис находится в Красноярске, но мы имеем опыт реализации проектов федерального масштаба и готовы рассматривать объекты по всей территории РФ."
  },
  {
    question: "Можно ли управлять системой со смартфона?",
    answer: "Да, это одно из наших ключевых преимуществ. Мы интегрируем системы MyAlarm и Стрелец-ПРО, что позволяет вам полностью контролировать объект через мобильное приложение: получать уведомления, просматривать видео и управлять доступом."
  },
  {
    question: "Как быстро вы выезжаете на объект?",
    answer: "В случае аварийной ситуации или неисправности систем, наша бригада выезжает в течение 2-4 часов в зависимости от удаленности объекта."
  }
];

const CHART_DATA = [
  { name: '00:00', value: 12 },
  { name: '04:00', value: 8 },
  { name: '08:00', value: 45 },
  { name: '12:00', value: 82 },
  { name: '16:00', value: 64 },
  { name: '20:00', value: 38 },
  { name: '23:59', value: 15 },
];

// --- Components ---

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-accent z-[100] origin-left"
      style={{ scaleX }}
    />
  );
};

const Reveal = ({ 
  children, 
  width = "fit-content", 
  delay = 0,
  direction = "up",
  distance = 50,
  className
}: { 
  children: React.ReactNode, 
  width?: "fit-content" | "100%", 
  delay?: number,
  direction?: "up" | "down" | "left" | "right",
  distance?: number,
  className?: string,
  key?: any
}) => {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  return (
    <div className={cn("relative overflow-hidden", width === "100%" ? "w-full" : "w-fit", className)}>
      <motion.div
        variants={{
          hidden: { opacity: 0, ...directions[direction] },
          visible: { opacity: 1, x: 0, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          duration: 1.2, 
          delay,
          ease: [0.22, 1, 0.36, 1] 
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const TextReveal = ({ text, className }: { text: string, className?: string }) => {
  const words = text.split(" ");
  
  return (
    <div className={cn("flex flex-wrap gap-x-[0.2em]", className)}>
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden">
          <motion.span
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.5, 
              delay: i * 0.05,
              ease: [0.21, 0.47, 0.32, 0.98]
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </div>
      ))}
    </div>
  );
};

const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

const StaggerContainer = ({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

const StaggerItem = ({ children, direction = "up" }: { children: React.ReactNode, direction?: "up" | "down" | "left" | "right", key?: any }) => {
  const directions = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, ...directions[direction] },
        visible: { opacity: 1, x: 0, y: 0 }
      }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
};
const Counter = ({ value, duration = 2 }: { value: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const totalMiliseconds = duration * 1000;
      const incrementTime = totalMiliseconds / end;

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
};

const ParallaxImage = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={cn("overflow-hidden relative", className)}>
      <motion.img
        src={src}
        alt={alt}
        style={{ scale: 1.2, y }}
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const smoothY = useSpring(scrollY, {
    damping: 30,
    stiffness: 70,
    mass: 1,
    restDelta: 0.001
  });

  const y = useTransform(smoothY, (value) => -value);

  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [children]);

  return (
    <>
      <div style={{ height: contentHeight }} />
      <motion.div
        ref={contentRef}
        style={{ y }}
        className="fixed top-0 left-0 w-full flex flex-col"
      >
        {children}
      </motion.div>
    </>
  );
};

const ScrollIndicator = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      className="absolute bottom-10 right-6 lg:right-12 flex flex-col items-center gap-2"
    >
      <span className="text-[10px] font-mono text-muted uppercase tracking-widest">Листайте вниз</span>
      <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent relative overflow-hidden">
        <motion.div 
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-full bg-white"
        />
      </div>
    </motion.div>
  );
};
const FloatingShapes = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div 
        style={{ y: y1, rotate: rotate1 }}
        className="absolute top-[15%] left-[5%] w-80 h-80 bg-accent/5 blur-[120px] rounded-full"
      />
      <motion.div 
        style={{ y: y2, rotate: rotate2 }}
        className="absolute top-[50%] right-[2%] w-[500px] h-[500px] bg-accent/10 blur-[150px] rounded-full"
      />
      <motion.div 
        style={{ y: y3 }}
        className="absolute bottom-[10%] left-[20%] w-64 h-64 bg-accent/5 blur-[100px] rounded-full"
      />
      <div className="absolute inset-0 opacity-[0.15] [background-image:radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:60px_60px]" />
    </div>
  );
};

const DotMap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const dots: { x: number, y: number, size: number, active: boolean, pulse: number, speed: number }[] = [];
    const cols = 50;
    const rows = 25;

    const initDots = () => {
      dots.length = 0;
      const w = canvas.width;
      const h = canvas.height;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            x: (i / cols) * w + (Math.random() * 10 - 5),
            y: (j / rows) * h + (Math.random() * 10 - 5),
            size: 1,
            active: Math.random() > 0.96,
            pulse: Math.random() * Math.PI * 2,
            speed: 0.02 + Math.random() * 0.03
          });
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(dot => {
        if (dot.active) {
          dot.pulse += dot.speed;
          const scale = 1 + Math.sin(dot.pulse) * 0.8;
          const opacity = 0.4 + Math.sin(dot.pulse) * 0.3;
          
          const gradient = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, 15 * scale);
          gradient.addColorStop(0, `rgba(0, 255, 102, ${opacity})`);
          gradient.addColorStop(0.5, `rgba(0, 255, 102, ${opacity * 0.2})`);
          gradient.addColorStop(1, 'rgba(0, 255, 102, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 15 * scale, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(0, 255, 102, ${opacity + 0.2})`;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 2 * scale, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initDots();
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

const Navbar = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-6 lg:px-12 py-4",
      isScrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-black text-black group-hover:rotate-12 transition-transform">I</div>
            <span className="text-xl font-bold tracking-tighter">ИНТЕКС-СБ</span>
          </a>
          
          <div className="hidden lg:flex items-center gap-6">
            {['Услуги', 'Экспертиза', 'Проекты', 'Реквизиты', 'Контакты'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-muted hover:text-white transition-colors flex flex-col items-center group relative py-2">
                {item}
                <motion.div 
                  className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-300"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:+79131991000" className="text-sm font-medium hover:text-accent transition-colors">+7 913 199 10 00</a>
          <button onClick={onOpenModal} className="btn-primary py-2 text-sm">Позвонить менеджеру</button>
        </div>

        <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black border-b border-white/5 p-6 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {['Услуги', 'Экспертиза', 'Проекты', 'Реквизиты', 'Контакты'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">{item}</a>
              ))}
              <hr className="border-white/5" />
              <button onClick={() => { onOpenModal(); setMobileMenuOpen(false); }} className="btn-primary justify-center">Позвонить менеджеру</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};


const CopyItem = ({ label, value }: { label: string, value: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="group flex items-center justify-between py-4 border-b border-white/5 hover:bg-white/[0.02] transition-all px-4 -mx-4 rounded-xl">
      <div>
        <div className="text-[9px] font-mono text-muted uppercase mb-1 tracking-widest">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
      <button onClick={copy} className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {copied ? <Check className="w-4 h-4 text-accent" /> : <ShieldCheck className="w-4 h-4 text-muted hover:text-accent transition-colors" />}
      </button>
    </div>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-medium group-hover:text-accent transition-colors">{question}</span>
        {isOpen ? <Minus className="w-5 h-5 text-accent" /> : <Plus className="w-5 h-5 text-muted group-hover:text-accent" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-muted leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MobilePhoneMockup = () => {
  const [isArmed, setIsArmed] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, time: "12:30", title: "Тест АПС пройден", desc: "Система в норме", type: "success" },
    { id: 2, time: "11:15", title: "Обновление СКУД", desc: "База синхронизирована", type: "info" },
    { id: 3, time: "09:00", title: "ТО завершено", desc: "Инженер: Иванов А.В.", type: "info" }
  ]);
  const [sosActive, setSosActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const titles = ["Движение: Сектор 4", "Дверь: Склад", "Камера: Парковка", "Датчик: Окно"];
      const descs = ["Обнаружен объект", "Доступ разрешен", "Запись начата", "Статус: ОК"];
      const types = ["warning", "info", "success", "info"];
      const randomIndex = Math.floor(Math.random() * titles.length);

      const newNotif = {
        id: Date.now(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        title: titles[randomIndex],
        desc: descs[randomIndex],
        type: types[randomIndex]
      };
      setNotifications(prev => [newNotif, ...prev.slice(0, 2)]);
    }, 5000); // Increased interval for better performance
    return () => clearInterval(interval);
  }, []);

  const handleSos = () => {
    setSosActive(true);
    setTimeout(() => setSosActive(false), 3000);
  };

  return (
    <div className="relative mx-auto max-w-[300px] perspective-1000">
      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative z-10"
      >
        <div className="absolute inset-0 bg-accent/10 blur-[120px] rounded-full" />
        
        {/* Mock Phone */}
        <div className={cn(
          "relative z-10 border-[10px] border-zinc-900 rounded-[3.5rem] aspect-[9/19] bg-zinc-950 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-700",
          sosActive ? "border-red-600 shadow-[0_0_80px_rgba(220,38,38,0.4)] scale-[1.02]" : "border-zinc-900"
        )}>
          {/* Broadcasting Waves */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 2.5, opacity: [0, 0.05, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 2, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-accent/10 rounded-full"
              />
            ))}
          </div>

          {/* Scanning Line */}
          <motion.div 
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[1px] bg-accent/20 z-40 pointer-events-none shadow-[0_0_10px_rgba(0,255,102,0.3)]"
          />

          {/* SOS Flash Overlay */}
          <AnimatePresence>
            {sosActive && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.5, 1, 0] }}
                transition={{ duration: 0.5, repeat: 5 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-red-600/30 z-30 pointer-events-none"
              />
            )}
          </AnimatePresence>

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-zinc-900 rounded-b-3xl z-50" />
          
          <div className="p-7 pt-14 space-y-8 relative z-10">
            <div className="flex items-center justify-between">
              <motion.div 
                animate={isArmed ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg",
                  isArmed ? "bg-accent/20 text-accent shadow-accent/10" : "bg-white/5 text-muted"
                )}
              >
                <ShieldCheck className="w-6 h-6" />
              </motion.div>
              <div className="text-right">
                <div className="text-[10px] text-muted uppercase tracking-[0.2em] mb-1">Security Center Live</div>
                <div className={cn(
                  "text-xs font-black transition-colors duration-500 flex items-center justify-end gap-2",
                  isArmed ? "text-accent" : "text-muted"
                )}>
                  {isArmed && <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />}
                  {isArmed ? "ОХРАНА: ВКЛ" : "ОХРАНА: ВЫКЛ"}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-[10px] text-muted uppercase tracking-widest font-bold">События</div>
                <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  <span className="text-[8px] font-mono text-red-500 uppercase font-bold">Live</span>
                </div>
              </div>
              
              <div className="space-y-3 h-[240px] overflow-hidden">
                <AnimatePresence initial={false} mode="popLayout">
                  {notifications.map((n) => (
                    <motion.div 
                      key={n.id}
                      layout
                      initial={{ x: -30, opacity: 0, scale: 0.9 }}
                      animate={{ x: 0, opacity: 1, scale: 1 }}
                      exit={{ x: 30, opacity: 0, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-[10px] backdrop-blur-sm"
                    >
                      <div className={cn(
                        "mb-1.5 flex justify-between font-bold",
                        n.type === "warning" ? "text-orange-400" : n.type === "success" ? "text-accent" : "text-white"
                      )}>
                        <span>{n.time} • {n.title}</span>
                      </div>
                      <div className="text-muted/80 leading-relaxed">{n.desc}</div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsArmed(!isArmed)}
                className={cn(
                  "p-4 rounded-2xl text-center text-[10px] font-black cursor-pointer transition-all duration-500 shadow-xl",
                  isArmed ? "bg-white/5 text-white border border-white/10" : "bg-accent text-black shadow-accent/20"
                )}
              >
                {isArmed ? "СНЯТЬ" : "ПОСТАВИТЬ"}
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSos}
                className="p-4 rounded-2xl bg-red-600/10 text-red-500 border border-red-600/20 text-center text-[10px] font-black cursor-pointer hover:bg-red-600 hover:text-white transition-all shadow-xl"
              >
                SOS
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  
  const springConfig = { damping: 30, stiffness: 120, mass: 0.8 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, select, textarea, .cursor-pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering ? 'rgba(0, 255, 102, 0.1)' : 'transparent',
      }}
      transition={{ duration: 0.2 }}
    >
      <motion.div 
        className="w-1 h-1 bg-accent rounded-full"
        animate={{
          scale: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-950 border border-white/10 p-8 rounded-2xl w-full max-w-md relative overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-muted hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Заявка отправлена</h3>
                <p className="text-muted">Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-2">Оставить заявку</h3>
                <p className="text-muted mb-8 text-sm">Оставьте свои контакты, и наш специалист свяжется с вами для консультации.</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">Имя</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                      placeholder="Иван Иванов"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">Телефон</label>
                    <input 
                      required
                      type="tel" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                      placeholder="+7 (999) 000-00-00"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center mt-4">
                    Отправить заявку <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-muted text-center mt-4">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setEmailSent(true);
      setEmail('');
      setTimeout(() => setEmailSent(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-ink selection:bg-accent selection:text-black overflow-x-hidden relative">
      <CustomCursor />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <SmoothScroll>
        <ScrollProgress />
        <FloatingShapes />
        <Navbar onOpenModal={() => setIsModalOpen(true)} />
        
        {/* HERO SECTION */}
        <section id="home" className="relative h-screen flex items-center justify-center px-6 lg:px-12 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full hero-glow pointer-events-none" />
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-accent">
                <motion.div 
                  animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-full h-full bg-accent rounded-full"
                />
              </div>
              <span className="text-xs font-mono text-muted uppercase tracking-widest">Лицензия МЧС № Л014-00101-24/02712520</span>
            </motion.div>
            
            <Reveal>
              <div className="flex items-center gap-3 mb-6 justify-center">
                <div className="w-12 h-[1px] bg-accent" />
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-accent">Security Center Live</span>
                <div className="w-12 h-[1px] bg-accent" />
              </div>
            </Reveal>
            <TextReveal 
              text="Инженерные системы безопасности 2026"
              className="text-5xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tighter text-gradient justify-center"
            />
            
            <Reveal delay={0.2} direction="up" width="100%">
              <p className="text-lg lg:text-xl text-muted mb-12 max-w-3xl mx-auto leading-relaxed">
                Проектирование, монтаж и обслуживание комплексных систем защиты. Весь контроль объекта — в вашем смартфоне. Мы создаем среду, где технологии стоят на страже вашего спокойствия.
              </p>
            </Reveal>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Magnetic>
                <button onClick={() => setIsModalOpen(true)} className="btn-primary w-full sm:w-auto justify-center">
                  Позвонить менеджеру <ArrowUpRight className="w-4 h-4" />
                </button>
              </Magnetic>
              <Magnetic>
                <button onClick={() => setIsModalOpen(true)} className="btn-secondary w-full sm:w-auto justify-center">
                  Получить расчет <ArrowUpRight className="w-4 h-4" />
                </button>
              </Magnetic>
            </div>
          </div>
          <ScrollIndicator />
        </section>


        {/* MOBILE CONTROL SECTION */}
        <section className="py-32 relative bg-zinc-950 overflow-hidden">
          <div className="absolute inset-0 bg-accent/5 blur-[150px] rounded-full translate-x-1/2" />
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-24 items-center px-6 lg:px-12 relative z-10">
            <div className="relative z-20">
              <Reveal direction="left">
                <div className="flex items-center gap-2 text-accent mb-4">
                  <Activity className="w-5 h-5" />
                  <span className="text-xs font-mono uppercase tracking-widest">Security Center Live</span>
                </div>
              </Reveal>
              <Reveal direction="left" delay={0.1}>
                <h2 className="text-4xl lg:text-6xl font-black mb-8 leading-tight tracking-tighter">
                  Весь объект <br /> в вашем смартфоне
                </h2>
              </Reveal>
              <Reveal direction="left" delay={0.2}>
                <p className="text-xl text-muted mb-12 leading-relaxed max-w-md">
                  Мы создаем экосистему, где вы — главный диспетчер. Интеграция MyAlarm и Стрелец-ПРО дает вам полный контроль над безопасностью из любой точки мира.
                </p>
              </Reveal>
              
              <StaggerContainer className="space-y-6">
                {[
                  { title: "Мгновенный отклик", desc: "Push-уведомления прилетают быстрее, чем вы успеете моргнуть." },
                  { title: "Живой мониторинг", desc: "Статус каждого датчика обновляется в реальном времени." },
                  { title: "Умный доступ", desc: "Открывайте двери и ворота одним касанием экрана." }
                ].map((item, i) => (
                  <StaggerItem key={i}>
                    <div className="flex gap-4 group cursor-pointer">
                      <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0 group-hover:bg-accent group-hover:text-black transition-all">
                        <Check className="w-3 h-3" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg group-hover:text-accent transition-colors">{item.title}</h4>
                        <p className="text-sm text-muted">{item.desc}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
            
            <div className="relative flex justify-center items-center">
              <MobilePhoneMockup />
            </div>
          </div>
        </section>


        {/* PARALLAX IMAGE SECTION */}
        {/* TECHNOLOGY STACK SECTION */}
        <section className="py-32 px-6 lg:px-12 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <Reveal direction="left">
                <div className="flex items-center gap-2 text-accent mb-4">
                  <Zap className="w-5 h-5" />
                  <span className="text-xs font-mono uppercase tracking-widest">Технологический стек</span>
                </div>
              </Reveal>
              <Reveal direction="left" delay={0.1}>
                <h2 className="text-4xl lg:text-6xl font-black mb-8 leading-tight tracking-tighter">
                  Работаем с лидерами индустрии
                </h2>
              </Reveal>
              <Reveal direction="left" delay={0.2}>
                <p className="text-xl text-muted mb-12 leading-relaxed">
                  Мы интегрируем лучшие российские и мировые решения для обеспечения бескомпромиссной безопасности ваших объектов.
                </p>
              </Reveal>
              
            <StaggerContainer className="grid sm:grid-cols-2 gap-8">
                {[
                  { name: "MyAlarm", desc: "Облачный мониторинг и управление безопасностью в вашем смартфоне. Полный контроль объекта 24/7.", badge: "Все в смартфоне" },
                  { name: "Стрелец-ПРО", desc: "Передовая радиосистема пожарной сигнализации. Идеально для памятников архитектуры и сложных интерьеров." },
                  { name: "Bolid / Орион", desc: "Промышленный стандарт систем безопасности в России. Надежность, проверенная десятилетиями." },
                  { name: "Ajax Systems", desc: "Беспроводные системы безопасности с премиальным дизайном и мгновенным откликом." }
                ].map((tech, i) => (
                  <StaggerItem key={i}>
                    <motion.div 
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 transition-all h-full cursor-pointer group relative overflow-hidden"
                    >
                      {tech.badge && (
                        <div className="absolute top-0 right-0 bg-accent text-black text-[8px] font-bold px-2 py-1 rounded-bl-lg uppercase tracking-tighter">
                          {tech.badge}
                        </div>
                      )}
                      <h4 className="text-lg font-bold mb-2 text-accent group-hover:text-white transition-colors">{tech.name}</h4>
                      <p className="text-sm text-muted">{tech.desc}</p>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
            <Reveal width="100%">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/5 blur-[120px] rounded-full" />
                <div className="glass-panel rounded-3xl p-8 lg:p-12 relative z-10">
                  <div className="space-y-8">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-accent/10 border border-accent/20">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-black font-bold">M</div>
                        <div>
                          <div className="text-sm font-bold">MyAlarm Cloud</div>
                          <div className="text-[10px] text-muted uppercase">Соединение установлено</div>
                        </div>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
                    </div>
                    <div className="space-y-4">
                      <div className="text-xs font-mono text-muted uppercase tracking-widest">Активные зоны Стрелец-ПРО</div>
                      {[
                        { zone: "Зона 01: Холл", status: "Норма" },
                        { zone: "Зона 02: Серверная", status: "Норма" },
                        { zone: "Зона 03: Склад", status: "Норма" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                          <span className="text-sm">{item.zone}</span>
                          <span className="text-[10px] font-mono text-accent">{item.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* LOGOS SECTION */}
      <section id="проекты" className="py-24 px-6 lg:px-12 border-y border-white/5 bg-white/[0.01] relative z-10">
        <div className="max-w-7xl mx-auto">
          <Reveal width="100%">
            <p className="text-center text-xs font-mono text-muted uppercase tracking-[0.3em] mb-16">Работаем с объектами любой сложности и назначения</p>
          </Reveal>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-8 items-center opacity-40 grayscale hover:grayscale-0 transition-all">
            {LOGOS.map((logo, i) => (
              <StaggerItem key={logo.name}>
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-accent/50 transition-colors">
                    {logo.icon}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-center">{logo.name}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="услуги" className="py-32 px-6 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <Reveal>
              <div className="flex items-center gap-2 text-accent mb-4">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs font-mono uppercase tracking-widest">Security Center Live</span>
              </div>
            </Reveal>
            <Reveal>
              <h2 className="text-4xl lg:text-6xl font-black max-w-3xl leading-tight tracking-tighter">
                Комплексные инженерные решения безопасности
              </h2>
            </Reveal>
            <Reveal>
              <p className="text-muted mt-6 max-w-xl leading-relaxed">
                ООО «ИНТЕКС-СБ» обладает полным пакетом лицензий МЧС для выполнения работ любой сложности. Мы обеспечиваем защиту вашего объекта на всех уровнях.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Пожарная безопасность", 
                desc: "Монтаж, ТО и ремонт систем пожаротушения, сигнализации (АПС/ОПС) и противопожарного водоснабжения.",
                items: ["АПС и ОПС", "Пожаротушение", "Водоснабжение"]
              },
              { 
                title: "Противодымная защита", 
                desc: "Автоматические системы противодымной вентиляции, занавесы и завесы для локализации очагов возгорания.",
                items: ["Вентиляция", "Занавесы", "Завесы"]
              },
              { 
                title: "Оповещение и Эвакуация", 
                desc: "Системы СОУЭ, включая фотолюминесцентные элементы и системы передачи извещений о пожаре.",
                items: ["СОУЭ", "Передача извещений", "Фотолюминесценция"]
              },
              { 
                title: "Конструктивная защита", 
                desc: "Огнезащита материалов и конструкций, монтаж заполнений проемов в противопожарных преградах.",
                items: ["Огнезащита", "Противопожарные двери", "Преграды"]
              },
              { 
                title: "Видеонаблюдение и СКУД", 
                desc: "Интеллектуальные системы контроля доступа и видеонаблюдения с интеграцией в ваш смартфон.",
                items: ["CCTV", "Биометрия", "Удаленный доступ"]
              },
              { 
                title: "Технический аудит", 
                desc: "Проверка работоспособности систем, пусконаладочные работы и подготовка к проверкам МЧС.",
                items: ["Пусконаладка", "Диспетчеризация", "Аудит"]
              }
            ].map((service, i) => (
              <Reveal key={i} delay={i * 0.1} width="100%">
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="glass-panel rounded-3xl p-8 group hover:border-accent/20 transition-all h-full flex flex-col"
                >
                  <h3 className="text-xl font-bold mb-4 group-hover:text-accent transition-colors">{service.title}</h3>
                  <p className="text-sm text-muted mb-6 leading-relaxed flex-grow">{service.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {service.items.map((item, j) => (
                      <span key={j} className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 border border-white/10 text-muted">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE 2: VIDEO ANALYTICS */}
      <section id="экспертиза" className="py-32 px-6 lg:px-12 bg-white/[0.01] relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <Reveal width="100%">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/10 blur-[100px] rounded-full pointer-events-none" />
              <div className="glass-panel rounded-3xl p-8 lg:p-12 relative z-10">
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium">Загрузка видеоархива</span>
                    <span className="text-xs text-muted">72% заполнено</span>
                  </div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "72%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-accent to-accent/50"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold">Детекция событий</h4>
                    <select className="bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] outline-none">
                      <option>За сутки</option>
                    </select>
                  </div>
                  <div className="h-48 w-full min-h-[192px]">
                    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                      <LineChart data={CHART_DATA}>
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#00FF66" 
                          strokeWidth={2} 
                          dot={false} 
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                          itemStyle={{ color: '#00FF66' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-muted">
                    <div className="w-2 h-2 rounded-full border border-accent" />
                    График активности на объекте: пиковые нагрузки в дневное время
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <div className="flex items-center gap-2 text-accent mb-4">
                <Layers className="w-5 h-5" />
                <span className="text-xs font-mono uppercase tracking-widest">Интеллектуальное видеонаблюдение</span>
              </div>
            </Reveal>
            <Reveal>
              <h2 className="text-4xl lg:text-6xl font-black mb-8 leading-tight tracking-tighter">
                Видеть больше, чем просто картинку
              </h2>
            </Reveal>
            <Reveal>
              <p className="text-xl text-muted mb-12 leading-relaxed">
                Внедряем системы видеоаналитики, которые распознают лица, номера машин и подозрительное поведение в реальном времени.
              </p>
            </Reveal>
            
            <div className="space-y-8">
              {[
                { title: "Нейросетевая аналитика", desc: "Автоматическое обнаружение задымления, оставленных предметов и контроль периметра без участия оператора.", icon: <Cpu /> },
                { title: "Облачный мониторинг", desc: "Доступ к камерам и архиву из любой точки мира через защищенное приложение Intex Cloud.", icon: <Activity /> }
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <button onClick={() => setIsModalOpen(true)} className="btn-primary mt-12 inline-flex items-center gap-2">
                Консультация эксперта <ArrowUpRight className="w-4 h-4" />
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* REQUISITES SECTION */}
      <section id="реквизиты" className="py-32 px-6 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-2 text-accent mb-4">
                <Fingerprint className="w-5 h-5" />
                <span className="text-xs font-mono uppercase tracking-widest">Юридический протокол</span>
              </div>
            </Reveal>
            <Reveal>
              <h2 className="text-4xl lg:text-6xl font-black mb-8 tracking-tighter">Карточка предприятия</h2>
            </Reveal>
            <Reveal>
              <p className="text-muted mb-12 leading-relaxed">Мы ценим прозрачность в отношениях с партнерами. Здесь вы можете найти и скопировать все необходимые данные для заключения договора.</p>
            </Reveal>
            
            <Reveal width="100%">
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-4 mb-6">
                  <ShieldCheck className="text-accent w-8 h-8" />
                  <div>
                    <div className="text-[10px] font-mono text-muted uppercase tracking-widest">Лицензия МЧС</div>
                    <div className="text-sm font-bold">{REQUISITES.license}</div>
                  </div>
                </div>
                <p className="text-xs text-muted leading-relaxed">Действительна бессрочно. Разрешает монтаж, техническое обслуживание и ремонт средств обеспечения пожарной безопасности зданий и сооружений.</p>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal width="100%">
              <div className="glass-panel rounded-[40px] p-8 lg:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] rounded-full" />
                <div className="grid md:grid-cols-2 gap-x-8 relative z-10">
                  <CopyItem label="Наименование" value={REQUISITES.fullName} />
                  <CopyItem label="ИНН" value={REQUISITES.inn} />
                  <CopyItem label="КПП" value={REQUISITES.kpp} />
                  <CopyItem label="ОГРН" value={REQUISITES.ogrn} />
                  <CopyItem label="Банк" value={REQUISITES.bank} />
                  <CopyItem label="Расчетный счет" value={REQUISITES.account} />
                  <CopyItem label="БИК" value={REQUISITES.bik} />
                  <CopyItem label="Корр. счет" value={REQUISITES.corrAccount} />
                </div>
                <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                  <CopyItem label="Юридический адрес" value={REQUISITES.address} />
                  <CopyItem label="Адрес осуществления деятельности" value={REQUISITES.workAddress} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* LICENSE ACTIVITIES LIST */}
        <div className="max-w-7xl mx-auto mt-16 px-6 lg:px-12">
          <Reveal width="100%">
            <div className="p-8 lg:p-12 rounded-[40px] bg-white/[0.01] border border-white/5">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                <ShieldCheck className="text-accent w-6 h-6" />
                Лицензируемые виды деятельности
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {LICENSE_ACTIVITIES.map((activity, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 transition-colors group">
                    <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent text-[10px] font-bold shrink-0 group-hover:bg-accent group-hover:text-black transition-colors">
                      {i + 1}
                    </div>
                    <p className="text-xs text-muted leading-relaxed group-hover:text-white transition-colors">{activity}</p>
                  </div>
                ))}
              </div>
              <div className="mt-12 pt-8 border-t border-white/5 grid sm:grid-cols-3 gap-8">
                <div>
                  <div className="text-[10px] font-mono text-muted uppercase mb-1">Лицензирующий орган</div>
                  <div className="text-xs font-bold">{REQUISITES.licensingAuthority}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-muted uppercase mb-1">Дата предоставления</div>
                  <div className="text-xs font-bold">{REQUISITES.licenseDate}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-muted uppercase mb-1">Приказ о предоставлении</div>
                  <div className="text-xs font-bold">{REQUISITES.licenseOrder}</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="контакты" className="py-32 px-6 lg:px-12 bg-white/[0.01] relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="flex items-center gap-2 text-accent mb-4">
                <Plus className="w-5 h-5" />
                <span className="text-xs font-mono uppercase tracking-widest">Вопросы</span>
              </div>
            </Reveal>
            <Reveal>
              <h2 className="text-4xl lg:text-6xl font-black mb-8 tracking-tighter">Часто спрашивают</h2>
            </Reveal>
            <Reveal>
              <p className="text-muted mb-8 leading-relaxed">Мы собрали ответы на самые популярные вопросы о системах безопасности и нашей работе.</p>
            </Reveal>
            <Reveal>
              <a href={`mailto:${REQUISITES.email}`} className="inline-flex items-center gap-2 text-sm font-bold group">
                Задать свой вопрос <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            {FAQS.map((faq, i) => (
              <Reveal key={i} width="100%" delay={i * 0.05}>
                <FAQItem question={faq.question} answer={faq.answer} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* FOOTER */}
      <footer className="py-24 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-24">
            <div className="col-span-2 lg:col-span-1">
              <a href="/" className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-black text-black">I</div>
                <span className="text-xl font-bold tracking-tighter">ИНТЕКС-СБ</span>
              </a>
              <p className="text-sm text-muted leading-relaxed mb-8">Экспертные решения в области систем безопасности и противопожарной защиты.</p>
              <div className="flex gap-4">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-xs uppercase tracking-widest">Услуги</h4>
              <ul className="space-y-4 text-sm text-muted">
                <li><a href="#услуги" className="hover:text-white transition-colors">Пожарная безопасность</a></li>
                <li><a href="#услуги" className="hover:text-white transition-colors">Видеонаблюдение</a></li>
                <li><a href="#услуги" className="hover:text-white transition-colors">СКУД</a></li>
                <li><a href="#услуги" className="hover:text-white transition-colors">Обслуживание</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-xs uppercase tracking-widest">Компания</h4>
              <ul className="space-y-4 text-sm text-muted">
                <li><a href="#home" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="#реквизиты" className="hover:text-white transition-colors">Лицензии</a></li>
                <li><a href="#проекты" className="hover:text-white transition-colors">Проекты</a></li>
                <li><a href="#контакты" className="hover:text-white transition-colors">Карьера</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-xs uppercase tracking-widest">Поддержка</h4>
              <ul className="space-y-4 text-sm text-muted">
                <li><a href="#контакты" className="hover:text-white transition-colors">Помощь</a></li>
                <li><a href="#контакты" className="hover:text-white transition-colors">Контакты</a></li>
                <li><a href="#экспертиза" className="hover:text-white transition-colors">Статус систем</a></li>
                <li><a href="#реквизиты" className="hover:text-white transition-colors">Документация</a></li>
              </ul>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <h4 className="font-bold mb-6 text-xs uppercase tracking-widest">Связь</h4>
              <form onSubmit={handleSubscribe} className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ваш email" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-accent hover:scale-110 transition-transform">
                  {emailSent ? <Check className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                </button>
              </form>
              {emailSent && <p className="text-xs text-accent mt-2 absolute">Подписка оформлена!</p>}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 text-[10px] font-mono text-muted uppercase tracking-[0.3em]">
            <div>© 2026 ООО «ИНТЕКС-СБ» // Красноярск // Системы безопасности</div>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#реквизиты" className="hover:text-white">Политика</a>
              <a href="#реквизиты" className="hover:text-white">Конфиденциальность</a>
              <a href="#реквизиты" className="hover:text-white">Условия</a>
            </div>
          </div>
        </div>
      </footer>
      </SmoothScroll>
    </div>
  );
}
