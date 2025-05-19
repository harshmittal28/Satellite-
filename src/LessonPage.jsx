import React from "react";
import AvatarGuide from "./AvatarGuide";
import WebcamFeed from "./WebcamFeed";

const LessonPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 min-h-screen bg-black text-white">
      <div>
        <AvatarGuide
          messages={[
            "Welcome to your satellite lesson!",
            "I’ll explain how they work, then you’ll take a short quiz.",
            "Good luck!"
          ]}
        />
      </div>
      <div>
        <WebcamFeed />
      </div>
    </div>
  );
};

export default LessonPage;