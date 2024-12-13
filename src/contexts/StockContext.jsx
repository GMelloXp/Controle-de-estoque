import { createContext, useState } from "react";
import PropTypes from "prop-types"

export const StockContext = createContext({})

//vamos tipar a nossa prop com o prop-types
StockContextProvider.propTypes = {
    children: PropTypes.node
}

/* 
    formato do item em forma de objeto:
    Item
    {name, description, quantity, price, category, createdAt, updatedAt}
*/
export function StockContextProvider({children}) {
    const [items, setItems] = useState(() => {
        const storedItems = localStorage.getItem('item-stock')
        if(!storedItems) return []
        const items = JSON.parse(storedItems)
        items.forEach((item) => {
            item.createdAt = new Date(item.createdAt)
            item.updatedAt = new Date(item.updatedAt)
        })
        return items 
    })

    //vamos criar uma função para adicionar um item ao stock
    const addItem = (item) => {
        setItems(currentState => {
            const updatedItems = [item, ...currentState]
            localStorage.setItem('item-stock', JSON.stringify(updatedItems))
            return updatedItems
        })
    }

    //função para devolver um item específico

    const getItem = (itemId) => {
        return items.find(item => item.id === +itemId)
    }

    //função para atualizar um item

    const updateItem = (itemId, newAttributes) => {
        setItems(currentState => {
            const itemIndex = currentState.findIndex(item => item.id === +itemId)
            const updatedItems = [...currentState]
            Object.assign(updatedItems[itemIndex], newAttributes, {updatedAt: new Date()} )
            localStorage.setItem('item-stock', JSON.stringify(updatedItems))
            return updatedItems
        })
    }

    //função para excluir um item

    const deleteItem = (itemId) => {
        setItems(currentState => {
            const updatedItems = currentState.filter(item => item.id !== itemId)
            localStorage.setItem('item-stock', JSON.stringify(updatedItems))
            return updatedItems
        })
    }

    //o objeto a baixo vai ser chamado como value no nosso contexto
    const stock = {
        items, 
        addItem,
        getItem,
        updateItem,
        deleteItem
    }
    return(

        <StockContext.Provider value={stock}>
            {children}
        </StockContext.Provider>
    )
}