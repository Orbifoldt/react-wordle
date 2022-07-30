import { ComponentStory, ComponentMeta } from "@storybook/react";

import Tile from "./tile";

export default {
    title: "Atoms/Tile",
    component: Tile,
} as ComponentMeta<typeof Tile>


// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Tile> = (args) => <Tile {...args} />;




export const Default = Template.bind({})
Default.args = {
    value: "A"
}

export const Yellow = Template.bind({})
Yellow.args = {
    value: "A",
    state: "yellow"
}

export const Green = Template.bind({})
Green.args = {
    value: "A",
    state: "green"
}

export const Gray = Template.bind({})
Gray.args = {
    value: "A",
    state: "gray"
}
