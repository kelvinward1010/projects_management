import StoryItem from './StoryItem'


interface Props {
    listStory?: any;
}

function StoryList({
    listStory,
}:Props) {

    const reverseArray: [] = listStory?.slice().reverse();
    
    return (
        <div className='overflow-y-auto text-md' style={{height:'600px'}}>
            {reverseArray?.map((story: any) => (
                <StoryItem key={story?.id} story={story}/>
            ))}
        </div>
    )
}

export default StoryList