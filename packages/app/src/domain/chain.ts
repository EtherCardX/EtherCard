import type { Chain } from "@wagmi/core";

export const taiko = {
  id: 167002,
  name: "Taiko",
  network: "askja",
  nativeCurrency: {
    name: "Taiko Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    public: {
      http: ["https://rpc.a2.taiko.xyz"],
    },
    default: {
      http: ["https://rpc.a2.taiko.xyz"],
    },
  },
  blockExplorers: {
    default: {
      name: "L2 Explorer",
      url: "https://l2explorer.hackathon.taiko.xyz",
    },
  },
  testnet: true,
} as const satisfies Chain;

export const gnosis = {
  id: 100,
  name: "Gnosis",
  network: "gnosis",
  nativeCurrency: {
    name: "XDAI",
    symbol: "XDAI",
    decimals: 18,
  },
  rpcUrls: {
    public: {
      http: ["https://rpc.gnosischain.com/"],
    },
    default: {
      http: ["https://rpc.gnosischain.com/"],
    },
  },
  blockExplorers: {
    default: {
      name: "Gnosis Explorer",
      url: "https://gnosisscan.io",
    },
  },
  testnet: true,
} as const satisfies Chain;

export const scroll_testnet = {
  id: 534353,
  name: "Scroll Testnet",
  network: "scroll_testnet",
  nativeCurrency: {
    name: "Scroll Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    public: {
      http: ["https://alpha-rpc.scroll.io/l2"],
    },
    default: {
      http: ["https://alpha-rpc.scroll.io/l2"],
    },
  },
  blockExplorers: {
    default: {
      name: "Scroll Explorer",
      url: "https://blockscout.scroll.io",
    },
  },
  testnet: true,
} as const satisfies Chain;

export const mumbai = {
  id: 80001,
  name: "Mumbai",
  network: "mumbai",
  nativeCurrency: {
    name: "Matic",
    symbol: "MATIC",
    decimals: 18,
  },
  rpcUrls: {
    public: {
      http: ["https://matic-mumbai.chainstacklabs.com"],
    },
    default: {
      http: ["https://matic-mumbai.chainstacklabs.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Polygon Scan",
      url: "https://mumbai.polygonscan.com/",
    },
  },
  testnet: true,
} as const satisfies Chain;
