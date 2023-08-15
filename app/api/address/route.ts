import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from '@/actions/get-token';

export async function GET( req: NextRequest ) {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/addresses`;

  const config = {
    headers: { 'Authorization': 'Bearer ' + getToken() }
  };

  try {
    const res = await axios.get(URL, config);
  
    const response = NextResponse.json(res.data)

    return response

  } catch (error: any) {
    console.log('[ADDRESS_GET]', error?.response);
    return new NextResponse(error?.response?.data || 'Internal server error!', { 
      status: error?.response?.status || 500, 
    });
  }
};


export async function POST( req: Request ) {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/addresses`;
  const config = {
    headers: { 'Authorization': 'Bearer ' + getToken() }
  };
  
  try {
    const address = await req.json();
    const res = await axios.post(URL, address, config);
  
    const response = NextResponse.json(res.data)

    return response

  } catch (error: any) {
    console.log('[ADDRESS_POST]', error?.response?.data);
    return new NextResponse(error?.response?.data || 'Internal server error!', { 
      status: error?.response?.status || 500, 
    });
  }
};
