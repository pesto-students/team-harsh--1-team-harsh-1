import axios from 'axios';
import type { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

export async function POST( req: Request ) {
  const URL = String(process.env.NEXT_PUBLIC_API_URL)?.split('/')?.slice(0,-1)?.join('/');

  try {
    const body = await req.json();
    const res = await axios.post(`${URL}/auth/sign-in`, body)
  
    const response = NextResponse.json(res.data)

    // set token to cookies
    response.cookies?.set('token', res.data?.token, {httpOnly: true, expires: Date.now() + 24 * 60 * 60 * 1000})

    return response

  } catch (error: any) {
    console.log('[USER_POST]', error?.response?.data);
    return new NextResponse(error?.response?.data || 'Internal server error!', { 
      status: error?.response?.status || 500, 
    });
  }
};
