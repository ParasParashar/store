import React from "react";

interface WashingInstructionProps {
  title: string;
  icon: React.ComponentType;
}

const WashingInstruction: React.FC<WashingInstructionProps> = ({
  title,
  icon: Icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 text-muted-foreground ">
      <Icon className=" h-10 w-6" />
      <p className=" break-words text-center text-muted-foreground font-semibold">
        {title}
      </p>
    </div>
  );
};

export default WashingInstruction;
