import { useNavigate } from "react-router-dom";
import { HeroSection } from "@/components/sections/HeroSection";

export default function Home() {
  const navigate = useNavigate();

  return (
    <HeroSection
      onPrimaryCta={() => navigate("/projects")}
      onSecondaryCta={() => navigate("/contact")}
    />
  );
}
