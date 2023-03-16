import { writable } from "svelte/store";

export const amount = writable(0);
export const isScanning = writable(false);
export const scanStatus = writable("normal"); // normal, scanning, success
export const userETH = writable("");
