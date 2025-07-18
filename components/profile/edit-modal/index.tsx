import React from "react";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText } from "@/components/ui/button";
import { Icon, CloseIcon } from "@/components/ui/icon";
import { EditProfileForm } from "../edit-form";

type EditProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const handleSave = () => {
    // Aquí podrías llamar a una función del formulario para enviar los datos
    console.log("Cambios guardados");
    onClose(); // Cierra el modal después de guardar
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">Editar Perfil</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <EditProfileForm />
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            size="sm"
            action="secondary"
            onPress={onClose}
          >
            <ButtonText>Cancelar</ButtonText>
          </Button>
          <Button size="sm" action="positive" onPress={handleSave}>
            <ButtonText>Guardar Cambios</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
