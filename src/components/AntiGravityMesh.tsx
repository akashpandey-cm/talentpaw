export default function AntiGravityMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-60 mix-blend-multiply">
      {/* Liquid Orb 1 */}
      <div 
        className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-gradient-to-br from-[#7B61FF]/40 to-[#FF4D8D]/10 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-[100px] animate-fluid-1 will-change-transform translate-z-0"
      />
      
      {/* Liquid Orb 2 */}
      <div 
        className="absolute top-[20%] -right-[10%] w-[45vw] h-[45vw] max-w-[700px] max-h-[700px] bg-gradient-to-tr from-[#FF8B00]/30 to-[#FF4D8D]/20 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-[120px] animate-fluid-2 will-change-transform translate-z-0"
      />
      
      {/* Liquid Orb 3 */}
      <div 
        className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] bg-gradient-to-tl from-[#B400FF]/20 to-[#00E5FF]/20 rounded-[50%_50%_20%_80%/25%_80%_20%_75%] blur-[130px] animate-fluid-3 will-change-transform translate-z-0"
      />
    </div>
  );
}
