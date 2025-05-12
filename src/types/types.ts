import type { Ref } from "vue";

interface ModalComposable {
  showModal: Ref<boolean>;
  modalType: Ref<string>;
  toggleModal: () => void;
  setModalType: (type: string) => void;
}

export type {
    ModalComposable
}