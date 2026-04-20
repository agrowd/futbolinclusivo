"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MapPin, Trophy, Calendar, X as XIcon, MousePointer } from "lucide-react";

export default function FloatingButtons() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const autoOpenTimerRef = useRef(null);
  const autoCloseTimerRef = useRef(null);
  const messageTimerRef = useRef(null);

  // Auto-open every 60 seconds, close after 5 seconds
  useEffect(() => {
    const scheduleAutoOpen = () => {
      autoOpenTimerRef.current = setTimeout(() => {
        setIsOpen(true);
        setShowMessage(true);
        
        // Hide message after 3 seconds
        messageTimerRef.current = setTimeout(() => {
          setShowMessage(false);
        }, 3000);
        
        // Auto-close after 5 seconds
        autoCloseTimerRef.current = setTimeout(() => {
          setIsOpen(false);
          setShowMessage(false);
        }, 5000);
        
        // Schedule next auto-open
        scheduleAutoOpen();
      }, 60000);
    };

    // Start the cycle
    scheduleAutoOpen();

    return () => {
      if (autoOpenTimerRef.current) clearTimeout(autoOpenTimerRef.current);
      if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
      if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
    };
  }, []);

  const handleToggle = () => {
    // Clear auto timers when manually toggled
    if (autoOpenTimerRef.current) clearTimeout(autoOpenTimerRef.current);
    if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
    if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
    
    setIsOpen(!isOpen);
    setShowMessage(false);
    
    // If opening manually, schedule next auto-open after 60 seconds
    if (!isOpen) {
      autoOpenTimerRef.current = setTimeout(() => {
        setIsOpen(true);
        setShowMessage(true);
        
        messageTimerRef.current = setTimeout(() => {
          setShowMessage(false);
        }, 3000);
        
        autoCloseTimerRef.current = setTimeout(() => {
          setIsOpen(false);
          setShowMessage(false);
        }, 5000);
      }, 60000);
    }
  };

  const dismissMessage = () => {
    setShowMessage(false);
    if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
  };

  const buttons = [
    {
      href: "/canchas",
      icon: MapPin,
      label: "Alquilar Cancha",
      color: "from-blue-500 to-blue-600",
      glow: "shadow-blue-500/50",
      description: "Reserva tu espacio"
    },
    {
      href: "/inscripcion",
      icon: Trophy,
      label: "Inscribir Equipo",
      color: "from-green-500 to-green-600", 
      glow: "shadow-green-500/50",
      description: "Participa ahora"
    },
    {
      href: "/torneos",
      icon: Calendar,
      label: "Ver Torneos",
      color: "from-purple-500 to-purple-600",
      glow: "shadow-purple-500/50", 
      description: "Calendario completo"
    }
  ];

  return (
    <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50 flex flex-col items-end gap-3 sm:gap-4">
      {/* Message Notification */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative bg-gradient-to-r from-[#36b37e] to-[#2da372] text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-2xl shadow-[#36b37e]/50 border border-white/30 backdrop-blur-sm max-w-[240px] sm:max-w-[280px]"
          >
            {/* Close button */}
            <button
              onClick={dismissMessage}
              className="absolute top-2 right-2 w-5 h-5 sm:w-6 sm:h-6 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <XIcon size={12} className="sm:hidden" />
              <XIcon size={14} className="hidden sm:block" />
            </button>
            
            {/* Message content */}
            <div className="pr-6 sm:pr-8">
              <div className="font-black text-xs sm:text-sm uppercase tracking-wider mb-1 sm:mb-2">
                ¡Nuevas Opciones!
              </div>
              <div className="text-[10px] sm:text-xs opacity-90 leading-relaxed">
                Presiona para más información
              </div>
            </div>
            
            {/* Animated indicator */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-white/50 rounded-full"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 3, ease: "linear" }}
            />
            
            {/* Glow effect */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-white/20 to-transparent rounded-xl sm:rounded-2xl opacity-50 blur-xl"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex flex-col gap-3"
          >
            {buttons.map((btn, index) => (
              <motion.div
                key={btn.href}
                initial={{ opacity: 0, x: 50, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.8 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 25,
                  delay: index * 0.1 
                }}
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={btn.href}
                  className={`group relative flex items-center gap-4 bg-gradient-to-r ${btn.color} text-white px-6 py-4 pr-8 rounded-2xl shadow-2xl shadow-${btn.glow} hover:shadow-3xl transition-all duration-300 border border-white/20 backdrop-blur-sm`}
                >
                  {/* Animated icon container with soccer field pattern */}
                  <motion.div 
                    className="relative w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center border border-white/30 overflow-hidden"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    {/* Soccer field pattern overlay */}
                    <div className="absolute inset-0 opacity-30" style={{
                      backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 4px), repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 4px)'
                    }} />
                    <btn.icon 
                      size={24} 
                      className="relative z-10"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  
                  {/* Text content with pulse */}
                  <div className="text-left">
                    <motion.div 
                      className="font-black text-sm uppercase tracking-wider"
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {btn.label}
                    </motion.div>
                    <div className="text-xs opacity-80 font-medium">{btn.description}</div>
                  </div>

                  {/* Animated hover effects */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-30 blur-xl transition-all rounded-2xl" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main toggle button with continuous animation */}
      <motion.button
        onClick={handleToggle}
        className={`relative w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${isOpen ? 'from-red-500 to-red-600' : 'from-[#36b37e] to-[#2da372]'} text-white rounded-xl sm:rounded-2xl shadow-2xl shadow-[#36b37e]/50 hover:shadow-3xl transition-all duration-300 border border-white/30 flex items-center justify-center group`}
        whileHover={{ rotate: 360, scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          rotate: isOpen ? 45 : 0,
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          rotate: { duration: 0.3 },
          scale: { duration: 2, repeat: Infinity }
        }}
      >
        {/* Soccer ball pattern */}
        <div className="absolute inset-0 opacity-20 rounded-xl sm:rounded-2xl overflow-hidden">
          <motion.div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 25% 25%, transparent 20%, rgba(255,255,255,0.3) 20%, rgba(255,255,255,0.3) 25%, transparent 25%), radial-gradient(circle at 75% 75%, transparent 20%, rgba(255,255,255,0.3) 20%, rgba(255,255,255,0.3) 25%, transparent 25%)'
            }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        </div>
        
        <div className="relative z-10 flex items-center justify-center">
          <XIcon 
            size={20} 
            className="sm:hidden"
            style={{ rotate: isOpen ? "0deg" : "45deg", transition: "0.3s" }}
          />
          <XIcon 
            size={28} 
            className="hidden sm:block"
            style={{ rotate: isOpen ? "0deg" : "45deg", transition: "0.3s" }}
          />
        </div>
        
        {/* Pulsing glow effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl sm:rounded-2xl"
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Click indicator animation */}
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full opacity-80"
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0.3, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="absolute inset-0 bg-white rounded-full"
            animate={{ scale: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.button>
    </div>
  );
}
