/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bu ayar, projeyi Docker ile paketlerken boyutunu küçültür
  output: "standalone", 
};

export default nextConfig;