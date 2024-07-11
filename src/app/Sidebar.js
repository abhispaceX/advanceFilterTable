import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faFolderOpen, faComments, faRocket, faCog, faUsers, faBolt, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Sidebar = () => {
  return (
    <div className="w-full bg-white text-black h-full">
      <div className="p-4 text-2xl font-bold">
        Company.ai
      </div>
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-gray-400 font-light">Quick Link</h2>
          <ul className="mt-2 ml-3 space-y-2">
            <li className="flex hover:text-blue-500 items-center space-x-2">
              <FontAwesomeIcon icon={faTachometerAlt} />
              <span>Dashboard</span>
            </li>
            <li className="flex hover:text-blue-500 items-center space-x-2">
              <FontAwesomeIcon icon={faMobileAlt} />
              <span>Segmentation</span>
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="text-gray-400 font-light">Marketing</h2>
          <ul className="mt-2 ml-3 space-y-2">
            <li className="flex hover:text-blue-500 items-center space-x-2">
              <FontAwesomeIcon icon={faBolt} />
              <span>Campaigns</span>
            </li>
            <li className="flex hover:text-blue-500 items-center space-x-2">
              <FontAwesomeIcon icon={faFolderOpen} />
              <span>Templates</span>
            </li>
            <li className="flex hover:text-blue-500 items-center space-x-2">
              <FontAwesomeIcon icon={faRocket} />
              <span>Automation Rules</span>
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="text-gray-400 font-light">Support</h2>
          <ul className="mt-2 ml-3 space-y-2">
            <li className="flex hover:text-blue-500 items-center space-x-2">
              <FontAwesomeIcon icon={faComments} />
              <span>Chat Agent</span>
            </li>
            <li className="flex hover:text-blue-500 items-center space-x-2">
              <FontAwesomeIcon icon={faWhatsapp} />
              <span>Whatsapp Bot</span>
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="text-gray-400 font-light">Sales</h2>
          <ul className="mt-2 ml-3 space-y-2">
            <li className="flex hover:text-blue-500 items-center space-x-2">
              <FontAwesomeIcon icon={faUsers} />
              <span>Sales</span>
            </li>
          </ul>
        </div>
        <div className="mt-auto p-4">
          <ul className="mt-2 space-y-2">
            <li className="flex hover:text-blue-500 items-center space-x-2">
              <FontAwesomeIcon icon={faCog} />
              <span>Settings</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;