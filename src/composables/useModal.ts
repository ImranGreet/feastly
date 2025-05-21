import { ref } from 'vue';
import type { ModalComposable } from '../types/types';

export default function useModal(): ModalComposable {
  const showModal = ref<boolean>(false);
  const modalType = ref<string>('default');

  const toggleModal = () => {
    showModal.value = !showModal.value;
  };

  const setModalType = (type: string) => {
    modalType.value = type;
  };

  return {
    showModal,
    modalType,
    // functions oe methods
    toggleModal,
    setModalType,
  };
}
