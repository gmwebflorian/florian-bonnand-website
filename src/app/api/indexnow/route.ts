import { NextRequest, NextResponse } from 'next/server';
import { submitToIndexNow } from '@/lib/indexnow';

/**
 * API route pour soumettre des URLs à IndexNow
 * Usage: POST /api/indexnow avec { urls: string | string[] }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { urls } = body;

    if (!urls) {
      return NextResponse.json(
        { error: 'URLs manquantes' },
        { status: 400 }
      );
    }

    const success = await submitToIndexNow(urls);

    if (success) {
      return NextResponse.json({
        success: true,
        message: 'URLs soumises à IndexNow avec succès'
      });
    } else {
      return NextResponse.json(
        { error: 'Échec de la soumission à IndexNow' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erreur API IndexNow:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

/**
 * GET pour soumettre les pages principales
 * Usage: GET /api/indexnow
 */
export async function GET() {
  try {
    const { submitMainPages } = await import('@/lib/indexnow');
    const success = await submitMainPages();

    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Pages principales soumises à IndexNow'
      });
    } else {
      return NextResponse.json(
        { error: 'Échec de la soumission' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erreur API IndexNow:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
