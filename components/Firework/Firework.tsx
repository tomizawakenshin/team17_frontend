import React from "react";
import "./Firework.css";
import { GiWaterDrop } from "react-icons/gi";
import { Hanabi } from "@/models/hanabi";
import Link from "next/link";

interface FireworkProps {
  hanabis: Hanabi[];
}

const getColor = (category: string) => {
  switch (category) {
    case "music":
      return "red";
    case "movie":
      return "royalblue";
    case "comedy":
      return "purple";
    case "art":
      return "yellow";
    case "hackathon":
      return "green";
    case "other":
      return "orange";
    default:
      return "gray";
  }
};

const Firework: React.FC<FireworkProps> = ({ hanabis }) => {
  return (
    <div className="firework-container">
      {hanabis.map((item, itemIndex) => (
        <div
          key={item.Name}
          className="firework-item"
          style={{ position: "relative", marginBottom: "4rem" }}
        >
          <div
            style={{
              position: "absolute",
              top: `${itemIndex * 300}px`,
              left: "0",
              zIndex: 1,
            }}
          >
            <div
              className="center-dot"
              style={{ opacity: 0.2, backgroundColor: getColor(item.Tag) }}
            ></div>
            {Array.from({ length: 6 }).map((_, index) => (
              <GiWaterDrop
                key={`base-dot1-${item.Name}-${index}`}
                className="dot1"
                style={
                  {
                    "--n": index,
                    position: "absolute",
                    color: getColor(item.Tag),
                    opacity: 0.2,
                  } as React.CSSProperties
                }
              />
            ))}
            {Array.from({ length: 12 }).map((_, index) => (
              <GiWaterDrop
                key={`base-dot2-${item.Name}-${index}`}
                className="dot2"
                style={
                  {
                    "--n": index,
                    position: "absolute",
                    color: getColor(item.Tag),
                    opacity: 0.2,
                  } as React.CSSProperties
                }
              />
            ))}
            {Array.from({ length: 24 }).map((_, index) => (
              <GiWaterDrop
                key={`base-dot3-${item.Name}-${index}`}
                className="dot3"
                style={
                  {
                    "--n": index,
                    position: "absolute",
                    color: getColor(item.Tag),
                    opacity: 0.2,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
          <Link href={`/comment/${encodeURIComponent(item.Name)}`}>
            {item.CommentCount >= 1 && (
              <div
                style={{
                  position: "absolute",
                  top: `${itemIndex * 300}px`,
                  left: "0",
                  zIndex: 1,
                }}
              >
                <div
                  className="center-dot"
                  style={{ opacity: 1, backgroundColor: getColor(item.Tag) }}
                ></div>
                {Array.from({ length: 6 }).map((_, index) => (
                  <GiWaterDrop
                    key={`dot1-${item.Name}-${index}`}
                    className="dot1"
                    style={
                      {
                        "--n": index,
                        position: "absolute",
                        color: getColor(item.Tag),
                        opacity: 1,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </div>
            )}
            {/* {item.CommentCount >= 7 && ( */}
            {item.CommentCount >= 2 && (
              <div
                style={{
                  position: "absolute",
                  top: `${itemIndex * 300}px`,
                  left: "0",
                  zIndex: 2,
                }}
              >
                {Array.from({ length: 12 }).map((_, index) => (
                  <GiWaterDrop
                    key={`dot2-${item.Name}-${index}`}
                    className="dot2"
                    style={
                      {
                        "--n": index,
                        position: "absolute",
                        color: getColor(item.Tag),
                        opacity: 1,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </div>
            )}
            {item.CommentCount >= 3 && (
              // {item.CommentCount >= 13 && (
              <div
                style={{
                  position: "absolute",
                  top: `${itemIndex * 300}px`,
                  left: "0",
                  zIndex: 3,
                }}
              >
                {Array.from({ length: 24 }).map((_, index) => (
                  <GiWaterDrop
                    key={`dot3-${item.Name}-${index}`}
                    className="dot3"
                    style={
                      {
                        "--n": index,
                        position: "absolute",
                        color: getColor(item.Tag),
                        opacity: 1,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </div>
            )}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Firework;
