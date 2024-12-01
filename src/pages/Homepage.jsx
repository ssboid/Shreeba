import React, { useRef } from 'react';

const Homepage = () => {
  // Refs to each div
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
  const div3Ref = useRef(null);
  const div4Ref = useRef(null);
  const div5Ref = useRef(null);

  // Handle the scroll event
  const handleScroll = (e) => {
    // Prevent default scrolling behavior
    e.preventDefault();

    // Determine scroll direction
    const direction = e.deltaY > 0 ? 'down' : 'up';

    // Check which div to scroll to based on the direction
    if (direction === 'down') {
      if (div1Ref.current && window.scrollY < div2Ref.current.offsetTop) {
        div2Ref.current.scrollIntoView({ behavior: 'smooth' });
      } else if (div2Ref.current && window.scrollY < div3Ref.current.offsetTop) {
        div3Ref.current.scrollIntoView({ behavior: 'smooth' });
      } else if (div3Ref.current && window.scrollY < div4Ref.current.offsetTop) {
        div4Ref.current.scrollIntoView({ behavior: 'smooth' });
      } else if (div4Ref.current && window.scrollY < div5Ref.current.offsetTop) {
        div5Ref.current.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (direction === 'up') {
      if (div5Ref.current && window.scrollY >= div5Ref.current.offsetTop) {
        div4Ref.current.scrollIntoView({ behavior: 'smooth' });
      } else if (div4Ref.current && window.scrollY >= div4Ref.current.offsetTop) {
        div3Ref.current.scrollIntoView({ behavior: 'smooth' });
      } else if (div3Ref.current && window.scrollY >= div3Ref.current.offsetTop) {
        div2Ref.current.scrollIntoView({ behavior: 'smooth' });
      } else if (div2Ref.current && window.scrollY >= div2Ref.current.offsetTop) {
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
      <div ref={div1Ref} className="h-screen w-full bg-sky-100 flex items-center justify-center px-[8.33%]">
        <div className="h-full w-1/2 bg-blue-300 flex items-center justify-center">
          <h1 className="text-5xl">1A</h1>
        </div>
        <div className="h-full w-1/2 bg-blue-500 flex items-center justify-center">
          <h1 className="text-5xl">1B</h1>
        </div>
      </div>

      {/* Div2 */}
      <div ref={div2Ref} className="h-screen w-full bg-sky-200 flex items-center justify-center px-[8.33%]">
        <div className="h-full w-1/2 bg-green-300 flex items-center justify-center">
          <h1 className="text-5xl">2A</h1>
        </div>
        <div className="h-full w-1/2 bg-green-500 flex items-center justify-center">
          <h1 className="text-5xl">2B</h1>
        </div>
      </div>
      

      {/* Div3 */}
      <div
        ref={div3Ref}
        className="h-screen w-full bg-sky-300 flex items-center justify-center"
      >
        <h1 className="text-9xl">3</h1>
      </div>

      {/* Div4 */}
      <div
        ref={div4Ref}
        className="h-screen w-full bg-sky-400 flex items-center justify-center"
      >
        <h1 className="text-9xl">4</h1>
      </div>

      {/* Div5 */}
      <div
        ref={div5Ref}
        className="h-screen w-full bg-sky-500 flex items-center justify-center"
      >
        <h1 className="text-9xl">5</h1>
      </div>
    </div>
  );
};

export default Homepage;
