import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';
import axios from 'axios';

// Order type definition
export interface Order {
  id: number;
  items: string[];
  status: string;
  // Add more fields as needed
}

// Store state interface
interface OrderStoreState {
  orders: Ref<Order[]>;
  loading: Ref<boolean>;
  error: Ref<string | null>;
}

// Store actions interface
interface OrderStoreActions {
  fetchOrders: () => Promise<void>;
  createOrder: (order: Omit<Order, 'id'>) => Promise<void>;
  updateOrder: (order: Order) => Promise<void>;
  deleteOrder: (id: number) => Promise<void>;
}

// Pinia store definition
export const useOrderManagement = defineStore(
  'orderManagement',
  (): OrderStoreState & OrderStoreActions => {
    const orders = ref<Order[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const apiUrl = 'https://fakestoreapi.com/carts'; // Replace with your API endpoint

    const fetchOrders = async () => {
      loading.value = true;
      error.value = null;
      try {
        const response = await axios.get<Order[]>(apiUrl);
        orders.value = response.data;
      } catch (err: any) {
        error.value = err.message || 'Failed to fetch orders';
      } finally {
        loading.value = false;
      }
    };

    const createOrder = async (order: Omit<Order, 'id'>) => {
      loading.value = true;
      error.value = null;
      try {
        const response = await axios.post<Order>(apiUrl, order);
        orders.value.push(response.data);
      } catch (err: any) {
        error.value = err.message || 'Failed to create order';
      } finally {
        loading.value = false;
      }
    };

    const updateOrder = async (order: Order) => {
      loading.value = true;
      error.value = null;
      try {
        await axios.put(`${apiUrl}/${order.id}`, order);
        const idx = orders.value.findIndex((o) => o.id === order.id);
        if (idx !== -1) orders.value[idx] = order;
      } catch (err: any) {
        error.value = err.message || 'Failed to update order';
      } finally {
        loading.value = false;
      }
    };

    const deleteOrder = async (id: number) => {
      loading.value = true;
      error.value = null;
      try {
        await axios.delete(`${apiUrl}/${id}`);
        orders.value = orders.value.filter((o) => o.id !== id);
      } catch (err: any) {
        error.value = err.message || 'Failed to delete order';
      } finally {
        loading.value = false;
      }
    };

    return {
      orders,
      loading,
      error,
      fetchOrders,
      createOrder,
      updateOrder,
      deleteOrder,
    };
  }
);
