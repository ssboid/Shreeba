import React, { useRef } from 'react';

const Homepage = () => {
  // Refs to each div
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
  const div3Ref = useRef(null);
  const div4Ref = useRef(null);
  const div5Ref = useRef(null);

  const handleScroll = (e) => {
    // Prevent default scrolling behavior
    e.preventDefault();
  
    // Get the current scroll position and viewport height
    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;
  
    // Get the offset positions for div2
    const div2Top = div2Ref.current.offsetTop;
    const div2Height = div2Ref.current.offsetHeight;
    const div2Bottom = div2Top + div2Height;
  
    // Check if user is within div2 on mobile
    const isMobile = window.innerWidth < 640; // Mobile breakpoint
    const isInDiv2 = scrollTop + viewportHeight > div2Top && scrollTop < div2Bottom;
  
    // Adjust scrolling behavior for div2
    if (isMobile && isInDiv2) {
      const isAtBottomOfDiv2 = scrollTop + viewportHeight >= div2Bottom;
  
      // Allow scrolling to div3 only if at the bottom of div2
      if (e.deltaY > 0 && isAtBottomOfDiv2) {
        div3Ref.current.scrollIntoView({ behavior: 'smooth' });
      }
  
      // Prevent further logic execution for div2 scrolling
      return;
    }
  
    // Determine scroll direction
    const direction = e.deltaY > 0 ? 'down' : 'up';
  
    // Scroll to the appropriate section
    if (direction === 'down') {
      if (div1Ref.current && scrollTop < div2Top) {
        div2Ref.current.scrollIntoView({ behavior: 'smooth' });
      } else if (div2Ref.current && scrollTop < div3Ref.current.offsetTop) {
        div3Ref.current.scrollIntoView({ behavior: 'smooth' });
      } else if (div3Ref.current && scrollTop < div4Ref.current.offsetTop) {
        div4Ref.current.scrollIntoView({ behavior: 'smooth' });
      } else if (div4Ref.current && scrollTop < div5Ref.current.offsetTop) {
        div5Ref.current.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (direction === 'up') {
      if (div5Ref.current && scrollTop >= div4Ref.current.offsetTop) {
        div4Ref.current.scrollIntoView({ behavior: 'smooth' });
      } else if (div4Ref.current && scrollTop >= div3Ref.current.offsetTop) {
        div3Ref.current.scrollIntoView({ behavior: 'smooth' });
      } else if (div3Ref.current && scrollTop >= div2Top) {
        div2Ref.current.scrollIntoView({ behavior: 'smooth' });
      } else if (div2Ref.current && scrollTop >= div1Ref.current.offsetTop) {
        div1Ref.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  

  return (
    <div
      className="w-full"
      onWheel={handleScroll} // Listen for scroll wheel events
    >
      {/* Div1 */}
      <div ref={div1Ref} className="h-screen w-full bg-sky-100 flex items-center justify-center px-6 lg:px-[8.33%]">
        <div className="h-full w-full  bg-blue-300 flex items-center justify-center">
          <h1 className="text-5xl">1A</h1>
        </div>
        <div className="h-full w-full bg-blue-500 hidden lg:flex items-center justify-center">
          <h1 className="text-5xl">1B</h1>
        </div>
      </div>

      {/* Div2 */}
      <div ref={div2Ref} className="lg:h-screen h-[200vh] w-full bg-sky-200 flex flex-col sm:flex-row items-center justify-center px-6 lg:px-[8.33%]"
      >
        <div className="lg:h-screen h-full w-full sm:w-1/2 bg-green-300 flex items-center justify-center">
          <h1 className="text-5xl">2A</h1>
        </div>
        <div className="lg:h-screen h-full w-full sm:w-1/2 bg-green-500 flex items-center justify-center">
          <h1 className="text-5xl">2B</h1>
        </div>
      </div>

      {/* Div3 */}
      <div
        ref={div3Ref}
        className="h-screen w-full bg-sky-300 flex items-center justify-center px-6 lg:px-[8.33%]"
      >
        <div className="h-full w-full  bg-blue-300 flex items-center justify-center"><h1 className="text-9xl">3</h1></div>
        
      </div>

      {/* Div4 */}
      <div
        ref={div4Ref}
        className="h-screen w-full bg-sky-400 flex items-center justify-center px-6 lg:px-[8.33%]"
      >
        <div className="h-full w-full  bg-blue-300 flex items-center justify-center"><h1 className="text-9xl">4</h1></div>
      </div>

      {/* Div5 */}
      <div
        ref={div5Ref}
        className="h-screen w-full bg-sky-500 flex items-center justify-center px-6 lg:px-[8.33%]"
      >
        <div className="h-full w-full  bg-blue-800 flex items-center justify-center"><h1 className="text-9xl">5</h1></div>
      </div>
    </div>
  );
};

export default Homepage;
