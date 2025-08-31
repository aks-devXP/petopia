import React, { useState } from "react";
import { Minus, Plus, Trash2, MapPin, } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Cat Toy",
    img: "", 
    estimatedDate: "June 6th",
    price: 469.99,
    quantity: 1,
  },
  {
    id: 2,
    name: "Solo Stove Grill Ultimate Bundle",
    img: "",
    estimatedDate: "June 8th",
    price: 549.99,
    quantity: 1,
  },
  {
    id: 3,
    name: "Solo Stove Starters (4 pack)",
    img: "",
    estimatedDate: "June 10th",
    price: 0.0,
    quantity: 1,
  },
  {
    id: 4,
    name: "Solo Stove Charcoal Grill Pack",
    img: "",
    estimatedDate: "June 12th",
    price: 0.0,
    quantity: 1,
  },
];

export default function Cart() {
  const [cart, setCart] = useState(products);

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity + delta > 0
          ? { ...item, quantity: item.quantity + delta }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = subtotal * 0.1;
  const grandTotal = subtotal - discount;

  return (
    <div className="pt-28 w-full bg-[#1A120B] text-[#E5E5CB]">
      <h2 className="text-2xl font-bold text-center">Your Cart ({cart.length} items)</h2>

      <div className="flex justify-center p-4 gap-4">
        <div className="w-[70%]">
          <div className="w-full bg-[#3C2A21] p-6 shadow-md rounded-lg">
          <div className="grid grid-cols-6 gap-4 border-b border-[#E5E5CB]/50 pb-4 mb-4 text-[#E5E5CB]/50 text-center">
            <p></p>
            <p></p>
            <p>Estimated Date</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total Price</p>
          </div>

            {cart.map((item) => (
              <div key={item.id} className="grid grid-cols-6 gap-4 items-center border-b border-[#E5E5CB]/50 pb-4 mb-4 text-center">
                <img src={item.img} alt={item.name} className="w-20 h-20 object-cover" />
                <p>{item.name}</p>
                <p className="text-white/70">{item.estimatedDate}</p>
                <p>₹{item.price.toFixed(2)}</p>
                <div className="flex items-center">

                  <div className="border mr-2 rounded-xl flex">
                    <button className="border px-2" onClick={() => updateQuantity(item.id, -1)}>
                      <Minus size={14} />
                    </button>
                    <input type="text" value={item.quantity} className="w-10 text-center border bg-transparent" readOnly />
                    <button className="border px-2" onClick={() => updateQuantity(item.id, 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-red-500">
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="flex items-end ml-8">
                  <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-[30%] bg-[#3C2A21] p-6 shadow-md rounded-lg h-fit flex flex-col">
          <div className="flex">
            <div className="flex w-full hover:cursor-pointer flex-col py-2 border-b-2">
              <div className="flex items-center text-sm">
                <MapPin size={12} className="text-white/60" />
                <span className='text-white/60 ml-1'>Deliver to</span>
              </div>
              <div className="font-semibold text-white">Address 123</div>
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold flex justify-between mt-2">
              <p>Subtotal:</p>
              <p>₹{subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-lg">
              <p>Discount (10%):</p>
              <p>₹{discount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-xl font-bold mt-4">
              <p>Grand Total:</p>
              <p>₹{grandTotal.toFixed(2)}</p>
            </div>
            <p className="text-green-600 text-sm mt-4">
              Congrats, you're eligible for <span className="font-bold">Free Shipping</span>.
            </p>
            <button className="mt-2 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
              Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
