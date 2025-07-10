import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";
import { Link } from "expo-router";
import React from "react";

const icon = require("/assets/images/robot.png");

export const FloatingActionButton = () => {
  return (
    <Box className="w-20 h-20 bg-[#36A875] rounded-full justify-center items-center shadow-lg active:opacity-80 absolute bottom-6 right-6 z-20">
      <Link href="/chat/ai-chat">
        <Image size="sm" source={icon} alt="image" className="rounded-full" />
      </Link>
    </Box>
  );
};
