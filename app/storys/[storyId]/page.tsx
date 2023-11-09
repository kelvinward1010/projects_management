import HeaderStory from "../components/HeaderStory"
import BodyStory from "../components/BodyStory"
import getCurrentUser from "@/app/actions/getCurrentUser"
import getStoryById from "@/app/actions/getStoryById"


interface Props {
  storyId: string
}

const StoryPage = async ({ params }: { params: Props }) =>{
  const storyId = params.storyId
  const story = await getStoryById(storyId);
  const currentUser = await getCurrentUser();

  return (
    <div>
      <HeaderStory story={story}/>
      <BodyStory story={story} currentUser={currentUser}/>
    </div>
  )
}

export default StoryPage