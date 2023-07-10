import rectImg from "@/public/rect.png";
import { useAppDispatch, useAppSelector } from "@/src/hooks";
import { setTool } from "@/src/state/toolsSlice";
import Image from "next/image";

const Rectangle: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedTool } = useAppSelector((state) => state.tools);

  return (
    <div style={{ position: "relative" }}>
      <div
        className={`icon drawRect`}
        onClick={() => dispatch(setTool(6))}
        style={{ background: selectedTool === 6 ? "rgb(78, 78, 78)" : "" }}
      >
        <Image src={rectImg.src} alt="Rectangle tool" width={30} height={30} />
      </div>
      <span className="icon-label">Draw Rectangle</span>
    </div>
  );
};

export default Rectangle;
