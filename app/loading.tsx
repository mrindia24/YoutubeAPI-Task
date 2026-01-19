import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <img
          src="https://freepnglogo.com/images/all_img/1701508998white-youtube-logo-png.png"
          alt="YouTube"
          className="w-20 animate-pulse"
        />
      </div>
    </div>
  );
}
