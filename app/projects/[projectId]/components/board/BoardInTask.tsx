import { useState } from "react";
import ColumnInBoard from "./ColumnInBoard";
import { Column, Task } from "@/app/types";
import { Flex } from "antd";


const initialColumn = [
    {
        id: 1,
        title: 'Todo',
        contents: []
    },
    {
        id: 2,
        title: 'Improgress',
        contents: []
    },
    {
        id: 3,
        title: 'Done',
        contents: []
    },
]

interface Props {
    task?: any;
}

function BoardInTask({
    task
}: Props) {

    const [columns, setColumns] = useState<Column[]>(initialColumn);
    const [tasks, setTasks] = useState<Task[]>([]);
    
    return (
        <div style={{height: "650px"}} className="mx-10">
            <Flex align={'center'} justify={'space-between'}>
                {columns?.map((column) => (
                    <ColumnInBoard issues={task} columnInfo={column} key={column?.id}/>
                ))}
            </Flex>
        </div>
    )
}

export default BoardInTask