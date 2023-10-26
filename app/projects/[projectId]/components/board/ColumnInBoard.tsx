import { Typography } from "antd"
import TaskInColumn from "./TaskInColumn";


const { Title } = Typography;

interface Props {
    columnInfo?: any;
    issues?: any;
}

function ColumnInBoard({
    columnInfo,
    issues
}: Props) {
    return (
        <div
            style={{height: "550px"}}
            className='
                mt-10
                w-96
                h-full
                border-2
                border-emerald-400
                rounded-md
                text-black
            '
        >
            <div className="w-full text-white h-12 bg-teal-600 flex justify-center items-center">
                <Title style={{color:"white"}} level={3}>{columnInfo?.title}</Title>
            </div>
            <div className="overflow-y-auto flex flex-col gap-y-2">
                {issues?.map((issue: any) =>(
                    <TaskInColumn key={issue?.id} issues={issue}/>
                ))}
            </div>
        </div>
    )
}

export default ColumnInBoard