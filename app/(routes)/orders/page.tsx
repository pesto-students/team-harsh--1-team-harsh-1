import { OrderColumn } from "./components/columns"
import getOrders from "@/actions/get-orders";
import { formatter } from "@/lib/utils";
import { OrderClient } from "./components/client";
import Container from "@/components/ui/container";


const OrdersPage = async () => {

  const orders = await getOrders();
  
  console.log('Pahe Orderd', orders)

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    address: Object.values(item.address)?.join(', '),
    products: item.orderItems.map(({quantity, product}) => `${quantity} x ${product.name}`).join(', '),
    totalPrice: formatter.format(item.orderItems.reduce((total, item) => {
      return total + (Number(item.product.price) * item.quantity)
    }, 0)),
    isPaid: item.isPaid,
  }));

  return (
    <div className="bg-white">
      <Container>
        <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <OrderClient data={formattedOrders} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OrdersPage;
