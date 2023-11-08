import StoryItem from './StoryItem'


interface Props {
    epic?: any;
    listStory?: any;
}

function StoryList({
    listStory,
    epic
}:Props) {

    const reverseArray: [] = listStory?.slice().reverse();
    
    return (
        <div className='overflow-y-auto text-md' style={{height:'600px'}}>
            {reverseArray?.map((story: any) => (
                <StoryItem epic={epic} key={story?.id} story={story}/>
            ))}
        </div>
    )
}

export default StoryList