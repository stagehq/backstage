
import { Link } from "react-router-dom";
import { Icon } from "../Icons";

const MobileEditor = () => {
  return <div className="mx-auto flex min-h-screen max-w-lg items-center justify-center px-6">
  <div>
    <div className="text-center">
      <div className="flex justify-center">
        <Icon name="ExclamationTriangleIcon" size="lg" color="warning" />
      </div>
      <h2 className="mt-2 text-lg font-medium text-gray-900">
        Editor not available for mobile devices.
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        Please go to a desktop device to edit your personal page.
      </p>
      <Link to={"/s"}>
        <a className="mt-4 inline-flex rounded-md border border-transparent bg-gray-600 py-2 px-4 text-center text-sm font-medium text-white shadow-sm hover:bg-gray-700">
          Go back to Dashboard
        </a>
      </Link>
    </div>
  </div>
</div>
}

export default MobileEditor;