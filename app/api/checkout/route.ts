import axios from 'axios';
import { NextResponse } from 'next/server';
import { getToken } from '@/actions/get-token';

export async function POST( req: Request ) {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/checkout`;
  const config = {
    headers: { 'Authorization': 'Bearer ' + getToken() }
  };
  
  try {
    const payload = await req.json();
    const res = await axios.post(URL, payload, config);
  
    const response = NextResponse.json(res.data)

    return response

  } catch (error: any) {
    console.log('[CHECKOUT_POST]', error?.response);
    return new NextResponse(error?.response?.data || 'Internal server error!', { 
      status: error?.response?.status || 500, 
    });
  }
};
