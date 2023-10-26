import axios from "axios";


interface Props {
    taskId?: string;
}

export const dataTaskId = ({taskId}: Props) => {
    const fetcher = axios.get(`/api/tasks/${taskId}`).then((res) => res.data);
    return fetcher;
}