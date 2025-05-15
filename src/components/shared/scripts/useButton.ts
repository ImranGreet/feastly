import { computed, type ComputedRef } from 'vue';
import type { ButtonProps } from '../../../types/propsType';

interface UseButtonReturn {
  props: ButtonProps;
  computedButtonClass: ComputedRef<string>;
  handleClick: () => void;
  isDisabled: ComputedRef<boolean>;
}

export default function useButton(): UseButtonReturn {
  const props = withDefaults(defineProps<ButtonProps>(), {
    buttonVariant: 'primary',
    size: 'medium',
    disabled: false,
    loading: false,
    buttonClasses: '',
    buttonType: 'button',
  });

  const emit = defineEmits<{
    (event: string, payload?: { timestamp: number }): void;
  }>();

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700',
  } as const;

  const sizeClasses = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  } as const;

  const baseClass =
    'rounded transition font-medium flex items-center justify-center';

  const computedButtonClass = computed(() => {
    const variant = props.buttonVariant || 'primary';
    const size = props.size || 'medium';
    return `${baseClass} ${variantClasses[variant]} ${sizeClasses[size]} ${props.buttonClasses}`.trim();
  });

  const isDisabled = computed(() => props.disabled || props.loading);

  const handleClick = (): void => {
    if (!isDisabled.value && props.buttonEvent) {
      emit(props.buttonEvent, { timestamp: Date.now() });
    }
  };

  return {
    props,
    computedButtonClass,
    isDisabled,
    handleClick,
  };
}
