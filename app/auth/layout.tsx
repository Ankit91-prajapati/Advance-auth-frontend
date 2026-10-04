import React from "react";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (

    <div className=" flex flex-col w-125 h-125 md:w-[75vh] md:h-[75vh] bg-[radial-gradient(circle_at_center,#7AB3E2DF,#003465)] z-10  items-center justify-center rounded-lg ">
      <h3 className="pb-3 text-gray-300 text-l ">Smarter Manufacturing Better Operations</h3>
      
      {children}
      
    </div>

  );
};

export default AuthLayout;
