import type { Component } from "solid-js"
import { createSignal, onCleanup, onMount, Show } from "solid-js";
import AnimatedGrid from "../AnimatedGrid";

const VPAnimatedGrid: Component<{ animated?: boolean }> = (props) => {
  const [isVisible, setIsVisible] = createSignal(false);
  let placeholderElement: HTMLDivElement | undefined;

  onMount(() => {
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.intersectionRatio > 0) {
              setIsVisible(true);
            } else {
              setTimeout(() => setIsVisible(true), 1000);
            }
            observer.disconnect();
          }
        });
      });

      if (placeholderElement) {
        observer.observe(placeholderElement);
      }

      onCleanup(() => {
        observer.disconnect();
      });
    }
  });

  return (
    <div class="">
      <Show when={isVisible()} fallback={<div ref={el => (placeholderElement = el!)} class="w-screen h-grid"></div>}>
        <AnimatedGrid animated={props.animated} />
      </Show>
    </div>
  );
};

export default VPAnimatedGrid;
