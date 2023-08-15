import { Order } from "@/types";
import { getToken } from "./get-token";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/my-orders`;

const getOrders = async (): Promise<Order[]> => {
  const config = {
    headers: { 'Authorization': 'Bearer ' + getToken() }
  };

  const res = await fetch(URL, config);

  return res.json();
};

export default getOrders;
