import type { Component } from "solid-js";
import { createSignal, onCleanup, onMount, For } from "solid-js";
import "./AnimatedGrid.css";

const AnimatedGrid: Component<{ animated?: boolean }> = (props) => {
  const [lines, setLines] = createSignal<(number | "bottom")[]>([]); 
  const [bottomLineVisible, setBottomLineVisible] = createSignal(false); 

  const totalColumns = 64; 
  const columnWidth = 10; 
  const strokeColor = "#a5b4fc"
  const strokeWidth = 0.5
  const midIndex = Math.floor(totalColumns / 2);
  const columns = Array.from({ length: totalColumns }, (_, i) => (i - midIndex) * columnWidth);

  let timeoutId: number;

  onMount(() => {
    if (props.animated) {
      columns.slice(midIndex).forEach((column, index) => {
        timeoutId = setTimeout(() => {
          setLines((prev) => [...prev, column, -column]);
        }, index * 10); 
      });

      timeoutId = setTimeout(() => {
        setBottomLineVisible(true);
      }, columns.length / 5 * 10); 
    } else {
      setLines(columns.flatMap((column) => [column, -column]));
      setBottomLineVisible(true);
    }
  });

  onCleanup(() => {
    clearTimeout(timeoutId);
  });

  return (
    <svg viewBox="0 0 640 10" xmlns="http://www.w3.org/2000/svg" class="w-screen">
      <For each={lines()}>
        {(x) => (
          <line
            //@ts-ignore
            x1={x + 320} y1="0" x2={x + 320} y2="10"
            stroke={strokeColor}
            stroke-width={strokeWidth}
            class={props.animated ? "vertical-line" : ""}
          />
        )}
      </For>

      {bottomLineVisible() && (
        <>
          <line x1="320" y1="10" x2="0" y2="10" stroke={strokeColor} stroke-width={strokeWidth} class={props.animated ? "horizontal-line-center-left": ""} />
          <line x1="320" y1="10" x2="640" y2="10" stroke={strokeColor} stroke-width={strokeWidth} class={props.animated ? "horizontal-line-center-right": ""} />
        </>
      )}
    </svg>
  );
};

export default AnimatedGrid;
