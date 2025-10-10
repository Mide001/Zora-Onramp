import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json();

    if (!username) {
      return NextResponse.json({ isValid: false, error: 'Username is required' });
    }

    // Call the backend API to validate the Zora username
    const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001'}/api/validate-zora-username`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error validating Zora username:', error);
    return NextResponse.json({ isValid: false, error: 'Failed to validate username' });
  }
}
