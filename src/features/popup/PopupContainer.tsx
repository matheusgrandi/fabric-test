import { Separator } from "@radix-ui/themes";
import EnhancerPage from "../enhancer/EnhancerPage";
import SettingsPage from "../settings/SettingsPage";
import PopupHeader from "./components/PopupHeader";
import PopupLayout from "./components/PopupLayout";
import { useNavigation } from "./hooks/useNavigation";

const PopupContainer: React.FC = () => {
  const { navigateTo, isOnPage } = useNavigation();

  const handleOpenSettings = () => navigateTo("settings");
  const handleBackToEnhancer = () => navigateTo("enhancer");

  return (
    <PopupLayout>
      {isOnPage("enhancer") ? (
        <>
          <PopupHeader onOpenSettings={handleOpenSettings} />
          <Separator size="4" />
          <EnhancerPage />
        </>
      ) : (
        <SettingsPage onBack={handleBackToEnhancer} />
      )}
    </PopupLayout>
  );
};

export default PopupContainer;
