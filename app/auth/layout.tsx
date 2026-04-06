import React from "react";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (

    <div className=" w-[500px] h-[500px] md:w-[75vh] md:h-[75vh] bg-[radial-gradient(circle_at_center,_#7AB3E2BF,_#003465)] z-10 flex flex-row items-center justify-center rounded-lg ">
      {children}
    </div>

  );
};

export default AuthLayout;
