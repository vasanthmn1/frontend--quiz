import { configureStore } from "@reduxjs/toolkit";
import LinkScline from "../feutures/LinkScline";





export const store = configureStore({
    reducer: {
        link: LinkScline,

    },
})