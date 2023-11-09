import getStoryById from "@/app/actions/getStoryById";
import HeaderInternalProblem from "../components/HeaderInternalProblem"
import BodyInternalProblem from "../components/BodyInternalProblem";

interface Props {
  internalproblemId: string
}

async function InternalProblemsPage({ params }: { params: Props }) {
  
  const story = await getStoryById(params?.internalproblemId);
  
  return (
    <div className="w-full h-full">
      <HeaderInternalProblem story={story}/>
      <BodyInternalProblem story={story} />
    </div>
  )
}

export default InternalProblemsPage