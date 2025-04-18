import { Button, ButtonIcon } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icon";

export const SliderControls = () => {
  return (
    <HStack space="lg">
      <Button size="md" className="rounded-full w-12 h-12 bg-white">
        <ButtonIcon as={ChevronLeftIcon} className="text-[#9A7B62]" />
      </Button>
      <Button size="md" className="rounded-full w-12 h-12 bg-white">
        <ButtonIcon as={ChevronRightIcon} className="text-[#9A7B62]" />
      </Button>
    </HStack>
  );
};
