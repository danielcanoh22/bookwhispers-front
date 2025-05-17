import { Button, ButtonIcon } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icon";

type SliderControlsProps = {
  onNext: () => void;
  onPrev: () => void;
};

export const SliderControls = ({ onNext, onPrev }: SliderControlsProps) => {
  return (
    <HStack space="lg">
      <Button
        size="md"
        className="rounded-full w-12 h-12 bg-white"
        onPress={onPrev}
      >
        <ButtonIcon as={ChevronLeftIcon} className="text-[#9A7B62]" />
      </Button>
      <Button
        size="md"
        className="rounded-full w-12 h-12 bg-white"
        onPress={onNext}
      >
        <ButtonIcon as={ChevronRightIcon} className="text-[#9A7B62]" />
      </Button>
    </HStack>
  );
};
