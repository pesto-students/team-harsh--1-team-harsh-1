import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from '@/actions/get-token';

export async function PATCH( req: Request, { params }: { params: { addressId: string } } ) {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/addresses/${params?.addressId}`;
  const config = {
    headers: { 'Authorization': 'Bearer ' + getToken() }
  };
  
  try {
    const address = await req.json();
    const res = await axios.patch(URL, address, config);
  
    return NextResponse.json(res.data)

  } catch (error: any) {
    console.log('[ADDRESS_PATCH]', error?.response?.data);
    return new NextResponse(error?.response?.data || 'Internal server error!', { 
      status: error?.response?.status || 500, 
    });
  }
};

export async function DELETE( req: Request, { params }: { params: { addressId: string } } ) {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/addresses/${params?.addressId}`;
  const config = {
    headers: { 'Authorization': 'Bearer ' + getToken() }
  };
  
  try {
    const res = await axios.delete(URL, config);
  
    return NextResponse.json(res.data)

  } catch (error: any) {
    console.log('[ADDRESS_PATCH]', error?.response?.data);
    return new NextResponse(error?.response?.data || 'Internal server error!', { 
      status: error?.response?.status || 500, 
    });
  }
};