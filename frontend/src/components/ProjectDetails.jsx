import { useParams } from "react-router-dom";

import MemberSelector
from "../components/MemberSelector";

export default function ProjectDetails() {

  const { id } = useParams();

  return (

    <div className="p-5">

      <h1 className="text-3xl font-bold mb-5">
        Project Details
      </h1>

      <MemberSelector projectId={id} />

    </div>

  );

}