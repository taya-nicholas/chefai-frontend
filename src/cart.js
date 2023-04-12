// import { browser } from '$app/environment';
// import { writable, get } from 'svelte/store';

// export const cartItems = writable<Number[]>((browser && JSON.parse(localStorage.getItem("cartItems"))) || [1, 2, 4]);

// export const addToCart = (id: number) => {
//     let items = get(cartItems);
//     const index = items.indexOf(id);

//     if (index === -1) {
//         items.push(id);
//     } else {
//         items.splice(index, 1);
//     }

//     cartItems.set(items);
// }

import { writable } from "svelte/store";
import { browser } from "$app/environment";

// array
// @ts-ignore
const cartItems = JSON.parse(browser && localStorage.getItem("cart")) || [];
export const cart = writable(browser && cartItems);
cart.subscribe((val) => browser && (localStorage.cart = JSON.stringify(val)));
