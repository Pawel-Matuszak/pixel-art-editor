import fillImage from "@/public/fillbucket.png";
import Button from "../Button";

const Fill: React.FC = () => {
  return (
    <Button toolId={3} label={"Fill"} iconSrc={fillImage.src} className={""} />
  );
};

export default Fill;
