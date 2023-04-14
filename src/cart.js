import { writable } from "svelte/store";
import { browser } from "$app/environment";
import Cookies from "js-cookie";

// // array
// // @ts-ignore
// const cartItems = JSON.parse(browser && localStorage.getItem("cart")) || [];
// export const cart = writable(browser && cartItems);
// cart.subscribe((val) => browser && (localStorage.cart = JSON.stringify(val)));

const cartItems = (browser && Cookies.get("cart")) || [];
export const cart = writable(browser && cartItems);
// cart.subscribe((val) => Cookies.set("cart", val));
cart.subscribe(
  (val) => browser && (Cookies.set("cart", val), { expires: 14, path: "" })
);
