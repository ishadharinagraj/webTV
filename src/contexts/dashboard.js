import {createContext} from 'react'

export const DashboardContext = createContext({
    dashboard : {
        items : [],
        categories : [],
        toggle : () => {}
    },
    series : {
        items : [],
        categories : [],
        toggle : () => {}
    },
});