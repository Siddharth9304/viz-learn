import infixToPostfixImg from "../utils/images/infixToPostfix.png"
import infixToPostfixImgDark from "../utils/images/infixToPostfixDark.png"
import linearSearchImg from "../utils/images/linearSearch.png"
import linearSearchImgDark from "../utils/images/linearSearchDark.png"
import bfsTraversalImg from "../utils/images/bfsTraversal.png"
import bfsTraversalImgDark from "../utils/images/bfsTraversalDark.png"

const algorithmsInfo = [
    {
        id: "infixtopostfix",
        name: "Infix to Postfix",
        img: infixToPostfixImg,
        imgDark: infixToPostfixImgDark,
        definition: "Convert infix expression to postfix by just entering infix expression",
        route: "/dashboard/infix-to-postfix"
    },
    {
        id: "linearsearch",
        name: "Linear Search",
        img: linearSearchImg,
        imgDark: linearSearchImgDark,
        definition: "Linear search checks each element sequentially until the target is found or the list ends",
        route: "/dashboard/linearsearch"
    },
    {
        id: "bfstraversal",
        name: "BFS Traversal",
        img: bfsTraversalImg,
        imgDark: bfsTraversalImgDark,
        definition: "A graph traversal algorithm that explores nodes level by level, visiting all neighbors of a node before moving deeper, using a queue",
        route: "/dashboard/bfs-traversal"
    },
];

export default algorithmsInfo;
