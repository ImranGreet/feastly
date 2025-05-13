import type { Ref } from 'vue';

interface ButtonProps {
  buttonTitle: string;
  buttonIcon?: string;
  buttonType?: 'submit' | 'reset' | 'button';
  buttonClasses: string;
  buttonEvent: string;
  buttonVariant?: 'primary' | 'danger' | 'warning';
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
}

interface ModalComposable {
  showModal: Ref<boolean>;
  modalType: Ref<string>;
  toggleModal: () => void;
  setModalType: (type: string) => void;
}

export type { ButtonProps, ModalComposable };
