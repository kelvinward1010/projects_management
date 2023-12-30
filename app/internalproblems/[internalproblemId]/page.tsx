"use client"
import HeaderInternalProblem from "../components/HeaderInternalProblem"
import BodyInternalProblem from "../components/BodyInternalProblem";
import useStory from "@/app/hooks/useStory";
import LoadingModal from "@/app/components/LoadingModal";

interface Props {
  internalproblemId: string
}

function InternalProblemsPage({ params }: { params: Props }) {
  
  const {data: story, isLoading: loadingStory} = useStory(params?.internalproblemId);

  if(loadingStory){
    return(
      <LoadingModal />
    )
  }

  return (
    <div className="w-full h-full">
      <HeaderInternalProblem story={story}/>
      <BodyInternalProblem story={story} />
    </div>
  )
}

export default InternalProblemsPage