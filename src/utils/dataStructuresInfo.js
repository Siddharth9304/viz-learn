import stackImg from "../utils/images/stack.png"
import queueImg from "../utils/images/queue.png"
import stackImgDark from "../utils/images/stackDark.png"
import linkedListImg from "../utils/images/linkedList.png"
import queueImgDark from "../utils/images/queueDark.png"
import linkedListImgDark from "../utils/images/linkedListDark.png"

const dataStructuresInfo = [
    {
        id: "stacks",
        name: "Stacks",
        img: stackImg,
        imgDark: stackImgDark,
        definition: "A linear data structure that follows the Last-In-First-Out (LIFO) principle",
        route: "/dashboard/stacks"
    },
    {
        id: "queues",
        name: "Queues",
        img: queueImg,
        imgDark: queueImgDark,
        definition: "A linear data structure that is open at both ends and the operations are performed in First In First Out (FIFO) order",
        route: "/dashboard/queues"
    },
    {
        id: "linkedlists",
        name: "Linked Lists",
        img: linkedListImg,
        imgDark: linkedListImgDark,
        definition: "A data structure that stores a sequence of elements",
        route: "/dashboard/linkedlists"
    },
];

export default dataStructuresInfo;