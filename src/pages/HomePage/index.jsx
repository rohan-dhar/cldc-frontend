import UploadImagesModal from "../../components/modals/UploadImagesModal";
import { AuthPage } from "../../components/ui";

import "./home-page.css";

const HomePage = () => {
	return <AuthPage AddModal={UploadImagesModal} title="Home"></AuthPage>;
};
export default HomePage;
