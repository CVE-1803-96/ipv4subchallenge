export interface IPRange {
  start: number[];
  end: number[];
  desc: string;
}

export interface AddressClassification {
  type: 'private' | 'reserved' | 'multicast' | 'experimental';
  description: string;
}

export const IP_RANGES: Record<string, IPRange[]> = {
  private: [
    { start: [10, 0, 0, 0], end: [10, 255, 255, 255], desc: "Private Class A (10.0.0.0/8)" },
    { start: [172, 16, 0, 0], end: [172, 31, 255, 255], desc: "Private Class B (172.16.0.0/12)" },
    { start: [192, 168, 0, 0], end: [192, 168, 255, 255], desc: "Private Class C (192.168.0.0/16)" }
  ],
  reserved: [
    { start: [0, 0, 0, 0], end: [0, 255, 255, 255], desc: "Reserved for self-identification" },
    { start: [127, 0, 0, 0], end: [127, 255, 255, 255], desc: "Loopback addresses" },
    { start: [169, 254, 0, 0], end: [169, 254, 255, 255], desc: "Link-local addresses" }
  ],
  multicast: [
    { start: [224, 0, 0, 0], end: [239, 255, 255, 255], desc: "Multicast addresses" }
  ],
  experimental: [
    { start: [240, 0, 0, 0], end: [255, 255, 255, 254], desc: "Experimental addresses" }
  ]
};

export function generateRandomIPv4(): string {
  const octets = [];
  for (let i = 0; i < 4; i++) {
    octets.push(Math.floor(Math.random() * 256));
  }
  return octets.join('.');
}

export function isIPInRange(ip: number[], start: number[], end: number[]): boolean {
  for (let i = 0; i < 4; i++) {
    if (ip[i] < start[i] || ip[i] > end[i]) {
      return false;
    }
  }
  return true;
}

export function classifyIPAddress(ip: string): AddressClassification | null {
  const octets = ip.split('.').map(Number);
  
  // Check private ranges first
  for (const range of IP_RANGES.private) {
    if (isIPInRange(octets, range.start, range.end)) {
      return { type: 'private', description: range.desc };
    }
  }
  
  // Check other reserved ranges
  for (const range of IP_RANGES.reserved) {
    if (isIPInRange(octets, range.start, range.end)) {
      return { type: 'reserved', description: range.desc };
    }
  }
  
  // Check multicast
  for (const range of IP_RANGES.multicast) {
    if (isIPInRange(octets, range.start, range.end)) {
      return { type: 'multicast', description: range.desc };
    }
  }
  
  // Check experimental
  for (const range of IP_RANGES.experimental) {
    if (isIPInRange(octets, range.start, range.end)) {
      return { type: 'experimental', description: range.desc };
    }
  }
  
  return null;
}

export function ipToNumber(ip: string): number {
  const octets = ip.split('.').map(Number);
  return (octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3];
}

export function numberToIP(num: number): string {
  return [
    (num >>> 24) & 0xFF,
    (num >>> 16) & 0xFF,
    (num >>> 8) & 0xFF,
    num & 0xFF
  ].join('.');
}

export function calculateSubnetProperties(ip: string, subnetMask: number) {
  const ipNum = ipToNumber(ip);
  const mask = 0xFFFFFFFF << (32 - subnetMask);
  
  const networkAddress = ipNum & mask;
  const broadcastAddress = networkAddress | (~mask & 0xFFFFFFFF);
  const firstUsable = networkAddress + 1;
  const lastUsable = broadcastAddress - 1;
  
  return {
    networkAddress: numberToIP(networkAddress),
    broadcastAddress: numberToIP(broadcastAddress),
    firstUsableAddress: numberToIP(firstUsable),
    lastUsableAddress: numberToIP(lastUsable)
  };
}

export function isValidIPAddress(ip: string): boolean {
  const octets = ip.split('.');
  if (octets.length !== 4) return false;
  
  return octets.every(octet => {
    const num = parseInt(octet, 10);
    return !isNaN(num) && num >= 0 && num <= 255;
  });
}
