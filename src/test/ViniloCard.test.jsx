import {describe, it, expect} from 'vitest';

import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import ViniloCard from '../components/ViniloCard';
import { formatPrice } from "../utils/formatPrice";
import { CartProvider } from "../context/CartContext.jsx";


const vinilo = {
    _id: "1",
    title: "Prisma",
    genre : "rock",
    year: 1972,
    price: 29.99,
    image: "https://example.com/Prisma.jpg",
};


describe ("ViniloCard", ()=>{
   it('espero que muestre la informacion de un vinilo', () => {
       render(
        <MemoryRouter>
            <CartProvider>
                <ViniloCard vinilo={vinilo}/>
            </CartProvider>
        </MemoryRouter>
       );

       const image = screen.getByAltText("Prisma");
       expect(image).toBeInTheDocument();
       expect(image).toHaveAttribute('src', 'https://example.com/Prisma.jpg');
       expect(screen.getByText("Prisma")).toBeInTheDocument();
       expect(screen.getByText("rock")).toBeInTheDocument();
       expect(screen.getByText("1972")).toBeInTheDocument();
       expect(screen.getByText(formatPrice(vinilo.price))).toBeInTheDocument();
       expect(screen.getAllByAltText("Prisma")).toHaveLength(1);
       
   });
});