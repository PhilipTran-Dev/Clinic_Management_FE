import { useCallback, useState } from "react";
import { PHARMACY_ORDERS } from "../data/pharmacyMockData";
import type {
  MedicationItem,
  PaymentStatus,
  PharmacyOrder,
  PrescriptionStatus,
} from "../data/pharmacyMockData";

export function usePharmacyQueue() {
  const [orders, setOrders] = useState<PharmacyOrder[]>(PHARMACY_ORDERS);
  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    PHARMACY_ORDERS[0].orderId,
  );
  const [qrOpen, setQrOpen] = useState(false);
  const [billingQrOpen, setBillingQrOpen] = useState(false);

  const selectedOrder =
    orders.find((order) => order.orderId === selectedOrderId) ?? orders[0];

  const selectOrder = useCallback((orderId: string) => {
    setSelectedOrderId(orderId);
  }, []);

  const toggleQrScanner = useCallback(() => {
    setQrOpen((prev) => !prev);
  }, []);

  const toggleBillingQr = useCallback(() => {
    setBillingQrOpen((prev) => !prev);
  }, []);

  const updateOrderStatus = useCallback(
    (orderId: string, status: PrescriptionStatus) => {
      setOrders((prev) =>
        prev.map((order) =>
          order.orderId === orderId ? { ...order, status } : order,
        ),
      );
    },
    [],
  );

  const updatePaymentStatus = useCallback(
    (orderId: string, paymentStatus: PaymentStatus) => {
      setOrders((prev) =>
        prev.map((order) =>
          order.orderId === orderId ? { ...order, paymentStatus } : order,
        ),
      );
    },
    [],
  );

  const toggleItemPacked = useCallback((orderId: string, itemId: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.orderId !== orderId) return order;
        const items = order.items.map((item) =>
          item.id === itemId ? { ...item, isPacked: !item.isPacked } : item,
        );
        const allPacked = items.every((item) => item.isPacked);
        return {
          ...order,
          items,
          status: !allPacked
            ? "PREPARING"
            : order.status === "DISPENSED"
              ? order.status
              : "READY_FOR_PICKUP",
        };
      }),
    );
  }, []);

  const advanceToNext = useCallback(() => {
    setSelectedOrderId((current) => {
      const currentIndex = orders.findIndex(
        (order) => order.orderId === current,
      );
      const next = orders[currentIndex + 1] ?? orders[0];
      return next?.orderId ?? orders[0]?.orderId ?? "";
    });
  }, [orders]);

  const markItemPacked = (orderId: string, item: MedicationItem) =>
    toggleItemPacked(orderId, item.id);

  return {
    orders,
    selectedOrder,
    selectedOrderId,
    qrOpen,
    billingQrOpen,
    selectOrder,
    toggleQrScanner,
    toggleBillingQr,
    updateOrderStatus,
    updatePaymentStatus,
    toggleItemPacked,
    markItemPacked,
    advanceToNext,
  };
}