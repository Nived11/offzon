import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // 1. ടോക്കണുകൾ എടുക്കുന്നു (രണ്ടിനും വെവ്വേറെ പേരാണ് കൊടുക്കേണ്ടത്)
  const hasBusinessToken = request.cookies.has('access_token');
  const hasAdminToken = request.cookies.has('admin_token'); // അഡ്മിൻ ടോക്കൺ

  // ---------------------------------------------------
  // 🏢 BUSINESS ROUTES LOGIC (/business വെച്ച് തുടങ്ങുന്നവ)
  // ---------------------------------------------------
  if (path.startsWith('/business')) {
    const isBusinessPublicPath = ['/business', '/business/login', '/business/register', '/business/forgot-password', '/business/reset-password', '/business/verify-otp'].includes(path);
    const isBusinessProtectedPath = path.startsWith('/business/dashboard') || path.startsWith('/business/posters-add') || path.startsWith('/business/settings');

    if (isBusinessPublicPath && hasBusinessToken) {
      return NextResponse.redirect(new URL('/business/dashboard', request.url));
    }
    if (isBusinessProtectedPath && !hasBusinessToken) {
      return NextResponse.redirect(new URL('/business/login', request.url));
    }
  }

  // ---------------------------------------------------
  // 🛡️ ADMIN ROUTES LOGIC (/admin വെച്ച് തുടങ്ങുന്നവ)
  // ---------------------------------------------------
  if (path.startsWith('/admin')) {
    const isAdminPublicPath = ['/admin/login'].includes(path); // അഡ്മിന് രജിസ്റ്റർ ഇല്ലല്ലോ
    const isAdminProtectedPath = path.startsWith('/admin/dashboard') || path.startsWith('/admin/users');

    if (isAdminPublicPath && hasAdminToken) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    if (isAdminProtectedPath && !hasAdminToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/business/:path*', // ബിസിനസ്സ് റൂട്ടുകൾ മിഡിൽവെയർ ചെക്ക് ചെയ്യണം
    '/admin/:path*',    // അഡ്മിൻ റൂട്ടുകളും മിഡിൽവെയർ ചെക്ക് ചെയ്യണം
  ],
};