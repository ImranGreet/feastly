import { ref } from 'vue';
import type { Ref } from 'vue';

interface AuthenticationState {
  requireAuth: Ref<boolean>;
  authenticationMessage: Ref<string>;
  requestForAuthentication: () => void;
}

export default function useAuthentication(): AuthenticationState {
  const requireAuth: Ref<boolean> = ref(false);
  const authenticationMessage: Ref<string> = ref('');

  const requestForAuthentication = (): void => {
    if (!requireAuth.value) {
      requireAuth.value = true;
      authenticationMessage.value = 'Authentication required. Please log in.';
    } else {
      authenticationMessage.value = 'Already authenticated.';
    }
  };

  return {
    requireAuth,
    authenticationMessage,
    requestForAuthentication,
  };
}
