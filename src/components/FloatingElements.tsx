
export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-neon-green/20 to-electric-blue/20 rounded-full blur-xl animate-float" />
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-coral-pink/20 to-deep-purple/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-r from-electric-blue/20 to-neon-green/20 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-deep-purple/20 to-coral-pink/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-cyber-grid bg-grid opacity-30 dark:opacity-20" />
    </div>
  );
}
