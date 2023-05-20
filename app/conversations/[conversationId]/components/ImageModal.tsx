"use client";

import Modal from "@/app/components/modal/Modal";
import Image from "next/image";

interface ImageModalProps {
  isOpen?: boolean;
  src?: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, src, onClose }) => {
  if (!src) {
    return null;
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Image src={src} alt="Image" fill className="object-cover" />
    </Modal>
  );
};

export default ImageModal;
