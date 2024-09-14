'use client';
import React, { useEffect, useRef } from "react";
import "./Firework.css";
import { GiWaterDrop } from "react-icons/gi";
import { Hanabi } from "@/models/hanabi";
import Link from "next/link";

interface FireworkProps {
  hanabis: Hanabi[];
}

const getColor = (category: string): string => {
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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stars = document.querySelector(".stars") as HTMLElement | null;

    const createStar = (): void => {
      if (!stars) return;

      const starEl = document.createElement("span");
      starEl.className = "star";
      const minSize = 1;
      const maxSize = 2;
      const size = Math.random() * (maxSize - minSize) + minSize;
      starEl.style.width = `${size}px`;
      starEl.style.height = `${size}px`;
      starEl.style.left = `${Math.random() * 100}%`;
      starEl.style.top = `${Math.random() * 100}%`;
      starEl.style.animationDelay = `${Math.random() * 10}s`;
      stars.appendChild(starEl);
    };

    // 星の親要素の高さをスクロール領域に合わせて設定
    if (containerRef.current) {
      stars.style.height = `${containerRef.current.scrollHeight}px`; // スクロール全体に対応
    }

    // 星を100個生成
    for (let i = 0; i <= 100; i++) {
      createStar();
    }
  }, []);

  return (
    <div className="firework-container stars" ref={containerRef} style={{ overflowY: "scroll", maxHeight: "100vh", position: "relative" }}>
      {hanabis.map((item, itemIndex) => (
        <div
          key={item.Name}
          className="firework-item"
          style={{ marginBottom: "4rem", position: "relative" }}
        >
          <div
            style={{
              top: `${itemIndex * 300}px`,
              left: "0",
              zIndex: 1,
              position: "relative",
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
                  top: `${itemIndex * 300}px`,
                  left: "0",
                  zIndex: 1,
                  position: "relative",
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
            {item.CommentCount >= 2 && (
              <div
                style={{
                  top: `${itemIndex * 300}px`,
                  left: "0",
                  zIndex: 2,
                  position: "relative",
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
              <div
                style={{
                  top: `${itemIndex * 300}px`,
                  left: "0",
                  zIndex: 3,
                  position: "relative",
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

