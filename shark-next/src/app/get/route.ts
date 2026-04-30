import { NextResponse } from 'next/server';

export async function GET() {
  const script = `#!/bin/sh
set -e

# SharkAuth Installation Script
# Version: 0.1.0

OS=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m)

if [ "$ARCH" = "x86_64" ]; then
  ARCH="amd64"
elif [ "$ARCH" = "aarch64" ] || [ "$ARCH" = "arm64" ]; then
  ARCH="arm64"
fi

# Determine download URL
BINARY_URL="https://github.com/shark-auth/shark/releases/download/v0.1.0/shark-\${OS}-\${ARCH}"

echo "--- SharkAuth Installer ---"
echo "Detecting system: \${OS}/\${ARCH}"

if ! command -v curl >/dev/null 2>&1; then
    echo "Error: curl is required to install SharkAuth."
    exit 1
fi

echo "Downloading binary from \${BINARY_URL}..."
if curl -fsSL "\$BINARY_URL" -o shark; then
    chmod +x shark
    echo "Successfully downloaded shark binary."
else
    echo "Error: Failed to download binary. Please check your internet connection or the version."
    exit 1
fi

echo ""
echo "SharkAuth v0.1.0 installed successfully!"
echo "----------------------------------------"
echo "To start the server, run:"
echo "  shark serve"
echo ""
echo "To see available commands:"
echo "  shark --help"
echo ""
`;

  return new NextResponse(script, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
