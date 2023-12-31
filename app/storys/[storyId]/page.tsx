"use client"
import HeaderStory from "../components/HeaderStory"
import BodyStory from "../components/BodyStory"
import useStory from "@/app/hooks/useStory"
import useCurrentUser from "@/app/hooks/useCurrentUser"
import LoadingModal from "@/app/components/LoadingModal"


interface Props {
  storyId: string
}

const StoryPage = ({ params }: { params: Props }) =>{
  const {data: story, isLoading: loadingStory} = useStory(params.storyId);
  const {data: user, isLoading: loadingCurrent} = useCurrentUser();

  if(loadingStory && loadingCurrent){
    return(
      <LoadingModal />
    )
  }

  return (
    <div>
      <HeaderStory story={story} currentUser={user}/>
      <BodyStory story={story} currentUser={user}/>
    </div>
  )
}

export default StoryPage