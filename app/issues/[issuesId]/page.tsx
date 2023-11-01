import getIssueById from "@/app/actions/getIssueById"
import HeaderIssues from "../components/HeaderIssues"
import BodyIssue from "../components/BodyIssue"
import getCurrentUser from "@/app/actions/getCurrentUser"


interface Props {
  issuesId: string
}

const IssuesPage = async ({ params }: { params: Props }) =>{
  const issuestId = params.issuesId
  const issue = await getIssueById(issuestId);
  const currentUser = await getCurrentUser();

  return (
    <div>
      <HeaderIssues issue={issue}/>
      <BodyIssue issue={issue} currentUser={currentUser}/>
    </div>
  )
}

export default IssuesPage