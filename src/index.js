import React from "react";
import ReactDOM from "react-dom/client"
import Home from "./components/Home";
import About from "./components/About";
import DashBoard from "./components/DashBoard";
import DashBoardElements from "./components/DashBoardElements";
import QueueVisualizer from "./components/QueueVisualizer";
import { Provider } from "react-redux";
import store from "./store"
import { BrowserRouter, Routes, Route } from "react-router";
import StackVisualizer from "./components/StackVisualizer";
import LinkedListVisualizer from "./components/LinkedListVisualizer";
import BfsTraversal from "./components/BfsTraversal";
import InfixToPostfixVisualizer from "./components/InfixToPostfixVisualizer";
import LinearSearchVisualizer from "./components/LinearSearchVisualizer";

function App(){

    return(
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/about" element={<About/>} />
                    <Route path="/dashboard" element={<DashBoard/>}>
                        <Route index element={<DashBoardElements/>}></Route>
                        <Route path="stacks" element={<StackVisualizer/>}></Route>
                        <Route path="queues" element={<QueueVisualizer/>}></Route>
                        <Route path="linkedlists" element={<LinkedListVisualizer/>}></Route>
                        <Route path="infix-to-postfix" element={<InfixToPostfixVisualizer/>}></Route>
                        <Route path="linearsearch" element={<LinearSearchVisualizer/>}></Route>  
                        <Route path="bfs-traversal" element={<BfsTraversal/>}></Route> 
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);