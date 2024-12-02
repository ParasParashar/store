import useAuthModal from "@/hooks/useAuthModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import OtpPhoneNoRegister from "./OtpPhoneNoRegister";

const OtpModal = () => {
  const { isOpen, onClose } = useAuthModal();
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      {/* <DialogTrigge asChild>
      <Button variant="outline">Share</Button>
    </DialogTrigge> */}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <OtpPhoneNoRegister />
      </DialogContent>
    </Dialog>
  );
};

export default OtpModal;
