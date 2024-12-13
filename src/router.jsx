
import {createBrowserRouter} from "react-router-dom"
import RootLayout from "./pages/RootLayout"
import Home from "./pages/Home"
import ListItems from "./pages/items/ListItems"
import CreateItem from "./pages/items/CreateItem"
import ShowItem from "./pages/items/ShowItem"
import UpdateItem from "./pages/items/UpdateItem"
import ItemsLayout from "./pages/items/Layout"

//ex: localhost:3000/ ---> localhost:3000/items
const router = createBrowserRouter([{
    //caminho raíz da spa
    path: "/",
    element: <RootLayout />,
    children: [
        {index: true, element: <Home />},
        //aqui nós estamos criando rotas filhas da rota raíz
        {
            path: "items",
            element: <ItemsLayout />,
            children: [ //aqui, mais rotas filhas dessa rota "items"
                {index: true, element: <ListItems />},
                {path: "new", element: <CreateItem />},
                {path: ":id", element: <ShowItem />}, //usamos ess ':id' por se tratar de uma rota dinâmica e cada item possuir um id único
                {path: ":id/update", element: <UpdateItem />},
            ]

        }
    ]
}])

export default router