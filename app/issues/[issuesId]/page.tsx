import getIssueById from "@/app/actions/getIssueById"
import HeaderIssues from "../components/HeaderIssues"
import BodyIssues from "../components/BodyIssues"


interface Props {
  issuesId: string
}

const IssuesPage = async ({ params }: { params: Props }) =>{
  const issuestId = params.issuesId
  const issue = await getIssueById(issuestId)

  return (
    <div>
      <HeaderIssues issue={issue}/>
      <BodyIssues issue={issue}/>
    </div>
  )
}

export default IssuesPage