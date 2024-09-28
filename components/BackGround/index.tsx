import type { Component, JSXElement } from "solid-js";
import { on, onMount, onCleanup, createSignal, For } from "solid-js";
import VPAnimatedGrid from "../VPAnimatedGrid";

const BackGround: Component<{ children: JSXElement; animated?: boolean }> = (props) => {
    let slotRef: HTMLDivElement | undefined;

    let [gridNum, setGridNum] = createSignal<number>(0)

    const updateHeight = () => {
        if (slotRef) {
            const clientHeight = slotRef.clientHeight
            const innerWidth = window.innerWidth
            const gridHeight = innerWidth * ( 1.5625 / 100 )
            console.log(clientHeight, innerWidth, gridHeight)
            setGridNum(Math.ceil(clientHeight / gridHeight))
        }
    }

    onMount(() => {
        window.addEventListener("load", updateHeight)
        window.addEventListener("resize", updateHeight);
        onCleanup(() => {
            window.addEventListener("resize", updateHeight);
        })
    })
    
    return (
        <div>
            <div class="relative">
                <For each={[...Array(gridNum())]}>
                    {(_) => <VPAnimatedGrid animated={props.animated} />}
                </For>
            </div>
            <div class="absolute inset-0">
                <div ref={slotRef}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default BackGround