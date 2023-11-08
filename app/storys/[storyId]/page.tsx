import HeaderIssues from "../components/HeaderStory"
import BodyIssue from "../components/BodyStory"
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
      <HeaderIssues story={story}/>
      <BodyIssue story={story} currentUser={currentUser}/>
    </div>
  )
}

export default StoryPage