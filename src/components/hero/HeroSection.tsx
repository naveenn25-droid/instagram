import loginPageImage from "../../assets/images/login_page_image.png";
import appIcon from "../../assets/images/app-icon.png";

export const HeroSection = () => {
  return (
    <div className="w-full h-full relative">
      {/* Background radial gradient and noise overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(130,52,175,0.05),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
      
      {/* Inner Container: w-max ensures the container expands to exactly fit the 64px text. */}
      {/* This guarantees the Logo perfectly aligns with the left edge of the heading. */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max flex flex-col items-center">
        
        {/* Logo: moved down (smaller mb) and to the left (negative ml) */}
        <div className="w-full flex justify-start mb-[20px] ml-[-72px]">
          <img src={appIcon} alt="Instagram App Icon" className="w-[140px] h-[140px]" />
        </div>
        
        {/* Heading */}
        <h1 className="w-full text-center font-medium text-[40px] leading-[1.15] tracking-[-0.03em] text-white mb-[55px]">
          <span className="block whitespace-nowrap">See everyday moments from your</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#F58529] to-[#DD2A7B]">
            close friends.
          </span>
        </h1>

        {/* Hero Image */}
        {/* Container is 420px wide, horizontally centered beneath heading, moved up 20px */}
        <div className="w-[420px] flex justify-center -translate-y-[20px]">
          <img 
            src={loginPageImage} 
            alt="Instagram Hero Cards" 
            className="w-full h-auto object-contain pointer-events-none"
          />
        </div>
        
      </div>
    </div>
  );
};
