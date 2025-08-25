// lib/auth.ts

import jwt from 'jsonwebtoken';

type VerifyAuthResult = {
  fullName?: any;
  role?: string;
  success: boolean
  user?: any
};

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function verifyJWT(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

// Helper used by API routes to authenticate requests from cookies
export async function verifyAuth(request: any): Promise<VerifyAuthResult> {
  try {
    // Try NextRequest cookies API first
    const cookieToken = request?.cookies?.get?.('auth-token')?.value || request?.cookies?.get?.('token')?.value
    let token: string | undefined = cookieToken

    // Fallback to raw cookie header parsing
    if (!token) {
      const cookieHeader: string = request?.headers?.get?.('cookie') || ''
      token = cookieHeader
        .split('; ')
        .map((c) => c.split('='))
        .find(([k]) => k === 'auth-token' || k === 'token')?.[1]
    }

    if (!token) {
      return { success: false }
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any
    if (!decoded) {
      return { success: false }
    }

    return { success: true, user: decoded }
  } catch (_err) {
    return { success: false }
  }
}
