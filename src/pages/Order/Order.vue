<template>
  <div>
    <h1>Restaurant Orders</h1>

    <div v-if="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <form @submit.prevent="handleCreateOrder">
      <input
        v-model="newOrderItems"
        placeholder="Order items (comma separated)"
      />
      <input v-model="newOrderStatus" placeholder="Status" />
      <button type="submit">Add Order</button>
    </form>

    <ul>
      <li v-for="order in orders" :key="order.id">
        <strong>#{{ order.id }}</strong> - {{ order.items.join(', ') }} ({{
          order.status
        }})
        <button @click="handleDeleteOrder(order.id)">Delete</button>
        <button @click="editOrder(order)">Edit</button>
      </li>
    </ul>

    <div v-if="editingOrder">
      <h3>Edit Order #{{ editingOrder.id }}</h3>
      <input
        v-model="editingOrderItems"
        placeholder="Order items (comma separated)"
      />
      <input v-model="editingOrderStatus" placeholder="Status" />
      <button @click="handleUpdateOrder">Update</button>
      <button @click="cancelEdit">Cancel</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useOrderManagement } from '../../store/useOrderManagement';

const orderStore = useOrderManagement();
const { orders, loading, error } = storeToRefs(orderStore);
const { fetchOrders, createOrder, updateOrder, deleteOrder } = orderStore;

const newOrderItems = ref('');
const newOrderStatus = ref('');
const editingOrder = ref<null | {
  id: number;
  items: string[];
  status: string;
}>(null);
const editingOrderItems = ref('');
const editingOrderStatus = ref('');

onMounted(() => {
  fetchOrders();
});

onUnmounted(() => {
  cancelEdit();
});

function handleCreateOrder() {
  if (!newOrderItems.value || !newOrderStatus.value) return;
  createOrder({
    items: newOrderItems.value.split(',').map((i) => i.trim()),
    status: newOrderStatus.value,
  });
  newOrderItems.value = '';
  newOrderStatus.value = '';
}

function handleDeleteOrder(id: number) {
  deleteOrder(id);
}

function editOrder(order: { id: number; items: string[]; status: string }) {
  editingOrder.value = { ...order };
  editingOrderItems.value = order.items.join(', ');
  editingOrderStatus.value = order.status;
}

function handleUpdateOrder() {
  if (!editingOrder.value) return;
  updateOrder({
    id: editingOrder.value.id,
    items: editingOrderItems.value.split(',').map((i) => i.trim()),
    status: editingOrderStatus.value,
  });
  cancelEdit();
}

function cancelEdit() {
  editingOrder.value = null;
  editingOrderItems.value = '';
  editingOrderStatus.value = '';
}
</script>

<style scoped>
.error {
  color: red;
  margin-bottom: 1em;
}
</style>
